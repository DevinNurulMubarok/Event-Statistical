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
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-8 animate-fade-in flex flex-col md:flex-row gap-8">
        
        <aside className="w-full md:w-64 glass-card p-4 flex flex-col gap-2 h-fit border-none">
          <button className={`p-3 text-left rounded ${activeTab === "overview" ? "bg-[var(--primary-color)] text-white font-bold" : "hover:bg-gray-800"}`} onClick={() => setActiveTab("overview")}>Overview</button>
          <button className={`p-3 text-left rounded ${activeTab === "events" ? "bg-[var(--primary-color)] text-white font-bold" : "hover:bg-gray-800"}`} onClick={() => setActiveTab("events")}>Manage Events</button>
          <button className={`p-3 text-left rounded ${activeTab === "marketing" ? "bg-[var(--primary-color)] text-white font-bold" : "hover:bg-gray-800"}`} onClick={() => setActiveTab("marketing")}>Marketing & Promo</button>
          <button className={`p-3 text-left rounded ${activeTab === "transactions" ? "bg-[var(--primary-color)] text-white font-bold" : "hover:bg-gray-800"}`} onClick={() => setActiveTab("transactions")}>Transactions</button>
        </aside>

        <main className="flex-1 flex flex-col gap-8">
          {activeTab === "overview" && (
            <>
              <h2 className="text-3xl font-bold">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 border-none">
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-green-400">IDR 19.55M</h3>
                </div>
                <div className="glass-card p-6 border-none">
                  <p className="text-gray-400 text-sm">Active Events</p>
                  <h3 className="text-2xl font-bold text-blue-400">12</h3>
                </div>
                <div className="glass-card p-6 border-none">
                  <p className="text-gray-400 text-sm">Pending Transactions</p>
                  <h3 className="text-2xl font-bold text-orange-400">5</h3>
                </div>
              </div>

              {/* Live Status Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 border-none flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--text-muted)] uppercase font-bold tracking-wider mb-1">Tiket Terjual Hari Ini</p>
                    <h4 className="text-3xl font-black text-white">42</h4>
                  </div>
                  <div className="text-3xl animate-pulse">🔥</div>
                </div>
                <div className="glass-card p-6 border-none flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--text-muted)] uppercase font-bold tracking-wider mb-1">Kunjungan Halaman</p>
                    <h4 className="text-3xl font-black text-white">1,204</h4>
                  </div>
                  <div className="text-3xl" style={{ color: "var(--primary-light)" }}>👁️</div>
                </div>
              </div>

              <div className="glass-card p-6 border-none">
                <h3 className="text-xl font-bold mb-4">Revenue Analytics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                    <XAxis dataKey="name" stroke="#8b949e" />
                    <YAxis stroke="#8b949e" />
                    <Tooltip contentStyle={{ backgroundColor: "#161b22", borderColor: "#30363d" }} />
                    <Area type="monotone" dataKey="revenue" stroke="#2f81f7" fill="#2f81f7" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {activeTab === "events" && (
            <div className="glass-card p-6 border-none">
              <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
              <form className="flex flex-col gap-4 max-w-lg">
                <input className="p-2 rounded bg-gray-800 border border-gray-600" placeholder="Event Title" />
                <textarea className="p-2 rounded bg-gray-800 border border-gray-600" placeholder="Description" rows={4}></textarea>
                <div className="flex gap-4">
                  <input type="number" className="p-2 rounded bg-gray-800 border border-gray-600 flex-1" placeholder="Price (IDR)" />
                  <input type="number" className="p-2 rounded bg-gray-800 border border-gray-600 flex-1" placeholder="Seats" />
                </div>
                <div className="flex gap-4">
                  <input type="date" className="p-2 text-gray-400 rounded bg-gray-800 border border-gray-600 flex-1" />
                  <input type="date" className="p-2 text-gray-400 rounded bg-gray-800 border border-gray-600 flex-1" />
                </div>
                <button className="bg-[var(--primary-color)] text-white py-2 rounded font-bold hover:brightness-110 transition">Save Event</button>
              </form>
            </div>
          )}

          {activeTab === "marketing" && (
            <div className="glass-card p-6 border-none">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Promo Code Management</h2>
                <button className="btn btn-primary btn-sm">Create New Promo</button>
              </div>
              <div className="overflow-x-auto text-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="p-3">Code</th>
                      <th className="p-3">Discount</th>
                      <th className="p-3">Usage</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="p-3 font-mono font-bold text-yellow-500">EARLYBIRD20</td>
                      <td className="p-3">20%</td>
                      <td className="p-3">45 / 50</td>
                      <td className="p-3"><span className="badge badge-success">Active</span></td>
                      <td className="p-3"><button className="text-red-400 hover:underline">Deactivate</button></td>
                    </tr>
                    <tr className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="p-3 font-mono font-bold text-yellow-500">TECHSUMMIT50</td>
                      <td className="p-3">IDR 50k</td>
                      <td className="p-3">120 / Unlimited</td>
                      <td className="p-3"><span className="badge badge-success">Active</span></td>
                      <td className="p-3"><button className="text-red-400 hover:underline">Deactivate</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="glass-card p-6 border-none">
              <h2 className="text-2xl font-bold mb-4">Pending Transactions</h2>
              <div className="overflow-x-auto text-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="p-3">User</th>
                      <th className="p-3">Event</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Proof</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="p-3">John Doe</td>
                      <td className="p-3">Tech Summit 2024</td>
                      <td className="p-3">IDR 500k</td>
                      <td className="p-3"><a href="#" className="text-blue-400 hover:underline">View Proof</a></td>
                      <td className="p-3 flex gap-2">
                        <button className="px-3 py-1 bg-green-600 rounded text-xs">Accept</button>
                        <button className="px-3 py-1 bg-red-600 rounded text-xs">Reject</button>
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
