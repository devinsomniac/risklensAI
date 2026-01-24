from __future__ import annotations

import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import HistGradientBoostingClassifier

from data.uci.feature_mapper import map_uci_features


class UCIFeatureEngineer(BaseEstimator, TransformerMixin):
    """
    Wraps your feature engineering (map_uci_features) so it can be used inside sklearn Pipeline.
    Input: raw UCI-style DataFrame (may include target; it will be ignored if present)
    Output: engineered feature DataFrame
    """
    def fit(self, X: pd.DataFrame, y=None):
        return self

    def transform(self, X: pd.DataFrame) -> pd.DataFrame:
        if not isinstance(X, pd.DataFrame):
            X = pd.DataFrame(X)
        return map_uci_features(X)


def build_uci_gb_pipeline(random_state: int = 42) -> Pipeline:
    """
    End-to-end production pipeline:
    raw df -> feature engineering -> preprocessing -> Gradient Boosting -> predict_proba
    """

    categorical_features = ["SEX", "EDUCATION", "MARRIAGE"]
    numeric_features = [
        "LIMIT_BAL",
        "AGE",
        "any_delinquency",
        "max_delay",
        "avg_delay",
        "total_bill",
        "total_paid",
        "payment_ratio",
    ]

    cat_pipe = Pipeline(steps=[
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("ohe", OneHotEncoder(handle_unknown="ignore")),
    ])

    num_pipe = Pipeline(steps=[
        ("imputer", SimpleImputer(strategy="median")),
        # No scaler needed for HistGradientBoosting; keep as-is
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ("cat", cat_pipe, categorical_features),
            ("num", num_pipe, numeric_features),
        ],
        remainder="drop",
        verbose_feature_names_out=False,
    )

    model = HistGradientBoostingClassifier(
        random_state=random_state,
    )

    pipe = Pipeline(steps=[
        ("features", UCIFeatureEngineer()),
        ("prep", preprocessor),
        ("model", model),
    ])

    return pipe
