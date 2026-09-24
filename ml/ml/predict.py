import pandas as pd
import joblib


# ---------------------------------------
# 1. Load trained model
# ---------------------------------------

model = joblib.load("ml/machine_failure_model.pkl")

print("MachineGuard AI model loaded successfully!")


# ---------------------------------------
# 2. Load machine data
# ---------------------------------------

data = pd.read_csv("data/machine_history.csv")


# ---------------------------------------
# 3. Select features
# ---------------------------------------

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


# ---------------------------------------
# 4. Predict failure probability
# ---------------------------------------

probabilities = model.predict_proba(X)[:, 1]

data["failure_probability"] = probabilities


# ---------------------------------------
# 5. Convert to percentage
# ---------------------------------------

data["failure_probability_percent"] = (
    data["failure_probability"] * 100
).round(2)


# ---------------------------------------
# 6. Calculate expected failure loss
# ---------------------------------------

data["expected_failure_loss"] = (
    data["failure_probability"]
    * data["failure_cost"]
).round(2)


# ---------------------------------------
# 7. Sort machines by expected loss
# ---------------------------------------

ranked = data.sort_values(
    "expected_failure_loss",
    ascending=False
)


# ---------------------------------------
# 8. Display top 10 machines
# ---------------------------------------

print("\n" + "=" * 70)
print("MACHINEGUARD AI — MACHINE RISK ANALYSIS")
print("=" * 70)

print(
    ranked[
        [
            "machine_id",
            "machine_type",
            "failure_probability_percent",
            "failure_cost",
            "expected_failure_loss"
        ]
    ].head(10).to_string(index=False)
)


# ---------------------------------------
# 9. Display top 3 maintenance candidates
# ---------------------------------------

top_3 = ranked.head(3)

print("\n" + "=" * 70)
print("TODAY'S MAINTENANCE RECOMMENDATIONS")
print("=" * 70)

for position, (_, machine) in enumerate(
    top_3.iterrows(),
    start=1
):
    print(
        f"{position}. "
        f"{machine['machine_id']} | "
        f"Risk: {machine['failure_probability_percent']}% | "
        f"Expected Loss: ₹{machine['expected_failure_loss']:,.0f}"
    )

print("=" * 70)