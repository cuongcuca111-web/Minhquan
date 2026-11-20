import { ArrowUpRight } from 'lucide-react';
import { USSH_CLUSTERS } from '../data/usshTaxonomy';

interface TaxonomyDirectorySectionProps {
  countsByCluster: Record<string, number>;
  countsByMajor: Record<string, number>;
  selectedMajorId: string | null;
  onSelectCluster: (clusterId: string) => void;
  onSelectMajor: (majorId: string) => void;
}

export function TaxonomyDirectorySection({
  countsByCluster,
  countsByMajor,
  selectedMajorId,
  onSelectCluster,
  onSelectMajor,
}: TaxonomyDirectorySectionProps) {
  return (
    <section
      id="danh-muc-nganh-khoa-hoc"
      aria-labelledby="taxonomy-directory-heading"
      className="mt-14 pt-10 border-t border-stone-200"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9B1C1C]">
            Hệ thống phân loại học thuật
          </p>
          <h2
            id="taxonomy-directory-heading"
            className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-[#1A1816]"
          >
            6 khối ngành &amp; 29 ngành đào tạo Trường ĐH Khoa học Xã hội và Nhân văn
          </h2>
        </div>
        <p className="text-sm text-stone-600 max-w-md">
          Chọn trực tiếp khối ngành hoặc ngành học cụ thể để tra cứu các công trình nghiên cứu khoa học sinh viên tương ứng.
        </p>
      </div>

      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {USSH_CLUSTERS.map((cluster) => (
          <div
            key={cluster.id}
            className="bg-white border border-stone-200 rounded-xl p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onSelectCluster(cluster.id)}
                  className="text-left group focus-visible:outline-none focus-visible:underline"
                >
                  <span className="font-mono text-xs text-[#9B1C1C] font-medium">
                    Khối {cluster.indexLabel}
                  </span>
                  <h3 className="mt-0.5 font-serif text-lg font-bold text-[#1A1816] group-hover:text-[#9B1C1C] transition-colors leading-snug">
                    {cluster.name}
                  </h3>
                </button>
                <span className="font-mono text-xs text-stone-500 tabular-nums shrink-0 mt-1">
                  {countsByCluster[cluster.id] ?? 0} bài
                </span>
              </div>

              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                {cluster.description}
              </p>

              <ul className="mt-4 pt-3 border-t border-stone-100 divide-y divide-stone-100">
                {cluster.majors.map((major) => {
                  const count = countsByMajor[major.id] ?? 0;
                  const isActive = selectedMajorId === major.id;
                  return (
                    <li key={major.id}>
                      <button
                        type="button"
                        onClick={() => onSelectMajor(major.id)}
                        className={`w-full py-2 min-h-[40px] flex items-center justify-between gap-2 text-left text-sm transition-colors ${
                          isActive
                            ? 'text-[#9B1C1C] font-semibold'
                            : 'text-stone-700 hover:text-[#9B1C1C]'
                        }`}
                      >
                        <span className="truncate">{major.name}</span>
                        <span className="font-mono text-xs text-stone-400 tabular-nums shrink-0">
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectCluster(cluster.id)}
              className="mt-4 pt-3 border-t border-stone-100 text-xs font-semibold text-[#1E3A5F] hover:text-[#9B1C1C] inline-flex items-center gap-1 transition-colors self-start"
            >
              Xem toàn bộ khối ngành
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
