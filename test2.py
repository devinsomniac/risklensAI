from __future__ import annotations

import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, average_precision_score

from data.uci.loader import load_uci_data
from data.uci.label_mapper import map_uci_label
from pipelines.uci_pipeline import build_uci_gb_pipeline

# Update this to your real dataset file path
DATA_PATH = "data/uci/uci_data.xls"

# Saved artifact (you will load this in FastAPI later)
OUT_PATH = "models/risklens_uci_gb_pipeline.joblib"


def main():
    df = load_uci_data(DATA_PATH)
    y = map_uci_label(df)

    # Pipeline expects raw input columns (target removed)
    X_raw = df.drop(columns=["default payment next month"], errors="ignore")

    X_train, X_test, y_train, y_test = train_test_split(
        X_raw, y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    pipe = build_uci_gb_pipeline(random_state=42)
    pipe.fit(X_train, y_train)

    y_proba = pipe.predict_proba(X_test)[:, 1]
    roc = roc_auc_score(y_test, y_proba)
    pr = average_precision_score(y_test, y_proba)

    print(f"ROC-AUC: {roc:.6f}")
    print(f"PR-AUC : {pr:.6f}")

    joblib.dump(pipe, OUT_PATH)
    print(f"Saved pipeline to: {OUT_PATH}")


if __name__ == "__main__":
    main()
