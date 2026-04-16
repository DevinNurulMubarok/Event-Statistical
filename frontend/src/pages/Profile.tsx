import { useAuth } from "../store/useAuth";
import Navbar from "../components/Navbar";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { apiClient } from "../api/axiosClient";
import toast from "react-hot-toast";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t, i18n } = useTranslation();
  const { user, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<"profil" | "keamanan" | "referral" | "poin">("profil");
  
  // Basic Info States
  const [newName, setNewName] = useState(user?.name || "");
  const [newAvatarUrl, setNewAvatarUrl] = useState(user?.avatarUrl || "");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Appearance State
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "Light");
  
  // Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme === "Dark" ? "dark" : "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (!user) return null;

  const handleUpdateProfile = async () => {
    setIsSavingProfile(true);
    try {
      const res = await apiClient.put("/users/profile", { name: newName, avatarUrl: newAvatarUrl });
      updateUser(res.data.data);
      toast.success(t('profile.success'));
    } catch (err: any) {
      toast.error(err.response?.data?.message || t('profile.error'));
    } finally {
      setIsSavingProfile(false);
    }
  }

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const tabs = [
    { id: "profil", label: t('tabs.profile'), icon: "👤" },
    { id: "keamanan", label: t('tabs.security'), icon: "🛡️" },
    { id: "referral", label: t('tabs.referral'), icon: "🎁" },
    { id: "poin", label: t('tabs.points'), icon: "⭐" },
  ] as const;

  return (
    <div className="min-h-screen bg-[var(--bg)] font-sans transition-colors duration-300">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-72 shrink-0 space-y-2">
            
            <Link to="/" className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-[var(--text-secondary)] hover:bg-[var(--surface-2)] transition-all mb-4 group no-underline">
              <span className="text-xl group-hover:-translate-x-1 transition-transform">⬅️</span>
              {t('navbar.home')}
            </Link>

            <div className="card p-6 mb-6 text-center border-none shadow-xl bg-gradient-to-br from-white to-[var(--surface-2)] dark:from-[var(--surface)] dark:to-[var(--surface)]">
               <div className="relative inline-block group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center text-white font-black text-4xl shadow-2xl overflow-hidden ring-4 ring-white ring-offset-2 transition-transform group-hover:scale-105 duration-300">
                    {newAvatarUrl || user.avatarUrl ? (
                      <img 
                        src={(newAvatarUrl || user.avatarUrl) as string} 
                        alt={user.name} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center border border-[var(--border)] hover:scale-110 transition-all text-xl">
                    📷
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setNewAvatarUrl(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }} />
               </div>
               <h2 className="mt-4 text-xl font-bold text-[var(--text-primary)]">{user.name}</h2>
               <p className="text-sm text-[var(--text-secondary)]">{user.email}</p>
            </div>

            <nav className="space-y-1">
              {tabs.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === tab.id 
                    ? "bg-[var(--primary)] text-white shadow-xl shadow-[var(--primary-light)] scale-[1.02]" 
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)]"
                  }`}>
                  <span className="text-xl">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>

            <button onClick={logout} className="w-full mt-8 flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
              <span>🚪</span> {t('profile.logout_btn')}
            </button>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 space-y-6">
            
            {/* Profil Dasar */}
            {activeTab === "profil" && (
              <div className="card p-8 space-y-8 animate-fade-in border-none shadow-xl bg-white dark:bg-[var(--surface)]">
                <div>
                  <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">{t('profile.title')}</h1>
                  <p className="text-[var(--text-secondary)]">{t('profile.subtitle')}</p>
                </div>

                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">{t('profile.name')}</label>
                    <input className="input w-full text-lg py-5 px-6 rounded-xl border-2 focus:border-[var(--primary)] transition-all" value={newName} onChange={e => setNewName(e.target.value)} placeholder={t('profile.name_placeholder')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">{t('profile.email')}</label>
                    <input className="input w-full bg-[var(--surface-2)] opacity-70 cursor-not-allowed text-lg py-5 px-6 rounded-xl" value={user.email} disabled />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">{t('profile.language')}</label>
                    <select value={i18n.language} onChange={e => handleLanguageChange(e.target.value)} className="input w-full text-lg py-4 px-6 appearance-none rounded-xl border-2 cursor-pointer outline-none">
                      <option value="id">Bahasa Indonesia</option>
                      <option value="en">English (US)</option>
                    </select>
                  </div>
                </div>

                <button onClick={handleUpdateProfile} disabled={isSavingProfile} className="btn btn-primary w-full py-5 text-lg font-bold shadow-xl shadow-[var(--primary-light)] rounded-xl transform active:scale-95 transition-all">
                  {isSavingProfile ? t('profile.saving') : t('profile.save_btn')}
                </button>
              </div>
            )}

            {/* Keamanan */}
            {activeTab === "keamanan" && (
              <div className="space-y-6 animate-fade-in">
                <div className="card p-8 border-none shadow-xl bg-white dark:bg-[var(--surface)]">
                  <h2 className="text-2xl font-black text-[var(--text-primary)] mb-6">{t('security.title')}</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--surface-2)] transition-all group">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🔑</div>
                        <div>
                          <p className="font-bold text-[var(--text-primary)]">{t('security.password')}</p>
                          <p className="text-xs text-[var(--text-secondary)]">{t('security.password_desc')}</p>
                        </div>
                      </div>
                      <button onClick={() => setIsPasswordModalOpen(true)} className="btn btn-ghost text-[var(--primary)] font-bold text-sm tracking-widest hover:bg-[var(--primary-light)]">{t('security.change_btn')}</button>
                    </div>
                  </div>
                </div>

                <div className="card p-8 border-none shadow-xl bg-white dark:bg-[var(--surface)]">
                  <h2 className="text-2xl font-black text-[var(--text-primary)] mb-6">{t('security.personalization')}</h2>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl hover:bg-[var(--surface-2)] transition-all">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-xl flex items-center justify-center text-2xl">🎨</div>
                      <div>
                        <p className="font-bold text-[var(--text-primary)]">{t('security.theme')}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{t('security.theme_desc')}</p>
                      </div>
                    </div>
                    <div className="flex bg-[var(--surface-2)] p-1 rounded-xl w-fit">
                      {["Light", "Dark"].map(tName => (
                        <button key={tName} onClick={() => setTheme(tName)} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${theme === tName ? "bg-white text-[var(--primary)] shadow-md" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"}`}>
                          {tName === "Light" ? t('security.light') : t('security.dark')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Referral */}
            {activeTab === "referral" && (
              <div className="card p-8 animate-fade-in border-none shadow-xl bg-white dark:bg-[var(--surface)]">
                 <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">{t('referral.title')}</h2>
                 <p className="text-[var(--text-secondary)] mb-8">{t('referral.subtitle')}</p>
                 <div className="bg-gradient-to-br from-[var(--primary-light)] to-[var(--secondary-light)] p-10 rounded-[2.5rem] text-center border-2 border-dashed border-[var(--primary)] border-opacity-30">
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--primary-dark)] mb-3">{t('referral.your_code')}</p>
                    <span className="text-5xl font-black text-[var(--primary-dark)] tracking-tighter select-all">REF-{user.id + 1000}</span>
                    <button className="block mx-auto mt-6 btn btn-primary px-10 py-3 rounded-full shadow-lg transform hover:scale-105 active:scale-95 transition-all" onClick={() => {
                        navigator.clipboard.writeText(`REF-${user.id + 1000}`);
                        toast.success("Copied!");
                    }}>
                      {t('referral.copy_btn')}
                    </button>
                 </div>
              </div>
            )}

            {/* Poin */}
            {activeTab === "poin" && (
              <div className="card p-8 animate-fade-in text-center py-24 border-none shadow-xl bg-white dark:bg-[var(--surface)]">
                 <div className="w-24 h-24 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-inner animate-bounce">⭐</div>
                 <h2 className="text-3xl font-black text-[var(--text-primary)]">{t('points.title')}</h2>
                 <p className="text-6xl font-black text-[var(--primary)] mt-6 drop-shadow-md">{(user.pointsBalance || 0).toLocaleString(i18n.language === "id" ? "id-ID" : "en-US")}</p>
                 <p className="text-[var(--text-secondary)] mt-4 font-medium">{t('points.desc')}</p>
                 
                 <div className="mt-12 p-6 border-2 border-dashed border-[var(--border)] rounded-2xl opacity-60">
                    <p className="text-sm italic">{t('points.history_placeholder')}</p>
                 </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* Shared Modals */}
      <ChangePasswordModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
    </div>
  );
}
