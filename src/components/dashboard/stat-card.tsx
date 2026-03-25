import { TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  detail?: string;
  trend?: { value: string; positive: boolean };
  progress?: { value: number; total: number };
  accent?: boolean;
}

export function StatCard({
  label,
  value,
  detail,
  trend,
  progress,
  accent,
}: StatCardProps) {
  return (
    <div
      className={`glass-panel p-6 rounded-2xl flex flex-col gap-2 ${
        accent
          ? "bg-[var(--primary-container)]/10 border border-primary/10"
          : ""
      }`}
    >
      <span
        className={`text-xs uppercase tracking-widest font-bold ${
          accent ? "text-primary" : "text-[var(--on-surface-variant)]"
        }`}
      >
        {label}
      </span>

      <span
        className={`text-3xl font-extrabold ${
          accent
            ? "text-[var(--on-surface)]"
            : trend
            ? "text-primary"
            : progress
            ? "text-[var(--tertiary)]"
            : "text-[var(--on-surface)]"
        }`}
      >
        {value}
      </span>

      {trend && (
        <span
          className={`text-xs flex items-center gap-1 ${
            trend.positive ? "text-green-400" : "text-red-400"
          }`}
        >
          <TrendingUp className="w-3 h-3" />
          {trend.value}
        </span>
      )}

      {progress && (
        <div className="w-full h-1 bg-[var(--surface-container-low)] rounded-full mt-2">
          <div
            className="h-full bg-[var(--tertiary)] rounded-full transition-all duration-1000"
            style={{
              width: `${(progress.value / progress.total) * 100}%`,
            }}
          />
        </div>
      )}

      {detail && (
        <span className="text-[10px] text-[var(--on-surface-variant)]/60 leading-tight">
          {detail}
        </span>
      )}
    </div>
  );
}
