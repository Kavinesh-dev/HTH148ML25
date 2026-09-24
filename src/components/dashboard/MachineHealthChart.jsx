import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function formatTime(ts) {
  try {
    return new Date(ts).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export default function MachineHealthChart({ data = [], metric = "temperature", color = "#00288e", unit = "" }) {
  const chartData = [...data]
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    .slice(-30)
    .map((d) => ({ ...d, time: formatTime(d.timestamp) }));

  if (chartData.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-xs text-on-surface-variant">
        No sensor history yet for this metric.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id={`grad-${metric}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e7ff" vertical={false} />
        <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#9497a8" />
        <YAxis tick={{ fontSize: 10 }} stroke="#9497a8" width={36} />
        <Tooltip
          formatter={(value) => [`${value}${unit}`, metric]}
          contentStyle={{
            borderRadius: 10,
            border: "1px solid #e2e7ff",
            fontSize: 12,
          }}
        />
        <Area
          type="monotone"
          dataKey={metric}
          stroke={color}
          strokeWidth={2}
          fill={`url(#grad-${metric})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
