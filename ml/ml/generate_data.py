import pandas as pd
import numpy as np

np.random.seed(42)

N = 1000

machine_types = ["Motor", "Pump", "CNC", "Compressor", "Loom"]

data = pd.DataFrame({
    "machine_id": [f"M{i:04d}" for i in range(1, N + 1)],
    "machine_type": np.random.choice(machine_types, N),
    "temperature": np.random.normal(65, 12, N).clip(35, 110),
    "vibration": np.random.normal(4.5, 1.8, N).clip(0.5, 12),
    "rpm": np.random.normal(1450, 120, N).clip(800, 1800),
    "current": np.random.normal(12, 3, N).clip(4, 25),
    "operating_hours": np.random.randint(1000, 15000, N),
    "machine_age": np.random.randint(1, 15, N),
    "previous_failures": np.random.randint(0, 4, N)
})

risk_score = (
    0.035 * (data["temperature"] - 50)
    + 0.45 * data["vibration"]
    + 0.08 * data["current"]
    + 0.00008 * data["operating_hours"]
    + 0.18 * data["machine_age"]
    + 0.50 * data["previous_failures"]
)

failure_probability = 1 / (1 + np.exp(-(risk_score - 7)))

failure_probability += np.random.normal(0, 0.04, N)

failure_probability = np.clip(
    failure_probability,
    0.01,
    0.99
)

data["failure"] = (
    np.random.random(N) < failure_probability
).astype(int)

data["failure_cost"] = np.random.randint(
    50000,
    500000,
    N
)

output_path = "data/machine_history.csv"

data.to_csv(output_path, index=False)

print(f"Dataset created successfully: {output_path}")
print(f"Total records: {len(data)}")

print("\nFailure distribution:")
print(data["failure"].value_counts())

print("\nFirst 5 records:")
print(data.head())