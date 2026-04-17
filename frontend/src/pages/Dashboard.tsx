import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Navbar from "../components/Navbar";
import { useAuth } from "../store/useAuth";

const data = [
  { name: "Mon", revenue: 4000 },
  { name: "Tue", revenue: 3000 },
  { name: "Wed", revenue: 2000 },
  { name: "Thu", revenue: 2780 },
  { name: "Fri", revenue: 1890 },
  { name: "Sat", revenue: 2390 },
  { name: "Sun", revenue: 3490 },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  if (user?.role !== "ORGANIZER") {
    return <div className="p-8 text-center text-red-500">Access Denied</div>;
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />
      <div className="max-w-6xl mx-auto p-8 animate-fade-in flex flex-col md:flex-row gap-8">
        
        <aside className="w-full md:w-64 card p-4 flex flex-col gap-2 h-fit">
          <button className={`py-3 px-4 text-sm text-left rounded-lg transition-all ${activeTab === "overview" ? "bg-[var(--primary)] text-white font-bold shadow-md shadow-[var(--primary-light)]" : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--primary)]"}`} onClick={() => setActiveTab("overview")}>Overview</button>
          <button className={`py-3 px-4 text-sm text-left rounded-lg transition-all ${activeTab === "events" ? "bg-[var(--primary)] text-white font-bold shadow-md shadow-[var(--primary-light)]" : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--primary)]"}`} onClick={() => setActiveTab("events")}>Manage Events</button>
          <button className={`py-3 px-4 text-sm text-left rounded-lg transition-all ${activeTab === "marketing" ? "bg-[var(--primary)] text-white font-bold shadow-md shadow-[var(--primary-light)]" : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--primary)]"}`} onClick={() => setActiveTab("marketing")}>Marketing & Promo</button>
          <button className={`py-3 px-4 text-sm text-left rounded-lg transition-all ${activeTab === "transactions" ? "bg-[var(--primary)] text-white font-bold shadow-md shadow-[var(--primary-light)]" : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--primary)]"}`} onClick={() => setActiveTab("transactions")}>Transactions</button>
        </aside>

        <main className="flex-1 flex flex-col gap-8">
          {activeTab === "overview" && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-3xl font-bold text-[var(--text-primary)]">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6">
                  <p className="text-[var(--text-secondary)] text-sm mb-1">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-green-500">IDR 20.000.000</h3>
                </div>
                <div className="card p-6">
                  <p className="text-[var(--text-secondary)] text-sm mb-1">Active Events</p>
                  <h3 className="text-2xl font-bold text-blue-500">50</h3>
                </div>
                <div className="card p-6">
                  <p className="text-[var(--text-secondary)] text-sm mb-1">Pending Transactions</p>
                  <h3 className="text-2xl font-bold text-orange-500">100</h3>
                </div>
              </div>

              {/* Live Status Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--text-muted)] uppercase font-bold tracking-wider mb-1">Tiket Terjual Hari Ini</p>
                    <h4 className="text-3xl font-black text-[var(--text-primary)]">90</h4>
                  </div>
                  <div className="text-3xl animate-pulse">🔥</div>
                </div>
                <div className="card p-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--text-muted)] uppercase font-bold tracking-wider mb-1">Kunjungan Halaman</p>
                    <h4 className="text-3xl font-black text-[var(--text-primary)]">5,890</h4>
                  </div>
                  <div className="text-3xl">👁️</div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Revenue Analytics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip contentStyle={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
                    <Area type="monotone" dataKey="revenue" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === "events" && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Create New Event</h2>
              <form className="flex flex-col gap-4 max-w-lg">
                <input className="input" placeholder="Event Title" />
                <textarea className="input" placeholder="Description" rows={4}></textarea>
                <div className="flex gap-4">
                  <input type="number" className="input flex-1" placeholder="Price (IDR)" />
                  <input type="number" className="input flex-1" placeholder="Seats" />
                </div>
                <div className="flex gap-4">
                  <input type="date" className="input flex-1" />
                  <input type="date" className="input flex-1" />
                </div>
                <button className="btn btn-primary justify-center font-bold">Save Event</button>
              </form>
            </div>
          )}

          {activeTab === "marketing" && (
            <div className="card p-6 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">Promo Code Management</h2>
                <button className="btn btn-primary btn-sm">Create New Promo</button>
              </div>
              <div className="overflow-x-auto text-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--border)] text-[var(--text-secondary)]">
                      <th className="p-3">Code</th>
                      <th className="p-3">Discount</th>
                      <th className="p-3">Usage</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--text-primary)]">
                    <tr className="border-b border-[var(--border)] hover:bg-[var(--surface-2)]">
                      <td className="p-3 font-mono font-bold text-[var(--accent-yellow)]">EARLYBIRD20</td>
                      <td className="p-3">20%</td>
                      <td className="p-3">100 / 150</td>
                      <td className="p-3"><span className="badge badge-success">Active</span></td>
                      <td className="p-3"><button className="text-[var(--accent-orange)] hover:underline">Deactivate</button></td>
                    </tr>
                    <tr className="border-b border-[var(--border)] hover:bg-[var(--surface-2)]">
                      <td className="p-3 font-mono font-bold text-[var(--accent-yellow)]">TECHSUMMIT50</td>
                      <td className="p-3">IDR 50k</td>
                      <td className="p-3">120 / Unlimited</td>
                      <td className="p-3"><span className="badge badge-success">Active</span></td>
                      <td className="p-3"><button className="text-[var(--accent-orange)] hover:underline">Deactivate</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Pending Transactions</h2>
              <div className="overflow-x-auto text-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--border)] text-[var(--text-secondary)]">
                      <th className="p-3">User</th>
                      <th className="p-3">Event</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Proof</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--text-primary)]">
                    <tr className="border-b border-[var(--border)] hover:bg-[var(--surface-2)]">
                      <td className="p-3 font-semibold">John Doe</td>
                      <td className="p-3">Tech Summit 2024</td>
                      <td className="p-3 font-bold">IDR 500k</td>
                      <td className="p-3"><a href="#" className="text-[var(--primary)] hover:underline">View Proof</a></td>
                      <td className="p-3 flex gap-2">
                        <button className="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-lg hover:bg-green-200">Accept</button>
                        <button className="px-3 py-1 bg-red-100 text-red-700 font-bold rounded-lg hover:bg-red-200">Reject</button>
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded-lg hover:bg-blue-200">Detail</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
