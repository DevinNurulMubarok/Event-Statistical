import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const isExpired = +new Date(targetDate) - +new Date() <= 0;

  if (isExpired) {
    return (
      <div className="flex items-center gap-2 text-[var(--secondary)] font-bold animate-pulse">
        <span>🎬 Event Sedang Berlangsung / Selesai</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Event dimulai dalam:</p>
      <div className="flex gap-3">
        {[
          { label: "Hari", value: timeLeft.days },
          { label: "Jam", value: timeLeft.hours },
          { label: "Menit", value: timeLeft.minutes },
          { label: "Detik", value: timeLeft.seconds },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-[var(--surface-2)] border border-[var(--border)] rounded-lg w-12 h-12 flex items-center justify-center shadow-sm">
              <span className="text-lg font-black text-[var(--primary)]">{item.value.toString().padStart(2, "0")}</span>
            </div>
            <span className="text-[10px] font-semibold text-[var(--text-muted)] mt-1">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
