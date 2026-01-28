from pydantic import BaseModel,Field,ConfigDict
from typing import Optional,List

class ApplicantUCI(BaseModel):
    model_config = ConfigDict(populate_by_name=True,extra='forbid')

    # X1..X5
    LIMIT_BAL: int = Field(..., alias="X1")
    SEX: int = Field(..., alias="X2")
    EDUCATION: int = Field(..., alias="X3")
    MARRIAGE: int = Field(..., alias="X4")
    AGE: int = Field(..., alias="X5")

    # PAY history: X6..X11
    PAY_0: int = Field(..., alias="X6")
    PAY_2: int = Field(..., alias="X7")
    PAY_3: int = Field(..., alias="X8")
    PAY_4: int = Field(..., alias="X9")
    PAY_5: int = Field(..., alias="X10")
    PAY_6: int = Field(..., alias="X11")

    # BILL_AMT1..6: X12..X17
    BILL_AMT1: int = Field(..., alias="X12")
    BILL_AMT2: int = Field(..., alias="X13")
    BILL_AMT3: int = Field(..., alias="X14")
    BILL_AMT4: int = Field(..., alias="X15")
    BILL_AMT5: int = Field(..., alias="X16")
    BILL_AMT6: int = Field(..., alias="X17")

    # PAY_AMT1..6: X18..X23
    PAY_AMT1: int = Field(..., alias="X18")
    PAY_AMT2: int = Field(..., alias="X19")
    PAY_AMT3: int = Field(..., alias="X20")
    PAY_AMT4: int = Field(..., alias="X21")
    PAY_AMT5: int = Field(..., alias="X22")
    PAY_AMT6: int = Field(..., alias="X23")

#Class of the applicant data and whether the user need explanation or not
class ScoreRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    applicant :ApplicantUCI
    include_explanations : bool = False

#Explanation like what feature and how much did it effect
class ExplanationItem(BaseModel):
    feature : str
    impact : float

#Which feature impact good and which feature impact bad
class Explanation(BaseModel):
    top_drivers : List[ExplanationItem]
    top_reducers : List[ExplanationItem]

#Total output data
class ScoreResponse(BaseModel):
    probability : float
    decision : str
    reason : str
    explanations : Optional[Explanation] = None     
