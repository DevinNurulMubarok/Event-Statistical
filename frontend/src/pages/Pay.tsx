import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/axiosClient";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const PAYMENT_METHODS = [
  { id: "BCA", label: "Bank BCA", accName: "PT Loket Digital", accNo: "014-9988-1122", icon: "🏦" },
  { id: "MANDIRI", label: "Bank Mandiri", accName: "PT Loket Digital", accNo: "137-0099-887766", icon: "🏢" },
  { id: "BNI", label: "Bank BNI", accName: "PT Loket Digital", accNo: "137-0099-887766", icon: "🏢" },
  { id: "BRI", label: "Bank BRI", accName: "PT Loket Digital", accNo: "137-0099-887766", icon: "🏢" },
  { id: "EWALLET", label: "E-Wallet (GoPay / OVO / ShopeePay / Dana)", accName: "LoketDigital", accNo: "0812-3456-7890", icon: "📱" }
];

export default function Pay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [proofUrl, setProofUrl] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0]);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: tx, isLoading, error } = useQuery({
    queryKey: ["transaction", id],
    queryFn: async () => {
      const res = await apiClient.get(`/transactions/${id}`);
      return res.data.data;
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!proofUrl) return toast.error("Silakan unggah bukti pembayaran");
    setLoading(true);
    try {
      await apiClient.put(`/transactions/${id}/proof`, { paymentProof: proofUrl });
      toast.success("Bukti pembayaran berhasil diunggah!");
      setIsSuccess(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal mengunggah bukti");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />
      <div className="max-w-xl mx-auto py-20 text-center skeleton h-64"></div>
    </div>
  );

  if (error || !tx) return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />
      <div className="max-w-xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold">Transaksi tidak ditemukan</h2>
        <button onClick={() => navigate("/my-tickets")} className="btn btn-primary mt-4">Kembali</button>
      </div>
    </div>
  );

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="card p-10 max-w-md w-full text-center animate-fade-up border border-[var(--primary)] shadow-2xl shadow-[#6C5CE733]">
            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-xl shadow-green-100">
              ✓
            </div>
            <h2 className="text-3xl font-black text-[var(--text-primary)] mb-3">
              Pembayaran Berhasil!
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
              Bukti tagihan Anda sedang diverifikasi. E-Tiket Anda akan segera tersedia dan status akan diupdate.
            </p>
            <button 
              onClick={() => navigate("/my-tickets")}
              className="btn btn-primary w-full py-4 text-lg font-bold shadow-lg shadow-[var(--primary-light)]">
              Lihat E-Tiket Saya
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-10 animate-fade-up">
        <div className="card p-8">
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mb-2 text-center">Pembayaran</h1>
          <p className="text-sm text-[var(--text-secondary)] text-center mb-8">Pilih metode dan unggah bukti transfer</p>

          <div className="bg-[var(--surface-2)] rounded-2xl p-6 mb-8 border border-[var(--border)]">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-[var(--border)]">
              <span className="text-sm text-[var(--text-secondary)]">Event</span>
              <span className="font-bold text-[var(--text-primary)] text-right leading-tight max-w-[60%]">{tx.event.title}</span>
            </div>
            <div className="flex justify-between items-center mb-0">
              <span className="text-sm text-[var(--text-secondary)]">Total Bayar</span>
              <span className="text-2xl font-black text-[var(--primary)]">IDR {tx.totalPrice.toLocaleString("id-ID")}</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">Pilih Metode Pembayaran</label>
            <div className="grid grid-cols-1 gap-3">
              {PAYMENT_METHODS.map((method) => (
                <div 
                  key={method.id}
                  onClick={() => setSelectedMethod(method)}
                  className={`p-4 border-2 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    selectedMethod.id === method.id 
                      ? 'border-[var(--primary)] bg-[var(--surface-2)] shadow-md shadow-[#6C5CE715]' 
                      : 'border-[var(--border)] bg-transparent hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{method.icon}</span>
                    <span className="font-bold text-[var(--text-primary)]">{method.label}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod.id === method.id ? 'border-[var(--primary)]' : 'border-gray-300'
                  }`}>
                    {selectedMethod.id === method.id && <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]"></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8 flex flex-col items-center">
            <p className="text-xs text-[var(--text-secondary)] mb-1">Transfer ke Rekening {selectedMethod.label}:</p>
            <p className="text-2xl font-black text-[var(--text-primary)] tracking-wider mb-1">{selectedMethod.accNo}</p>
            <p className="text-sm font-bold text-[var(--text-secondary)] uppercase">A.n. {selectedMethod.accName}</p>
          </div>

          <div className="space-y-4">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[var(--border)] rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--surface-2)] transition-all">
              {proofUrl ? (
                <img src={proofUrl} alt="Bukti" className="max-h-48 rounded-lg shadow-md" />
              ) : (
                <>
                  <span className="text-4xl mb-3">📸</span>
                  <p className="font-semibold text-[var(--text-primary)]">Klik untuk Unggah Bukti Transfer</p>
                  <p className="text-xs text-[var(--text-muted)]">Upload gambar (JPG/PNG)</p>
                </>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

            <button 
              onClick={handleSubmit}
              disabled={loading || !proofUrl}
              className="btn btn-primary w-full justify-center py-4 text-lg font-bold shadow-lg shadow-[var(--primary-light)]">
              {loading ? "Memproses..." : `Konfirmasi Pembayaran →`}
            </button>
            <button 
              onClick={() => navigate("/my-tickets")}
              className="btn btn-ghost w-full justify-center">
              Nanti Saja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
