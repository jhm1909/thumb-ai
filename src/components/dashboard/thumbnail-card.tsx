"use client";

import Image from "next/image";
import type { ThumbnailData } from "@/types";

const categoryColors = {
  purple: "bg-[var(--primary-container)]/80",
  orange: "bg-[var(--tertiary-container)]/80",
  blue: "bg-[var(--secondary)]/80",
};

export function ThumbnailCard({ data }: { data: ThumbnailData }) {
  return (
    <div className="group">
      {/* Thumbnail Image */}
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
        <Image
          src={data.imageUrl}
          alt={data.title}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span
            className={`inline-block px-2 py-1 rounded text-[10px] font-bold text-white mb-2 backdrop-blur-md ${categoryColors[data.categoryColor]}`}
          >
            {data.category}
          </span>
          <h3 className="text-lg font-bold leading-tight text-white line-clamp-2">
            {data.title}
          </h3>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-4 px-1">
        {/* CTR */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-bold tracking-wider text-[var(--on-surface-variant)]/80">
            <span>예상 CTR</span>
            <span className="text-primary">{data.ctr}%</span>
          </div>
          <div className="h-1.5 w-full bg-[var(--surface-container-low)] rounded-full overflow-hidden">
            <div
              className="h-full primary-gradient rounded-full neon-glow-purple transition-all duration-1000"
              style={{ width: `${Math.min(data.ctr * 8, 100)}%` }}
            />
          </div>
        </div>

        {/* Keyword Volume */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-bold tracking-wider text-[var(--on-surface-variant)]/80">
            <span>키워드 검색량</span>
            <span className="text-[var(--tertiary)]">{data.keywordLevel}</span>
          </div>
          <div className="h-1.5 w-full bg-[var(--surface-container-low)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--tertiary)] rounded-full neon-glow-orange transition-all duration-1000"
              style={{ width: `${data.keywordPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
