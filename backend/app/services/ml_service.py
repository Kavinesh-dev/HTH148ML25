"""
ML Service — loads the trained MachineGuard AI (RandomForest) model once at
import time and exposes a single scoring function used by the predictions
route to turn a machine + its latest sensor reading into a failure
probability, risk level, anomaly status and human-readable recommendation.

Feature order MUST match ml/ml/train.py exactly:
    temperature, vibration, rpm, current, operating_hours,
    machine_age, previous_failures
"""

from pathlib import Path
import joblib
import pandas as pd

MODEL_PATH = Path(__file__).resolve().parent.parent / "ml_model" / "machine_failure_model.pkl"

FEATURE_ORDER = [
    "temperature",
    "vibration",
    "rpm",
    "current",
    "operating_hours",
    "machine_age",
    "previous_failures",
]

_model = None


def _get_model():
    """Lazy-load the model once and cache it (avoids reloading per request)."""
    global _model
    if _model is None:
        if not MODEL_PATH.exists():
            raise FileNotFoundError(
                f"ML model not found at {MODEL_PATH}. "
                "Copy machine_failure_model.pkl into backend/app/ml_model/."
            )
        _model = joblib.load(MODEL_PATH)
    return _model


def _risk_level(probability_percent: float) -> str:
    if probability_percent >= 85:
        return "Critical"
    if probability_percent >= 60:
        return "High"
    if probability_percent >= 30:
        return "Medium"
    return "Low"


def _recommendation(risk_level: str) -> str:
    return {
        "Critical": "Immediate shutdown and inspection recommended.",
        "High": "Schedule maintenance within 24-48 hours.",
        "Medium": "Monitor closely and plan maintenance this week.",
        "Low": "No action required. Continue routine monitoring.",
    }[risk_level]


def predict_failure(features: dict) -> dict:
    """
    features: dict with keys temperature, vibration, rpm, current,
              operating_hours, machine_age, previous_failures

    Returns: {
        failure_probability: float (0-100),
        risk_level: "Low"|"Medium"|"High"|"Critical",
        anomaly_status: "Normal"|"Anomaly Detected",
        prediction: str (recommendation text)
    }
    """
    model = _get_model()

    row = {key: features[key] for key in FEATURE_ORDER}
    X = pd.DataFrame([row], columns=FEATURE_ORDER)

    probability = float(model.predict_proba(X)[0][1]) * 100
    probability = round(probability, 2)

    risk_level = _risk_level(probability)
    anomaly_status = "Anomaly Detected" if probability >= 50 else "Normal"
    prediction = _recommendation(risk_level)

    return {
        "failure_probability": probability,
        "risk_level": risk_level,
        "anomaly_status": anomaly_status,
        "prediction": prediction,
    }
