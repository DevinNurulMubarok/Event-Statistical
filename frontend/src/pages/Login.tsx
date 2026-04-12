import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { apiClient } from "../api/axiosClient";
import { useAuth } from "../store/useAuth";

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await apiClient.post("/auth/login", { email, password });
      setAuth(res.data.data.token, res.data.data.user);
      navigate("/profile");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login gagal";
      setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message || message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg,#F7F8FC 0%,#EDE9FF 100%)" }}>
      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-1 gradient-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#6C5CE7 0%,#A29BFE 50%,#FD79A8 100%)" }}></div>
        <div className="relative text-center text-white z-10 animate-fade-up">
          <div className="text-6xl mb-6 animate-float">🎫</div>
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">Selamat Datang<br />di LoketDigital</h2>
          <p className="text-white/80 text-lg">Temukan dan ikuti ribuan event menarik di seluruh Indonesia.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
          style={{ background: "radial-gradient(ellipse at 50% 100%,white,transparent 70%)" }}></div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-fade-up">
          <div className="bg-white rounded-2xl p-8" style={{ boxShadow: "var(--shadow-xl)" }}>
            <div className="text-center mb-8">
              <div className="inline-flex w-12 h-12 rounded-xl gradient-primary items-center justify-center text-white font-bold text-xl mb-4">L</div>
              <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Masuk Akun</h1>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Belum punya akun? <Link to="/register" className="text-[var(--primary)] font-semibold">Daftar</Link></p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-4 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Email / Username</label>
                <input type="text" className="input" placeholder="masukan email anda"   
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} className="input pr-10"
                    placeholder="masukan password  anda " value={password}
                    onChange={e => setPassword(e.target.value)} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="btn btn-primary w-full justify-center py-3 mt-2 text-base"
                style={{ borderRadius: "var(--radius-md)" }}>
                {loading ? "Memproses..." : "Masuk →"}
              </button>
            </form>

            <div className="divider"></div>
            <p className="text-center text-xs text-[var(--text-muted)]">
              Dengan masuk, kamu menyetujui <span className="text-[var(--primary)]">Syarat & Ketentuan</span> LoketDigital.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
