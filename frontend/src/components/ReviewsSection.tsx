import { useState } from "react";

interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    user: "Andi Saputra",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    comment: "Event yang luar biasa! Organisasinya sangat rapi dan pembicaranya sangat berbobot.",
    date: "2 minggu yang lalu",
  },
  {
    id: 2,
    user: "Siska Amelia",
    avatar: "https://i.pravatar.cc/100?img=5",
    rating: 5,
    comment: "Sangat informatif. Hanya saja antrian registrasinya lumayan panjang, mungkin ke depannya bisa diperbaiki.",
    date: "1 bulan yang lalu",
  },
  {
    id: 3,
    user: "Bambang Wijaya",
    avatar: "https://i.pravatar.cc/100?img=14",
    rating: 5,
    comment: "Worth every penny! Gak nyesel jauh-jauh datang buat event ini.",
    date: "3 hari yang lalu",
  },
];

export default function ReviewsSection() {
  const [reviews] = useState<Review[]>(MOCK_REVIEWS);

  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <h3 className="text-xl font-bold text-[var(--text-primary)]">Ulasan Pengguna</h3>
        <div className="flex items-center gap-2 bg-[var(--primary)] text-white px-3 py-1 rounded-full text-sm font-bold">
          ⭐ {averageRating} / 4.9
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="card p-5 bg-[var(--surface)] hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full border-2 border-[var(--primary-light)]" />
              <div>
                <p className="font-bold text-sm text-[var(--text-primary)]">{review.user}</p>
                <div className="flex text-yellow-400 text-xs">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                  ))}
                </div>
              </div>
              <span className="text-[10px] text-[var(--text-muted)] ml-auto">{review.date}</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed">
              "{review.comment}"
            </p>
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <button className="btn btn-ghost w-fit self-center text-xs font-bold text-[var(--primary)]">
          Lihat Semua Ulasan ({reviews.length})
        </button>
      )}
    </div>
  );
}
