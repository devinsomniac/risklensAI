from fastapi import FastAPI,Depends
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import pandas as pd

from api.schemas import ScoreRequest ,ScoreResponse
from api.dependencies import load_model,get_model

from decision.engine import load_thresholds,decide

decision_cfg = None

@asynccontextmanager
async def lifespan(app:FastAPI):

    global decision_cfg

    load_model()
    decision_cfg = load_thresholds("decision/thresholds.yaml")
    print("Model and decision thresholds loaded.")

    yield

    print("Shutting down Risklens API")

app = FastAPI(
    title="RiskLens AI",
    version="0.1.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return{"status":"ok"}

@app.post("/score", response_model=ScoreResponse)
def score(req: ScoreRequest, model=Depends(get_model)):
    # Convert ApplicantUCI -> dict with real feature names
    row = req.applicant.model_dump(by_alias=False)

    # Build 1-row DataFrame
    X = pd.DataFrame([row])

    # Predict calibrated probability
    proba = float(model.predict_proba(X)[:, 1][0])

    # Decision via decision engine
    d = decide(proba, decision_cfg)

    return ScoreResponse(
        probability=proba,
        decision=d.action,
        reason=d.reason,
        explanations=None  
    )