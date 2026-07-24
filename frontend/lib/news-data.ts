export interface NewsItem {
  slug: string;
  title: string;
  cat: string;
  date: string;
  img: string;
  excerpt: string;
  content: string;
  author: string;
}

export const NEWS: NewsItem[] = [
  {
    slug: "wisuda-tahfidz-angkatan-xv",
    title: "Wisuda Tahfidz Angkatan XV Digelar Khidmat",
    cat: "Pesantren",
    date: "2026-07-14",
    img: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=700&auto=format&fit=crop",
    excerpt: "Upacara wisuda diikuti oleh 45 santri yang telah menghafal 30 juz Al-Qur'an.",
    content: `Upacara wisuda Tahfidz Angkatan XV digelar dengan khidmat di Aula Utama Pondok Pesantren Takwinul Ummah. Sebanyak 45 santri resmi menyandang gelar Hafidz/Hafidzah setelah berhasil menghafal 30 juz Al-Qur'an selama masa pendidikan mereka.

Acara dihadiri oleh Pengurus Yayasan Takwinul Ummah, para ustadz dan ustadzah, serta wali santri dari berbagai daerah. Dalam sambutannya, Ketua Yayasan menegaskan pentingnya menghafal Al-Qur'an sebagai fondasi utama pendidikan di pesantren ini.

"Para wisudawan ini adalah bukti nyata bahwa dedikasi dan keistiqomahan akan membuahkan hasil yang luar biasa. Mereka tidak hanya menghafal Al-Qur'an, tetapi juga memahami makna dan mengamalkannya dalam kehidupan sehari-hari," ujar beliau.

Salah satu wisudawan, Muhammad Fauzi, mengungkapkan rasa syukurnya atas pencapaian ini. "Perjalanan menghafal Al-Qur'an memang tidak mudah, tetapi dengan dukungan para ustadz dan teman-teman, saya bisa menyelesaikan 30 juz dalam waktu 4 tahun," katanya.

Wisuda Tahfidz ini menjadi momen bersejarah bagi Pondok Pesantren Takwinul Ummah yang terus berkomitmen melahirkan generasi Qur'ani yang berilmu dan berakhlak mulia.`,
    author: "Admin Pesantren",
  },
  {
    slug: "smp-juara-osn-matematika",
    title: "SMP IT Takwinul Ummah Raih Juara 1 OSN Matematika Kabupaten",
    cat: "SMP",
    date: "2026-07-10",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=700&auto=format&fit=crop",
    excerpt: "Ahmad Rizky dari kelas VIII meraih medali emas dalam Olimpiade Sains Nasional tingkat kabupaten.",
    content: `SMP IT Takwinul Ummah kembali menorehkan prestasi membanggakan di bidang akademik. Ahmad Rizky Pratama, siswa kelas VIII, berhasil meraih medali emas dalam Olimpiade Sains Nasional (OSN) bidang Matematika tingkat kabupaten.

Ahmad Rizky berhasil mengalahkan 127 peserta dari berbagai sekolah menengah pertama di kabupaten. Dalam kompetisi yang digelar di Gedung Serba Guna Kabupaten tersebut, ia menunjukkan kemampuan luar biasa dalam menyelesaikan soal-soal matematika tingkat sulit.

"Prestasi ini tidak terlepas dari bimbingan para guru dan dukungan dari sekolah. Saya berlatih setiap hari selama 3 bulan sebelum kompetisi," ujar Ahmad Rizky.

Kepala Sekolah SMP IT Takwinul Ummah, Ibu Siti Nurhaliza, M.Pd., menyampaikan kebanggaannya atas prestasi yang diraih. "Kami selalu berusaha memberikan yang terbaik bagi siswa. Prestasi ini menjadi motivasi bagi seluruh siswa untuk terus berprestasi," katanya.

Ahmad Rizky kini bersiap untuk mewakili kabupaten di tingkat provinsi yang akan digelar bulan depan.`,
    author: "Admin SMP",
  },
  {
    slug: "sma-program-kelas-riset",
    title: "SMA IT Takwinul Ummah Buka Program Kelas Riset Sains",
    cat: "SMA",
    date: "2026-07-02",
    img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=700&auto=format&fit=crop",
    excerpt: "Program baru ini dirancang untuk mempersiapkan siswa yang berminat di bidang penelitian sains.",
    content: `SMA IT Takwinul Ummah resmi membuka Program Kelas Riset Sains untuk tahun ajaran 2026/2027. Program ini dirancang khusus bagi siswa yang memiliki minat dan bakat di bidang penelitian sains, khususnya di bidang Biologi, Kimia, dan Fisika.

Kelas Riset Sains akan menggunakan kurikulum yang terintegrasi dengan laboratorium riset, di mana siswa akan terlibat langsung dalam penelitian-penelitian yang sedang berjalan di laboratorium sekolah.

"Program ini merupakan bagian dari komitmen kami untuk menghasilkan lulusan yang tidak hanya pintar secara akademik, tetapi juga memiliki kemampuan riset yang kuat," jelas Kepala Sekolah SMA IT Takwinul Ummah.

Fasilitas yang tersedia meliputi laboratorium Biologi, Kimia, Fisika, serta laboratorium komputer dengan perangkat lunak simulasi terkini. Siswa juga akan mendapatkan bimbingan dari tenaga pengajar yang berpengalaman di bidang riset.

Pendaftaran Program Kelas Riset Sains dibuka hingga akhir Juli 2026. Calon siswa diwajibkan mengikuti tes seleksi yang meliputi tes akademik dan wawancara.`,
    author: "Admin SMA",
  },
  {
    slug: "kajian-ramadhan-alumni",
    title: "Kajian Ramadhan Bersama Alumni Al-Azhar",
    cat: "Pesantren",
    date: "2026-06-20",
    img: "https://images.unsplash.com/photo-1564769662040-cf07dd8f92c9?q=80&w=700&auto=format&fit=crop",
    excerpt: "Kajian rutin bulan Ramadhan menghadirkan alumni Al-Azhar sebagai pembicara utama.",
    content: `Dalam rangka memperkuat pemahaman keagamaan selama bulan Ramadhan, Pondok Pesantren Takwinul Ummah mengadakan kajian rutin yang menghadirkan Ustadz Abdullah Al-Mahfudz, alumni Universitas Al-Azhar Kairo, sebagai pembicara utama.

Kajian yang berlangsung selama 3 hari ini mengangkat tema "Menjadi Muslim Moderat di Era Digital". Ustadz Abdullah memaparkan pentingnya memahami Islam secara kontekstual dan moderat dalam menghadapi berbagai tantangan di era digital.

"Islam mengajarkan kita untuk selalu berpikir kritis dan tidak mudah terpengaruh oleh informasi yang tidak benar. Di era digital seperti sekarang, kemampuan ini menjadi sangat penting," jelas Ustadz Abdullah.

Kajian ini dihadiri oleh seluruh santri, ustadz dan ustadzah, serta masyarakat sekitar yang ingin memperdalam ilmu keagamaan. Acara ini menjadi agenda rutin pesantren setiap bulan Ramadhan.`,
    author: "Admin Pesantren",
  },
  {
    slug: "pelatihan-robotik-smp",
    title: "Pelatihan Robotik untuk Siswa SMP",
    cat: "SMP",
    date: "2026-06-15",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=700&auto=format&fit=crop",
    excerpt: "Workshop robotik selama seminggu diikuti oleh 30 siswa dari berbagai kelas.",
    content: `SMP IT Takwinul Ummah mengadakan pelatihan robotik selama seminggu yang diikuti oleh 30 siswa dari berbagai kelas. Pelatihan ini merupakan bagian dari program STEM (Science, Technology, Engineering, and Mathematics) yang dicanangkan oleh sekolah.

Selama pelatihan, siswa mempelajari dasar-dasar pemrograman robot, sensor, dan mekanika. Mereka juga mendapat kesempatan untuk merakit dan memprogram robot sederhana yang dapat bergerak secara otomatis.

"Pelatihan robotik ini bertujuan untuk mengembangkan kemampuan berpikir kritis dan kreativitas siswa. Kami ingin siswa tidak hanya belajar teori, tetapi juga mengaplikasikannya secara langsung," ujar koordinator program STEM.

Para siswa antusias mengikuti pelatihan ini. Banyak dari mereka yang sebelumnya tidak memiliki pengalaman dalam bidang robotik namun berhasil merakit dan memprogram robot pertama mereka.

Sekolah berencana akan mengadakan kompetisi robotik antar kelas pada akhir semester sebagai puncak dari program ini.`,
    author: "Admin SMP",
  },
  {
    slug: "sma-kunjungan-industri",
    title: "SMA IT Takwinul Ummah Kunjungan Industri ke Institut Teknologi",
    cat: "SMA",
    date: "2026-06-08",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=700&auto=format&fit=crop",
    excerpt: "Kunjungan ke laboratorium riset Institut Teknologi memberikan pengalaman langsung bagi siswa.",
    content: `Sebanyak 60 siswa SMA IT Takwinul Ummah mengadakan kunjungan industri ke Institut Teknologi untuk melihat langsung fasilitas laboratorium riset dan berinteraksi dengan para peneliti.

Kunjungan ini merupakan bagian dari program pengenalan karir di bidang sains dan teknologi. Siswa berkesempatan untuk melihat laboratorium Fisika, Kimia, Biologi, dan Teknologi Informasi yang canggih.

"Sangat menginspirasi bisa melihat langsung bagaimana penelitian dilakukan di institusi ternama. Ini memotivasi saya untuk lebih giat belajar," ujar salah satu siswa, Putri Anjani.

Selama kunjungan, siswa juga mendengarkan paparan dari para peneliti mengenai berbagai proyek riset terkini, termasuk riset energi terbarukan dan kecerdasan buatan.

Program kunjungan industri ini diharapkan dapat memberikan wawasan dan motivasi bagi siswa untuk melanjutkan pendidikan ke jenjang yang lebih tinggi di bidang sains dan teknologi.`,
    author: "Admin SMA",
  },
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return NEWS.find((n) => n.slug === slug);
}
