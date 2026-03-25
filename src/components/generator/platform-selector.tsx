"use client";

export type Platform = "youtube" | "instagram" | "tiktok";

interface PlatformInfo {
  id: Platform;
  label: string;
  icon: React.ReactNode;
  maxChars: number;
  tip: string;
}

const YoutubeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.84.55 9.38.55 9.38.55s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.2 8.2 0 0 0 4.76 1.52V6.78a4.86 4.86 0 0 1-1-.09z" />
  </svg>
);

const platforms: PlatformInfo[] = [
  {
    id: "youtube",
    label: "YouTube",
    icon: <YoutubeIcon />,
    maxChars: 60,
    tip: "15~40자, 숫자와 감정 단어가 CTR을 높입니다",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: <InstagramIcon />,
    maxChars: 125,
    tip: "첫 줄이 핵심! 해시태그 3~5개 포함",
  },
  {
    id: "tiktok",
    label: "TikTok",
    icon: <TikTokIcon />,
    maxChars: 150,
    tip: "트렌드 키워드 + 짧고 강렬한 훅이 중요",
  },
];

interface Props {
  selected: Platform;
  onChange: (platform: Platform) => void;
}

export function PlatformSelector({ selected, onChange }: Props) {
  const current = platforms.find((p) => p.id === selected)!;

  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">
        플랫폼
      </label>
      <div className="flex gap-2">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              selected === p.id
                ? "bg-primary/20 text-primary border border-primary/30"
                : "bg-[var(--surface-container)] text-[var(--on-surface-variant)] hover:text-white"
            }`}
          >
            {p.icon}
            {p.label}
          </button>
        ))}
      </div>
      <p className="text-[10px] text-[var(--on-surface-variant)]/60">
        {current.tip} (최대 {current.maxChars}자)
      </p>
    </div>
  );
}

export { platforms };
