from __future__ import annotations

from typing import Dict, List, Tuple
from collections import defaultdict

import numpy as np
import pandas as pd
import shap


class ShapExplainer:
    """
    SHAP explainer for the BASE pipeline (NOT the calibrated model).
    Produces human-friendly explanations by grouping one-hot features like:
      MARRIAGE_1, MARRIAGE_2 -> MARRIAGE
      SEX_1, SEX_2 -> SEX
      EDUCATION_1, EDUCATION_2, ... -> EDUCATION
    """

    # Add/modify prefixes you want to group
    DEFAULT_OHE_PREFIXES = ("SEX_", "EDUCATION_", "MARRIAGE_")

    def __init__(
        self,
        base_pipeline,
        background_X: pd.DataFrame,
        max_background: int = 200,
        random_state: int = 42,
        ohe_prefixes: Tuple[str, ...] = DEFAULT_OHE_PREFIXES,
    ) -> None:
        self.base_pipeline = base_pipeline
        self.ohe_prefixes = ohe_prefixes

        bg = background_X.copy()
        if len(bg) > max_background:
            bg = bg.sample(n=max_background, random_state=random_state)

        x_bg, names = self._transform_with_names(bg)
        self.feature_names_ = names

        masker = shap.maskers.Independent(x_bg)
        model = self.base_pipeline.named_steps["model"]
        self.explainer = shap.Explainer(model, masker)

    def explain_one(
        self,
        X_one: pd.DataFrame,
        top_k: int = 5,
    ) -> Tuple[List[Tuple[str, float]], List[Tuple[str, float]]]:
        """
        Returns:
          drivers  = top_k features with positive impact (increase default risk)
          reducers = top_k features with negative impact (decrease default risk)
        After grouping one-hot columns into semantic features.
        """
        if not isinstance(X_one, pd.DataFrame):
            X_one = pd.DataFrame(X_one)

        if len(X_one) != 1:
            raise ValueError("X_one must contain exactly 1 row for explain_one().")

        X_t, names = self._transform_with_names(X_one)

        sv = self.explainer(X_t)
        values = sv.values

        # If classifier: (n, classes, feats) -> select class 1 ("default")
        if values.ndim == 3:
            values = values[:, 1, :]

        vals = values[0]  # (n_features,)

        # Pair names with SHAP values
        items = list(zip(names, vals))

        # Group one-hot features (MARRIAGE_1, MARRIAGE_2 -> MARRIAGE)
        grouped = self._group_ohe(items)

        # Now pick top_k drivers/reducers from grouped results
        drivers = sorted(
            [(f, float(v)) for f, v in grouped.items() if v > 0],
            key=lambda x: x[1],
            reverse=True,
        )[:top_k]

        reducers = sorted(
            [(f, float(v)) for f, v in grouped.items() if v < 0],
            key=lambda x: x[1],
        )[:top_k]

        return drivers, reducers

    def _group_ohe(self, items: List[Tuple[str, float]]) -> Dict[str, float]:
        """
        Sum SHAP impacts for one-hot features based on known prefixes.
        Example:
          ("MARRIAGE_1", 0.02) + ("MARRIAGE_2", 0.03) -> ("MARRIAGE", 0.05)
        """
        agg: Dict[str, float] = defaultdict(float)

        for name, val in items:
            grouped_name = name
            for prefix in self.ohe_prefixes:
                if name.startswith(prefix):
                    grouped_name = prefix[:-1]  # "MARRIAGE_" -> "MARRIAGE"
                    break
            agg[grouped_name] += float(val)

        return dict(agg)

    def _transform_with_names(self, X: pd.DataFrame) -> Tuple[np.ndarray, List[str]]:
        # 1) Feature engineering
        X_feat = self.base_pipeline.named_steps["feature"].transform(X)

        # 2) Preprocessing (impute + OHE)
        prep = self.base_pipeline.named_steps["prep"]
        X_t = prep.transform(X_feat)

        # Feature names from ColumnTransformer
        try:
            names = [str(n) for n in prep.get_feature_names_out()]
        except Exception:
            names = [f"f_{i}" for i in range(X_t.shape[1])]

        # Ensure dense
        if hasattr(X_t, "toarray"):
            X_t = X_t.toarray()

        return X_t, names
