from fastapi import FastAPI,Depends
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import pandas as pd

from api.schemas import ScoreRequest ,ScoreResponse,Explanation,ExplanationItem
from api.dependencies import load_models,get_model,get_base_model,get_shap_background
from explain.shap_explainer import ShapExplainer
from decision.engine import load_thresholds,decide
from data.uci.loader import load_uci_data

decision_cfg = None
shap_explainer: ShapExplainer | None = None

#The lifespan of the app - starts - running - shutting down
@asynccontextmanager
async def lifespan(app:FastAPI):
    #Global varibale of configuration
    global decision_cfg,shap_explainer

    #Loading the model
    cal_model,base_model,bg_data_X = load_models()
    decision_cfg = load_thresholds("decision/thresholds.yaml")
    print("Model and decision thresholds loaded.")

    
    shap_explainer = ShapExplainer(
        base_pipeline=base_model,
        background_X=bg_data_X,
        max_background=200,
        random_state=42,
    )

    print("Models, policy, and SHAP explainer loaded.")
    #The app is running
    yield
    #Shutting down after the work
    print("Shutting down Risklens API")

#The main app
app = FastAPI(
    title="RiskLens AI",
    version="0.1.0",
    lifespan=lifespan
)

#Middleware for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Getting the health of the app
@app.get("/health")
def health():
    return{"status":"ok"}

#endpoint - 
@app.post("/score", response_model=ScoreResponse)
def score(req: ScoreRequest, model=Depends(get_model)):

    global shap_explainer
    # Convert ApplicantUCI -> dict with real feature names
    row = req.applicant.model_dump(by_alias=False)

    # Build 1-row DataFrame
    X = pd.DataFrame([row])

    # Predict calibrated probability
    proba = float(model.predict_proba(X)[:, 1][0])

    # Decision via decision engine
    d = decide(proba, decision_cfg)

    explanations = None
    if req.include_explanations:
        drivers, reducers = shap_explainer.explain_one(X, top_k=5)
        explanations = Explanation(
            top_drivers=[ExplanationItem(feature=f, impact=v) for f, v in drivers],
            top_reducers=[ExplanationItem(feature=f, impact=v) for f, v in reducers],
        )

    return ScoreResponse(
        probability=proba,
        decision=d.action,
        reason=d.reason,
        explanations=explanations  
    )


