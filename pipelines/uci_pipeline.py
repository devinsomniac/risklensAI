from __future__ import annotations

import pandas as pd
from sklearn.base import BaseEstimator,TransformerMixin
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import HistGradientBoostingClassifier

from data.uci.feature_mapper import map_uci_features

class UCIFeatureEngineer(BaseEstimator,TransformerMixin):
    def fit(self,X:pd.DataFrame,y=None):
        return self
    
    