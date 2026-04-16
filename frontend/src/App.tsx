import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetail from "./pages/EventDetail";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyTickets from "./pages/MyTickets";
import Pay from "./pages/Pay";
import PusatBantuan from "./pages/PusatBantuan";
import Biaya from "./pages/Biaya";
import Blog from "./pages/Blog";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="App text-[var(--text-color)] min-h-screen">
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/pay/:id" element={<Pay />} />
        <Route path="/pusat-bantuan" element={<PusatBantuan />} />
        <Route path="/biaya" element={<Biaya />} />
        <Route path="/blog" element={<Blog />} />
        
        {/* Protected Dashboard Route for Organizers */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute role="ORGANIZER">
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}
