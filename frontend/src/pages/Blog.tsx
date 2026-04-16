import { useState } from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

const BLOG_POSTS = [
  {
    id: 1,
    title: "5 Tips Sukses Menyelenggarakan Event Virtual",
    excerpt: "Pelajari strategi terbaik untuk membuat event virtual yang engaging dan profesional di era digital.",
    content: "Event virtual telah menjadi standar baru di industri event. Untuk sukses, Anda perlu memperhatikan kualitas streaming, interaktivitas peserta, dan kemudahan akses. Pastikan platform yang digunakan mendukung fitur live chat, polling, dan networking room. Jangan lupa untuk melakukan gladi resik teknis minimal satu hari sebelum event dimulai.",
    date: "10 Apr 2026",
    category: "Tips & Trik",
    readTime: "5 min",
    color: "#6C5CE7",
    emoji: "💡",
  },
  {
    id: 2,
    title: "Tren Event 2026: Hybrid Event Makin Diminati",
    excerpt: "Kombinasi offline dan online menjadi format favorit para event creator di tahun ini.",
    content: "Hybrid event menawarkan jangkauan yang lebih luas sambil tetap mempertahankan nilai interaksi tatap muka. Tantangan utamanya adalah memberikan pengalaman yang setara bagi peserta onsite dan online. Penggunaan teknologi AR/VR dan aplikasi mobile event yang terintegrasi sangat membantu dalam menjembatani pengalaman kedua jenis peserta ini.",
    date: "8 Apr 2026",
    category: "Tren",
    readTime: "4 min",
    color: "#FD79A8",
    emoji: "📈",
  },
  {
    id: 3,
    title: "Cara Maksimalkan Penjualan Tiket dengan Early Bird",
    excerpt: "Strategi early bird pricing yang terbukti meningkatkan penjualan tiket hingga 40%.",
    content: "Harga early bird bukan sekadar diskon, tapi alat untuk menciptakan 'sense of urgency'. Manfaatkan psikologi kelangkaan dengan membatasi jumlah tiket atau durasi promo. Komunikasikan keuntungan early bird melalui email marketing dan media sosial secara berkala untuk memicu konversi cepat di awal periode penjualan.",
    date: "5 Apr 2026",
    category: "Marketing",
    readTime: "6 min",
    color: "#00B894",
    emoji: "🎯",
  },
  {
    id: 4,
    title: "Panduan Lengkap Membuat Event di LoketDigital",
    excerpt: "Step-by-step guide untuk membuat dan mengelola event pertama Anda di platform kami.",
    content: "Memulai di LoketDigital sangatlah mudah. Daftarkan akun penyelenggara, pilih 'Buat Event', lengkapi detail seperti lokasi dan waktu, lalu atur kategori tiket Anda. Tim kami juga menyediakan dasbor analitik real-time sehingga Anda bisa memantau performa penjualan kapan saja dan di mana saja.",
    date: "2 Apr 2026",
    category: "Tutorial",
    readTime: "8 min",
    color: "#FDCB6E",
    emoji: "📖",
  },
  {
    id: 5,
    title: "Mengapa Komunitas Penting untuk Kesuksesan Event",
    excerpt: "Bangun komunitas yang loyal dan tingkatkan engagement event Anda secara organik.",
    content: "Event tidak berakhir saat tirai ditutup. Membangun komunitas di sekitar event Anda memastikan peserta akan kembali di edisi berikutnya. Gunakan grup eksklusif atau newsletter untuk tetap terhubung. Komunitas yang kuat juga akan menjadi duta merek secara sukarela, mempromosikan event Anda melalui word-of-mouth.",
    date: "28 Mar 2026",
    category: "Insight",
    readTime: "5 min",
    color: "#A29BFE",
    emoji: "👥",
  },
  {
    id: 6,
    title: "Optimasi SEO untuk Halaman Event Anda",
    excerpt: "Tips praktis agar event Anda mudah ditemukan di Google dan menarik lebih banyak peserta.",
    content: "Gunakan kata kunci yang relevan di judul dan deskripsi event. Optimalkan gambar dengan alt text yang deskriptif. Pastikan halaman event Anda mobile-friendly dan memiliki kecepatan loading yang cepat. Backlink dari website partner atau media lokal juga sangat membantu meningkatkan peringkat SEO halaman event Anda.",
    date: "25 Mar 2026",
    category: "Marketing",
    readTime: "7 min",
    color: "#55EFC4",
    emoji: "🔍",
  },
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<typeof BLOG_POSTS[0] | null>(null);

  return (
    <div style={{ background: "var(--bg)", fontFamily: "Inter, sans-serif", minHeight: "100vh" }}>
      <Navbar />

      {/* Top Navigation */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 24px 0" }}>
        <Link 
          to="/" 
          style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: 8, 
            color: "var(--text-secondary)", 
            fontSize: 14, 
            fontWeight: 500, 
            textDecoration: "none",
            transition: "color 0.2s"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          ← Kembali ke Beranda
        </Link>
      </div>

      {selectedPost ? (
        /* Blog Detail View */
        <section style={{ padding: "40px 0 80px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
            <button 
              onClick={() => setSelectedPost(null)}
              style={{ 
                background: "none", 
                border: "none", 
                color: "var(--primary)", 
                padding: 0, 
                fontSize: 14, 
                fontWeight: 600, 
                cursor: "pointer",
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
            >
              ← Kembali ke Daftar Blog
            </button>

            <div style={{ borderRadius: 24, background: "white", padding: "48px 40px", boxShadow: "0 10px 40px rgba(0,0,0,0.04)" }}>
               <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: selectedPost.color, background: `${selectedPost.color}18`, padding: "4px 12px", borderRadius: 100 }}>
                  {selectedPost.category}
                </span>
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{selectedPost.date} • {selectedPost.readTime}</span>
              </div>

              <h1 style={{ fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 800, color: "var(--text-primary)", marginBottom: 24, lineHeight: 1.25 }}>
                {selectedPost.emoji} {selectedPost.title}
              </h1>

              <div style={{ fontSize: 18, color: "var(--text-secondary)", lineHeight: 1.8 }}>
                <p style={{ marginBottom: 20 }}>{selectedPost.excerpt}</p>
                <p>{selectedPost.content}</p>
              </div>

              <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid #F0F0F0", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #6C5CE7, #A29BFE)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700 }}>LD</div>
                <div>
                  <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>Tim Editorial LoketDigital</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Event Strategy Specialists</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Hero */}
          <section style={{ background: "linear-gradient(160deg, #F8F7FF 0%, #EDE9FF 50%, #FFF0F8 100%)", padding: "44px 0 48px" }}>
            <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EDE9FF", color: "var(--primary)", padding: "6px 14px", borderRadius: 100, fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
                <span>📝</span> Blog LoketDigital
              </div>
              <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, lineHeight: 1.2, color: "var(--text-primary)", margin: "0 0 16px" }}>
                Insight &{" "}
                <span style={{ background: "linear-gradient(135deg, #6C5CE7, #FD79A8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Inspirasi
                </span>
              </h1>
              <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>
                Tips, tren, dan panduan terbaru seputar dunia event management.
              </p>
            </div>
          </section>

          {/* Blog Grid */}
          <section style={{ background: "white", padding: "64px 0" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
                {BLOG_POSTS.map((post, i) => (
                  <div 
                    key={i} 
                    className="card" 
                    onClick={() => setSelectedPost(post)}
                    style={{ overflow: "hidden", cursor: "pointer", transition: "transform 0.2s ease, box-shadow 0.2s ease", borderRadius: 16, border: "1px solid #F0F0F0" }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(108,92,231,0.12)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = ""; }}
                  >
                    {/* Color Bar */}
                    <div style={{ height: 4, background: post.color }} />

                    <div style={{ padding: "24px 20px" }}>
                      {/* Category + Read Time */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: post.color, background: `${post.color}18`, padding: "3px 10px", borderRadius: 100 }}>
                          {post.category}
                        </span>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>⏱ {post.readTime}</span>
                      </div>

                      {/* Emoji + Title */}
                      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                        <span style={{ fontSize: 24, flexShrink: 0 }}>{post.emoji}</span>
                        <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: 0, lineHeight: 1.4 }}>
                          {post.title}
                        </h3>
                      </div>

                      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 0 16px" }}>
                        {post.excerpt}
                      </p>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{post.date}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)" }}>Baca selengkapnya →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

