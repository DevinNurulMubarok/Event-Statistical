interface SocialShareProps {
  title: string;
  url: string;
}

export default function SocialShare({ title, url }: SocialShareProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: "📱",
      color: "#25D366",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "Twitter",
      icon: "🐦",
      color: "#1DA1F2",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: "Telegram",
      icon: "✈️",
      color: "#0088cc",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    alert("Link berhasil disalin!");
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Bagikan Event:</p>
      <div className="flex gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-transform hover:scale-110 shadow-sm"
            style={{ backgroundColor: link.color + "20", color: link.color, border: `1px solid ${link.color}40` }}
            title={`Bagikan ke ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={handleCopyLink}
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-transform hover:scale-110 shadow-sm bg-[var(--surface-2)] text-[var(--text-secondary)] border border-[var(--border)]"
          title="Salin Link"
        >
          🔗
        </button>
      </div>
    </div>
  );
}
