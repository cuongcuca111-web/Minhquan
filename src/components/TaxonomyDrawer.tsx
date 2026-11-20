import { useEffect, useState } from 'react';
import { ChevronDown, ChevronLeft, Plus, Search, X } from 'lucide-react';
import { USSH_CLUSTERS } from '../data/usshTaxonomy';
import { normalizeVietnameseText } from '../utils/researchLogic';

interface TaxonomyDrawerProps {
  isOpen: boolean;
  selectedClusterId: string | null;
  selectedMajorId: string | null;
  totalPapers: number;
  countsByCluster: Record<string, number>;
  countsByMajor: Record<string, number>;
  onClose: () => void;
  onSelectAll: () => void;
  onSelectCluster: (clusterId: string) => void;
  onSelectMajor: (majorId: string) => void;
  onOpenSubmit: () => void;
}

export function TaxonomyDrawer({
  isOpen,
  selectedClusterId,
  selectedMajorId,
  totalPapers,
  countsByCluster,
  countsByMajor,
  onClose,
  onSelectAll,
  onSelectCluster,
  onSelectMajor,
  onOpenSubmit,
}: TaxonomyDrawerProps) {
  const [expandedClusters, setExpandedClusters] = useState<string[]>([
    'bao-chi-truyen-thong',
  ]);
  const [majorQuery, setMajorQuery] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedSearch = normalizeVietnameseText(majorQuery);

  const toggleCluster = (clusterId: string) => {
    setExpandedClusters((prev) =>
      prev.includes(clusterId)
        ? prev.filter((id) => id !== clusterId)
        : [...prev, clusterId]
    );
  };

  const visibleClusters = USSH_CLUSTERS.map((cluster) => {
    if (!normalizedSearch) return cluster;
    const clusterMatches = normalizeVietnameseText(cluster.name).includes(normalizedSearch);
    const matchingMajors = cluster.majors.filter(
      (m) =>
        normalizeVietnameseText(m.name).includes(normalizedSearch) ||
        normalizeVietnameseText(m.faculty).includes(normalizedSearch) ||
        m.code.includes(normalizedSearch)
    );
    if (clusterMatches) return cluster;
    if (matchingMajors.length > 0) {
      return { ...cluster, majors: matchingMajors };
    }
    return null;
  }).filter((c): c is (typeof USSH_CLUSTERS)[number] => c !== null);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Danh mục phân loại khoa học các ngành học Trường Đại học Khoa học Xã hội và Nhân văn"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Đóng danh mục ngành học"
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px] cursor-default"
      />

      {/* Crimson USSH-styled slide-out drawer (Image 1 fidelity) */}
      <aside className="relative z-10 w-[85vw] max-w-[390px] h-full bg-[#9B1C1C] text-white flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-white/15 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-serif text-lg font-semibold text-white leading-snug">
              Các ngành học Nhân văn
            </h2>
            <p className="text-xs text-white/75 mt-0.5">
              Phân loại khoa học · 6 khối ngành · 29 ngành đào tạo
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng menu ngành học"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-white/90 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Quick Major Filter inside Drawer */}
        <div className="px-5 py-3 border-b border-white/15 bg-[#8B1717]">
          <label htmlFor="drawer-major-search" className="sr-only">
            Tìm nhanh ngành học
          </label>
          <div className="relative">
            <Search
              className="w-4 h-4 text-white/65 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="drawer-major-search"
              type="text"
              value={majorQuery}
              onChange={(e) => setMajorQuery(e.target.value)}
              placeholder="Tìm nhanh ngành học..."
              className="w-full pl-9 pr-9 py-2 text-sm bg-white/12 text-white placeholder:text-white/70 rounded-lg border border-white/15 focus:outline-none focus:border-white/50 focus:bg-white/18 transition-colors"
            />
            {majorQuery && (
              <button
                type="button"
                onClick={() => setMajorQuery('')}
                aria-label="Xóa từ khóa lọc ngành"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-white/75 hover:text-white"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Scientific Taxonomy Accordion List */}
        <div className="flex-1 overflow-y-auto divide-y divide-white/15">
          {/* All majors row */}
          <button
            type="button"
            onClick={() => {
              onSelectAll();
              onClose();
            }}
            className={`w-full px-5 py-3.5 min-h-[48px] flex items-center justify-between text-left transition-colors ${
              !selectedClusterId && !selectedMajorId
                ? 'bg-[#7A1313] font-semibold text-white'
                : 'hover:bg-white/8 text-white/95'
            }`}
          >
            <span className="text-[15px]">Tất cả các ngành học</span>
            <span className="font-mono text-xs tabular-nums text-white/80">
              {totalPapers} bài
            </span>
          </button>

          {visibleClusters.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-white/80">
              Không tìm thấy ngành học phù hợp với &ldquo;{majorQuery}&rdquo;.
            </div>
          ) : (
            visibleClusters.map((cluster) => {
              const isExpanded =
                Boolean(normalizedSearch) || expandedClusters.includes(cluster.id);
              const isClusterActive =
                selectedClusterId === cluster.id && !selectedMajorId;
              const clusterCount = countsByCluster[cluster.id] ?? 0;

              return (
                <div key={cluster.id}>
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => toggleCluster(cluster.id)}
                    className={`w-full px-5 py-3.5 min-h-[52px] flex items-center justify-between gap-3 text-left transition-colors ${
                      isClusterActive ? 'bg-[#7A1313]' : 'hover:bg-white/8'
                    }`}
                  >
                    <div className="min-w-0">
                      <span className="block text-[15px] font-medium text-white leading-snug">
                        {cluster.indexLabel}. {cluster.name}
                      </span>
                      <span className="block text-xs text-white/70 mt-0.5 tabular-nums">
                        {cluster.majors.length} ngành · {clusterCount} công trình
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown
                        className="w-4 h-4 text-white/85 shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <ChevronLeft
                        className="w-4 h-4 text-white/85 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="bg-[#831515] divide-y divide-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectCluster(cluster.id);
                          onClose();
                        }}
                        className={`w-full pl-8 pr-5 py-2.5 min-h-[44px] flex items-center justify-between text-left text-xs tracking-wide transition-colors ${
                          isClusterActive
                            ? 'bg-[#6F1111] text-white font-semibold'
                            : 'text-white/85 hover:bg-white/8 hover:text-white'
                        }`}
                      >
                        <span>Xem toàn bộ khối {cluster.shortName}</span>
                        <span className="font-mono tabular-nums text-white/75">
                          {clusterCount}
                        </span>
                      </button>

                      {cluster.majors.map((major) => {
                        const isMajorActive = selectedMajorId === major.id;
                        const majorCount = countsByMajor[major.id] ?? 0;
                        return (
                          <button
                            key={major.id}
                            type="button"
                            onClick={() => {
                              onSelectMajor(major.id);
                              onClose();
                            }}
                            className={`w-full pl-8 pr-5 py-2.5 min-h-[44px] flex items-center justify-between gap-3 text-left transition-colors ${
                              isMajorActive
                                ? 'bg-[#6F1111] text-white font-semibold'
                                : 'text-white/90 hover:bg-white/8 hover:text-white'
                            }`}
                          >
                            <div className="min-w-0">
                              <span className="block text-sm leading-snug">
                                {major.name}
                              </span>
                              <span className="block text-[11px] text-white/65 truncate">
                                {major.faculty}
                              </span>
                            </div>
                            <span className="font-mono text-xs tabular-nums text-white/75 shrink-0">
                              {majorCount}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-4 border-t border-white/15 bg-[#861616]">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSubmit();
            }}
            className="w-full min-h-[46px] px-4 py-2.5 bg-white text-[#9B1C1C] hover:bg-stone-100 font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Đăng bài nghiên cứu mới
          </button>
        </div>
      </aside>
    </div>
  );
}
