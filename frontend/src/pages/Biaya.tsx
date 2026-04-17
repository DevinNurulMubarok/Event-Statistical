import { useState } from "react";
import Navbar from "../components/Navbar";

const PRICING_TIERS = [
  {
    name: "premium",
    price: "Rp 500.000",
    desc: "Untuk event gratis dan komunitas",
    color: "#00B894",
    features: [
      "Buat event gratis tanpa batas",
      "Dashboard basic",
      "E-tiket digital",
      "Laporan penjualan dasar",
      "Pengaturan kategori tiket",
    ],
    details: "Paket Gratis dirancang khusus untuk penyelenggara event komunitas, webinar terbuka, atau pertemuan kasual tanpa biaya tiket. Nikmati kemudahan membuat halaman event, mendistribusikan e-tiket riil, dan mengelola daftar tamu tanpa memikirkan biaya platform. Cocok untuk Anda yang baru memulai atau ingin mengumpulkan audiens skala kecil hingga menengah secara leluasa.",
    cta: "premium terbaik",
    popular: false,
  },
  {
    name: "Pro",
    price: "Rp 1.000.000",
    desc: "Per tiket terjual — untuk event berbayar",
    color: "#6C5CE7",
    features: [
      "Semua fitur Gratis",
      "Dashboard analytics lengkap",
      "Multiple tipe tiket",
      "Kupon & promo",
      "Laporan penjualan detail",
      "Priority support",
    ],
    details: "Tingkatkan profesionalisme event berbayar Anda dengan Paket Pro. Dengan potongan rendah per tiket terjual, Anda mendapatkan akses ke analitik mendalam, pembuatan berbagai kategori tiket (Early Bird, VIP, Presale), serta fitur pemasaran seperti kode promo. Paket ini adalah pilihan favorit bagi kreator event yang ingin memaksimalkan penjualan dan mengoptimalkan konversi.",
    cta: "Pilih Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Rp 5.000.000",
    desc: "Untuk event besar & korporasi",
    color: "#FD79A8",
    features: [
      "Semua fitur Pro",
      "Dedicated account manager",
      "Custom branding",
      "API access",
      "SLA 99.9%",
      "White-label solution",
    ],
    details: "Solusi end-to-end bagi korporasi atau acara mega-skala. Paket Enterprise menawarkan kustomisasi penuh, integrasi API sistem, label putih (white-label) agar merek Anda tampil dominan, serta pendampingan langsung oleh Account Manager berdedikasi. Harga disesuaikan dengan kebutuhan volume dan spesifikasi teknis khusus yang Anda perlukan.",
    cta: "eksplore",
    popular: false,
  },
];

export default function Biaya() {
  const [selectedTier, setSelectedTier] = useState<typeof PRICING_TIERS[0] | null>(null);

  return (
    <div style={{ background: "var(--bg)", fontFamily: "Inter, sans-serif", minHeight: "100vh" }}>
      <Navbar />

      {selectedTier ? (
        /* Pricing Detail View (Focus) */
        <section style={{ padding: "64px 0 80px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
            <button 
              onClick={() => setSelectedTier(null)}
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
              ← Kembali ke Daftar Biaya
            </button>

            <div style={{ borderRadius: 24, background: "white", padding: "48px 40px", boxShadow: "0 10px 40px rgba(0,0,0,0.04)", borderTop: `8px solid ${selectedTier.color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: selectedTier.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "white", fontWeight: 700 }}>
                  {selectedTier.name.charAt(0)}
                </div>
                <div>
                  <h1 style={{ fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 800, color: "var(--text-primary)", margin: 0, lineHeight: 1.2 }}>
                    Paket {selectedTier.name}
                  </h1>
                  {selectedTier.popular && (
                    <span style={{ display: "inline-block", background: "var(--primary)", color: "white", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, marginTop: 8 }}>
                      PILIHAN POPULER
                    </span>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: 32, padding: "24px", background: "#F8F9FA", borderRadius: 16, border: "1px solid #E9ECEF" }}>
                <div style={{ fontSize: 14, color: "var(--text-secondary)", fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Harga / Biaya</div>
                <div style={{ fontSize: 48, fontWeight: 900, color: selectedTier.color }}>
                  {selectedTier.price}
                </div>
                <p style={{ fontSize: 15, color: "var(--text-secondary)", margin: "8px 0 0", fontWeight: 500 }}>
                  {selectedTier.desc}
                </p>
              </div>

              <div style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 40 }}>
                {selectedTier.details}
              </div>

              <div style={{ marginBottom: 40 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Fitur Lengkap:</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                  {selectedTier.features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15, color: "var(--text-secondary)" }}>
                      <span style={{ color: selectedTier.color, fontWeight: 700, background: `${selectedTier.color}15`, width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✓</span> 
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: "100%", padding: "16px", fontSize: 16, fontWeight: 700, background: selectedTier.color, borderColor: selectedTier.color }}>
                {selectedTier.cta} 
              </button>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Hero */}
          <section style={{ background: "linear-gradient(160deg, #F8F7FF 0%, #EDE9FF 50%, #FFF0F8 100%)", padding: "64px 0 48px" }}>
            <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EDE9FF", color: "var(--primary)", padding: "6px 14px", borderRadius: 100, fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
                <span>💰</span> Harga Transparan
              </div>
              <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, lineHeight: 1.2, color: "var(--text-primary)", margin: "0 0 16px" }}>
                Biaya{" "}
                <span style={{ background: "linear-gradient(135deg, #6C5CE7, #FD79A8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Sederhana & Transparan
                </span>
              </h1>
              <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>
                Tidak ada biaya tersembunyi. Bayar hanya ketika event Anda sukses.
              </p>
            </div>
          </section>

          {/* Pricing Cards */}
          <section style={{ background: "white", padding: "64px 0" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "stretch" }}>
                {PRICING_TIERS.map((tier) => (
                  <div
                    key={tier.name}
                    className="card-elevated"
                    onClick={() => setSelectedTier(tier)}
                    style={{
                      padding: "36px 28px",
                      position: "relative",
                      overflow: "hidden",
                      border: tier.popular ? "2px solid var(--primary)" : undefined,
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(108,92,231,0.12)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = ""; }}
                  >
                    {tier.popular && (
                      <div style={{ position: "absolute", top: 16, right: -28, background: "var(--primary)", color: "white", fontSize: 11, fontWeight: 700, padding: "4px 32px", transform: "rotate(45deg)" }}>
                        POPULER
                      </div>
                    )}
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: tier.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16, color: "white", fontWeight: 700 }}>
                      {tier.name.charAt(0)}
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 4px" }}>{tier.name}</h3>
                    <div style={{ fontSize: 36, fontWeight: 900, color: tier.color, margin: "8px 0" }}>{tier.price}</div>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "0 0 24px", lineHeight: 1.6 }}>{tier.desc}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28, flex: 1 }}>
                      {tier.features.map((f) => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-secondary)" }}>
                          <span style={{ color: tier.color, fontWeight: 700 }}>✓</span> {f}
                        </div>
                      ))}
                    </div>
                    <button className="btn btn-primary" style={{ width: "100%", background: tier.popular ? tier.color : "transparent", borderColor: tier.color, color: tier.popular ? "white" : tier.color }}>
                      Lihat Detail
                    </button>
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
