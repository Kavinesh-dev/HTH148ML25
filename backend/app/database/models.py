from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from datetime import datetime

from app.database.connection import Base


class Machine(Base):
    __tablename__ = "machines"

    id = Column(Integer, primary_key=True, index=True)
    machine_name = Column(String, nullable=False)
    machine_type = Column(String, nullable=False)
    location = Column(String)
    status = Column(String, default="Active")

    # Static attributes required as ML model features
    machine_age = Column(Integer, default=0)          # years in service
    previous_failures = Column(Integer, default=0)     # historical failure count


class MachineData(Base):
    __tablename__ = "machine_data"

    id = Column(Integer, primary_key=True, index=True)
    machine_id = Column(Integer, ForeignKey("machines.id"), nullable=False, index=True)
    temperature = Column(Float)
    vibration = Column(Float)
    rpm = Column(Float)
    pressure = Column(Float)
    power = Column(Float)

    # Additional sensor readings required as ML model features
    current = Column(Float)                # electrical current (A)
    operating_hours = Column(Float)         # cumulative runtime hours at time of reading

    timestamp = Column(DateTime, default=datetime.utcnow, index=True)


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    machine_id = Column(Integer, ForeignKey("machines.id"), nullable=False, index=True)
    machine_data_id = Column(Integer, ForeignKey("machine_data.id"), nullable=True)

    anomaly_status = Column(String, nullable=False)
    risk_level = Column(String, nullable=False)
    prediction = Column(String, nullable=False)
    failure_probability = Column(Float, nullable=True)   # 0-100 %

    timestamp = Column(DateTime, default=datetime.utcnow, index=True)


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    machine_id = Column(Integer, ForeignKey("machines.id"), nullable=False, index=True)
    prediction_id = Column(Integer, ForeignKey("predictions.id"), nullable=True)

    severity = Column(String, nullable=False)        # Low / Medium / High / Critical
    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    status = Column(String, default="Active")        # Active / Acknowledged / Resolved

    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    acknowledged_at = Column(DateTime, nullable=True)
    resolved_at = Column(DateTime, nullable=True)


class Maintenance(Base):
    __tablename__ = "maintenance"

    id = Column(Integer, primary_key=True, index=True)
    machine_id = Column(Integer, ForeignKey("machines.id"), nullable=False, index=True)
    alert_id = Column(Integer, ForeignKey("alerts.id"), nullable=True)

    description = Column(String, nullable=False)
    priority = Column(String, default="Medium")       # Low / Medium / High
    status = Column(String, default="Scheduled")       # Scheduled / InProgress / Completed / Cancelled

    scheduled_date = Column(DateTime, nullable=True)
    completed_date = Column(DateTime, nullable=True)
    technician = Column(String, nullable=True)
    cost = Column(Float, nullable=True)
    notes = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
