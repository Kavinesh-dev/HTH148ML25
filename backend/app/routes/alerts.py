from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.database.connection import SessionLocal
from app.database.models import Alert
from app.schemas.alert import AlertCreate, AlertUpdate, AlertResponse


router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=AlertResponse)
def create_alert(alert: AlertCreate, db: Session = Depends(get_db)):
    new_alert = Alert(
        machine_id=alert.machine_id,
        prediction_id=alert.prediction_id,
        severity=alert.severity,
        title=alert.title,
        message=alert.message,
    )
    db.add(new_alert)
    db.commit()
    db.refresh(new_alert)
    return new_alert


@router.get("/", response_model=list[AlertResponse])
def get_alerts(
    status: Optional[str] = Query(None, description="Filter by status: Active / Acknowledged / Resolved"),
    severity: Optional[str] = Query(None, description="Filter by severity: Low / Medium / High / Critical"),
    db: Session = Depends(get_db),
):
    query = db.query(Alert)
    if status:
        query = query.filter(Alert.status == status)
    if severity:
        query = query.filter(Alert.severity == severity)
    return query.order_by(Alert.created_at.desc()).all()


@router.get("/machine/{machine_id}", response_model=list[AlertResponse])
def get_alerts_for_machine(machine_id: int, db: Session = Depends(get_db)):
    return (
        db.query(Alert)
        .filter(Alert.machine_id == machine_id)
        .order_by(Alert.created_at.desc())
        .all()
    )


@router.get("/{alert_id}", response_model=AlertResponse)
def get_alert(alert_id: int, db: Session = Depends(get_db)):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert


@router.patch("/{alert_id}", response_model=AlertResponse)
def update_alert_status(alert_id: int, update: AlertUpdate, db: Session = Depends(get_db)):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")

    if update.status not in ("Active", "Acknowledged", "Resolved"):
        raise HTTPException(status_code=400, detail="status must be Active, Acknowledged or Resolved")

    alert.status = update.status
    if update.status == "Acknowledged":
        alert.acknowledged_at = datetime.utcnow()
    elif update.status == "Resolved":
        alert.resolved_at = datetime.utcnow()

    db.commit()
    db.refresh(alert)
    return alert
