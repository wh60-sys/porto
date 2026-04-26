import type {
  AboutMedia,
  GalleryItem,
  ProgramStudi,
  Referral,
  Skill,
  SocialLink,
  Stat,
  Student,
  TimelineEvent,
  UnsiaCard,
  RadarData,
  Track,
} from "@/types/portfolio";

const baseUrl = import.meta.env.BASE_URL;

export const referral: Referral = {
  code: "zero",
  registerUrl: "https://pmb.unsia.ac.id/",
  benefitUrl: "https://unsia.ac.id/",
  ownerName: "Muhammad Munirudin",
  ownerProgram: "Sistem Informasi · UNSIA",
  perks: [
    "Potongan biaya pendaftaran khusus",
    "Pendampingan onboarding dari mahasiswa aktif",
    "Akses tips & trik kuliah online dari semester awal",
    "Info beasiswa & program kampus paling update",
  ],
};

export const student: Student = {
  name: "Muhammad Munirudin",
  nim: "2024010142",
  program: "Sistem Informasi",
  programLink: "https://unsia.ac.id/pjj-sistem-informasi/",
  cohort: "batch 8",
  bio: "Mahasiswa aktif Universitas Siber Asia yang fokus mengembangkan produk digital, sistem informasi, dan solusi cerdas berbasis web. Percaya bahwa kuliah online adalah pintu masuk paling fleksibel menuju karier di industri teknologi.",
  email: "muhammadmunirudin26@gmail.com",
  whatsapp: "6281337694488",
  photoUrl:
    "https://pmb.unsia.ac.id/uploads/asiacyberuniversity/imgpengumumanspmb/45.jpg",
  socials: [
    { label: "LinkedIn", url: "https://linkedin.com/", icon: "linkedin" },
    { label: "GitHub", url: "https://github.com/", icon: "github" },
    { label: "Instagram", url: "https://instagram.com/", icon: "instagram" },
  ],
};

export const stats: Stat[] = [
  { label: "Semester", value: "5", hint: "Aktif berjalan" },
  { label: "IPK", value: "3.86", hint: "Skala 4.00" },
  { label: "Proyek Selesai", value: "18", hint: "Personal & kelas" },
  { label: "Sertifikat", value: "12", hint: "Industri & kampus" },
];

export const programStudi: ProgramStudi[] = [
  {
    name: "Sistem Informasi",
    url: "https://unsia.ac.id/pjj-sistem-informasi/",
    icon: "code",
    tagline: "Bisnis & Teknologi",
    gelar: "S.Kom",
    durasi: "8 Semester",
    jenjang: "S1 PJJ",
    syaratUrl: "https://unsia.ac.id/syarat-pendaftaran/",
    biayaUrl: "https://unsia.ac.id/keuangan/",
    accent: "gold",
  },
  {
    name: "Informatika",
    url: "https://unsia.ac.id/pjj-informatika/",
    icon: "sparkles",
    tagline: "Coding, Data & AI",
    gelar: "S.Kom",
    durasi: "8 Semester",
    jenjang: "S1 PJJ",
    syaratUrl: "https://unsia.ac.id/syarat-pendaftaran/",
    biayaUrl: "https://unsia.ac.id/keuangan/",
    accent: "blue",
  },
  {
    name: "Manajemen",
    url: "https://unsia.ac.id/pjj-manajemen/",
    icon: "users",
    tagline: "Strategi & Kepemimpinan",
    gelar: "S.M",
    durasi: "8 Semester",
    jenjang: "S1 PJJ",
    syaratUrl: "https://unsia.ac.id/syarat-pendaftaran/",
    biayaUrl: "https://unsia.ac.id/keuangan/",
    accent: "blue",
  },
  {
    name: "Akuntansi",
    url: "https://unsia.ac.id/pjj-akuntansi/",
    icon: "wallet",
    tagline: "Keuangan & Audit",
    gelar: "S.Ak",
    durasi: "8 Semester",
    jenjang: "S1 PJJ",
    syaratUrl: "https://unsia.ac.id/syarat-pendaftaran/",
    biayaUrl: "https://unsia.ac.id/keuangan/",
    accent: "gold",
  },
  {
    name: "Komunikasi",
    url: "https://unsia.ac.id/pjj-komunikasi/",
    icon: "globe",
    tagline: "Media & Branding Digital",
    gelar: "S.I.Kom",
    durasi: "8 Semester",
    jenjang: "S1 PJJ",
    syaratUrl: "https://unsia.ac.id/syarat-pendaftaran/",
    biayaUrl: "https://unsia.ac.id/keuangan/",
    accent: "blue",
  },
  {
    name: "Teknologi Informasi",
    url: "https://unsia.ac.id/pjj-teknologi-informasi/",
    icon: "shield",
    tagline: "Cloud, DevOps & Security",
    gelar: "S.T",
    durasi: "8 Semester",
    jenjang: "S1 PJJ",
    syaratUrl: "https://unsia.ac.id/syarat-pendaftaran/",
    biayaUrl: "https://unsia.ac.id/keuangan/",
    accent: "gold",
  },
];

export const aboutMedia: AboutMedia[] = [
  {
    type: "image",
    src: `${baseUrl}tentang/profil.jpeg`,
    caption: "Sesi belajar online di UNSIA",
  },
  {
    type: "image",
    src: `${baseUrl}tentang/gg.jpeg`,
    caption: "Catatan kuliah & roadmap karier",
  },
];

export const skills: Skill[] = [
  { name: "TypeScript / JavaScript", level: 92, category: "Technical" },
  { name: "Vue & React", level: 88, category: "Technical" },
  { name: "Node.js & API Design", level: 80, category: "Technical" },
  { name: "Database (SQL & NoSQL)", level: 78, category: "Technical" },
  { name: "UI / UX Design", level: 84, category: "Technical" },

  { name: "Komunikasi", level: 90, category: "Soft Skills" },
  { name: "Kolaborasi Tim Remote", level: 94, category: "Soft Skills" },
  { name: "Manajemen Waktu", level: 88, category: "Soft Skills" },
  { name: "Problem Solving", level: 86, category: "Soft Skills" },

  { name: "Figma", level: 90, category: "Tools" },
  { name: "Git & GitHub", level: 92, category: "Tools" },
  { name: "Notion & Trello", level: 85, category: "Tools" },
  { name: "Docker & Cloud", level: 70, category: "Tools" },
];

export const radarData: RadarData[] = [
  { label: "Frontend", value: 92 },
  { label: "Backend", value: 78 },
  { label: "Desain", value: 85 },
  { label: "Data", value: 72 },
  { label: "Komunikasi", value: 90 },
  { label: "Manajemen", value: 84 },
];

export const gallery: GalleryItem[] = [
  {
    id: "p-1",
    title: "Dashboard Akademik UNSIA",
    description:
      "Sistem dashboard mata kuliah dengan analitik kehadiran & nilai realtime.",
    category: "Proyek",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tags: ["Vue 3", "TypeScript", "TailwindCSS"],
    span: 2,
  },
  {
    id: "p-2",
    title: "Aplikasi Tugas Kelompok",
    description: "Kolaborasi tugas online untuk mahasiswa PJJ UNSIA.",
    category: "Proyek",
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    tags: ["Node.js", "Postgres"],
    span: 1,
  },
  {
    id: "s-1",
    title: "Google UX Design Certificate",
    description: "Sertifikasi profesional UX dengan portofolio 3 case study.",
    category: "Sertifikat",
    imageUrl:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80",
    tags: ["Coursera", "Google"],
    span: 1,
  },
  {
    id: "s-2",
    title: "AWS Cloud Practitioner",
    description: "Sertifikasi dasar layanan cloud Amazon Web Services.",
    category: "Sertifikat",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    tags: ["AWS", "Cloud"],
    span: 2,
  },
  {
    id: "k-1",
    title: "Wisuda Online UNSIA 2024",
    description: "Acara wisuda virtual dengan ribuan peserta dari seluruh Indonesia.",
    category: "Kegiatan",
    imageUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    tags: ["UNSIA", "Wisuda"],
    span: 1,
  },
  {
    id: "k-2",
    title: "Webinar Industry 5.0",
    description:
      "Berperan sebagai panitia & moderator webinar nasional teknologi UNSIA.",
    category: "Kegiatan",
    imageUrl:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=80",
    tags: ["Webinar", "Komunitas"],
    span: 2,
  },
  {
    id: "p-3",
    title: "Landing Page UMKM",
    description: "Membantu UMKM lokal go-digital lewat program pengabdian masyarakat.",
    category: "Proyek",
    imageUrl:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80",
    tags: ["UMKM", "Web"],
    span: 1,
  },
  {
    id: "k-3",
    title: "UNSIA Student Camp",
    description: "Camp mahasiswa untuk berkolaborasi lintas program studi.",
    category: "Kegiatan",
    imageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    tags: ["Komunitas"],
    span: 1,
  },
  {
    id: "s-3",
    title: "Microsoft Learn AI Foundations",
    description: "Memahami dasar Generative AI & Azure AI services.",
    category: "Sertifikat",
    imageUrl:
      "https://images.unsplash.com/photo-1677756119517-756a188d2d94?auto=format&fit=crop&w=800&q=80",
    tags: ["Microsoft", "AI"],
    span: 1,
  },
];

export const unsiaCards: UnsiaCard[] = [
  {
    title: "Daftar Sekarang",
    description: "Pendaftaran Mahasiswa Baru UNSIA dibuka sepanjang tahun.",
    url: "https://pmb.unsia.ac.id/",
    icon: "",
    accent: "gold",
  },
  {
    title: "Syarat Pendaftaran",
    description: "Lihat persyaratan akademik & administratif terkini.",
    url: "https://unsia.ac.id/syarat-pendaftaran/",
    icon: "list",
  },
  {
    title: "Biaya Kuliah",
    description: "Investasi pendidikan online yang transparan & terjangkau.",
    url: "https://unsia.ac.id/keuangan/",
    icon: "wallet",
  },
  {
    title: "Program Studi",
    description: "Pilih program S1 PJJ favoritmu di UNSIA.",
    url: "https://unsia.ac.id/#program-studi",
    icon: "book",
  },
  {
    title: "Virtual Campus Tour",
    description: "Jelajahi suasana kampus UNSIA secara virtual.",
    url: "https://unsia.ac.id/videotour/",
    icon: "map",
  },
  {
    title: "FAQ",
    description: "Pertanyaan paling umum tentang kuliah online di UNSIA.",
    url: "https://unsia.ac.id/faq/",
    icon: "help",
  },
];

export const timeline: TimelineEvent[] = [
  {
    semester: "Semester 1",
    date: "September 2022",
    title: "Resmi menjadi Mahasiswa UNSIA",
    description:
      "Bergabung di program PJJ Sistem Informasi, kampus online pertama & terbaik Indonesia.",
    icon: "flag",
  },
  {
    semester: "Semester 2",
    date: "Maret 2023",
    title: "Proyek Pertama: Web UMKM",
    description: "Menyelesaikan proyek pengabdian masyarakat berbasis website.",
    achievement: "Nilai A",
    icon: "code",
  },
  {
    semester: "Semester 3",
    date: "September 2023",
    title: "Sertifikat Google UX Design",
    description: "Lulus sertifikasi profesional UX dengan tiga studi kasus.",
    achievement: "Skor: 95/100",
    icon: "award",
  },
  {
    semester: "Semester 4",
    date: "Maret 2024",
    title: "IPK Tertinggi Angkatan",
    description: "Mencapai IPK 3.92 di akhir Semester 4 sebagai mahasiswa terbaik.",
    achievement: "Cum Laude",
    icon: "trophy",
  },
  {
    semester: "Semester 5",
    date: "September 2024",
    title: "Project Lead Webinar Nasional UNSIA",
    description:
      "Memimpin tim mahasiswa menyelenggarakan webinar Industry 5.0 lintas kampus.",
    icon: "users",
  },
  {
    semester: "Sekarang",
    date: "2024 — Berjalan",
    title: "Membangun Portfolio & Studi Akhir",
    description:
      "Sedang menyiapkan tugas akhir bertema platform pembelajaran adaptif.",
    icon: "sparkles",
  },
];

export const tracks: Track[] = [
  { title: "Kuliah UNSIA", src: `${baseUrl}audio/Kuliah-UNSIA-1.mp3` },
];

export const socials: SocialLink[] = student.socials;
