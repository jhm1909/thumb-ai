export function AIChip() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--secondary)]/30 backdrop-blur-xl border border-primary/20 shadow-2xl animate-pulse">
        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
        <span className="text-sm font-semibold text-primary">
          AI가 실시간 트렌드 분석 중...
        </span>
      </div>
    </div>
  );
}
