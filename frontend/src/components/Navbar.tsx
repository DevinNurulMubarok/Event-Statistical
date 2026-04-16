import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../store/useAuth";
import { 
  ChevronDown, 
  User, 
  Settings, 
  LogOut, 
  LayoutDashboard,
  Star
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setUserMenuOpen(false);
  };

  const navLinks = [
    { label: "Events", to: "/#events" },
    { label: "Biaya", to: "/biaya" },
    { label: "Blog", to: "/blog" },
    { label: "Pusat Bantuan", to: "/pusat-bantuan" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[var(--border)]"
      style={{ boxShadow: "0 1px 12px rgba(108,92,231,0.08)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-sm">L</div>
            <span className="font-extrabold text-xl text-[var(--text-primary)] tracking-tight">
              Loket<span className="text-[var(--primary)]">Digital</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.label} to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium no-underline transition-all
                  ${location.pathname === link.to
                    ? "bg-[#EDE9FF] text-[var(--primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--primary)]"
                  }`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-[var(--surface-2)] transition-colors border border-transparent hover:border-[var(--border)]"
                >
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden md:flex flex-col items-start leading-tight">
                    <span className="text-sm font-bold text-[var(--text-primary)]">
                      {user.name.split(" ")[0]}
                    </span>
                    <span className="text-[10px] text-[var(--text-secondary)] font-medium uppercase tracking-wider">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {userMenuOpen && (
                  <div className="dropdown-menu min-w-[220px]">
                    <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-2)]/30">
                      <p className="text-xs text-[var(--text-muted)] font-semibold mb-1 uppercase tracking-tighter">Your Balance</p>
                      <div className="flex items-center gap-2 text-[#B07D00]">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-extrabold">{(user.pointsBalance || 0).toLocaleString("id-ID")} pts</span>
                      </div>
                    </div>
                    
                    <div className="py-1">
                      {user.role === "ORGANIZER" && (
                        <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="dropdown-item">
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                      )}
                      <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="dropdown-item">
                        <User className="w-4 h-4" />
                        Profile Saya
                      </Link>
                      <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="dropdown-item">
                        <Settings className="w-4 h-4" />
                        Pengaturan
                      </Link>
                    </div>

                    <div className="border-t border-[var(--border)] py-1">
                      <button onClick={handleLogout} className="dropdown-item danger w-full text-left">
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm no-underline hidden md:flex">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm no-underline">
                  Daftar 
                </Link>
              </>
            )}
            {/* Mobile toggle */}
            <button className="md:hidden p-2 rounded-lg hover:bg-[var(--surface-2)]"
              onClick={() => setMobileOpen(!mobileOpen)}>
              <div className="space-y-1">
                <span className={`block w-5 h-0.5 bg-[var(--text-primary)] transition-all ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
                <span className={`block w-5 h-0.5 bg-[var(--text-primary)] transition-all ${mobileOpen ? "opacity-0" : ""}`}></span>
                <span className={`block w-5 h-0.5 bg-[var(--text-primary)] transition-all ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-3 border-t border-[var(--border)] animate-fade-in">
            {navLinks.map(link => (
              <Link key={link.label} to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block py-2 px-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] no-underline rounded-lg hover:bg-[var(--surface-2)]">
                {link.label}
              </Link>
            ))}
            {user && (
              <div className="mt-3 pt-3 border-t border-[var(--border)]">
                <div className="flex items-center gap-3 px-3 mb-4">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--text-primary)]">{user.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{user.role}</p>
                  </div>
                </div>
                {user.role === "ORGANIZER" && (
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block py-2 px-3 text-sm text-[var(--text-secondary)] no-underline rounded-lg hover:bg-[var(--surface-2)]">
                    Dashboard
                  </Link>
                )}
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="block py-2 px-3 text-sm text-[var(--text-secondary)] no-underline rounded-lg hover:bg-[var(--surface-2)]">
                  Profile Saya
                </Link>
                <button onClick={handleLogout} className="block w-full text-left py-2 px-3 text-sm text-[var(--accent-orange)] no-underline rounded-lg hover:bg-red-50">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
