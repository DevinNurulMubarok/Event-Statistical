import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { apiClient } from "../api/axiosClient";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", role: "CUSTOMER", referralCodeUsed: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await apiClient.post("/auth/register", formData);
      navigate("/login");
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg,#F7F8FC 0%,#EDE9FF 100%)" }}>
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#00B894 0%,#55EFC4 50%,#74B9FF 100%)" }}>
        <div className="relative text-center text-white z-10 animate-fade-up">
          <div className="text-6xl mb-6 animate-float">🚀</div>
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">Mulai Perjalananmu<br />Bersama Kami</h2>
          <p className="text-white/80 text-lg">Daftar sekarang dan dapatkan poin reward gratis!</p>
          <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-sm">
            <p className="font-semibold">🎁 Bonus Referral</p>
            <p className="text-white/70 mt-1">Ajak teman dan dapatkan<br/>10.000 poin per referral!</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-fade-up">
          <div className="bg-white rounded-2xl p-8" style={{ boxShadow: "var(--shadow-xl)" }}>
            <div className="text-center mb-8">
              <div className="inline-flex w-12 h-12 rounded-xl items-center justify-center text-white font-bold text-xl mb-4"
                style={{ background: "linear-gradient(135deg,#00B894,#74B9FF)" }}>L</div>
              <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Buat Akun Baru</h1>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Sudah punya akun? <Link to="/login" className="text-[var(--primary)] font-semibold">Masuk di sini</Link>
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-4 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Nama Lengkap</label>
                <input type="text" className="input" placeholder="masukan nama anda"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Email / Username</label>
                <input type="text" className="input" placeholder="masukan email anda"
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} className="input pr-10"
                    placeholder="masukan password anda" value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Role selection */}
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Daftar sebagai</label>
                <div className="grid grid-cols-2 gap-3">
                  {["CUSTOMER", "ORGANIZER"].map(role => (
                    <button type="button" key={role}
                      onClick={() => setFormData({...formData, role})}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        formData.role === role
                        ? "border-[var(--primary)] bg-[#EDE9FF] text-[var(--primary)]"
                        : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary-light)]"
                      }`}>
                      <div className="text-xl mb-1">{role === "CUSTOMER" ? "🎫" : "🎪"}</div>
                      <div className="text-sm font-semibold">{role === "CUSTOMER" ? "Penonton" : "Penyelenggara"}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">
                  Kode Referral <span className="text-[var(--text-muted)] font-normal">(opsional)</span>
                </label>
                <input className="input" placeholder="Masukkan kode referral teman"
                  value={formData.referralCodeUsed}
                  onChange={e => setFormData({...formData, referralCodeUsed: e.target.value})} />
                {formData.referralCodeUsed && (
                  <p className="text-xs text-[var(--secondary)] mt-1">🎁 Kamu akan mendapat kupon diskon 10%!</p>
                )}
              </div>

              <button type="submit" disabled={loading}
                className="btn btn-primary w-full justify-center py-3 mt-2 text-base"
                style={{ borderRadius: "var(--radius-md)" }}>
                {loading ? "Mendaftar..." : "Buat Akun Gratis →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
