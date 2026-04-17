import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/axiosClient";
import Navbar from "../components/Navbar";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { useAuth } from "../store/useAuth";
import type { Event } from "../types/event";

import mockEvents from "../data/events.json";
import SocialShare from "../components/SocialShare";
import ReviewsSection from "../components/ReviewsSection";
import EventCard from "../components/EventCard";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [qty, setQty] = useState(1);
  const [pointsUsed, setPointsUsed] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: event, isLoading } = useQuery<Event>({
    queryKey: ["event", id],
    queryFn: async () => {
      try {
        const res = await apiClient.get(`/events/${id}`);
        if (res.data.data) {
          const fetchedEvent = res.data.data as Event;
          const match = mockEvents.find(e => e.title === fetchedEvent.title);
          if (match) (fetchedEvent as any).imageUrl = match.imageUrl;
          return fetchedEvent;
        }
      } catch (err) {
        console.warn("API event fetch failed, trying mock fallback", err);
      }
      
      const mockEvent = mockEvents.find(e => e.id.toString() === id);
      if (mockEvent) return mockEvent as Event;
      
      throw new Error("Event not found");
    }
  });

  const totalPrice = event ? Math.max(0, event.price * qty - pointsUsed) : 0;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      await apiClient.post("/transactions/checkout", {
        eventId: Number(id), qty, pointsUsed, couponCode, voucherCode
      });
      setDialogOpen(false);
      navigate("/my-tickets");
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Checkout gagal");
      setDialogOpen(false);
    } finally {
      setLoading(false);
    }
  };



  const similarEvents = mockEvents
    .filter(e => e.category === event?.category && e.id.toString() !== id)
    .slice(0, 3);

  if (isLoading) return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col gap-4">
        <div className="skeleton h-8 w-3/4"></div>
        <div className="skeleton h-4 w-1/2"></div>
        <div className="skeleton h-64 w-full"></div>
      </div>
    </div>
  );

  if (!event) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
      <Navbar />
      <div className="text-center p-8">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Event tidak ditemukan</h2>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Hero Image */}
            <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
              <img src={(event as any).imageUrl || "/event-placeholder.png"} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)" }}></div>
              <div className="absolute bottom-4 left-4">
                <span className={`badge ${event.price === 0 ? "badge-success" : "badge-primary"} text-sm`}>
                  {event.price === 0 ? "GRATIS" : event.category}
                </span>
              </div>
            </div>

            {/* Event Info */}
            <div className="card p-6 mb-6">
              <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-3">{event.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)] mb-6">
                <div className="flex items-center gap-2">
                  📅 {new Date(event.startDate).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </div>
                <div className="flex items-center gap-2">
                  📍 {event.location}
                </div>
                <div className="flex items-center gap-2">
                  🎫 {event.availableSeats} kursi tersisa dari {event.totalSeats}
                </div>
              </div>

              {/* Share */}
              <div className="mb-6 p-4 bg-[var(--surface-2)] rounded-2xl border border-[var(--border)]">
                <SocialShare title={event.title} url={window.location.href} />
              </div>
              {/* Seat Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1">
                  <span>Ketersediaan Kursi</span>
                  <span>{Math.round(((event.totalSeats - event.availableSeats) / event.totalSeats) * 100)}% terjual</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: "var(--border)" }}>
                  <div className="h-2 rounded-full bg-[var(--primary)] transition-all"
                    style={{ width: `${((event.totalSeats - event.availableSeats) / event.totalSeats) * 100}%` }}></div>
                </div>
              </div>
              <div className="divider"></div>
              <h3 className="font-bold text-[var(--text-primary)] mb-3">Deskripsi Event</h3>
              <p className="text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed">{event.description}</p>
            </div>

            {/* Organizer */}
            {event.organizer && (
              <div className="card p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                  {event.organizer.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Diselenggarakan oleh</p>
                  <p className="font-semibold text-[var(--text-primary)]">{event.organizer.name}</p>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="mt-10">
              <ReviewsSection />
            </div>

            {/* Similar Events */}
            {similarEvents.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Event Serupa</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {similarEvents.map((e) => (
                    <EventCard key={e.id} event={e as any} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Checkout Sidebar */}
          <div className="lg:w-80 flex flex-col gap-4">
            <div className="card p-6 sticky top-24">
              <div className="mb-4">
                {event.price === 0 ? (
                  <div className="text-3xl font-extrabold text-[var(--secondary)]">GRATIS</div>
                ) : (
                  <>
                    <p className="text-sm text-[var(--text-muted)]">Harga per tiket</p>
                    <div className="text-3xl font-extrabold text-[var(--primary)]">
                      IDR {event.price.toLocaleString("id-ID")}
                    </div>
                  </>
                )}
              </div>

              {user ? (
                <div className="flex flex-col gap-3">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2 text-sm">{error}</div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">Jumlah Tiket</label>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setQty(Math.max(1, qty - 1))}
                        className="btn btn-ghost" style={{ minWidth: 36, height: 36, justifyContent: "center" }}>−</button>
                      <span className="flex-1 text-center font-bold text-lg">{qty}</span>
                      <button onClick={() => setQty(Math.min(event.availableSeats, qty + 1))}
                        className="btn btn-ghost" style={{ minWidth: 36, height: 36, justifyContent: "center" }}>+</button>
                    </div>
                  </div>

                  {user.pointsBalance > 0 && event.price > 0 && (
                    <div>
                      <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                        Gunakan Poin (Maks {user.pointsBalance.toLocaleString("id-ID")})
                      </label>
                      <input type="number" className="input" min="0" max={user.pointsBalance}
                        placeholder="0" value={pointsUsed || ""}
                        onChange={e => setPointsUsed(Number(e.target.value))} />
                    </div>
                  )}

                  {event.price > 0 && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">Kode Kupon</label>
                        <input type="text" className="input" placeholder="NEWUSER10"
                          value={couponCode} onChange={e => setCouponCode(e.target.value.toUpperCase())} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">Kode Voucher Event</label>
                        <input type="text" className="input" placeholder="TECHSUMMIT50"
                          value={voucherCode} onChange={e => setVoucherCode(e.target.value.toUpperCase())} />
                      </div>
                    </>
                  )}

                  {/* Price Summary */}
                  {event.price > 0 && (
                    <div className="bg-[var(--surface-2)] rounded-xl p-3 text-sm">
                      <div className="flex justify-between text-[var(--text-secondary)]">
                        <span>{qty}x tiket</span>
                        <span>IDR {(event.price * qty).toLocaleString("id-ID")}</span>
                      </div>
                      {pointsUsed > 0 && (
                        <div className="flex justify-between text-[var(--secondary)]">
                          <span>Poin digunakan</span>
                          <span>−IDR {pointsUsed.toLocaleString("id-ID")}</span>
                        </div>
                      )}
                      <div className="divider" style={{ margin: "8px 0" }}></div>
                      <div className="flex justify-between font-bold text-[var(--text-primary)]">
                        <span>Total</span>
                        <span>IDR {totalPrice.toLocaleString("id-ID")}</span>
                      </div>
                    </div>
                  )}

                  <button onClick={() => setDialogOpen(true)} disabled={loading}
                    className="btn btn-primary w-full justify-center py-3">
                    {totalPrice === 0 ? "🎫 Ambil Tiket Gratis" : "🛒 Beli Tiket"}
                  </button>
                </div>
              ) : (
                <button onClick={() => navigate("/login")}
                  className="btn btn-primary w-full justify-center py-3">
                  Login untuk Beli Tiket
                </button>
              )}

            </div>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Konfirmasi Pembelian"
        message={`Beli ${qty} tiket untuk "${event.title}"? Total: IDR ${totalPrice.toLocaleString("id-ID")}`}
        onConfirm={handleCheckout}
        onCancel={() => setDialogOpen(false)}
      />
    </div>
  );
}
