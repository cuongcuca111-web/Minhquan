export interface UsshMajor {
  id: string;
  name: string;
  code: string;
  faculty: string;
  clusterId: string;
}

export interface AcademicCluster {
  id: string;
  indexLabel: string;
  name: string;
  shortName: string;
  description: string;
  majors: UsshMajor[];
}

export const USSH_CLUSTERS: AcademicCluster[] = [
  {
    id: 'nhan-van-ngon-ngu',
    indexLabel: '01',
    name: 'Khoa học Nhân văn & Ngôn ngữ',
    shortName: 'Nhân văn & Ngôn ngữ',
    description: 'Nghiên cứu văn chương, cấu trúc ngôn ngữ, di sản chữ viết cổ Hán Nôm, văn hóa và nghệ thuật đương đại.',
    majors: [
      { id: 'van-hoc', name: 'Văn học', code: '7229030', faculty: 'Khoa Văn học', clusterId: 'nhan-van-ngon-ngu' },
      { id: 'ngon-ngu-hoc', name: 'Ngôn ngữ học', code: '7229020', faculty: 'Khoa Ngôn ngữ học', clusterId: 'nhan-van-ngon-ngu' },
      { id: 'han-nom', name: 'Hán Nôm', code: '7220104', faculty: 'Khoa Văn học', clusterId: 'nhan-van-ngon-ngu' },
      { id: 'van-hoa-hoc', name: 'Văn hóa học', code: '7229040', faculty: 'Khoa Lịch sử / Văn học', clusterId: 'nhan-van-ngon-ngu' },
      { id: 'dien-anh-nghe-thuat', name: 'Điện ảnh và Nghệ thuật đại chúng', code: '7210241', faculty: 'Khoa Văn học', clusterId: 'nhan-van-ngon-ngu' },
    ],
  },
  {
    id: 'lich-su-triet-hoc',
    indexLabel: '02',
    name: 'Lịch sử, Triết học & Nghiên cứu Văn minh',
    shortName: 'Lịch sử & Triết học',
    description: 'Khảo cứu tiến trình lịch sử, tư tưởng triết học, nhân học văn hóa và đời sống tôn giáo nhân loại.',
    majors: [
      { id: 'lich-su', name: 'Lịch sử', code: '7229010', faculty: 'Khoa Lịch sử', clusterId: 'lich-su-triet-hoc' },
      { id: 'triet-hoc', name: 'Triết học', code: '7229001', faculty: 'Khoa Triết học', clusterId: 'lich-su-triet-hoc' },
      { id: 'nhan-hoc', name: 'Nhân học', code: '7310302', faculty: 'Khoa Nhân học và Tôn giáo học', clusterId: 'lich-su-triet-hoc' },
      { id: 'ton-giao-hoc', name: 'Tôn giáo học', code: '7229009', faculty: 'Khoa Nhân học và Tôn giáo học', clusterId: 'lich-su-triet-hoc' },
    ],
  },
  {
    id: 'bao-chi-truyen-thong',
    indexLabel: '03',
    name: 'Báo chí, Truyền thông & Thông tin',
    shortName: 'Báo chí & Truyền thông',
    description: 'Nghiên cứu báo chí số, truyền thông đa phương tiện, quan hệ công chúng và quản trị tri thức số.',
    majors: [
      { id: 'bao-chi', name: 'Báo chí', code: '7320101', faculty: 'Viện Đào tạo Báo chí và Truyền thông', clusterId: 'bao-chi-truyen-thong' },
      { id: 'quan-he-cong-chung', name: 'Quan hệ công chúng', code: '7320108', faculty: 'Viện Đào tạo Báo chí và Truyền thông', clusterId: 'bao-chi-truyen-thong' },
      { id: 'truyen-thong-da-phuong-tien', name: 'Truyền thông đa phương tiện', code: '7320104', faculty: 'Viện Đào tạo Báo chí và Truyền thông', clusterId: 'bao-chi-truyen-thong' },
      { id: 'thong-tin-thu-vien', name: 'Thông tin – Thư viện', code: '7320201', faculty: 'Khoa Thông tin – Thư viện', clusterId: 'bao-chi-truyen-thong' },
      { id: 'quan-ly-thong-tin', name: 'Quản lý thông tin', code: '7320205', faculty: 'Khoa Thông tin – Thư viện', clusterId: 'bao-chi-truyen-thong' },
    ],
  },
  {
    id: 'xa-hoi-hanh-vi-chinh-sach',
    indexLabel: '04',
    name: 'Khoa học Xã hội, Hành vi & Chính sách',
    shortName: 'Xã hội & Hành vi',
    description: 'Phân tích tâm lý con người, cấu trúc xã hội, công tác cộng đồng, thể chế chính trị và quản lý khoa học.',
    majors: [
      { id: 'tam-ly-hoc', name: 'Tâm lý học', code: '7310401', faculty: 'Khoa Tâm lý học', clusterId: 'xa-hoi-hanh-vi-chinh-sach' },
      { id: 'xa-hoi-hoc', name: 'Xã hội học', code: '7310301', faculty: 'Khoa Xã hội học và Công tác xã hội', clusterId: 'xa-hoi-hanh-vi-chinh-sach' },
      { id: 'cong-tac-xa-hoi', name: 'Công tác xã hội', code: '7760101', faculty: 'Khoa Xã hội học và Công tác xã hội', clusterId: 'xa-hoi-hanh-vi-chinh-sach' },
      { id: 'chinh-tri-hoc', name: 'Chính trị học', code: '7310201', faculty: 'Khoa Khoa học Chính trị', clusterId: 'xa-hoi-hanh-vi-chinh-sach' },
      { id: 'khoa-hoc-quan-ly', name: 'Khoa học quản lý', code: '7340401', faculty: 'Khoa Khoa học Quản lý', clusterId: 'xa-hoi-hanh-vi-chinh-sach' },
    ],
  },
  {
    id: 'khu-vuc-quoc-te',
    indexLabel: '05',
    name: 'Khu vực học & Quan hệ Quốc tế',
    shortName: 'Khu vực & Quốc tế',
    description: 'Nghiên cứu đối ngoại, địa chính trị toàn cầu, văn hóa – xã hội Việt Nam và các quốc gia Châu Á.',
    majors: [
      { id: 'quoc-te-hoc', name: 'Quốc tế học', code: '7310601', faculty: 'Khoa Quốc tế học', clusterId: 'khu-vuc-quoc-te' },
      { id: 'dong-phuong-hoc', name: 'Đông phương học', code: '7310608', faculty: 'Khoa Đông phương học', clusterId: 'khu-vuc-quoc-te' },
      { id: 'dong-nam-a-hoc', name: 'Đông Nam Á học', code: '7310620', faculty: 'Khoa Đông phương học', clusterId: 'khu-vuc-quoc-te' },
      { id: 'viet-nam-hoc', name: 'Việt Nam học', code: '7310630', faculty: 'Khoa Việt Nam học và Tiếng Việt', clusterId: 'khu-vuc-quoc-te' },
      { id: 'han-quoc-hoc', name: 'Hàn Quốc học', code: '7310614', faculty: 'Khoa Đông phương học', clusterId: 'khu-vuc-quoc-te' },
      { id: 'nhat-ban-hoc', name: 'Nhật Bản học', code: '7310613', faculty: 'Khoa Đông phương học', clusterId: 'khu-vuc-quoc-te' },
    ],
  },
  {
    id: 'quan-tri-du-lich-luu-tru',
    indexLabel: '06',
    name: 'Quản trị, Du lịch & Lưu trữ học',
    shortName: 'Du lịch & Quản trị',
    description: 'Phát triển du lịch di sản bền vững, vận hành dịch vụ lưu trú, quản trị hành chính và lưu trữ học hiện đại.',
    majors: [
      { id: 'quan-tri-du-lich', name: 'Quản trị dịch vụ du lịch và lữ hành', code: '7810103', faculty: 'Khoa Du lịch học', clusterId: 'quan-tri-du-lich-luu-tru' },
      { id: 'quan-tri-khach-san', name: 'Quản trị khách sạn', code: '7810201', faculty: 'Khoa Du lịch học', clusterId: 'quan-tri-du-lich-luu-tru' },
      { id: 'quan-tri-van-phong', name: 'Quản trị văn phòng', code: '7340406', faculty: 'Khoa Lưu trữ học và Quản trị văn phòng', clusterId: 'quan-tri-du-lich-luu-tru' },
      { id: 'luu-tru-hoc', name: 'Lưu trữ học', code: '7320303', faculty: 'Khoa Lưu trữ học và Quản trị văn phòng', clusterId: 'quan-tri-du-lich-luu-tru' },
    ],
  },
];

export const ALL_USSH_MAJORS: UsshMajor[] = USSH_CLUSTERS.flatMap((c) => c.majors);

export function findMajorById(majorId: string): UsshMajor | undefined {
  return ALL_USSH_MAJORS.find((m) => m.id === majorId);
}

export function findClusterById(clusterId: string): AcademicCluster | undefined {
  return USSH_CLUSTERS.find((c) => c.id === clusterId);
}
