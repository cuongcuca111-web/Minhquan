import { ResearchPaper } from '../types/research';

export const COVER_PRESETS = [
  {
    id: 'campus',
    label: 'Khuôn viên Đại học Nhân văn',
    url: '/src/assets/images/hero_ussh_campus_science_1795187590297.jpg',
  },
  {
    id: 'media',
    label: 'Phòng thực hành Báo chí & Truyền thông',
    url: '/src/assets/images/research_media_journalism_1795187590373.jpg',
  },
  {
    id: 'heritage',
    label: 'Tư liệu Hán Nôm & Lịch sử',
    url: '/src/assets/images/research_history_heritage_1795187587832.jpg',
  },
  {
    id: 'psychology',
    label: 'Thảo luận nhóm Tâm lý & Xã hội học',
    url: '/src/assets/images/research_psychology_campus_1795187589268.jpg',
  },
  {
    id: 'tourism',
    label: 'Không gian Di sản Phố cổ Hà Nội',
    url: '/src/assets/images/research_tourism_culture_1795187588609.jpg',
  },
  {
    id: 'forum',
    label: 'Hội nghị Khoa học Sinh viên Quốc tế',
    url: '/src/assets/images/research_international_forum_1795187591838.jpg',
  },
];

export const SEED_PAPERS: ResearchPaper[] = [
  {
    id: 'nckh-2026-001',
    title: 'Tác động của báo chí dữ liệu tương tác đến mức độ tin cậy thông tin khoa học của độc giả trẻ tại Hà Nội',
    majorId: 'bao-chi',
    clusterId: 'bao-chi-truyen-thong',
    authors: 'Nguyễn Thảo Linh, Trần Đức Minh',
    cohort: 'K67 Báo chí CLC',
    advisor: 'PGS.TS. Đặng Thị Thu Hương',
    academicYear: '2025–2026',
    award: 'Giải Nhất NCKH Sinh viên cấp Trường',
    abstract:
      'Nghiên cứu khảo sát 640 sinh viên đại học tại Hà Nội nhằm đánh giá vai trò của hình thức báo chí dữ liệu tương tác (interactive data journalism) trong việc nâng cao khả năng kiểm chứng và niềm tin vào tin tức khoa học giữa bối cảnh tin giả do AI tạo sinh lan rộng.',
    sections: [
      {
        heading: '1. Đặt vấn đề và cơ sở lý thuyết',
        body: 'Trong giai đoạn 2024–2026, thói quen tiếp nhận thông tin của nhóm độc giả Gen Z chuyển dịch mạnh sang các nền tảng video ngắn và tin tổng hợp nhanh. Điều này làm gia tăng nguy cơ tiếp xúc với thông tin sai lệch về y tế, khí hậu và chính sách công. Báo chí dữ liệu tương tác — kết hợp trực quan hóa minh bạch nguồn số liệu và khả năng tự tra cứu của người đọc — được giả thuyết là công cụ củng cố niềm tin báo chí chính thống.',
      },
      {
        heading: '2. Phương pháp nghiên cứu',
        body: 'Nhóm nghiên cứu sử dụng phương pháp hỗn hợp gồm thực nghiệm so sánh nhóm đối chứng (A/B reading experiment) trên 640 sinh viên tại 6 trường đại học khu vực Hà Nội và 24 cuộc phỏng vấn sâu với phóng viên dữ liệu tại các tòa soạn điện tử lớn.',
      },
      {
        heading: '3. Kết quả nổi bật và kiến nghị',
        body: 'Nhóm độc giả tiếp xúc bài báo có biểu đồ tương tác kèm trích dẫn bộ dữ liệu gốc đạt điểm tin cậy cao hơn 31,4% so với nhóm đọc văn bản thuần túy, đồng thời tỷ lệ ghi nhớ thông số cốt lõi sau 7 ngày tăng gấp 1,8 lần. Nghiên cứu đề xuất bộ tiêu chuẩn 5 bước thiết kế tuyến bài dữ liệu tối ưu cho màn hình di động tại các tòa soạn Việt Nam.',
      },
    ],
    references: [
      'Bradshaw, P. (2023). The Online Journalism Handbook: Skills to Survive and Thrive in the Digital Age. Routledge.',
      'Nguyễn Văn Dững (2022). Truyền thông đại chúng trong kỷ nguyên chuyển đổi số. NXB Đại học Quốc gia Hà Nội.',
    ],
    keywords: ['Báo chí dữ liệu', 'Độc giả trẻ', 'Kiểm chứng thông tin', 'Truyền thông số'],
    coverImage: '/src/assets/images/research_media_journalism_1795187590373.jpg',
    coverCaption: 'Hình 1. Sinh viên Viện Đào tạo Báo chí và Truyền thông phân tích bố cục bài báo dữ liệu đa phương tiện.',
    publishedAt: '2026-11-16',
    views: 1284,
    upvotes: 96,
    featured: true,
    comments: [
      {
        id: 'cmt-1',
        authorName: 'Lê Hoàng Nam',
        authorCohort: 'K68 Truyền thông đa phương tiện',
        content: 'Phương pháp thực nghiệm A/B của nhóm rất thuyết phục. Mình đặc biệt ấn tượng với kết quả về mức độ ghi nhớ sau 7 ngày.',
        createdAt: '2026-11-17',
      },
    ],
  },
  {
    id: 'nckh-2026-002',
    title: 'Số hóa và phân loại hệ thống văn bia thời Lê Trung Hưng tại khu vực ven đô Hà Nội bằng mô hình học máy hỗ trợ nhận diện chữ Nôm',
    majorId: 'han-nom',
    clusterId: 'nhan-van-ngon-ngu',
    authors: 'Phạm Quỳnh Chi, Vũ Hải Đăng',
    cohort: 'K67 Hán Nôm',
    advisor: 'TS. Nguyễn Tuấn Cường',
    academicYear: '2025–2026',
    award: 'Giải Nhất cấp Khoa Văn học',
    abstract:
      'Đề tài tiến hành khảo sát điền dã 48 thác bản văn bia làng xã thế kỷ XVII–XVIII tại huyện Hoài Đức và Đông Anh, kết hợp quy trình chuẩn hóa siêu dữ liệu Hán Nôm và thử nghiệm công cụ OCR chữ Nôm mã nguồn mở để xây dựng kho tra cứu trực tuyến phục vụ bảo tồn di sản viết.',
    sections: [
      {
        heading: '1. Tổng quan nguồn tư liệu văn bia',
        body: 'Hệ thống văn bia hậu thần và hương ước thời Lê Trung Hưng chứa đựng nhiều tư liệu quý về kinh tế nông thôn, địa danh cổ và cấu trúc dòng họ vùng Bắc Bộ. Tuy nhiên, quá trình đô thị hóa nhanh đang khiến nhiều tấm bia bị phong hóa mạnh hoặc thất lạc ngữ cảnh gốc.',
      },
      {
        heading: '2. Quy trình điền dã và mã hóa siêu dữ liệu',
        body: 'Nhóm đã áp dụng kỹ thuật chụp ảnh đa góc ánh sáng nghiêng (RTI cơ bản) kết hợp rập thác bản truyền thống, sau đó gắn thẻ XML theo chuẩn TEI cho 48 văn bản, ghi nhận hơn 1.400 dị thể chữ Nôm địa phương.',
      },
      {
        heading: '3. Đóng góp học thuật',
        body: 'Bộ dữ liệu mở gồm ảnh độ phân giải cao, phiên âm và dịch nghĩa giúp rút ngắn 40% thời gian tra cứu đối chiếu cho sinh viên và nhà nghiên cứu lịch sử – ngôn ngữ.',
      },
    ],
    references: [
      'Phan Văn Các (2019). Giáo trình Hán Nôm cơ sở. NXB Đại học Quốc gia Hà Nội.',
      'Viện Nghiên cứu Hán Nôm (2021). Tổng tập Thác bản văn bia Việt Nam.',
    ],
    keywords: ['Hán Nôm', 'Văn bia Lê Trung Hưng', 'Nhân văn số', 'Bảo tồn di sản'],
    coverImage: '/src/assets/images/research_history_heritage_1795187587832.jpg',
    coverCaption: 'Hình 1. Tư liệu cổ bản và sổ ghi chép khảo cứu chữ Hán Nôm tại phòng đọc chuyên ngành.',
    publishedAt: '2026-11-14',
    views: 942,
    upvotes: 84,
    comments: [],
  },
  {
    id: 'nckh-2026-003',
    title: 'Mối tương quan giữa áp lực đồng trang lứa trên mạng xã hội và hiện tượng kiệt sức học đường ở sinh viên năm nhất khối ngành Khoa học Xã hội',
    majorId: 'tam-ly-hoc',
    clusterId: 'xa-hoi-hanh-vi-chinh-sach',
    authors: 'Đỗ Khánh Huyền',
    cohort: 'K68 Tâm lý học CLC',
    advisor: 'TS. Bùi Thị Hồng Thái',
    academicYear: '2025–2026',
    award: 'Giải Nhì NCKH Sinh viên cấp Trường',
    abstract:
      'Sử dụng thang đo MBI-SS và thang đo so sánh xã hội trực tuyến trên mẫu 512 sinh viên năm nhất, nghiên cứu chỉ ra cơ chế trung gian của lòng tự trọng học thuật trong mối quan hệ giữa việc tiếp xúc nội dung "thành tích hoàn hảo" trên mạng xã hội và tình trạng kiệt sức tinh thần.',
    sections: [
      {
        heading: '1. Bối cảnh nghiên cứu',
        body: 'Chuyển tiếp từ trung học phổ thông sang môi trường đại học đòi hỏi năng lực tự chủ cao. Việc liên tục so sánh bản thân với hình ảnh thành công được chọn lọc trên mạng xã hội khiến nhiều sinh viên năm nhất rơi vào trạng thái lo âu thành tích và giảm động lực nội tại.',
      },
      {
        heading: '2. Mẫu khảo sát và phân tích dữ liệu',
        body: 'Dữ liệu định lượng từ 512 phiếu hợp lệ được phân tích bằng mô hình phương trình cấu trúc (SEM), bổ trợ bằng 15 buổi thảo luận nhóm tập trung nhằm hiểu sâu các chiến lược ứng phó lành mạnh của sinh viên.',
      },
      {
        heading: '3. Hàm ý tham vấn tâm lý học đường',
        body: 'Nghiên cứu đề xuất mô hình nhóm hỗ trợ đồng đẳng (peer-support circles) và chuỗi workshop quản trị năng lượng học tập ngay từ học kỳ đầu tiên tại các trường đại học.',
      },
    ],
    references: [
      'Schaufeli, W. B., et al. (2002). Burnout and engagement in university students. Journal of Cross-Cultural Psychology.',
      'Trần Thị Minh Đức (2020). Tâm lý học xã hội. NXB Đại học Quốc gia Hà Nội.',
    ],
    keywords: ['Tâm lý học đường', 'Kiệt sức học tập', 'Áp lực đồng trang lứa', 'Sinh viên năm nhất'],
    coverImage: '/src/assets/images/research_psychology_campus_1795187589268.jpg',
    coverCaption: 'Hình 1. Nhóm sinh viên Khoa Tâm lý học trao đổi kết quả phân tích phiếu khảo sát tại thư viện.',
    publishedAt: '2026-11-12',
    views: 1105,
    upvotes: 112,
    comments: [
      {
        id: 'cmt-2',
        authorName: 'Trịnh Bảo Ngọc',
        authorCohort: 'K69 Công tác xã hội',
        content: 'Đề tài rất sát thực tế với sinh viên năm nhất! Hy vọng nhóm chia sẻ thêm phụ lục bộ công cụ tự đánh giá.',
        createdAt: '2026-11-15',
      },
    ],
  },
  {
    id: 'nckh-2026-004',
    title: 'Phát triển sản phẩm du lịch đi bộ kể chuyện di sản (Heritage Storytelling Walk) tại khu Phố cổ Hà Nội gắn với sinh kế cộng đồng bản địa',
    majorId: 'quan-tri-du-lich',
    clusterId: 'quan-tri-du-lich-luu-tru',
    authors: 'Hoàng Gia Bảo, Ngô Phương Anh',
    cohort: 'K67 Quản trị Dịch vụ Du lịch và Lữ hành',
    advisor: 'TS. Trịnh Lê Anh',
    academicYear: '2025–2026',
    award: 'Giải Nhì cấp Khoa Du lịch học',
    abstract:
      'Trên cơ sở khảo sát 32 hộ nghệ nhân và tiểu thương tại các tuyến phố Hàng Bạc, Lãn Ông và Hàng Mã, nghiên cứu thiết kế tuyến du lịch đi bộ trải nghiệm kéo dài 3 giờ giúp du khách quốc tế tương tác trực tiếp với ký ức nghề truyền thống thay vì chỉ tham quan bề mặt.',
    sections: [
      {
        heading: '1. Thực trạng khai thác du lịch Phố cổ',
        body: 'Khu Phố cổ Hà Nội thu hút hàng triệu lượt khách mỗi năm nhưng phần lớn thời gian lưu trú tập trung vào ẩm thực đường phố và mua sắm đại trà, chưa tạo ra nguồn thu bền vững cho các gia đình gìn giữ nghề thủ công cổ truyền.',
      },
      {
        heading: '2. Thiết kế hành trình kể chuyện di sản',
        body: 'Nhóm xây dựng 4 điểm chạm trải nghiệm kết hợp bản đồ âm thanh song ngữ Việt – Anh và cơ chế chia sẻ doanh thu minh bạch (35% giá vé hoàn trả trực tiếp cho nghệ nhân tham gia đón tiếp).',
      },
      {
        heading: '3. Đánh giá thử nghiệm',
        body: 'Qua 6 tour thử nghiệm với 78 khách quốc tế, điểm hài lòng trung bình đạt 4,82/5,0 và 91% khách bày tỏ sẵn sàng chi trả cao hơn cho các sản phẩm du lịch có đóng góp trực tiếp cho cộng đồng địa phương.',
      },
    ],
    references: [
      'UNWTO (2023). Cultural Tourism and Local Community Resilience Guidelines.',
      'Phạm Trương Hoàng (2021). Quản trị điểm đến du lịch bền vững. NXB ĐHQGHN.',
    ],
    keywords: ['Du lịch di sản', 'Phố cổ Hà Nội', 'Du lịch bền vững', 'Cộng đồng bản địa'],
    coverImage: '/src/assets/images/research_tourism_culture_1795187588609.jpg',
    coverCaption: 'Hình 1. Không gian kiến trúc và sinh hoạt thương mại truyền thống tại khu vực Phố cổ Hà Nội.',
    publishedAt: '2026-11-10',
    views: 876,
    upvotes: 79,
    comments: [],
  },
  {
    id: 'nckh-2026-005',
    title: 'Ngoại giao văn hóa thông qua công nghiệp sáng tạo của Hàn Quốc và Nhật Bản tại Đông Nam Á: Bài học chính sách cho Việt Nam giai đoạn 2025–2035',
    majorId: 'quoc-te-hoc',
    clusterId: 'khu-vuc-quoc-te',
    authors: 'Bùi Minh Quân, Đinh Thu Trang',
    cohort: 'K67 Quốc tế học CLC',
    advisor: 'PGS.TS. Bùi Thành Nam',
    academicYear: '2025–2026',
    award: 'Công trình tiêu biểu Hội nghị SV NCKH',
    abstract:
      'Phân tích so sánh mô hình phối hợp công – tư trong chiến lược quyền lực mềm của Hàn Quốc (KOCCA) và Nhật Bản (Cool Japan) tại thị trường ASEAN, từ đó rút ra khung khuyến nghị về bản quyền, nhân lực sáng tạo và quảng bá bản sắc Việt Nam ra khu vực.',
    sections: [
      {
        heading: '1. Quyền lực mềm trong quan hệ quốc tế đương đại',
        body: 'Từ lý thuyết quyền lực mềm của Joseph Nye, công nghiệp văn hóa đã trở thành trụ cột chiến lược giúp các quốc gia tầm trung mở rộng ảnh hưởng ngoại giao và gia tăng giá trị xuất khẩu dịch vụ.',
      },
      {
        heading: '2. So sánh mô hình KOCCA và Cool Japan tại ASEAN',
        body: 'Nghiên cứu đối chiếu cơ chế tài trợ sản xuất, hệ sinh thái phân phối số xuyên biên giới và chiến lược bản địa hóa nội dung của hai nền văn hóa lớn tại 5 quốc gia Đông Nam Á.',
      },
      {
        heading: '3. Khuyến nghị cho chiến lược ngoại giao văn hóa Việt Nam',
        body: 'Nhóm đề xuất tập trung vào 3 mũi nhọn có lợi thế cạnh tranh: ẩm thực đương đại, điện ảnh độc lập và thiết kế thủ công mỹ nghệ gắn với câu chuyện di sản.',
      },
    ],
    references: [
      'Nye, J. S. (2021). Soft Power: The Evolution of a Concept. Journal of Political Power.',
      'Bộ Văn hóa, Thể thao và Du lịch (2024). Chiến lược phát triển các ngành công nghiệp văn hóa Việt Nam.',
    ],
    keywords: ['Ngoại giao văn hóa', 'Quyền lực mềm', 'ASEAN', 'Công nghiệp sáng tạo'],
    coverImage: '/src/assets/images/research_international_forum_1795187591838.jpg',
    coverCaption: 'Hình 1. Phiên trình bày chuyên đề Quan hệ Quốc tế tại Hội nghị Khoa học Sinh viên.',
    publishedAt: '2026-11-08',
    views: 763,
    upvotes: 68,
    comments: [],
  },
  {
    id: 'nckh-2026-006',
    title: 'Biến đổi cấu trúc từ vựng tiếng Việt trên không gian mạng của giới trẻ giai đoạn 2021–2026 dưới góc nhìn Ngôn ngữ học xã hội',
    majorId: 'ngon-ngu-hoc',
    clusterId: 'nhan-van-ngon-ngu',
    authors: 'Lương Ngọc Diệp',
    cohort: 'K68 Ngôn ngữ học',
    advisor: 'PGS.TS. Trịnh Cẩm Lan',
    academicYear: '2025–2026',
    abstract:
      'Thu thập và phân tích khối ngữ liệu gồm 18.500 bình luận công khai trên các diễn đàn học sinh – sinh viên nhằm phân loại cơ chế cấu tạo từ lóng mới, hiện tượng chuyển mã Việt – Anh và tác động của chúng tới thái độ ngôn ngữ liên thế hệ.',
    sections: [
      {
        heading: '1. Đặc trưng khối ngữ liệu mạng xã hội',
        body: 'Ngôn ngữ trên môi trường số vận động với tốc độ nhanh hơn nhiều so với ngôn ngữ viết truyền thống. Khối ngữ liệu được làm sạch, ẩn danh hoàn toàn và gán nhãn theo 4 cơ chế biến đổi: viết tắt, phái sinh ngữ nghĩa, vay mượn chuyển mã và chơi chữ âm vị.',
      },
      {
        heading: '2. Kết quả phân loại chính',
        body: 'Có đến 42% biểu thức mới mang tính ngắn hạn (vòng đời dưới 8 tháng), nhưng khoảng 14% đã thẩm thấu vào giao tiếp khẩu ngữ thường nhật nhờ tính biểu cảm cao và khả năng nén thông tin nhanh.',
      },
      {
        heading: '3. Nhận định về chuẩn mực tiếng Việt',
        body: 'Thay vì nhìn nhận đơn tuyến như sự "lệch chuẩn", nghiên cứu đề xuất cách tiếp cận đa phong cách: khuyến khích năng lực chuyển đổi linh hoạt giữa ngôn ngữ giao tiếp mạng và ngôn ngữ học thuật chuẩn mực.',
      },
    ],
    references: [
      'Nguyễn Văn Hiệp (2022). Ngôn ngữ học xã hội và biến đổi ngôn ngữ đô thị. NXB Khoa học Xã hội.',
      'Crystal, D. (2011). Internet Linguistics: A Student Guide. Routledge.',
    ],
    keywords: ['Ngôn ngữ học xã hội', 'Tiếng Việt đương đại', 'Chuyển mã', 'Ngữ liệu số'],
    coverImage: '/src/assets/images/hero_ussh_campus_science_1795187590297.jpg',
    coverCaption: 'Hình 1. Không gian học thuật mở tại khuôn viên Trường Đại học Khoa học Xã hội và Nhân văn.',
    publishedAt: '2026-11-05',
    views: 689,
    upvotes: 61,
    comments: [],
  },
  {
    id: 'nckh-2026-007',
    title: 'Đạo đức công nghệ và khái niệm "tự do ý chí" trong kỷ nguyên thuật toán gợi ý: Tiếp cận từ Triết học hiện đại',
    majorId: 'triet-hoc',
    clusterId: 'lich-su-triet-hoc',
    authors: 'Nguyễn Hải Sơn',
    cohort: 'K67 Triết học',
    advisor: 'TS. Trần Thị Điểu',
    academicYear: '2025–2026',
    abstract:
      'Bài viết đối thoại giữa quan niệm tự chủ lý tính của Immanuel Kant và lý thuyết xã hội kiểm soát đương đại để phân tích cách các hệ thống thuật toán đề xuất định hình lựa chọn hàng ngày của cá nhân mà không cần cưỡng chế hữu hình.',
    sections: [
      {
        heading: '1. Tự do ý chí trước kiến trúc lựa chọn thuật toán',
        body: 'Khi thuật toán dự đoán sở thích nhanh hơn quá trình tự phản tư của con người, ranh giới giữa mong muốn tự thân và mong muốn được điều hướng trở nên mờ nhạt.',
      },
      {
        heading: '2. Phân tích từ triết học đạo đức Kant',
        body: 'Nếu con người bị giản lược thành tập hợp dữ liệu hành vi phục vụ tối ưu hóa thời gian giữ chân, nguyên tắc "coi con người là mục đích tự thân" đang đối mặt với thách thức mang tính hệ thống.',
      },
      {
        heading: '3. Khung nguyên tắc thiết kế nhân văn',
        body: 'Nghiên cứu đề xuất 3 tiêu chí minh bạch đạo đức cho nền tảng số: quyền giải thích thuật toán, quyền tắt cá nhân hóa sâu và thiết kế khoảng dừng phản tư cho người dùng.',
      },
    ],
    references: [
      'Kant, I. (1785/2012). Groundwork of the Metaphysics of Morals. Cambridge University Press.',
      'Floridi, L. (2023). The Ethics of Artificial Intelligence. Oxford University Press.',
    ],
    keywords: ['Triết học công nghệ', 'Đạo đức học', 'Tự do ý chí', 'Thuật toán'],
    coverImage: '/src/assets/images/research_history_heritage_1795187587832.jpg',
    coverCaption: 'Hình 1. Khảo cứu các văn bản triết học kinh điển kết hợp tư liệu học thuật đương đại.',
    publishedAt: '2026-11-02',
    views: 612,
    upvotes: 57,
    comments: [],
  },
  {
    id: 'nckh-2026-008',
    title: 'Khả năng tiếp cận không gian công cộng thân thiện với người cao tuổi tại các khu chung cư cũ quận Thanh Xuân, Hà Nội',
    majorId: 'xa-hoi-hoc',
    clusterId: 'xa-hoi-hanh-vi-chinh-sach',
    authors: 'Vũ Thị Mai Phương, Lê Trung Kiên',
    cohort: 'K67 Xã hội học',
    advisor: 'PGS.TS. Nguyễn Thị Kim Hoa',
    academicYear: '2025–2026',
    abstract:
      'Qua quan sát tham dự và phỏng vấn 120 cư dân trên 65 tuổi tại 4 khu tập thể cũ quận Thanh Xuân, nghiên cứu đánh giá vai trò của sân chơi chung, ghế đá và mạng lưới láng giềng đối với sức khỏe tinh thần và sự gắn kết cộng đồng đô thị.',
    sections: [
      {
        heading: '1. Già hóa dân số và không gian đô thị nén',
        body: 'Hà Nội đang bước nhanh vào giai đoạn già hóa dân số. Tại nhiều khu tập thể xây dựng từ thập niên 1970–1980, sân chung bị thu hẹp bởi bãi đỗ xe tự phát làm giảm cơ hội vận động và giao lưu của người cao tuổi.',
      },
      {
        heading: '2. Kết quả điền dã xã hội học',
        body: '74% người cao tuổi được hỏi ưu tiên không gian sinh hoạt chỉ cách nhà dưới 300m, có bóng cây và nhà vệ sinh công cộng sạch sẽ hơn là các công viên lớn nhưng khó di chuyển.',
      },
      {
        heading: '3. Kiến nghị quy hoạch vi mô',
        body: 'Nhóm đề xuất mô hình "góc cộng đồng liên thế hệ" tận dụng tầng 1 nhà sinh hoạt tổ dân phố kết hợp cải tạo lối đi không bậc cấp.',
      },
    ],
    references: [
      'WHO (2022). Global Age-friendly Cities: A Guide.',
      'Trịnh Duy Luân (2020). Xã hội học đô thị. NXB Đại học Quốc gia Hà Nội.',
    ],
    keywords: ['Xã hội học đô thị', 'Người cao tuổi', 'Không gian công cộng', 'Thanh Xuân'],
    coverImage: '/src/assets/images/research_tourism_culture_1795187588609.jpg',
    coverCaption: 'Hình 1. Đời sống cộng đồng tại các tuyến phố và khu dân cư lâu năm ở Hà Nội.',
    publishedAt: '2026-10-28',
    views: 534,
    upvotes: 49,
    comments: [],
  },
  {
    id: 'nckh-2026-009',
    title: 'Chuyển đổi số công tác lưu trữ hồ sơ hành chính điện tử tại cấp phường ở Hà Nội: Thực trạng chuẩn hóa và giải pháp nhân lực',
    majorId: 'luu-tru-hoc',
    clusterId: 'quan-tri-du-lich-luu-tru',
    authors: 'Tạ Minh Đức',
    cohort: 'K68 Lưu trữ học',
    advisor: 'TS. Cam Anh Tuấn',
    academicYear: '2025–2026',
    abstract:
      'Nghiên cứu đánh giá mức độ sẵn sàng về quy trình lập hồ sơ điện tử, định dạng bảo quản lâu dài (PDF/A) và kỹ năng số của cán bộ văn thư – lưu trữ tại 10 UBND phường trên địa bàn thành phố Hà Nội.',
    sections: [
      {
        heading: '1. Yêu cầu của Luật Lưu trữ sửa đổi',
        body: 'Quá trình xây dựng chính quyền số đòi hỏi tài liệu điện tử phải được xác thực tính toàn vẹn ngay từ khâu hình thành thay vì chờ hết năm hành chính mới số hóa hồi cố.',
      },
      {
        heading: '2. Các điểm nghẽn thực tiễn',
        body: 'Khảo sát chỉ ra 3 thách thức chính: thiếu đồng bộ trường siêu dữ liệu giữa các phần mềm một cửa, thói quen lưu song song bản giấy gây trùng lặp và thiếu tập huấn chuyên sâu về bảo quản số.',
      },
      {
        heading: '3. Đề xuất khung chuẩn hóa',
        body: 'Bài viết xây dựng bảng kiểm 12 tiêu chí bàn giao hồ sơ điện tử vào lưu trữ cơ quan giúp giảm 35% lỗi thiếu siêu dữ liệu bắt buộc.',
      },
    ],
    references: [
      'Quốc hội nước CHXHCN Việt Nam (2024). Luật Lưu trữ.',
      'Đào Xuân Chúc (2021). Lý luận và thực tiễn Lưu trữ học hiện đại. NXB ĐHQGHN.',
    ],
    keywords: ['Lưu trữ điện tử', 'Chuyển đổi số', 'Chính quyền cơ sở', 'Quản trị hồ sơ'],
    coverImage: '/src/assets/images/hero_ussh_campus_science_1795187590297.jpg',
    coverCaption: 'Hình 1. Nghiên cứu ứng dụng quản trị văn phòng và lưu trữ số hướng tới chính quyền hiện đại.',
    publishedAt: '2026-10-24',
    views: 448,
    upvotes: 41,
    comments: [],
  },
  {
    id: 'nckh-2026-010',
    title: 'Xây dựng hệ thống siêu dữ liệu mở cho bộ sưu tập tài nguyên giáo dục mở (OER) tại thư viện đại học khối Khoa học Xã hội',
    majorId: 'quan-ly-thong-tin',
    clusterId: 'bao-chi-truyen-thong',
    authors: 'Nguyễn Phương Thảo, Chu Quang Huy',
    cohort: 'K67 Quản lý thông tin',
    advisor: 'TS. Đỗ Văn Hùng',
    academicYear: '2025–2026',
    abstract:
      'Thiết kế khung mô tả siêu dữ liệu theo chuẩn Dublin Core mở rộng tích hợp phân loại môn học tiếng Việt nhằm tối ưu hóa khả năng tìm kiếm và tái sử dụng học liệu mở cho giảng viên, sinh viên đại học.',
    sections: [
      {
        heading: '1. Vai trò của tài nguyên giáo dục mở',
        body: 'Học liệu mở giúp thu hẹp khoảng cách tiếp cận tri thức giữa sinh viên các vùng miền, nhưng thường bị phân mảnh và khó tra cứu nếu thiếu cấu trúc siêu dữ liệu thống nhất.',
      },
      {
        heading: '2. Đề xuất lược đồ siêu dữ liệu tiếng Việt',
        body: 'Nhóm xây dựng 18 trường mô tả cốt lõi gồm cấp độ học phần, giấy phép Creative Commons, từ khóa chuẩn hóa và liên kết trích dẫn chéo giữa các ngành gần.',
      },
      {
        heading: '3. Kiểm thử khả năng tìm tin',
        body: 'Thử nghiệm trên 320 tài liệu mẫu cho thấy độ chính xác kết quả tìm kiếm tăng từ 64% lên 89% và giảm gần một nửa số thao tác lọc của sinh viên.',
      },
    ],
    references: [
      'UNESCO (2019). Recommendation on Open Educational Resources (OER).',
      'Đỗ Văn Hùng (2022). Quản trị thông tin trong tổ chức tri thức. NXB ĐHQGHN.',
    ],
    keywords: ['Quản lý thông tin', 'Học liệu mở OER', 'Siêu dữ liệu', 'Thư viện số'],
    coverImage: '/src/assets/images/research_psychology_campus_1795187589268.jpg',
    coverCaption: 'Hình 1. Sinh viên thử nghiệm hệ thống tra cứu tài nguyên học liệu mở tại không gian thư viện.',
    publishedAt: '2026-10-20',
    views: 510,
    upvotes: 45,
    comments: [],
  },
  {
    id: 'nckh-2026-011',
    title: 'Lễ hội làng nghề truyền thống trong quá trình đô thị hóa ven sông Hồng: Nghiên cứu trường hợp từ góc nhìn Nhân học văn hóa',
    majorId: 'nhan-hoc',
    clusterId: 'lich-su-triet-hoc',
    authors: 'Trần Ngọc Ánh',
    cohort: 'K67 Nhân học',
    advisor: 'PGS.TS. Nguyễn Văn Sửu',
    academicYear: '2025–2026',
    abstract:
      'Ghi chép dân tộc học chuyên sâu trong 6 tháng tại một làng gốm ven sông Hồng cho thấy cộng đồng địa phương chủ động tái kiến tạo nghi lễ truyền thống để vừa giữ gìn căn tính lịch sử vừa kết nối với thế hệ trẻ và du khách.',
    sections: [
      {
        heading: '1. Tiếp cận dân tộc học đương đại',
        body: 'Thay vì xem đô thị hóa như tác nhân làm mai một một chiều các nghi lễ cổ truyền, nghiên cứu tập trung vào tính chủ thể văn hóa của các nhóm cư dân địa phương.',
      },
      {
        heading: '2. Sự chuyển dịch vai trò thế hệ trẻ trong lễ hội',
        body: 'Thanh niên địa phương tham gia tổ chức truyền thông sự kiện, trình diễn nghề gốm thực cảnh và lưu trữ tư liệu phỏng vấn các nghệ nhân cao tuổi.',
      },
      {
        heading: '3. Kết luận',
        body: 'Sức sống bền bỉ của lễ hội nằm ở khả năng thích ứng linh hoạt với nhịp sống đô thị mà vẫn bảo toàn hạt nhân giá trị gắn kết cộng đồng.',
      },
    ],
    references: [
      'Geertz, C. (1973). The Interpretation of Cultures. Basic Books.',
      'Nguyễn Văn Sửu (2021). Nhân học phát triển ở Việt Nam. NXB ĐHQGHN.',
    ],
    keywords: ['Nhân học văn hóa', 'Lễ hội làng nghề', 'Đô thị hóa', 'Dân tộc học'],
    coverImage: '/src/assets/images/research_tourism_culture_1795187588609.jpg',
    coverCaption: 'Hình 1. Tư liệu điền dã không gian văn hóa cộng đồng ven đô Hà Nội.',
    publishedAt: '2026-10-16',
    views: 421,
    upvotes: 38,
    comments: [],
  },
  {
    id: 'nckh-2026-012',
    title: 'Chính sách thu hút lao động tri thức trẻ của Nhật Bản sau cải cách thị thực 2024 và tác động tới sinh viên ngành Nhật Bản học tại Việt Nam',
    majorId: 'nhat-ban-hoc',
    clusterId: 'khu-vuc-quoc-te',
    authors: 'Nguyễn Gia Linh, Phạm Minh Hoàng',
    cohort: 'K68 Nhật Bản học',
    advisor: 'TS. Nguyễn Thị Thúy Hạnh',
    academicYear: '2025–2026',
    abstract:
      'Phân tích những thay đổi cốt lõi trong chương trình thị thực nhân lực chất lượng cao của Nhật Bản và khảo sát định hướng nghề nghiệp của 290 sinh viên khối ngành Nhật Bản học tại Hà Nội.',
    sections: [
      {
        heading: '1. Bối cảnh thiếu hụt nhân lực tại Nhật Bản',
        body: 'Sự suy giảm tỷ lệ sinh buộc chính phủ Nhật Bản điều chỉnh sâu rộng chính sách tiếp nhận nhân lực nước ngoài, mở rộng cơ hội chuyển đổi sang cư trú dài hạn cho sinh viên tốt nghiệp đại học.',
      },
      {
        heading: '2. Khảo sát năng lực và kỳ vọng của sinh viên',
        body: 'Ngoài năng lực tiếng Nhật N2/N1, nhà tuyển dụng Nhật Bản đánh giá rất cao hiểu biết liên văn hóa, kỹ năng giải quyết vấn đề và năng lực ứng dụng công cụ số.',
      },
      {
        heading: '3. Đề xuất bổ trợ đào tạo',
        body: 'Nhóm kiến nghị tăng cường học phần thực hành văn hóa doanh nghiệp Nhật Bản và kết nối cố vấn nghề nghiệp từ mạng lưới cựu sinh viên đang làm việc tại Tokyo, Osaka.',
      },
    ],
    references: [
      'Immigration Services Agency of Japan (2025). White Paper on Immigration Control.',
      'Phan Hải Linh (2020). Nhật Bản học: Lịch sử, Văn hóa và Xã hội. NXB ĐHQGHN.',
    ],
    keywords: ['Nhật Bản học', 'Nhân lực trẻ', 'Thị trường lao động', 'Giao lưu văn hóa'],
    coverImage: '/src/assets/images/research_international_forum_1795187591838.jpg',
    coverCaption: 'Hình 1. Tọa đàm trao đổi học thuật và định hướng nghề nghiệp khu vực Đông Á.',
    publishedAt: '2026-10-11',
    views: 580,
    upvotes: 52,
    comments: [],
  },
];
