import Navbar from "../components/Navbar";

const PRICING_TIERS = [
  {
    name: "Gratis",
    price: "Rp 0",
    desc: "Untuk event gratis dan komunitas",
    color: "#00B894",
    features: [
      "Buat event gratis tanpa batas",
      "Dashboard basic",
      "E-tiket digital",
      "Laporan penjualan dasar",
    ],
    cta: "Mulai Gratis",
    popular: false,
  },
  {
    name: "Pro",
    price: "2.5%",
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
    cta: "Mulai Sekarang",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
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
    cta: "Hubungi Kami",
    popular: false,
  },
];

export default function Biaya() {
  return (
    <div style={{ background: "var(--bg)", fontFamily: "Inter, sans-serif", minHeight: "100vh" }}>
      <Navbar />

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
                style={{
                  padding: "36px 28px",
                  position: "relative",
                  overflow: "hidden",
                  border: tier.popular ? "2px solid var(--primary)" : undefined,
                  display: "flex",
                  flexDirection: "column",
                }}
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
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
