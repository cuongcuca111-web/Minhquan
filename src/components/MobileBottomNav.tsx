import { Bookmark, Grid, Home, PlusCircle } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'home' | 'taxonomy' | 'saved';
  savedCount: number;
  onHome: () => void;
  onOpenTaxonomy: () => void;
  onOpenSubmit: () => void;
  onToggleSaved: () => void;
}

export function MobileBottomNav({
  activeTab,
  savedCount,
  onHome,
  onOpenTaxonomy,
  onOpenSubmit,
  onToggleSaved,
}: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Điều hướng nhanh di động"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200"
    >
      <div className="grid grid-cols-4 h-14">
        <button
          type="button"
          onClick={onHome}
          className={`flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors ${
            activeTab === 'home' ? 'text-[#9B1C1C]' : 'text-stone-600'
          }`}
        >
          <Home className="w-5 h-5" aria-hidden="true" />
          <span>Tin NCKH</span>
        </button>

        <button
          type="button"
          onClick={onOpenTaxonomy}
          className={`flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors ${
            activeTab === 'taxonomy' ? 'text-[#9B1C1C]' : 'text-stone-600'
          }`}
        >
          <Grid className="w-5 h-5" aria-hidden="true" />
          <span>29 Ngành</span>
        </button>

        <button
          type="button"
          onClick={onOpenSubmit}
          className="flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold text-[#9B1C1C]"
        >
          <PlusCircle className="w-5 h-5" aria-hidden="true" />
          <span>Đăng bài</span>
        </button>

        <button
          type="button"
          onClick={onToggleSaved}
          className={`flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors ${
            activeTab === 'saved' ? 'text-[#9B1C1C]' : 'text-stone-600'
          }`}
        >
          <Bookmark className="w-5 h-5" aria-hidden="true" />
          <span>Đã lưu{savedCount > 0 ? ` (${savedCount})` : ''}</span>
        </button>
      </div>
    </nav>
  );
}
