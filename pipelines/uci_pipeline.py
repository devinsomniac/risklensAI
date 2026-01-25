from __future__ import annotations
import pandas as pd


# Makes the custom transformer sklearn-compatible (pipelines, fit/transform, cloning)
from sklearn.base import BaseEstimator,TransformerMixin
# Pipeline chains preprocessing and model steps so training and inference run identically
from sklearn.pipeline import Pipeline
# Apply different preprocessing pipelines to categorical and numerical columns
from sklearn.compose import ColumnTransformer
# Encode categorical features into numeric form while safely handling unseen categories
from sklearn.preprocessing import OneHotEncoder
# Handle missing values consistently using statistics learned from training data
from sklearn.impute import SimpleImputer
# Gradient boosting model optimized for tabular data and probability prediction
from sklearn.ensemble import HistGradientBoostingClassifier
#Feature Engineering
from data.uci.feature_mapper import map_uci_features

'''Function of feature engineering'''
class UCIFeatureEngineering (BaseEstimator,TransformerMixin):
    def fit(self,X:pd.DataFrame,y=None)->pd.DataFrame:
        return self
    def transform(self,X:pd.DataFrame)->pd.DataFrame:
        if not isinstance(X,pd.DataFrame):
            X = pd.DataFrame(X)
        return map_uci_features(X)

'''GB Pipeline'''
def build_uci_gb_pipeline(random_state : int = 42) -> Pipeline:
    #Differentiating different types of features
    categorical_features = ["SEX", "EDUCATION", "MARRIAGE"]
    numerical_features = [ "LIMIT_BAL","AGE","any_delinquency","max_delay","avg_delay","total_bill","total_paid","payment_ratio"]   

    #Pipeline for Categorical features
    cat_pipe = Pipeline(steps=[
        ("imputer" , SimpleImputer(strategy="most_frequent")),
        ("ohe", OneHotEncoder(handle_unknown ="ignore"))
    ])

    #Pipeline for numerical features
    num_pipe = Pipeline(steps=[
        ("imputer",SimpleImputer(strategy="median"))
    ])

    '''Wrapping Preprocessing using different type features, and their respective pipeline'''
    preprocessor = ColumnTransformer(
        transformers=[
            ("cat",cat_pipe,categorical_features),
            ("num",num_pipe,numerical_features)
        ],
        remainder="drop",
        verbose_feature_names_out=False
    )

    '''Final Model we selected after notebook experiement'''
    model = HistGradientBoostingClassifier(random_state=random_state)

    #Pipeline of Pipelines
    pipe = Pipeline(steps=[
        ("feature",UCIFeatureEngineering()),
        ("prep",preprocessor),
        ("model",model)
    ])

    return pipe
