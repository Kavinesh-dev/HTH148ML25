from fastapi import FastAPI
from sqlalchemy import text

from app.database.connection import engine, Base
from app.database import models

from fastapi.middleware.cors import CORSMiddleware

from app.routes.machines import router as machines_router
from app.routes.machine_data import router as machine_data_router
from app.routes.predictions import router as predictions_router
from app.routes.alerts import router as alerts_router
from app.routes.maintenance import router as maintenance_router
app = FastAPI(
    title="MACHINOVA API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(machines_router)
app.include_router(machine_data_router)
app.include_router(predictions_router)
app.include_router(alerts_router)
app.include_router(maintenance_router)

@app.get("/")
def root():
    return {
        "message": "MACHINOVA Backend is running"
    }


@app.get("/health")
def health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected"
        }

    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }