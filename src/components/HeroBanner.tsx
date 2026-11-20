import { ArrowRight, BookOpen, Plus } from 'lucide-react';
import { ResilientImage } from './ResilientImage';

interface HeroBannerProps {
  totalPapers: number;
  onOpenTaxonomy: () => void;
  onOpenSubmit: () => void;
}

export function HeroBanner({
  totalPapers,
  onOpenTaxonomy,
  onOpenSubmit,
}: HeroBannerProps) {
  return (
    <section
      aria-label="Giới thiệu Cổng Nghiên cứu Khoa học Sinh viên"
      className="bg-[#162C46] text-white border-b border-stone-200"
    >
      {/* Mobile Compact Editorial Banner (mirrors Image 2 so news feed is visible immediately above the fold) */}
      <div className="lg:hidden relative overflow-hidden">
        <div className="absolute inset-0">
          <ResilientImage
            src="/src/assets/images/hero_ussh_campus_science_1795187590297.jpg"
            alt="Khuôn viên Trường Đại học Khoa học Xã hội và Nhân văn"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#132740]/95 via-[#162C46]/85 to-[#162C46]/70" />
        </div>

        <div className="relative px-4 py-4 sm:px-6 sm:py-5">
          <p className="text-xs font-medium text-sky-200">
            Nghiên cứu Khoa học Sinh viên · Đổi mới &amp; Sáng tạo
          </p>
          <h1 className="mt-1 font-serif text-xl sm:text-2xl font-bold leading-snug text-white">
            Diễn đàn chia sẻ NCKH 29 ngành Nhân văn
          </h1>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenSubmit}
                className="min-h-[40px] px-3.5 py-1.5 bg-[#9B1C1C] hover:bg-[#B22222] text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                Đăng bài NCKH
              </button>
              <button
                type="button"
                onClick={onOpenTaxonomy}
                className="min-h-[40px] px-3 py-1.5 bg-white/12 hover:bg-white/20 text-white text-xs font-medium rounded-lg border border-white/20 inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              >
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                29 ngành học
              </button>
            </div>
            <span className="font-mono text-xs text-slate-200 tabular-nums">
              {totalPapers} công trình · 06 khối ngành
            </span>
          </div>
        </div>
      </div>

      {/* Desktop 1440px Editorial Split Hero */}
      <div className="hidden lg:block max-w-7xl mx-auto px-8 py-9">
        <div className="grid grid-cols-12 gap-10 items-stretch">
          {/* Editorial Lead Copy */}
          <div className="col-span-7 flex flex-col justify-center">
            <p className="text-xs font-medium tracking-wide text-sky-200/95 mb-2">
              Nghiên cứu Khoa học Sinh viên · Đổi mới &amp; Sáng tạo
            </p>
            <h1 className="font-serif text-[38px] font-bold leading-[1.2] text-white max-w-2xl">
              Diễn đàn chia sẻ công trình nghiên cứu sinh viên các ngành Khoa học Xã hội và Nhân văn
            </h1>
            <p className="mt-3 text-[15px] text-slate-200/90 leading-relaxed max-w-2xl">
              Không gian học thuật mở do Nhóm 6 Tư Duy Sáng Tạo xây dựng — nơi sinh viên 29 ngành đào tạo đăng tải bài nghiên cứu, trao đổi phản biện và lan tỏa tri thức liên ngành.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenSubmit}
                className="min-h-[44px] px-5 py-2.5 bg-[#9B1C1C] hover:bg-[#B22222] text-white text-sm font-semibold rounded-lg inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                Đăng bài nghiên cứu
              </button>
              <button
                type="button"
                onClick={onOpenTaxonomy}
                className="min-h-[44px] px-4 py-2.5 bg-white/10 hover:bg-white/18 text-white text-sm font-medium rounded-lg border border-white/20 inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                Phân loại 29 ngành học
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Clean unboxed quantitative proof strip (no pills) */}
            <dl className="mt-6 pt-5 border-t border-white/15 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <dt className="text-xs text-slate-300">Công trình đăng tải</dt>
                <dd className="font-mono text-2xl font-medium text-white tabular-nums mt-0.5">
                  {totalPapers}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-300">Khối ngành khoa học</dt>
                <dd className="font-mono text-2xl font-medium text-white tabular-nums mt-0.5">
                  06
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-300">Ngành đào tạo Nhân văn</dt>
                <dd className="font-mono text-2xl font-medium text-white tabular-nums mt-0.5">
                  29
                </dd>
              </div>
            </dl>
          </div>

          {/* Balanced Editorial Campus Photograph */}
          <div className="col-span-5 relative rounded-xl overflow-hidden bg-slate-900 min-h-full">
            <ResilientImage
              src="/src/assets/images/hero_ussh_campus_science_1795187590297.jpg"
              alt="Khuôn viên Trường Đại học Khoa học Xã hội và Nhân văn trong buổi sáng học thuật"
              className="w-full h-full object-cover"
              fallbackTitle="Khuôn viên học thuật Nhân văn"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-5">
              <p className="text-xs font-medium text-sky-200">
                Kỷ yếu trực tuyến · Năm học 2025–2026
              </p>
              <p className="font-serif text-base text-white mt-0.5 leading-snug">
                Kết nối tri thức Khoa học Xã hội &amp; Nhân văn
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
