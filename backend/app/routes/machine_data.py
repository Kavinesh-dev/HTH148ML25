from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.database.models import MachineData
from app.schemas.machine_data import MachineDataCreate, MachineDataResponse


router = APIRouter(
    prefix="/machine-data",
    tags=["Machine Data"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=MachineDataResponse)
def create_machine_data(
    data: MachineDataCreate,
    auto_predict: bool = Query(True, description="Automatically run ML prediction + alerting after saving this reading"),
    db: Session = Depends(get_db),
):
    new_data = MachineData(
        machine_id=data.machine_id,
        temperature=data.temperature,
        vibration=data.vibration,
        rpm=data.rpm,
        pressure=data.pressure,
        power=data.power,
        current=data.current,
        operating_hours=data.operating_hours,
    )

    db.add(new_data)
    db.commit()
    db.refresh(new_data)

    if auto_predict:
        # Import here to avoid a circular import between the two route modules.
        from app.routes.predictions import run_prediction_workflow
        try:
            run_prediction_workflow(data.machine_id, new_data, db)
        except Exception:
            # Never let a prediction/alert failure block sensor-data ingestion.
            # (Machine might not exist yet, or the model file might be missing.)
            pass

    return new_data


@router.get("/{machine_id}", response_model=list[MachineDataResponse])
def get_machine_data(machine_id: int, db: Session = Depends(get_db)):
    data = (
        db.query(MachineData)
        .filter(MachineData.machine_id == machine_id)
        .order_by(MachineData.timestamp.desc())
        .all()
    )
    return data
