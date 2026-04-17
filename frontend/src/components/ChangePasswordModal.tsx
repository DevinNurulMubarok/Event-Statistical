import { useState } from "react";
import { apiClient } from "../api/axiosClient";
import toast from "react-hot-toast";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("Konfirmasi password tidak cocok");
    }
    if (newPassword.length < 6) {
      return toast.error("Password minimal 6 karakter");
    }

    setIsLoading(true);
    try {
      await apiClient.put("/users/change-password", {
        currentPassword,
        newPassword
      });
      toast.success("Password berhasil diubah!");
      onClose();
      // Reset fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal mengubah password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative bg-white dark:bg-[#1A1C1E] w-full max-w-md rounded-3xl shadow-2xl border border-[var(--border)] overflow-hidden animate-zoom-in">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Ganti Kata Sandi</h2>
              <p className="text-xs text-[var(--text-secondary)] mt-1">Gunakan kombinasi yang kuat untuk keamanan akun Anda.</p>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--surface-2)] text-[var(--text-secondary)] transition-colors">
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">Kata Sandi Saat Ini</label>
              <input 
                type="password"
                className="input w-full"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="divider"></div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">Kata Sandi Baru</label>
              <input 
                type="password"
                className="input w-full"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">Konfirmasi Kata Sandi Baru</label>
              <input 
                type="password"
                className="input w-full"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button 
                type="button"
                onClick={onClose}
                className="btn border border-[var(--border)] text-[var(--text-secondary)] flex-1 justify-center py-3 hover:bg-[var(--surface-2)]">
                Batal
              </button>
              <button 
                type="submit"
                disabled={isLoading}
                className="btn btn-primary flex-1 justify-center py-3 shadow-lg shadow-[var(--primary-light)]">
                {isLoading ? "Memproses..." : "Simpan Sandi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
