# RiskLensAI

RiskLensAI is a production-style credit risk decision-support system designed to demonstrate how machine learning models can be built for real-world decisioning, not just offline accuracy.

Instead of predicting hard labels, the system focuses on calibrated risk probabilities, clear business policies, and explainability, reflecting how risk models are actually used in practice.

---

## 🚀 Key Ideas

- Predict probabilities, not approve/reject labels
- Separate ML prediction, business policy, and UI
- Support human-in-the-loop decision making
- Provide explainable outputs for analyst trust
- Follow production-oriented design, not notebook-only workflows

---

## 📊 Dataset

- UCI Credit Card Default Dataset (Taiwan)
- Target: default payment next month (binary, ~22% positives)

---

## 🧠 Modeling Approach

- Multiple tabular models evaluated (Logistic Regression, Tree-based models)
- Final base model: Histogram Gradient Boosting
- Focus on ranking performance and stability
- Model outputs are probability estimates, not final decisions

---

## 🎯 Probability Calibration

Raw ML probabilities are often miscalibrated.

RiskLensAI applies Platt Scaling (sigmoid calibration) using a dedicated calibration set to ensure that predicted probabilities better reflect observed default rates.

This allows outputs such as:

> "A predicted risk of 20% actually corresponds to ~20% default frequency."

---

## 🧾 Decision Logic (Business Policy)

Decisions are handled outside the model using a configurable policy layer.

Example policy:
- **Approve** → low risk
- **Review** → medium risk
- **Reject** → high risk

Policies are defined in YAML and applied via a dedicated decision engine, keeping business rules auditable and easy to change without retraining models.

---

## 🔍 Explainability (SHAP)

RiskLensAI integrates SHAP-based explanations to show why a given risk score was produced.

- Explanations are computed on the base model (not the calibrated model)
- Top risk drivers and risk reducers are returned
- One-hot encoded features are grouped into human-readable explanations

This supports analyst review and model transparency.

---

## ⚙️ Backend Architecture

- FastAPI backend with strict request/response schemas
- Model and policy artifacts loaded once at startup
- End-to-end scoring via a single `/score` endpoint
- Designed for clean separation of concerns and extensibility

---

## 🧪 Example API Response
```json
{
  "probability": 0.14,
  "decision": "Approve",
  "reason": "p <= approve_max (0.2)",
  "explanations": {
    "top_drivers": [
      {"feature": "total_bill", "impact": 0.16}
    ],
    "top_reducers": [
      {"feature": "LIMIT_BAL", "impact": -0.21}
    ]
  }
}
```

---

## 🛣️ Current Status

- ✅ Base model trained
- ✅ Probability calibration applied
- ✅ Decision engine implemented
- ✅ SHAP explainability integrated
- ✅ FastAPI backend working end-to-end
- ⏳ Next.js analyst UI (planned)
