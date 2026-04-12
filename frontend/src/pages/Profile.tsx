import { useAuth } from "../store/useAuth";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link } from "react-router";

export default function Profile() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"info" | "referral" | "points">("info");

  if (!user) return null;

  const tabs = [
    { key: "info",     label: "Info Akun",    icon: "👤" },
    { key: "referral", label: "Referral",     icon: "🎁" },
    { key: "points",   label: "Poin & Hadiah", icon: "⭐" },
  ] as const;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-up">

        {/* Profile Header */}
        <div className="card p-6 mb-6 flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-white font-extrabold text-3xl"
            style={{ boxShadow: "var(--shadow-md)" }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">{user.name}</h1>
            <p className="text-[var(--text-secondary)] text-sm">{user.email}</p>
            <div className="flex gap-2 mt-2">
              <span className={`badge ${user.role === "ORGANIZER" ? "badge-primary" : "badge-info"}`}>
                {user.role === "ORGANIZER" ? "🎪 Penyelenggara" : "🎫 Penonton"}
              </span>
              <span className="badge badge-warning">⭐ {user.pointsBalance.toLocaleString("id-ID")} poin</span>
            </div>
          </div>
          <button onClick={logout} className="btn btn-ghost btn-sm text-[var(--accent-orange)] hover:bg-red-50">
            Keluar
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-1 rounded-xl border border-[var(--border)]" style={{ boxShadow: "var(--shadow-sm)" }}>
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 justify-center ${
                activeTab === tab.key
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)]"
              }`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "info" && (
          <div className="card p-6 animate-fade-in">
            <h2 className="font-bold text-[var(--text-primary)] mb-4">Informasi Akun</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Nama Lengkap</label>
                <input className="input" defaultValue={user.name} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Email</label>
                <input className="input" defaultValue={user.email} disabled style={{ background: "var(--surface-2)" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Password Baru</label>
                <input type="password" className="input" placeholder="Kosongkan jika tidak ingin ganti" />
              </div>
              <button className="btn btn-primary w-full justify-center py-3">💾 Simpan Perubahan</button>
            </div>
          </div>
        )}

        {activeTab === "referral" && (
          <div className="card p-6 animate-fade-in">
            <h2 className="font-bold text-[var(--text-primary)] mb-4">Program Referral</h2>
            <div className="bg-gradient-to-r from-[#EDE9FF] to-[#FFE8F5] rounded-xl p-5 mb-5 text-center">
              <p className="text-sm text-[var(--text-secondary)] mb-2">Kode Referral Kamu</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-extrabold text-[var(--primary)] tracking-widest"
                  style={{ fontFamily: "monospace" }}>
                  {/* Would come from user object */}
                  REFCODE
                </span>
                <button className="btn btn-primary btn-sm"
                  onClick={() => navigator.clipboard.writeText("REFCODE")}>
                  📋 Copy
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card p-4 text-center" style={{ border: "none", background: "var(--surface-2)" }}>
                <div className="text-2xl font-extrabold text-[var(--primary)]">0</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">Teman diajak</div>
              </div>
              <div className="card p-4 text-center" style={{ border: "none", background: "var(--surface-2)" }}>
                <div className="text-2xl font-extrabold text-[#B07D00]">0</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">Poin dari referral</div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="bg-[#FFF8E7] rounded-xl p-4 text-sm">
              <p className="font-semibold text-[#B07D00] mb-1">💡 Cara kerja referral:</p>
              <ul className="text-[#8A6200] text-xs space-y-1 list-disc list-inside">
                <li>Bagikan kode referralmu ke teman</li>
                <li>Teman mendaftar dengan kodemu → mereka dapat kupon diskon 10%</li>
                <li>Kamu dapat 10.000 poin (berlaku 10 bulan)</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "points" && (
          <div className="card p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-[var(--text-primary)]">Saldo Poin</h2>
              <div className="flex items-center gap-2 bg-[#FFF8E7] px-4 py-2 rounded-full">
                <span className="text-lg">⭐</span>
                <span className="font-extrabold text-[#B07D00] text-lg">{user.pointsBalance.toLocaleString("id-ID")}</span>
                <span className="text-xs text-[#8A6200]">poin</span>
              </div>
            </div>
            <div className="bg-[var(--surface-2)] rounded-xl p-4 text-sm text-[var(--text-secondary)] text-center py-8">
              <div className="text-3xl mb-2">📋</div>
              <p>Riwayat poin akan muncul di sini</p>
            </div>
            <div className="divider"></div>
            <div className="bg-[#EDE9FF] rounded-xl p-4 text-sm">
              <p className="font-semibold text-[var(--primary)] mb-1">💡 Cara pakai poin:</p>
              <ul className="text-[var(--primary-dark)] text-xs space-y-1 list-disc list-inside">
                <li>Poin langsung mengurangi harga tiket</li>
                <li>1 poin = IDR 1 diskon</li>
                <li>Poin kadaluarsa 10 bulan setelah diterima</li>
              </ul>
            </div>
          </div>
        )}

        {user.role === "CUSTOMER" && (
          <div className="mt-4">
            <Link to="/my-tickets" className="btn btn-secondary w-full justify-center py-3 no-underline">
              🎫 Lihat Tiket Saya
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
