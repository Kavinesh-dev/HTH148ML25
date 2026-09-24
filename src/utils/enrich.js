import {
  getMachines,
  getMachineData,
  getLatestPrediction,
} from "../services/api";

/**
 * Loads all machines and, for each, its latest sensor reading + latest
 * ML prediction, merging everything into one flat object the UI can use
 * directly. Tolerant of machines that don't have data/predictions yet.
 */
export async function loadMachineSummaries() {
  const machines = await getMachines();

  const enriched = await Promise.all(
    machines.map(async (machine) => {
      const [dataResult, predictionResult] = await Promise.allSettled([
        getMachineData(machine.id),
        getLatestPrediction(machine.id),
      ]);

      const readings =
        dataResult.status === "fulfilled" ? dataResult.value : [];
      const latestReading = readings[0] || null;

      const prediction =
        predictionResult.status === "fulfilled" ? predictionResult.value : null;

      return {
        ...machine,
        latestReading,
        readings,
        prediction,
        riskLevel: prediction?.risk_level || "Unknown",
        failureProbability: prediction?.failure_probability ?? null,
        rpm: latestReading?.rpm ?? 0,
        vibration: latestReading?.vibration ?? 0,
      };
    })
  );

  return enriched;
}
