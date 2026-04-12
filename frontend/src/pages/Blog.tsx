import { Link } from "react-router";
import Navbar from "../components/Navbar";

const BLOG_POSTS = [
  {
    title: "5 Tips Sukses Menyelenggarakan Event Virtual",
    excerpt: "Pelajari strategi terbaik untuk membuat event virtual yang engaging dan profesional di era digital.",
    date: "10 Apr 2026",
    category: "Tips & Trik",
    readTime: "5 min",
    color: "#6C5CE7",
    emoji: "💡",
  },
  {
    title: "Tren Event 2026: Hybrid Event Makin Diminati",
    excerpt: "Kombinasi offline dan online menjadi format favorit para event creator di tahun ini.",
    date: "8 Apr 2026",
    category: "Tren",
    readTime: "4 min",
    color: "#FD79A8",
    emoji: "📈",
  },
  {
    title: "Cara Maksimalkan Penjualan Tiket dengan Early Bird",
    excerpt: "Strategi early bird pricing yang terbukti meningkatkan penjualan tiket hingga 40%.",
    date: "5 Apr 2026",
    category: "Marketing",
    readTime: "6 min",
    color: "#00B894",
    emoji: "🎯",
  },
  {
    title: "Panduan Lengkap Membuat Event di LoketDigital",
    excerpt: "Step-by-step guide untuk membuat dan mengelola event pertama Anda di platform kami.",
    date: "2 Apr 2026",
    category: "Tutorial",
    readTime: "8 min",
    color: "#FDCB6E",
    emoji: "📖",
  },
  {
    title: "Mengapa Komunitas Penting untuk Kesuksesan Event",
    excerpt: "Bangun komunitas yang loyal dan tingkatkan engagement event Anda secara organik.",
    date: "28 Mar 2026",
    category: "Insight",
    readTime: "5 min",
    color: "#A29BFE",
    emoji: "👥",
  },
  {
    title: "Optimasi SEO untuk Halaman Event Anda",
    excerpt: "Tips praktis agar event Anda mudah ditemukan di Google dan menarik lebih banyak peserta.",
    date: "25 Mar 2026",
    category: "Marketing",
    readTime: "7 min",
    color: "#55EFC4",
    emoji: "🔍",
  },
];

export default function Blog() {
  return (
    <div style={{ background: "var(--bg)", fontFamily: "Inter, sans-serif", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, #F8F7FF 0%, #EDE9FF 50%, #FFF0F8 100%)", padding: "64px 0 48px" }}>
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
              <div key={i} className="card" style={{ overflow: "hidden", cursor: "pointer", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
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

      {/* Back CTA */}
      <section style={{ background: "var(--bg)", padding: "48px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 24px" }}>
          <Link to="/" className="btn btn-secondary no-underline">
            ← Kembali ke Beranda
          </Link>
        </div>
      </section>
    </div>
  );
}
