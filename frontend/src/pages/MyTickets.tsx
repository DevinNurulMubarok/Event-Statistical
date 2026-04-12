import { useAuth } from "../store/useAuth";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/axiosClient";
import Navbar from "../components/Navbar";
import { Link } from "react-router";

const STATUS_CONFIG: Record<string, { label: string; badge: string; icon: string }> = {
  WAITING_PAYMENT: { label: "Menunggu Pembayaran", badge: "badge-warning", icon: "⏳" },
  WAITING_ADMIN:   { label: "Menunggu Konfirmasi", badge: "badge-info",    icon: "🔍" },
  DONE:            { label: "Selesai",              badge: "badge-success", icon: "✅" },
  REJECTED:        { label: "Ditolak",              badge: "badge-danger",  icon: "❌" },
  EXPIRED:         { label: "Kadaluarsa",           badge: "badge-neutral", icon: "🕐" },
  CANCELED:        { label: "Dibatalkan",            badge: "badge-neutral", icon: "🚫" },
};

interface Transaction {
  id: number;
  eventId: number;
  status: string;
  qty: number;
  totalPrice: number;
  discountApplied: number;
  pointsUsed: number;
  expiresAt: string;
  event: { title: string; startDate: string; location: string };
}

export default function MyTickets() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery<Transaction[]>({
    queryKey: ["my-transactions"],
    enabled: !!user,
    queryFn: async () => {
      const res = await apiClient.get("/transactions/my");
      return res.data.data as Transaction[];
    }
  });

  const getCountdown = (expiresAt: string) => {
    const diff = new Date(expiresAt).getTime() - Date.now();
    if (diff <= 0) return "Kadaluarsa";
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${h}j ${m}m ${s}d`;
  };

  if (!user) return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Login Diperlukan</h2>
        <Link to="/login" className="btn btn-primary btn-lg mt-4 no-underline">Login Sekarang</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-up">
        <div className="mb-8">
          <h1 className="section-title">Tiket Saya</h1>
          <p className="section-subtitle">Daftar transaksi dan tiket eventmu</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="card p-5 flex gap-4">
                <div className="skeleton w-20 h-20 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="skeleton h-5 w-2/3"></div>
                  <div className="skeleton h-3 w-1/2"></div>
                  <div className="skeleton h-3 w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : !data?.length ? (
          <div className="card text-center py-16">
            <div className="text-5xl mb-4">🎫</div>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">Belum ada tiket</h3>
            <p className="text-[var(--text-secondary)] text-sm mt-2">Temukan event menarik dan beli tiketmu sekarang!</p>
            <Link to="/" className="btn btn-primary btn-sm mt-4 no-underline">Cari Event</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {data.map(tx => {
              const cfg = STATUS_CONFIG[tx.status] || STATUS_CONFIG.EXPIRED;
              return (
                <div key={tx.id} className="card p-5 flex flex-col sm:flex-row gap-4">
                  <img src="/event-placeholder.png" alt="" className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h3 className="font-bold text-[var(--text-primary)] text-base">{tx.event?.title}</h3>
                      <span className={`badge ${cfg.badge}`}>{cfg.icon} {cfg.label}</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      {tx.qty} tiket · IDR {tx.totalPrice.toLocaleString("id-ID")}
                      {tx.pointsUsed > 0 && ` · Poin: −${tx.pointsUsed.toLocaleString("id-ID")}`}
                    </p>

                    {tx.status === "WAITING_PAYMENT" && (
                      <div className="mt-3 flex items-center gap-3 p-3 bg-[#FFF8E7] rounded-xl">
                        <div>
                          <p className="text-xs font-semibold text-[#B07D00]">⏳ Upload bukti bayar</p>
                          <p className="text-xs text-[#B07D00]">Batas: {getCountdown(tx.expiresAt)}</p>
                        </div>
                        <Link to={`/pay/${tx.id}`} className="btn btn-sm no-underline ml-auto"
                          style={{ background: "#FDCB6E", color: "#6D4C10" }}>
                          Upload Bukti
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
