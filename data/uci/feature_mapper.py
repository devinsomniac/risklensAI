from __future__ import annotations
import pandas as pd

TARGET_COL = "default payment next month"
def map_uci_features(uci_df : pd.DataFrame) -> pd.DataFrame:
    #Dropping ID colum as its not needed in the Dataset for the model purpose and target col as its y
    x_raw = uci_df.drop(columns=['ID',TARGET_COL],errors="ignore").copy()
    #Changing all other education except Universsity, Graduate and high school to others categpry as 4
    x_raw['EDUCATION'] = x_raw['EDUCATION'].replace([0,6,5],4)
    #Changing all other catgories except married, singles to others
    x_raw['MARRIAGE'] = x_raw['MARRIAGE'].replace(0,3)

    #All the payment status cols
    pay_cols = ["PAY_0", "PAY_2", "PAY_3", "PAY_4", "PAY_5", "PAY_6"]
    #All the bill generated cols
    bill_cols = ["BILL_AMT1","BILL_AMT2","BILL_AMT3","BILL_AMT4","BILL_AMT5","BILL_AMT6"]
    #All the payment cols
    pay_amt_cols = ["PAY_AMT1","PAY_AMT2","PAY_AMT3","PAY_AMT4","PAY_AMT5","PAY_AMT6"]

    #Checking any delinquencey by each customer
    pay_clean = x_raw[pay_cols].clip(lower=0)
    x_raw['any_delinquency'] = (pay_clean > 0).any(axis=1).astype(int) 
    #Checking what is the maximum delay each customer did
    x_raw['max_delay'] = pay_clean.max(axis=1)
    #Checking Avg delay by the customer
    x_raw["avg_delay"] = pay_clean.mean(axis=1)
    #Total bill generated for the customer
    x_raw["total_bill"] = x_raw[bill_cols].sum(axis=1)
    #Total payment made by the customer
    x_raw["total_paid"] = x_raw[pay_amt_cols].sum(axis=1)
    #Ratio of bill vs paid
    #Some customer has total bill 0, so we are adding 1 in the bill to rescue from error
    x_raw["payment_ratio"] = x_raw["total_paid"] / (x_raw["total_bill"] + 1)
    #Fresh X dataset
    X = x_raw.drop(columns=pay_cols+bill_cols+pay_amt_cols)

    return X
   