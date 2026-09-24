import pandas as pd
import numpy as np

np.random.seed(42)

# Load existing machines
machines = pd.read_csv("data/machine_history.csv")

# Generate realistic maintenance information
constraints = pd.DataFrame({
    "machine_id": machines["machine_id"],

    # Estimated maintenance duration: 1–4 hours
    "maintenance_duration": np.random.randint(1, 5, len(machines)),

    # Machine availability window
    "available_from": np.random.choice(
        ["08:00", "09:00", "10:00", "11:00"],
        len(machines)
    ),

    "available_to": np.random.choice(
        ["16:00", "17:00", "18:00", "19:00"],
        len(machines)
    ),

    # Maintenance urgency
    "maintenance_priority": np.random.choice(
        ["Low", "Medium", "High"],
        len(machines),
        p=[0.30, 0.40, 0.30]
    )
})

# Save
output_path = "data/machine_constraints.csv"

constraints.to_csv(output_path, index=False)

print("Machine constraints created successfully!")
print(f"Total machines: {len(constraints)}")
print(f"Saved to: {output_path}")

print("\nFirst 5 records:")
print(constraints.head())