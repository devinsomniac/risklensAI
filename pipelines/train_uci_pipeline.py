from __future__ import annotations

#To save my artificate
import joblib
#To make my dataset divide for train and test
from sklearn.model_selection import train_test_split
#Metrics for prediction
from sklearn.metrics import roc_auc_score,average_precision_score

from data.uci.loader import load_uci_data
from data.uci.label_mapper import map_uci_label
from pipelines.uci_pipeline import build_uci_gb_pipeline

DATA_PATH = "data/raw/uci/uci_data.xls"
OUT_PATH = "models/risklens_uci_gb_pipeline.joblib"

def main():
    df = load_uci_data(DATA_PATH)
    y = map_uci_label(df)

    X_raw = df.drop(columns=["default payment next month"],errors="ignore")

    #Train Test Split
    X_train,X_test,y_train,y_test = train_test_split(X_raw,y,stratify=y,test_size=0.2,random_state=42)

    #Fitting the data into the model in pipeline
    pipe = build_uci_gb_pipeline(random_state=42)
    pipe.fit(X_train,y_train)

    #Predicting output on test set
    y_proba = pipe.predict_proba(X_test)[:,1]

    #The score how good the model is working
    roc_auc_score_gb = roc_auc_score(y_test,y_proba)
    pr_auc_score_gb = average_precision_score(y_test,y_proba)

    print(f"ROC-AUC: {roc_auc_score_gb:.6f}")
    print(f"PR-AUC : {pr_auc_score_gb:.6f}")

    joblib.dump(pipe, OUT_PATH)
    print(f"Saved pipeline to: {OUT_PATH}")


if __name__ == "__main__":
    main()