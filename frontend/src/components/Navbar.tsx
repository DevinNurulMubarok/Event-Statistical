import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../store/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
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
              <>
                {user.role === "ORGANIZER" && (
                  <Link to="/dashboard" className="btn btn-ghost btn-sm no-underline hidden md:flex">
                    Dashboard
                  </Link>
                )}
                {/* Points badge */}
                <div className="hidden md:flex items-center gap-1.5 bg-[#FFF8E7] text-[#B07D00] px-3 py-1.5 rounded-full text-xs font-semibold">
                  <span>⭐</span>
                  <span>{user.pointsBalance.toLocaleString("id-ID")} pts</span>
                </div>
                {/* Avatar + dropdown */}
                <Link to="/profile" className="flex items-center gap-2 no-underline group">
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-[var(--text-primary)] hidden md:block group-hover:text-[var(--primary)]">
                    {user.name.split(" ")[0]}
                  </span>
                </Link>
                <button onClick={handleLogout}
                  className="btn btn-ghost btn-sm text-[var(--accent-orange)] hover:bg-red-50">
                  Logout
                </button>
              </>
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
              <>
                {user.role === "ORGANIZER" && (
                  <Link to="/dashboard" className="block py-2 px-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] no-underline rounded-lg hover:bg-[var(--surface-2)]">
                    Dashboard
                  </Link>
                )}
                <Link to="/profile" className="block py-2 px-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] no-underline rounded-lg hover:bg-[var(--surface-2)]">
                  Profile
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
