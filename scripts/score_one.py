import joblib
import pandas as pd

from decision.engine import load_thresholds, decide

MODEL_PATH = "models/risklens_uci_gb_calibrated_sigmoid.joblib"

def main():
    #loading model
    model = joblib.load(MODEL_PATH)   
    cfg = load_thresholds()

    x = {
        "LIMIT_BAL": 50000,
        "SEX": 1,
        "EDUCATION": 2,
        "MARRIAGE": 1,
        "AGE": 29,
        "PAY_0": 0,
        "PAY_2": 0,
        "PAY_3": 0,
        "PAY_4": 0,
        "PAY_5": 0,
        "PAY_6": 0,
        "BILL_AMT1": 1200,
        "BILL_AMT2": 1100,
        "BILL_AMT3": 900,
        "BILL_AMT4": 800,
        "BILL_AMT5": 700,
        "BILL_AMT6": 650,
        "PAY_AMT1": 500,
        "PAY_AMT2": 400,
        "PAY_AMT3": 300,
        "PAY_AMT4": 300,
        "PAY_AMT5": 200,
        "PAY_AMT6": 200,
    }
    #Transforming into dataframe
    X = pd.DataFrame([x])  

    p = float(model.predict_proba(X)[:, 1][0])
    d = decide(p, cfg)

    print({"probability": round(d.p, 4), "decision": d.action, "reason": d.reason})

if __name__ == "__main__":
    main()
