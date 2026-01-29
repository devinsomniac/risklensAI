from __future__ import annotations
import pandas as pd
import os
#For saving artifacts
import joblib
import shap
#Data Loader package
from data.uci.loader import load_uci_data
from data.uci.feature_mapper import map_uci_features
from data.uci.label_mapper import map_uci_label

#Required sklearn packages
from sklearn.model_selection import train_test_split
from sklearn.metrics import brier_score_loss,log_loss

#My base model
from pipelines.uci_pipeline import build_uci_gb_pipeline

#Calibrator package
from sklearn.calibration import CalibratedClassifierCV,calibration_curve
from sklearn.frozen import FrozenEstimator

#Visualization
import matplotlib.pyplot as plt

def main()->None:
    #calibrated output path
    os.makedirs("models",exist_ok=True)
    CAL_SIGMOID_OUT = "models/risklens_uci_gb_calibrated_sigmoid.joblib"


    #Loading the data
    data_path = "data/raw/uci/uci_data.xls"
    uci_df = load_uci_data(data_path)

    #Differentiating X and y
    y = map_uci_label(uci_df)
    X_raw = uci_df.drop(columns=["ID","default payment next month"],errors="ignore")

    #Splitting the whole dataset for training - calibration - testing
    #sklearn train_test_split can split data only 2,
    #So at first we will create a train set and temporary set
    #From temporary set , we will again divide 2 into cal and test
    X_train,X_temp,y_train,y_temp = train_test_split(X_raw,y,random_state=42,test_size=0.3,stratify=y)
    X_cal,X_test,y_cal,y_test = train_test_split(X_temp,y_temp,random_state=42,test_size=0.50,stratify=y_temp)
    
    X_bg = X_train.sample(n=200,random_state=42)
    joblib.dump(X_bg,"models/shap_background.joblib")
    print("Saved SHAP background -> models/shap_background.joblib")
    #Training on my base model
    base_pipe = build_uci_gb_pipeline(random_state=42)
    base_pipe.fit(X_train,y_train)

    #Calibrator
    frozen_base = FrozenEstimator(base_pipe)
    # We use sigmoid (Platt scaling) for probability calibration because:
    # - It is parametric and less prone to overfitting on a limited calibration set
    # - It provides stable, monotonic probability correction
    # - The base Gradient Boosting model was already reasonably calibrated
    # Isotonic calibration was evaluated but not selected due to higher variance risk.

    calibrator = CalibratedClassifierCV(estimator=frozen_base,method="sigmoid",cv=None)
    calibrator.fit(X_cal,y_cal)


    #Calibration check
    p_base = base_pipe.predict_proba(X_test)[:,1]
    p_cal = calibrator.predict_proba(X_test)[:,1]

    brier_loss_base = brier_score_loss(y_test,p_base)
    brier_loss_cal = brier_score_loss(y_test,p_cal)
    print("The brier loss of base model is :",brier_loss_base)
    print("The brier loss of calibrated model is :",brier_loss_cal)

    log_loss_base = log_loss(y_test,p_base)
    log_loss_cal = log_loss(y_test,p_cal)
    print("The log loss of base model is :",log_loss_base)
    print("The log loss of calibrated model is :",log_loss_cal)



    #Saving the artifact
    joblib.dump(calibrator, CAL_SIGMOID_OUT)
    print(f"Saved CALIBRATED pipeline -> {CAL_SIGMOID_OUT}")



if __name__ == "__main__":
    main()





