import pandas as pd
import joblib
import json

from scheduler.optimizer import generate_schedule
# ==========================================
# MACHINEGUARD AI
# Complete Predictive Maintenance Pipeline
# ==========================================


print("\n" + "=" * 70)
print("                 MACHINEGUARD AI")
print("        PREDICTIVE MAINTENANCE SYSTEM")
print("=" * 70)


# ------------------------------------------
# 1. Load trained ML model
# ------------------------------------------

print("\n[1/5] Loading ML model...")

model = joblib.load(
    "ml/machine_failure_model.pkl"
)

print("      Model loaded successfully!")


# ------------------------------------------
# 2. Load machine data
# ------------------------------------------

print("\n[2/5] Loading machine data...")

data = pd.read_csv(
    "data/machine_history.csv"
)
constraints = pd.read_csv(
    "data/machine_constraints.csv"
)

data = data.merge(
    constraints,
    on="machine_id",
    how="left"
)

print(f"      {len(data)} machines loaded.")


# ------------------------------------------
# 3. Predict failure probability
# ------------------------------------------

print("\n[3/5] Predicting machine failure risk...")

features = [
    "temperature",
    "vibration",
    "rpm",
    "current",
    "operating_hours",
    "machine_age",
    "previous_failures"
]

X = data[features]

data["failure_probability"] = (
    model.predict_proba(X)[:, 1]
)

data["failure_probability_percent"] = (
    data["failure_probability"] * 100
).round(2)

print("      Risk prediction completed!")


# ------------------------------------------
# 4. Calculate expected failure loss
# ------------------------------------------

print("\n[4/5] Calculating expected failure loss...")

data["expected_failure_loss"] = (
    data["failure_probability"]
    * data["failure_cost"]
)

print("      Cost analysis completed!")


# ------------------------------------------
# Generate optimized maintenance schedule
# ------------------------------------------

schedule = generate_schedule(data)


# ==========================================
# FINAL RESULT
# ==========================================

print("\n" + "=" * 70)
print("          TODAY'S MAINTENANCE SCHEDULE")
print("=" * 70)

for position, (_, machine) in enumerate(
    schedule.iterrows(),
    start=1
):

    print(
        f"\n#{position}  {machine['machine_id']}"
    )

    print(
        f"    Machine Type       : "
        f"{machine['machine_type']}"
    )

    print(
        f"    Failure Risk       : "
        f"{machine['failure_probability_percent']}%"
    )

    print(
        f"    Failure Cost       : "
        f"₹{machine['failure_cost']:,.0f}"
    )

    print(
        f"    Expected Loss      : "
        f"₹{machine['expected_failure_loss']:,.0f}"
    )
    print(
        f"    Maintenance Time   : "
        f"{machine['maintenance_duration']} hours"
    )

    print(
        f"    Available Window   : "
        f"{machine['available_from']} - "
        f"{machine['available_to']}"
    )

    print(
        f"    Priority           : "
        f"{machine['maintenance_priority']}"
    )

# ------------------------------------------
# Total expected loss addressed
# ------------------------------------------

total_loss = schedule[
    "expected_failure_loss"
].sum()

print("\n" + "-" * 70)

print(
    f"Maintenance Slots Used : "
    f"{len(schedule)}/3"
)

print(
    f"Expected Loss Addressed : "
    f"₹{total_loss:,.0f}"
)

print("=" * 70)

print("\nMachineGuard AI pipeline completed successfully! 🚀")
# ------------------------------------------
# Export Machinova results for dashboard
# ------------------------------------------

dashboard_data = {
    "product": "Machinova",
    "team": "Null to Impact",
    "total_machines": int(len(data)),
    "maintenance_slots": 3,
    "slots_used": int(len(schedule)),
    "expected_loss_addressed": round(
        float(schedule["expected_failure_loss"].sum()),
        2
    ),
    "maintenance_schedule": []
}

for position, (_, machine) in enumerate(
    schedule.iterrows(),
    start=1
):
    dashboard_data["maintenance_schedule"].append({
        "rank": position,
        "machine_id": machine["machine_id"],
        "machine_type": machine["machine_type"],
        "failure_risk": round(
            float(machine["failure_probability_percent"]),
            2
        ),
        "failure_cost": int(machine["failure_cost"]),
        "expected_loss": round(
            float(machine["expected_failure_loss"]),
            2
        ),
        "maintenance_duration": int(
            machine["maintenance_duration"]
        ),
        "available_from": machine["available_from"],
        "available_to": machine["available_to"],
        "priority": machine["maintenance_priority"]
    })


with open(
    "output/machinova_result.json",
    "w"
) as file:

    json.dump(
        dashboard_data,
        file,
        indent=4
    )

print("\nMachinova dashboard data exported:")
print("output/machinova_result.json")