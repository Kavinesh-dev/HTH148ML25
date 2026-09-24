import pandas as pd


MAINTENANCE_SLOTS = 3


def time_to_minutes(time_string):
    hours, minutes = map(int, time_string.split(":"))
    return hours * 60 + minutes


def can_fit_in_workday(start_time, end_time, duration):
    start = time_to_minutes(start_time)
    end = time_to_minutes(end_time)

    available_hours = (end - start) / 60

    return available_hours >= duration


def generate_schedule(data):

    # ---------------------------------------
    # 1. Check whether maintenance can fit
    # ---------------------------------------

    data["can_be_scheduled"] = data.apply(
        lambda row: can_fit_in_workday(
            row["available_from"],
            row["available_to"],
            row["maintenance_duration"]
        ),
        axis=1
    )

    # ---------------------------------------
    # 2. Priority weight
    # ---------------------------------------

    priority_weight = {
        "High": 1.30,
        "Medium": 1.10,
        "Low": 1.00
    }

    data["priority_weight"] = (
        data["maintenance_priority"]
        .map(priority_weight)
    )

    # ---------------------------------------
    # 3. Calculate scheduling score
    # ---------------------------------------

    data["scheduling_score"] = (
        data["expected_failure_loss"]
        * data["priority_weight"]
    )

    # ---------------------------------------
    # 4. Keep schedulable machines
    # ---------------------------------------

    candidates = data[
        data["can_be_scheduled"] == True
    ].copy()

    # ---------------------------------------
    # 5. Rank candidates
    # ---------------------------------------

    candidates = candidates.sort_values(
        "scheduling_score",
        ascending=False
    )

    # ---------------------------------------
    # 6. Select available slots
    # ---------------------------------------

    schedule = candidates.head(
        MAINTENANCE_SLOTS
    ).copy()

    schedule["maintenance_order"] = range(
        1,
        len(schedule) + 1
    )

    return schedule