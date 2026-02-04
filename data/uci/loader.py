from __future__ import annotations
import pandas as pd

def load_uci_data(path:str)->pd.DataFrame:
    if not path:
        raise ValueError("Path to UCI dataset is required")
    '''Loading the uci dataset with some cleanup - like the col name starts from 1st row instead of 0'''
    uci_df = pd.read_excel(path,header=1)
    uci_df = uci_df.loc[:,~uci_df.columns.astype(str).str.contains(r"^Unnamed")]

    return uci_df