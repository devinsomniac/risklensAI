import pandas as pd

TARGET_COL = "default payment next month"
#Returning the target label from the dataframe
def map_uci_label(df:pd.DataFrame) -> pd.Series:
    return df[TARGET_COL].astype(int)