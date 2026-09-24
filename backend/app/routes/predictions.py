from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.database.models import Prediction, Machine, MachineData, Alert
from app.schemas.prediction import PredictionCreate, PredictionResponse
from app.services.ml_service import predict_failure


router = APIRouter(
    prefix="/predictions",
    tags=["Predictions"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def run_prediction_workflow(machine_id: int, machine_data: MachineData, db: Session) -> dict:
    """
    Core Prediction -> Alert workflow, shared by the /predictions/generate
    endpoint and the auto-trigger on machine-data ingestion.
    Returns {"prediction": Prediction, "alert": Alert | None}.
    """
    machine = db.query(Machine).filter(Machine.id == machine_id).first()
    if not machine:
        raise HTTPException(status_code=404, detail="Machine not found")

    result = predict_failure({
        "temperature": machine_data.temperature,
        "vibration": machine_data.vibration,
        "rpm": machine_data.rpm,
        "current": machine_data.current,
        "operating_hours": machine_data.operating_hours,
        "machine_age": machine.machine_age,
        "previous_failures": machine.previous_failures,
    })

    new_prediction = Prediction(
        machine_id=machine_id,
        machine_data_id=machine_data.id,
        anomaly_status=result["anomaly_status"],
        risk_level=result["risk_level"],
        prediction=result["prediction"],
        failure_probability=result["failure_probability"],
    )
    db.add(new_prediction)
    db.commit()
    db.refresh(new_prediction)

    new_alert = None
    if result["risk_level"] in ("High", "Critical"):
        existing_active = (
            db.query(Alert)
            .filter(
                Alert.machine_id == machine_id,
                Alert.status == "Active",
                Alert.severity == result["risk_level"],
            )
            .first()
        )
        if not existing_active:
            new_alert = Alert(
                machine_id=machine_id,
                prediction_id=new_prediction.id,
                severity=result["risk_level"],
                title=f"{result['risk_level']} failure risk on {machine.machine_name}",
                message=(
                    f"Failure probability {result['failure_probability']}% "
                    f"({result['anomaly_status']}). {result['prediction']}"
                ),
            )
            db.add(new_alert)
            db.commit()
            db.refresh(new_alert)

    return {"prediction": new_prediction, "alert": new_alert}


@router.post("/generate/{machine_id}")
def generate_prediction(machine_id: int, db: Session = Depends(get_db)):
    """Runs the ML model on the machine's latest sensor reading, stores the
    prediction, and auto-creates an Alert if risk is High/Critical."""
    latest_data = (
        db.query(MachineData)
        .filter(MachineData.machine_id == machine_id)
        .order_by(MachineData.timestamp.desc())
        .first()
    )
    if not latest_data:
        raise HTTPException(status_code=404, detail="No sensor data found for this machine yet")

    outcome = run_prediction_workflow(machine_id, latest_data, db)
    return {
        "prediction": PredictionResponse.model_validate(outcome["prediction"]),
        "alert_created": outcome["alert"] is not None,
        "alert": outcome["alert"],
    }


@router.post("/", response_model=PredictionResponse)
def create_prediction(prediction: PredictionCreate, db: Session = Depends(get_db)):
    """Manual prediction insert (kept for backward compatibility / testing)."""
    new_prediction = Prediction(
        machine_id=prediction.machine_id,
        anomaly_status=prediction.anomaly_status,
        risk_level=prediction.risk_level,
        prediction=prediction.prediction,
        failure_probability=prediction.failure_probability,
    )
    db.add(new_prediction)
    db.commit()
    db.refresh(new_prediction)
    return new_prediction


@router.get("/latest/{machine_id}", response_model=PredictionResponse)
def get_latest_prediction(machine_id: int, db: Session = Depends(get_db)):
    prediction = (
        db.query(Prediction)
        .filter(Prediction.machine_id == machine_id)
        .order_by(Prediction.timestamp.desc())
        .first()
    )
    if not prediction:
        raise HTTPException(status_code=404, detail="No predictions found for this machine")
    return prediction


@router.get("/{machine_id}", response_model=list[PredictionResponse])
def get_predictions(machine_id: int, db: Session = Depends(get_db)):
    predictions = (
        db.query(Prediction)
        .filter(Prediction.machine_id == machine_id)
        .order_by(Prediction.timestamp.desc())
        .all()
    )
    return predictions
