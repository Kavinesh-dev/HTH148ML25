from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.database.connection import SessionLocal
from app.database.models import Maintenance, Alert
from app.schemas.maintenance import MaintenanceCreate, MaintenanceUpdate, MaintenanceResponse


router = APIRouter(
    prefix="/maintenance",
    tags=["Maintenance"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=MaintenanceResponse)
def create_maintenance(record: MaintenanceCreate, db: Session = Depends(get_db)):
    new_record = Maintenance(
        machine_id=record.machine_id,
        alert_id=record.alert_id,
        description=record.description,
        priority=record.priority,
        scheduled_date=record.scheduled_date,
        technician=record.technician,
        cost=record.cost,
        notes=record.notes,
    )
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return new_record


@router.post("/from-alert/{alert_id}", response_model=MaintenanceResponse)
def create_maintenance_from_alert(alert_id: int, db: Session = Depends(get_db)):
    """Completes the Prediction -> Alert -> Maintenance workflow: schedules a
    maintenance job directly from an existing alert and marks the alert Acknowledged."""
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")

    priority_map = {"Critical": "High", "High": "High", "Medium": "Medium", "Low": "Low"}

    new_record = Maintenance(
        machine_id=alert.machine_id,
        alert_id=alert.id,
        description=f"Auto-scheduled from alert: {alert.title}",
        priority=priority_map.get(alert.severity, "Medium"),
        status="Scheduled",
    )
    db.add(new_record)

    if alert.status == "Active":
        alert.status = "Acknowledged"
        alert.acknowledged_at = datetime.utcnow()

    db.commit()
    db.refresh(new_record)
    return new_record


@router.get("/", response_model=list[MaintenanceResponse])
def get_maintenance_records(
    status: Optional[str] = Query(None, description="Filter by status: Scheduled / InProgress / Completed / Cancelled"),
    db: Session = Depends(get_db),
):
    query = db.query(Maintenance)
    if status:
        query = query.filter(Maintenance.status == status)
    return query.order_by(Maintenance.created_at.desc()).all()


@router.get("/machine/{machine_id}", response_model=list[MaintenanceResponse])
def get_maintenance_for_machine(machine_id: int, db: Session = Depends(get_db)):
    return (
        db.query(Maintenance)
        .filter(Maintenance.machine_id == machine_id)
        .order_by(Maintenance.created_at.desc())
        .all()
    )


@router.get("/{maintenance_id}", response_model=MaintenanceResponse)
def get_maintenance(maintenance_id: int, db: Session = Depends(get_db)):
    record = db.query(Maintenance).filter(Maintenance.id == maintenance_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Maintenance record not found")
    return record


@router.patch("/{maintenance_id}", response_model=MaintenanceResponse)
def update_maintenance(maintenance_id: int, update: MaintenanceUpdate, db: Session = Depends(get_db)):
    record = db.query(Maintenance).filter(Maintenance.id == maintenance_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Maintenance record not found")

    if update.status is not None:
        record.status = update.status
        if update.status == "Completed" and record.completed_date is None:
            record.completed_date = datetime.utcnow()
    if update.technician is not None:
        record.technician = update.technician
    if update.completed_date is not None:
        record.completed_date = update.completed_date
    if update.cost is not None:
        record.cost = update.cost
    if update.notes is not None:
        record.notes = update.notes

    db.commit()
    db.refresh(record)
    return record
