from __future__ import annotations
from dataclasses import dataclass
import yaml

@dataclass
class Decision:
    action:str
    p:float
    reason : str


#Loading the threshold file
def load_thresholds(path:str = "decision/thresholds.yaml") -> dict:
    with open(path,"r") as f:
        return yaml.safe_load(f)

#Function for decision making
def decide(p:float,cfg:dict) ->Decision:
    approve_max = float(cfg["approve_max"])
    review_max = float(cfg["review_max"])

    if p<=approve_max:
        return Decision("Approve",p,f"p<=approve_max ({approve_max})")
    elif p<=review_max:
        return Decision("Review Manually",p,f"approve_max<p<=review_max ({review_max})")
    else:
        return Decision("Reject",p,f"p>review_max ({review_max})") 