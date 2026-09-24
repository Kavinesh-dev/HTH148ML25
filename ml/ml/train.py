import pandas as pd
import joblib

from sklearn.ensemble import RandomForestClassifier


# ---------------------------------------
# 1. Load dataset
# ---------------------------------------

data = pd.read_csv("data/machine_history.csv")

print("Dataset loaded successfully!")
print(f"Total records: {len(data)}")


# ---------------------------------------
# 2. Select features
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
y = data["failure"]


# ---------------------------------------
# 3. Manual train/test split
# ---------------------------------------

split_index = int(len(data) * 0.80)

X_train = X.iloc[:split_index]
X_test = X.iloc[split_index:]

y_train = y.iloc[:split_index]
y_test = y.iloc[split_index:]

print(f"\nTraining records: {len(X_train)}")
print(f"Testing records: {len(X_test)}")


# ---------------------------------------
# 4. Create Random Forest model
# ---------------------------------------

model = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    random_state=42,
    class_weight="balanced"
)


# ---------------------------------------
# 5. Train
# ---------------------------------------

print("\nTraining MachineGuard AI model...")

model.fit(X_train, y_train)

print("Training completed!")


# ---------------------------------------
# 6. Basic evaluation
# ---------------------------------------

predictions = model.predict(X_test)

accuracy = (predictions == y_test).mean()

print("\nModel Accuracy:")
print(f"{accuracy * 100:.2f}%")


# ---------------------------------------
# 7. Save model
# ---------------------------------------

model_path = "ml/machine_failure_model.pkl"

joblib.dump(model, model_path)

print(f"\nModel saved successfully:")
print(model_path)