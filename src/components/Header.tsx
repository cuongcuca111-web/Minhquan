import { Menu, Plus, Search } from 'lucide-react';

interface HeaderProps {
  activeSection: 'home' | 'featured' | 'saved' | 'taxonomy';
  savedCount: number;
  onResetHome: () => void;
  onSelectFeatured: () => void;
  onToggleSavedOnly: () => void;
  onOpenTaxonomyDrawer: () => void;
  onOpenSubmitModal: () => void;
  onFocusSearch: () => void;
}

export function Header({
  activeSection,
  savedCount,
  onResetHome,
  onSelectFeatured,
  onToggleSavedOnly,
  onOpenTaxonomyDrawer,
  onOpenSubmitModal,
  onFocusSearch,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 lg:h-16 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand wordmark — Nhóm 6 Tư Duy Sáng Tạo (Image 2 requirement) */}
        <button
          type="button"
          onClick={onResetHome}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B1C1C] rounded-md py-1 min-w-0 shrink-0"
          aria-label="Nhóm 6 Tư Duy Sáng Tạo - Về trang chủ"
        >
          <span
            className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-[#9B1C1C] text-white flex items-center justify-center shrink-0 font-serif font-bold text-sm tracking-tight"
            aria-hidden="true"
          >
            N6
          </span>
          <span className="font-serif text-base sm:text-lg lg:text-xl font-bold tracking-tight text-[#9B1C1C] group-hover:text-[#7F1616] transition-colors whitespace-nowrap shrink-0">
            Nhóm 6 Tư Duy Sáng Tạo
          </span>
        </button>

        {/* Zone 2: Desktop concise single-line navigation links */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600"
        >
          <button
            type="button"
            onClick={onResetHome}
            className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
              activeSection === 'home'
                ? 'text-[#9B1C1C] border-[#9B1C1C]'
                : 'border-transparent hover:text-stone-950 hover:border-stone-300'
            }`}
          >
            Trang chủ
          </button>
          <button
            type="button"
            onClick={onOpenTaxonomyDrawer}
            className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
              activeSection === 'taxonomy'
                ? 'text-[#9B1C1C] border-[#9B1C1C]'
                : 'border-transparent hover:text-stone-950 hover:border-stone-300'
            }`}
          >
            Danh mục ngành
          </button>
          <button
            type="button"
            onClick={onSelectFeatured}
            className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
              activeSection === 'featured'
                ? 'text-[#9B1C1C] border-[#9B1C1C]'
                : 'border-transparent hover:text-stone-950 hover:border-stone-300'
            }`}
          >
            Nghiên cứu nổi bật
          </button>
          <button
            type="button"
            onClick={onToggleSavedOnly}
            className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
              activeSection === 'saved'
                ? 'text-[#9B1C1C] border-[#9B1C1C]'
                : 'border-transparent hover:text-stone-950 hover:border-stone-300'
            }`}
          >
            Đã lưu{savedCount > 0 ? ` (${savedCount})` : ''}
          </button>
        </nav>

        {/* Zone 3: Primary CTA on desktop / Search + Menu trigger on mobile (matching Image 2) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenSubmitModal}
            className="hidden lg:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#9B1C1C] hover:bg-[#7F1616] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9B1C1C]"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Đăng bài NCKH
          </button>

          {/* Mobile compact controls matching Image 2 (Search + Hamburger Drawer) */}
          <button
            type="button"
            onClick={onFocusSearch}
            aria-label="Tìm kiếm bài nghiên cứu"
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-700 hover:text-[#9B1C1C] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B1C1C]"
          >
            <Search className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onOpenTaxonomyDrawer}
            aria-label="Mở danh mục phân loại các ngành học Nhân văn"
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-800 hover:text-[#9B1C1C] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B1C1C]"
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
