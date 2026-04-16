import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";
import HeroCarousel from "../components/HeroCarousel";
import { useDebounce } from "../hooks/useDebounce";
import mockEvents from "../data/events.json";
import { apiClient } from "../api/axiosClient";

const CATEGORIES = ["Semua", "Technology", "Music", "Business", "Sports"];

const STATS = [
  { value: "500+", label: "Event Aktif", icon: "🎫" },
  { value: "50K+", label: "Pengguna", icon: "👥" },
  { value: "200+", label: "Kota", icon: "📍" },
  { value: "98%", label: "Kepuasan", icon: "⭐" },
];

const HOW_IT_WORKS = [
  { step: "01", icon: "🔍", title: "Temukan Event", desc: "Jelajahi ribuan event dari berbagai kategori — musik, teknologi, bisnis, dan olahraga.", color: "#A29BFE" },
  { step: "02", icon: "🎟️", title: "Pesan Tiket", desc: "Pilih kursi favoritmu dan selesaikan pembayaran dalam hitungan detik dengan aman.", color: "#FD79A8" },
  { step: "03", icon: "🚀", title: "Nikmati Event", desc: "Tunjukkan e-tiket digitalmu dan rasakan pengalaman event yang tak terlupakan!", color: "#55EFC4" },
];

const CAT_HIGHLIGHTS = [
  { name: "Teknologi", emoji: "💻", img: "/cat-tech.png", count: "120+ Event", color: "linear-gradient(135deg,#667EEA,#764BA2)", cat: "Technology" },
  { name: "Musik", emoji: "🎵", img: "/cat-music.png", count: "85+ Event", color: "linear-gradient(135deg,#FD79A8,#FDCB6E)", cat: "Music" },
  { name: "Olahraga", emoji: "⚽", img: "/cat-sports.png", count: "60+ Event", color: "linear-gradient(135deg,#00B894,#55EFC4)", cat: "Sports" },
];

const TESTIMONIALS = [
  { name: "Rizky Firmansyah", role: "Startup Founder", avatar: "https://i.pravatar.cc/80?img=11", text: "LoketDigital bikin pengalaman beli tiket jadi super gampang. Dari cari event sampai masuk venue, semuanya seamless!", stars: 5 },
  { name: "Sari Dewi Rahayu", role: "Event Organizer", avatar: "https://i.pravatar.cc/80?img=5", text: "Sebagai EO, fitur manajemen event-nya luar biasa. Dashboard-nya informatif dan mudah dipahami.", stars: 5 },
  { name: "Budi Santoso", role: "Music Enthusiast", avatar: "https://i.pravatar.cc/80?img=14", text: "Tiket konser favorit ku selalu ada di sini. Notifikasi event barunya juga sangat membantu!", stars: 5 },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, activeCategory]);

  const { data, isLoading } = useQuery({
    queryKey: ["events", debouncedSearch, activeCategory, currentPage],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/events', {
          params: {
            search: debouncedSearch || undefined,
            category: activeCategory !== "Semua" ? activeCategory : undefined
          }
        });
        
        // Inject image from mock data if title matches
        let filtered = res.data.data.map((event: any) => {
          const match = mockEvents.find(mock => mock.title === event.title);
          if (match) event.imageUrl = match.imageUrl;
          return event;
        });

        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

        return {
          events: paginated,
          totalItems,
          totalPages
        };
      } catch (err) {
        console.warn("API load failed, falling back to mockEvents");
        let filtered = mockEvents as any[];
        if (debouncedSearch) {
          filtered = filtered.filter(e => e.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
        }
        if (activeCategory !== "Semua") {
          filtered = filtered.filter(e => e.category === activeCategory);
        }
  
        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  
        return {
          events: paginated,
          totalItems,
          totalPages
        };
      }
    },
  });

  const scrollToEvents = (cat: string) => {
    setActiveCategory(cat);
    setTimeout(() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div style={{ background: "var(--bg)", fontFamily: "Inter, sans-serif" }}>
      {/* ── Sticky Navbar ── */}
      <Navbar />

      {/* ══ 1. BANNER CAROUSEL ══════════════════════════════ */}
      <section style={{ background: "#F8F7FF", paddingTop: 32 }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <HeroCarousel />
        </div>
      </section>

      {/* ══ 2. HERO TEXT + STATS ════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#F8F7FF 0%,#EDE9FF 50%,#FFF0F8 100%)", padding: "56px 0 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="flex flex-col md:flex-row items-center gap-10">

            {/* LEFT: headline */}
            <div style={{ flex: 1 }} className="animate-fade-up">
              {/* badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EDE9FF", color: "var(--primary)", padding: "6px 14px", borderRadius: 100, fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
                <span className="animate-pulse-ring" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)", display: "inline-block" }} />
                Platform Event Terpercaya #1 Indonesia
              </div>

              <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-1px", color: "var(--text-primary)", margin: "0 0 16px" }}>
                Temukan &amp; Buat<br />
                <span style={{ background: "linear-gradient(135deg,#6C5CE7,#FD79A8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Event Impianmu
                </span>
              </h1>

              <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.75, maxWidth: 480, margin: "0 0 28px" }}>
                Ribuan event menarik menunggumu — konser musik, seminar teknologi, hingga acara olahraga. Daftar sekarang!
              </p>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 24 }}>
                <a href="#events" className="btn btn-primary btn-lg no-underline">🎫 Cari Event</a>
                <a href="/register" className="btn btn-secondary btn-lg no-underline">✨ Buat Event</a>
              </div>

              {/* Trust avatars */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex" }}>
                  {[11, 5, 14, 22, 32].map((n) => (
                    <img key={n} src={`https://i.pravatar.cc/36?img=${n}`} alt="user"
                      style={{ width: 34, height: 34, borderRadius: "50%", border: "2.5px solid white", marginLeft: n === 11 ? 0 : -10, objectFit: "cover" }} />
                  ))}
                </div>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                  <strong style={{ color: "var(--text-primary)" }}>100K+</strong> pengguna bergabung
                </span>
              </div>
            </div>

            {/* RIGHT: stat cards 2x2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, flexShrink: 0 }}>
              {STATS.map((s) => (
                <div key={s.label} className="card-elevated animate-fade-up" style={{ padding: "20px 24px", textAlign: "center", minWidth: 120 }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "var(--primary)" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. HOW IT WORKS ════════════════════════════════════════════ */}
      <section style={{ background: "white", padding: "64px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="section-title">Cara Kerja LoketDigital</h2>
            <p className="section-subtitle" style={{ marginTop: 8 }}>3 langkah mudah untuk menikmati event favoritmu</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="card" style={{ padding: "36px 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -16, right: -12, fontSize: 80, fontWeight: 900, color: step.color, opacity: 0.08, lineHeight: 1, userSelect: "none" }}>{step.step}</div>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{step.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 10px" }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                <div style={{ width: 36, height: 4, background: step.color, borderRadius: 100, margin: "16px auto 0", opacity: 0.7 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. CATEGORY HIGHLIGHTS (alternating left/right) ═══════════ */}
      <section style={{ background: "var(--bg)", padding: "64px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="section-title">Jelajahi Kategori Event</h2>
            <p className="section-subtitle" style={{ marginTop: 8 }}>Temukan event yang sesuai minat dan passionmu</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
            {CAT_HIGHLIGHTS.map((cat, i) => (
              <div key={cat.name} className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                style={{ gap: 40, alignItems: "center" }}>

                {/* image */}
                <div style={{ flex: 1, position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, background: cat.color, borderRadius: 24, opacity: 0.15, filter: "blur(24px)", transform: "scale(1.04)" }} />
                  <img src={cat.img} alt={cat.name} style={{ position: "relative", width: "100%", borderRadius: 20, objectFit: "cover", maxHeight: 300, boxShadow: "0 16px 48px rgba(0,0,0,0.12)" }} />
                </div>

                {/* text */}
                <div style={{ flex: 1 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: cat.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 16 }}>
                    {cat.emoji}
                  </div>
                  <h3 style={{ fontSize: 30, fontWeight: 900, color: "var(--text-primary)", margin: "0 0 10px" }}>Event {cat.name}</h3>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--surface-2)", color: "var(--primary)", padding: "4px 12px", borderRadius: 100, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
                    🔥 {cat.count} tersedia
                  </div>
                  <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.75, margin: "0 0 20px", maxWidth: 420 }}>
                    Temukan event {cat.name.toLowerCase()} terbaik di kotamu — dari acara kecil yang intim hingga festival besar berstandar internasional.
                  </p>
                  <button onClick={() => scrollToEvents(cat.cat)} className="btn btn-primary">
                    Lihat Semua {cat.emoji} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. EVENTS GRID ═════════════════════════════════════════════ */}
      <section id="events" style={{ background: "white", padding: "64px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

          {/* header row */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 28 }}>
            <div>
              <h2 className="section-title">Event Terbaru</h2>
              <p className="section-subtitle" style={{ marginTop: 6 }}>Temukan pengalaman tak terlupakan</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
              {/* Pagination (New Position) */}
              {data && data.totalPages > 1 && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "white", padding: "4px 8px", borderRadius: 100, border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="btn btn-ghost btn-sm"
                    style={{ minWidth: 32, padding: 0, height: 32, borderRadius: "50%", justifyContent: "center", opacity: currentPage === 1 ? 0.3 : 1 }}
                  >
                    ←
                  </button>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", padding: "0 4px" }}>
                    {currentPage} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>/ {data.totalPages}</span>
                  </span>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(data.totalPages, p + 1))}
                    disabled={currentPage === data.totalPages}
                    className="btn btn-ghost btn-sm"
                    style={{ minWidth: 32, padding: 0, height: 32, borderRadius: "50%", justifyContent: "center", opacity: currentPage === data.totalPages ? 0.3 : 1 }}
                  >
                    →
                  </button>
                </div>
              )}
              
              <div style={{ flex: "1 1 200px", maxWidth: 300 }}>
                <input type="text" placeholder="🔍  Cari event..." className="input" value={search} onChange={(e) => setSearch(e.target.value)}
                  style={{ paddingLeft: 16, height: 42 }} />
              </div>
            </div>
          </div>

          {/* category pills */}
          <div style={{ display: "flex", gap: 8, marginBottom: 32, overflowX: "auto", paddingBottom: 4 }}>
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "7px 18px", borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "1.5px solid", whiteSpace: "nowrap", transition: "all 0.2s",
                  background: activeCategory === cat ? "var(--primary)" : "white",
                  color: activeCategory === cat ? "white" : "var(--text-secondary)",
                  borderColor: activeCategory === cat ? "var(--primary)" : "var(--border)",
                }}>
                {cat}
              </button>
            ))}
          </div>

          {/* grid */}
          {isLoading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24 }}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="card" style={{ overflow: "hidden" }}>
                  <div className="skeleton" style={{ height: 176 }} />
                  <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div className="skeleton" style={{ height: 16, width: "75%" }} />
                    <div className="skeleton" style={{ height: 12, width: "50%" }} />
                    <div className="skeleton" style={{ height: 12, width: "35%" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : data?.events?.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "64px 24px" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 8px" }}>Event tidak ditemukan</h3>
              <p style={{ color: "var(--text-secondary)", margin: "0 0 20px" }}>Coba kata kunci lain atau pilih kategori berbeda</p>
              <button onClick={() => { setSearch(""); setActiveCategory("Semua"); }} className="btn btn-primary btn-sm" style={{ margin: "0 auto" }}>
                Reset Filter
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24 }}>
              {data?.events?.map((event: any) => <EventCard key={event.id} event={event} />)}
            </div>
          )}
        </div>
      </section>

      {/* ══ 6. TESTIMONIALS ════════════════════════════════════════════ */}
      <section style={{ background: "var(--bg)", padding: "64px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="section-title">Apa Kata Mereka?</h2>
            <p className="section-subtitle" style={{ marginTop: 8 }}>Ribuan pengguna sudah mempercayai LoketDigital</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card" style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", gap: 2 }}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <span key={j} style={{ color: "#FDCB6E", fontSize: 18 }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                  <img src={t.avatar} alt={t.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--primary-light)" }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. CTA BANNER ══════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#6C5CE7 0%,#A29BFE 55%,#FD79A8 100%)", padding: "72px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="flex flex-col md:flex-row items-center gap-12">

            {/* left text */}
            <div style={{ flex: 1, color: "white" }}>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, lineHeight: 1.25, margin: "0 0 16px" }}>
                Siap Buat Event<br /><span style={{ opacity: 0.8 }}>yang Viral?</span>
              </h2>
              <p style={{ fontSize: 16, opacity: 0.82, lineHeight: 1.75, margin: "0 0 32px", maxWidth: 400 }}>
                Daftarkan dirimu dan mulai perjalanan menjadi Event Organizer profesional dengan tools terlengkap di Indonesia.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a href="/register" className="no-underline" style={{ background: "white", color: "var(--primary)", padding: "14px 28px", borderRadius: 14, fontWeight: 700, fontSize: 15, boxShadow: "0 8px 24px rgba(0,0,0,0.18)", display: "inline-block" }}>
                  🚀 Mulai Gratis
                </a>
                <a href="#events" className="no-underline" style={{ border: "2px solid rgba(255,255,255,0.7)", color: "white", padding: "14px 28px", borderRadius: 14, fontWeight: 700, fontSize: 15, display: "inline-block" }}>
                  Jelajahi Event
                </a>
              </div>
            </div>

            {/* right mockup */}
            <div style={{ flex: 1, display: "flex", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle,rgba(255,255,255,0.25),transparent 70%)", filter: "blur(30px)" }} />
              <img src="/app-mockup.png" alt="App" className="animate-float"
                style={{ position: "relative", width: "100%", maxWidth: 360, borderRadius: 24, boxShadow: "0 30px 80px rgba(0,0,0,0.28)", animationDuration: "5s" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 8. FOOTER ══════════════════════════════════════════════════ */}
      <footer style={{ background: "white", borderTop: "1px solid var(--border)", padding: "56px 0 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 40 }}
            className="footer-grid">

            {/* brand */}
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "var(--text-primary)", marginBottom: 12 }}>
                Loket<span style={{ color: "var(--primary)" }}>Digital</span>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, maxWidth: 300, margin: "0 0 20px" }}>
                Platform event terpercaya #1 di Indonesia. Kami menghubungkan penyelenggara dan peserta event dengan teknologi terdepan.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {["🐦", "📘", "📸", "▶️"].map((icon, i) => (
                  <div key={i} style={{ width: 36, height: 36, borderRadius: 10, background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, cursor: "pointer" }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            {/* platform links */}
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "var(--text-primary)", marginBottom: 16 }}>Platform</div>
              {["Cari Event", "Buat Event", "Kategori", "Harga Tiket"].map((l) => (
                <div key={l} style={{ marginBottom: 10 }}>
                  <a href="#" className="no-underline" style={{ fontSize: 14, color: "var(--text-secondary)" }}>{l}</a>
                </div>
              ))}
            </div>

            {/* company links */}
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "var(--text-primary)", marginBottom: 16 }}>Perusahaan</div>
              {["Tentang Kami", "Blog", "Karir", "Kontak"].map((l) => (
                <div key={l} style={{ marginBottom: 10 }}>
                  <a href="#" className="no-underline" style={{ fontSize: 14, color: "var(--text-secondary)" }}>{l}</a>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 8 }}>
            <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>© 2026 LoketDigital. Semua hak dilindungi oleh PT Loket Digital Indonesia.</p>
            <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>Dibuat dengan ❤️ untuk Event Indonesia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
