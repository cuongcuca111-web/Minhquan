import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDownUp,
  BookOpen,
  CheckCircle2,
  Plus,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PaperCard } from './components/PaperCard';
import { PaperDetailModal } from './components/PaperDetailModal';
import { SubmitPaperModal } from './components/SubmitPaperModal';
import { TaxonomyDirectorySection } from './components/TaxonomyDirectorySection';
import { TaxonomyDrawer } from './components/TaxonomyDrawer';
import {
  USSH_CLUSTERS,
  findClusterById,
  findMajorById,
} from './data/usshTaxonomy';
import {
  PaperComment,
  PaperSubmissionInput,
  ResearchPaper,
  SortOption,
} from './types/research';
import {
  countPapersByTaxonomy,
  filterAndSortPapers,
  parseSubmissionToPaper,
} from './utils/researchLogic';
import {
  loadStoredIdList,
  loadStoredPapers,
  saveStoredIdList,
  saveStoredPapers,
} from './utils/storage';

export default function App() {
  const [papers, setPapers] = useState<ResearchPaper[]>(() => loadStoredPapers());
  const [savedIds, setSavedIds] = useState<string[]>(() => loadStoredIdList('saved'));
  const [upvotedIds, setUpvotedIds] = useState<string[]>(() =>
    loadStoredIdList('upvoted')
  );

  // Navigation & filter state
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);
  const [selectedMajorId, setSelectedMajorId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [onlySaved, setOnlySaved] = useState(false);

  // Overlays & modals
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [activePaperId, setActivePaperId] = useState<string | null>(null);
  const [publishNotice, setPublishNotice] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const feedSectionRef = useRef<HTMLElement>(null);

  // Persist papers, bookmarks, and upvotes in localStorage
  useEffect(() => {
    saveStoredPapers(papers);
  }, [papers]);

  useEffect(() => {
    saveStoredIdList('saved', savedIds);
  }, [savedIds]);

  useEffect(() => {
    saveStoredIdList('upvoted', upvotedIds);
  }, [upvotedIds]);

  const taxonomyCounts = useMemo(
    () => countPapersByTaxonomy(papers, USSH_CLUSTERS),
    [papers]
  );

  const filteredPapers = useMemo(
    () =>
      filterAndSortPapers(papers, {
        clusterId: selectedClusterId,
        majorId: selectedMajorId,
        query: searchQuery,
        sortBy,
        onlySaved,
        savedIds,
      }),
    [papers, selectedClusterId, selectedMajorId, searchQuery, sortBy, onlySaved, savedIds]
  );

  const topDiscussedOrUpvoted = useMemo(
    () =>
      [...papers]
        .sort((a, b) => b.upvotes - a.upvotes || b.views - a.views)
        .slice(0, 5),
    [papers]
  );

  const activePaper = useMemo(
    () => papers.find((p) => p.id === activePaperId) ?? null,
    [papers, activePaperId]
  );

  const relatedPapers = useMemo(() => {
    if (!activePaper) return [];
    return papers
      .filter(
        (p) =>
          p.id !== activePaper.id &&
          (p.majorId === activePaper.majorId || p.clusterId === activePaper.clusterId)
      )
      .slice(0, 3);
  }, [papers, activePaper]);

  const activeMajor = selectedMajorId ? findMajorById(selectedMajorId) : undefined;
  const activeCluster = selectedClusterId
    ? findClusterById(selectedClusterId)
    : activeMajor
      ? findClusterById(activeMajor.clusterId)
      : undefined;

  const hasActiveFilters = Boolean(
    selectedClusterId || selectedMajorId || searchQuery.trim() || onlySaved
  );

  const scrollToFeed = () => {
    feedSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleResetHome = () => {
    setSelectedClusterId(null);
    setSelectedMajorId(null);
    setSearchQuery('');
    setSortBy('newest');
    setOnlySaved(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCluster = (clusterId: string) => {
    setSelectedClusterId(clusterId);
    setSelectedMajorId(null);
    setOnlySaved(false);
    scrollToFeed();
  };

  const handleSelectMajor = (majorId: string) => {
    const major = findMajorById(majorId);
    setSelectedMajorId(majorId);
    setSelectedClusterId(major?.clusterId ?? null);
    setOnlySaved(false);
    scrollToFeed();
  };

  const handleSelectFeatured = () => {
    setSelectedClusterId(null);
    setSelectedMajorId(null);
    setOnlySaved(false);
    setSortBy('most-upvoted');
    scrollToFeed();
  };

  const handleToggleSavedOnly = () => {
    setOnlySaved((prev) => !prev);
    scrollToFeed();
  };

  const handleFocusSearch = () => {
    scrollToFeed();
    window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 180);
  };

  const handleOpenPaper = (paperId: string) => {
    setActivePaperId(paperId);
    setPapers((prev) =>
      prev.map((p) => (p.id === paperId ? { ...p, views: p.views + 1 } : p))
    );
  };

  const handleToggleSave = (paperId: string) => {
    setSavedIds((prev) =>
      prev.includes(paperId) ? prev.filter((id) => id !== paperId) : [...prev, paperId]
    );
  };

  const handleToggleUpvote = (paperId: string) => {
    const alreadyUpvoted = upvotedIds.includes(paperId);
    setUpvotedIds((prev) =>
      alreadyUpvoted ? prev.filter((id) => id !== paperId) : [...prev, paperId]
    );
    setPapers((prev) =>
      prev.map((p) =>
        p.id === paperId
          ? { ...p, upvotes: Math.max(0, p.upvotes + (alreadyUpvoted ? -1 : 1)) }
          : p
      )
    );
  };

  const handleAddComment = (
    paperId: string,
    commentInput: Omit<PaperComment, 'id' | 'createdAt'>
  ) => {
    const newComment: PaperComment = {
      id: `cmt-${Date.now()}`,
      authorName: commentInput.authorName,
      authorCohort: commentInput.authorCohort,
      content: commentInput.content,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setPapers((prev) =>
      prev.map((p) =>
        p.id === paperId ? { ...p, comments: [newComment, ...p.comments] } : p
      )
    );
  };

  const handleSubmitPaper = (input: PaperSubmissionInput) => {
    const newPaper = parseSubmissionToPaper(input);
    setPapers((prev) => [newPaper, ...prev]);
    setSelectedClusterId(null);
    setSelectedMajorId(null);
    setOnlySaved(false);
    setSearchQuery('');
    setSortBy('newest');
    setPublishNotice(`Đã xuất bản thành công đề tài "${newPaper.title}".`);
    scrollToFeed();
    window.setTimeout(() => setPublishNotice(null), 6000);
  };

  const activeNavSection: 'home' | 'featured' | 'saved' | 'taxonomy' = onlySaved
    ? 'saved'
    : selectedMajorId || selectedClusterId
      ? 'taxonomy'
      : sortBy === 'most-upvoted'
        ? 'featured'
        : 'home';

  const leadPaper =
    !hasActiveFilters && filteredPapers.length > 0 ? filteredPapers[0] : null;
  const gridPapers = leadPaper ? filteredPapers.slice(1) : filteredPapers;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] text-[#1A1816] pb-16 lg:pb-0">
      <Header
        activeSection={activeNavSection}
        savedCount={savedIds.length}
        onResetHome={handleResetHome}
        onSelectFeatured={handleSelectFeatured}
        onToggleSavedOnly={handleToggleSavedOnly}
        onOpenTaxonomyDrawer={() => setIsDrawerOpen(true)}
        onOpenSubmitModal={() => setIsSubmitOpen(true)}
        onFocusSearch={handleFocusSearch}
      />

      <HeroBanner
        totalPapers={papers.length}
        onOpenTaxonomy={() => setIsDrawerOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Publish Confirmation Banner */}
        {publishNotice && (
          <div
            role="status"
            className="mb-6 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-sm text-emerald-900"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
              <span className="font-medium truncate">{publishNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setPublishNotice(null)}
              aria-label="Ẩn thông báo"
              className="p-1 text-emerald-800 hover:text-emerald-950 shrink-0"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Filter, Search & Scientific Cluster Ribbon */}
        <section
          ref={feedSectionRef}
          aria-label="Tìm kiếm và lọc bài nghiên cứu"
          className="space-y-4"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            {/* Search Box */}
            <div className="relative flex-1">
              <label htmlFor="research-search-input" className="sr-only">
                Tìm kiếm bài nghiên cứu theo tên đề tài, tác giả, giảng viên hoặc từ khóa
              </label>
              <Search
                className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                ref={searchInputRef}
                id="research-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên đề tài, tác giả, giảng viên hướng dẫn hoặc từ khóa..."
                className="w-full min-h-[44px] pl-10 pr-9 py-2 text-sm bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-[#9B1C1C] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Xóa từ khóa tìm kiếm"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Sort Select & Majors Drawer Trigger */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative flex items-center">
                <ArrowDownUp
                  className="w-4 h-4 text-stone-500 absolute left-3 pointer-events-none"
                  aria-hidden="true"
                />
                <label htmlFor="sort-papers-select" className="sr-only">
                  Sắp xếp danh sách bài nghiên cứu
                </label>
                <select
                  id="sort-papers-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="min-h-[44px] pl-9 pr-8 py-2 text-sm bg-white border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:border-[#9B1C1C]"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="most-upvoted">Đề cử nhiều nhất</option>
                  <option value="most-viewed">Xem nhiều nhất</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="min-h-[44px] px-3.5 py-2 bg-[#9B1C1C] hover:bg-[#7F1616] text-white text-sm font-medium rounded-lg inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
              >
                <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                <span>Chọn ngành</span>
              </button>
            </div>
          </div>

          {/* Interactive Cluster Filter Tabs */}
          <div
            role="tablist"
            aria-label="Lọc nhanh theo 6 khối ngành khoa học"
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 border-b border-stone-200"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!selectedClusterId && !selectedMajorId && !onlySaved}
              onClick={() => {
                setSelectedClusterId(null);
                setSelectedMajorId(null);
                setOnlySaved(false);
              }}
              className={`min-h-[40px] px-3.5 py-2 text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                !selectedClusterId && !selectedMajorId && !onlySaved
                  ? 'border-[#9B1C1C] text-[#9B1C1C]'
                  : 'border-transparent text-stone-600 hover:text-stone-950'
              }`}
            >
              Tất cả ({papers.length})
            </button>

            {USSH_CLUSTERS.map((cluster) => {
              const isSelected = selectedClusterId === cluster.id && !onlySaved;
              return (
                <button
                  key={cluster.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectCluster(cluster.id)}
                  className={`min-h-[40px] px-3.5 py-2 text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                    isSelected
                      ? 'border-[#9B1C1C] text-[#9B1C1C]'
                      : 'border-transparent text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {cluster.shortName} ({taxonomyCounts.byCluster[cluster.id] ?? 0})
                </button>
              );
            })}
          </div>

          {/* Active Filter Status Strip */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center justify-between gap-3 py-2 text-sm">
              <div className="text-stone-700">
                Đang hiển thị{' '}
                <strong className="font-mono font-semibold text-stone-950 tabular-nums">
                  {filteredPapers.length}
                </strong>{' '}
                công trình
                {onlySaved && ' trong danh sách Đã lưu'}
                {activeMajor
                  ? ` thuộc ngành ${activeMajor.name} (${activeMajor.faculty})`
                  : activeCluster
                    ? ` thuộc khối ${activeCluster.name}`
                    : ''}
                {searchQuery.trim() ? ` cho từ khóa "${searchQuery.trim()}"` : ''}.
              </div>
              <button
                type="button"
                onClick={handleResetHome}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9B1C1C] hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Xóa bộ lọc
              </button>
            </div>
          )}
        </section>

        {/* Main 3-Tier News Editorial Layout */}
        <section aria-label="Danh sách bài nghiên cứu khoa học sinh viên" className="mt-6">
          {filteredPapers.length === 0 ? (
            <div className="bg-white border border-stone-200 rounded-xl px-6 py-12 text-center max-w-2xl mx-auto">
              <BookOpen
                className="w-9 h-9 text-stone-400 mx-auto mb-3"
                aria-hidden="true"
              />
              <h2 className="font-serif text-xl font-bold text-[#1A1816]">
                {onlySaved
                  ? 'Bạn chưa lưu công trình nghiên cứu nào'
                  : 'Chưa có công trình nào khớp với bộ lọc hiện tại'}
              </h2>
              <p className="mt-2 text-sm text-stone-600 max-w-md mx-auto">
                {onlySaved
                  ? 'Nhấn biểu tượng lưu trên mỗi bài viết để xây dựng thư viện tài liệu tham khảo cá nhân.'
                  : activeMajor
                    ? `Ngành ${activeMajor.name} hiện chưa có bài đăng mới. Bạn có thể là sinh viên đầu tiên chia sẻ công trình của ngành này!`
                    : 'Thử thay đổi từ khóa tìm kiếm hoặc chọn một khối ngành khác trong danh mục.'}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleResetHome}
                  className="min-h-[44px] px-4 py-2 text-sm font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                >
                  Xem tất cả bài viết
                </button>
                <button
                  type="button"
                  onClick={() => setIsSubmitOpen(true)}
                  className="min-h-[44px] px-4 py-2 text-sm font-semibold text-white bg-[#9B1C1C] hover:bg-[#7F1616] rounded-lg inline-flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  Đăng bài cho ngành này
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Tier 1: Lead Story (when viewing main feed without narrowing filter) */}
              {leadPaper && (
                <PaperCard
                  paper={leadPaper}
                  variant="lead"
                  isSaved={savedIds.includes(leadPaper.id)}
                  isUpvoted={upvotedIds.includes(leadPaper.id)}
                  onOpenPaper={handleOpenPaper}
                  onToggleSave={handleToggleSave}
                  onToggleUpvote={handleToggleUpvote}
                />
              )}

              {/* Tier 2 + Tier 3 Asymmetric Desktop Editorial Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Main Grid Feed */}
                <div className="lg:col-span-8">
                  <div className="flex items-center justify-between pb-3 mb-5 border-b border-stone-200">
                    <h2 className="font-serif text-xl font-bold text-[#1A1816]">
                      {onlySaved
                        ? 'Thư viện bài nghiên cứu đã lưu'
                        : activeMajor
                          ? `Nghiên cứu ngành ${activeMajor.name}`
                          : activeCluster
                            ? `Khối ${activeCluster.name}`
                            : 'Công trình sinh viên mới đăng tải'}
                    </h2>
                    <span className="font-mono text-xs text-stone-500 tabular-nums">
                      {gridPapers.length} bài viết
                    </span>
                  </div>

                  <div
                    data-testid="papers-grid"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  >
                    {gridPapers.map((paper) => (
                      <PaperCard
                        key={paper.id}
                        paper={paper}
                        variant="grid"
                        isSaved={savedIds.includes(paper.id)}
                        isUpvoted={upvotedIds.includes(paper.id)}
                        onOpenPaper={handleOpenPaper}
                        onToggleSave={handleToggleSave}
                        onToggleUpvote={handleToggleUpvote}
                      />
                    ))}
                  </div>
                </div>

                {/* Tier 3: Editorial Sidebar — Đề cử nổi bật & Truy cập nhanh ngành học */}
                <aside
                  aria-label="Nghiên cứu được đề cử nhiều nhất"
                  className="lg:col-span-4 space-y-6"
                >
                  <div className="bg-white border border-stone-200 rounded-xl p-5">
                    <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                      <h2 className="font-serif text-lg font-bold text-[#1A1816]">
                        Đề cử nổi bật
                      </h2>
                      <span className="text-xs text-stone-500">Top 5</span>
                    </div>
                    <div className="mt-4 divide-y divide-stone-100">
                      {topDiscussedOrUpvoted.map((paper) => (
                        <PaperCard
                          key={`side-${paper.id}`}
                          paper={paper}
                          variant="compact"
                          isSaved={savedIds.includes(paper.id)}
                          isUpvoted={upvotedIds.includes(paper.id)}
                          onOpenPaper={handleOpenPaper}
                          onToggleSave={handleToggleSave}
                          onToggleUpvote={handleToggleUpvote}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Call to Submit Editorial Box */}
                  <div className="bg-[#9B1C1C] text-white rounded-xl p-5 sm:p-6">
                    <p className="text-xs uppercase tracking-[0.12em] text-white/75 font-medium">
                      Dành cho sinh viên Nhân văn
                    </p>
                    <h3 className="mt-1.5 font-serif text-xl font-bold text-white leading-snug">
                      Chia sẻ công trình NCKH của bạn đến cộng đồng 29 ngành học
                    </h3>
                    <p className="mt-2 text-sm text-white/85 leading-relaxed">
                      Đăng tóm tắt, phương pháp, kết quả nghiên cứu và nhận góp ý phản biện từ sinh viên các khoa bạn.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitOpen(true)}
                      className="mt-4 w-full min-h-[44px] px-4 py-2.5 bg-white text-[#9B1C1C] hover:bg-stone-100 text-sm font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                      Đăng bài nghiên cứu ngay
                    </button>
                  </div>
                </aside>
              </div>
            </div>
          )}
        </section>

        {/* Scientific 6-Cluster / 29-Major Directory */}
        <TaxonomyDirectorySection
          countsByCluster={taxonomyCounts.byCluster}
          countsByMajor={taxonomyCounts.byMajor}
          selectedMajorId={selectedMajorId}
          onSelectCluster={handleSelectCluster}
          onSelectMajor={handleSelectMajor}
        />
      </main>

      {/* Quiet Institutional Footer */}
      <footer className="mt-14 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-serif text-base font-bold text-[#9B1C1C]">
              Nhóm 6 Tư Duy Sáng Tạo
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Cổng chia sẻ Nghiên cứu Khoa học Sinh viên — Phân loại theo 29 ngành đào tạo Trường ĐH Khoa học Xã hội và Nhân văn.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-stone-600">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="hover:text-[#9B1C1C] transition-colors"
            >
              Danh mục 29 ngành học
            </button>
            <button
              type="button"
              onClick={() => setIsSubmitOpen(true)}
              className="hover:text-[#9B1C1C] transition-colors"
            >
              Đăng bài nghiên cứu
            </button>
            <button
              type="button"
              onClick={handleResetHome}
              className="hover:text-[#9B1C1C] transition-colors"
            >
              Về đầu trang
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Thumb-Zone Navigation (56px height) */}
      <MobileBottomNav
        activeTab={
          onlySaved ? 'saved' : isDrawerOpen ? 'taxonomy' : 'home'
        }
        savedCount={savedIds.length}
        onHome={handleResetHome}
        onOpenTaxonomy={() => setIsDrawerOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onToggleSaved={handleToggleSavedOnly}
      />

      {/* Crimson USSH Majors Drawer (Image 1) */}
      <TaxonomyDrawer
        isOpen={isDrawerOpen}
        selectedClusterId={selectedClusterId}
        selectedMajorId={selectedMajorId}
        totalPapers={papers.length}
        countsByCluster={taxonomyCounts.byCluster}
        countsByMajor={taxonomyCounts.byMajor}
        onClose={() => setIsDrawerOpen(false)}
        onSelectAll={() => {
          setSelectedClusterId(null);
          setSelectedMajorId(null);
          setOnlySaved(false);
        }}
        onSelectCluster={handleSelectCluster}
        onSelectMajor={handleSelectMajor}
        onOpenSubmit={() => setIsSubmitOpen(true)}
      />

      {/* Full Academic Article Reader Modal */}
      <PaperDetailModal
        paper={activePaper}
        relatedPapers={relatedPapers}
        isSaved={activePaper ? savedIds.includes(activePaper.id) : false}
        isUpvoted={activePaper ? upvotedIds.includes(activePaper.id) : false}
        onClose={() => setActivePaperId(null)}
        onToggleSave={handleToggleSave}
        onToggleUpvote={handleToggleUpvote}
        onAddComment={handleAddComment}
        onSelectPaper={handleOpenPaper}
        onFilterByMajor={handleSelectMajor}
      />

      {/* Publish Research Paper Modal */}
      <SubmitPaperModal
        isOpen={isSubmitOpen}
        defaultMajorId={selectedMajorId}
        onClose={() => setIsSubmitOpen(false)}
        onSubmitPaper={handleSubmitPaper}
      />
    </div>
  );
}
