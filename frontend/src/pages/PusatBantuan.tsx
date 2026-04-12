import { useState } from "react";
import Navbar from "../components/Navbar";

const FAQ_DATA = [
  {
    category: "Umum",
    icon: "🌐",
    items: [
      { q: "Apa itu LoketDigital?", a: "LoketDigital adalah platform event management terpercaya #1 di Indonesia yang menghubungkan penyelenggara dan peserta event dengan teknologi terdepan." },
      { q: "Apakah LoketDigital gratis?", a: "Ya! Mendaftar dan menelusuri event di LoketDigital sepenuhnya gratis. Biaya hanya dikenakan untuk pembelian tiket berbayar." },
      { q: "Bagaimana cara mendaftar?", a: "Klik tombol 'Daftar' di halaman utama, isi data diri Anda, dan verifikasi email. Proses pendaftaran hanya membutuhkan waktu kurang dari 1 menit." },
    ],
  },
  {
    category: "Tiket & Pembayaran",
    icon: "🎟️",
    items: [
      { q: "Bagaimana cara membeli tiket?", a: "Pilih event yang Anda inginkan, pilih jenis tiket, lalu selesaikan pembayaran melalui metode yang tersedia (transfer bank, e-wallet, atau kartu kredit)." },
      { q: "Apakah saya bisa membatalkan tiket?", a: "Kebijakan pembatalan tergantung pada penyelenggara event. Silakan cek detail event untuk informasi lebih lanjut mengenai kebijakan refund." },
      { q: "Metode pembayaran apa saja yang tersedia?", a: "Kami mendukung transfer bank (BCA, Mandiri, BNI, BRI), e-wallet (GoPay, OVO, Dana), dan kartu kredit/debit (Visa, Mastercard)." },
    ],
  },
  {
    category: "Event Creator",
    icon: "🎤",
    items: [
      { q: "Bagaimana cara menjadi Event Creator?", a: "Daftar akun sebagai 'Organizer', lengkapi profil Anda, dan mulai buat event pertama Anda melalui dashboard. Tidak ada biaya pendaftaran!" },
      { q: "Berapa biaya untuk membuat event?", a: "Membuat event gratis di LoketDigital. Kami hanya mengenakan service fee kecil pada setiap tiket berbayar yang terjual." },
      { q: "Apakah saya bisa membuat event gratis?", a: "Tentu! Anda bisa membuat event dengan tiket gratis tanpa biaya apapun. Cocok untuk seminar, workshop, atau meetup komunitas." },
    ],
  },
  {
    category: "Akun & Keamanan",
    icon: "🔒",
    items: [
      { q: "Bagaimana cara mengubah password?", a: "Buka halaman Profile, klik 'Ubah Password', masukkan password lama dan password baru, lalu simpan perubahan." },
      { q: "Apakah data saya aman?", a: "Ya, kami menggunakan enkripsi SSL dan mengikuti standar keamanan terbaik untuk melindungi data pribadi Anda." },
      { q: "Apa itu poin reward?", a: "Poin reward diberikan untuk setiap transaksi pembelian tiket. Poin bisa digunakan sebagai diskon untuk pembelian tiket selanjutnya." },
    ],
  },
  {
    category: "Pemakaian Aplikasi",
    icon: "📱",
    items: [
      { q: "Bagaimana cara menggunakan aplikasi?", a: "Buka halaman utama, pilih event yang Anda inginkan, lalu ikuti langkah-langkah untuk membeli tiket." },
      { q: "Apakah saya bisa menggunakan aplikasi di perangkat seluler?", a: "Ya, aplikasi kami responsif dan dapat digunakan di perangkat seluler." },
      { q: "Bagaimana cara menggunakan aplikasi di perangkat seluler?", a: "Ya, aplikasi kami responsif dan dapat digunakan di perangkat seluler." },
    ],
  },
];

const CONTACT_CHANNELS = [
  { icon: "💬", title: "Live Chat", desc: "Hubungi kami langsung melalui chat", action: "Mulai Chat", color: "#6C5CE7" },
  { icon: "📧", title: "Email", desc: "support@loketdigital.id", action: "Kirim Email", color: "#FD79A8" },
  { icon: "📞", title: "Telepon", desc: "021-1234-5678 (Senin–Jumat, 09:00–17:00)", action: "Hubungi", color: "#00B894" },
];

export default function PusatBantuan() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFaq = (key: string) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  const filteredFaqs = FAQ_DATA.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div style={{ background: "var(--bg)", fontFamily: "Inter, sans-serif", minHeight: "100vh" }}>
      <Navbar />
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(160deg, #F8F7FF 0%, #EDE9FF 50%, #FFF0F8 100%)",
          padding: "40px 0 48px",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#EDE9FF",
              color: "var(--primary)",
              padding: "6px 14px",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            <span>❓</span> Pusat Bantuan
          </div>
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 900,
              lineHeight: 1.2,
              color: "var(--text-primary)",
              margin: "0 0 16px",
            }}
          >
            Hai, ada yang bisa kami bantu?{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6C5CE7, #FD79A8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              kami siap membantu 24 jam
            </span>
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.75, margin: "0 0 28px" }}>
            Temukan jawaban dari pertanyaan yang sering ditanyakan, atau hubungi tim support kami.
          </p>

          {/* Search */}
          <div style={{ maxWidth: 500, margin: "0 auto" }}>
            <input
              type="text"
              placeholder="🔍  Cari pertanyaan..."
              className="input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: 16, fontSize: 15 }}
            />
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ background: "white", padding: "64px 0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="section-title">Pertanyaan Umum (FAQ)</h2>
            <p className="section-subtitle" style={{ marginTop: 8 }}>
              Jawaban cepat untuk pertanyaan yang sering ditanyakan 
            </p>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "48px 24px" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 8px" }}>
                Pertanyaan tidak ditemukan
              </h3>
              <p style={{ color: "var(--text-secondary)", margin: "0 0 20px" }}>
                Coba kata kunci lain atau hubungi tim support kami
              </p>
              <button onClick={() => setSearchQuery("")} className="btn btn-primary btn-sm">
                Reset Pencarian
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {filteredFaqs.map((cat) => (
                <div key={cat.category}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 16,
                    }}
                  >
                    <span style={{ fontSize: 24 }}>{cat.icon}</span>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                      {cat.category}
                    </h3>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {cat.items.map((item, j) => {
                      const key = `${cat.category}-${j}`;
                      const isOpen = openIndex === key;
                      return (
                        <div
                          key={key}
                          className="card"
                          style={{
                            overflow: "hidden",
                            cursor: "pointer",
                            border: isOpen ? "1.5px solid var(--primary)" : undefined,
                            transition: "all 0.2s ease",
                          }}
                          onClick={() => toggleFaq(key)}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "16px 20px",
                              gap: 12,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 15,
                                fontWeight: 600,
                                color: isOpen ? "var(--primary)" : "var(--text-primary)",
                              }}
                            >
                              {item.q}
                            </span>
                            <span
                              style={{
                                fontSize: 18,
                                fontWeight: 700,
                                color: "var(--primary)",
                                transition: "transform 0.2s ease",
                                transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                                flexShrink: 0,
                              }}
                            >
                              +
                            </span>
                          </div>
                          {isOpen && (
                            <div
                              style={{
                                padding: "0 20px 16px",
                                fontSize: 14,
                                color: "var(--text-secondary)",
                                lineHeight: 1.75,
                              }}
                            >
                              {item.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Channels */}
      <section style={{ background: "var(--bg)", padding: "64px 0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="section-title">Masih Butuh Bantuan?</h2>
            <p className="section-subtitle" style={{ marginTop: 8 }}>
              Hubungi tim support kami melalui channel berikut
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {CONTACT_CHANNELS.map((ch) => (
              <div
                key={ch.title}
                className="card-elevated"
                style={{
                  padding: "32px 24px",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: ch.color,
                  }}
                />
                <div style={{ fontSize: 40, marginBottom: 16 }}>{ch.icon}</div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    margin: "0 0 8px",
                  }}
                >
                  {ch.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    margin: "0 0 20px",
                  }}
                >
                  {ch.desc}
                </p>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ background: ch.color, borderColor: ch.color }}
                >
                  {ch.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
