interface DialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  confirmStyle?: "danger" | "primary";
}

export default function ConfirmationDialog({
  isOpen, title, message, onConfirm, onCancel,
  confirmLabel = "Konfirmasi", confirmStyle = "primary"
}: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(26,29,46,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-fade-up"
        style={{ boxShadow: "var(--shadow-xl)" }}>
        <div className="text-center mb-4">
          <div className="text-4xl mb-3">{confirmStyle === "danger" ? "⚠️" : "🎫"}</div>
          <h3 className="text-xl font-extrabold text-[var(--text-primary)]">{title}</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-2">{message}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="btn btn-ghost flex-1 justify-center border border-[var(--border)] py-3">
            Batal
          </button>
          <button onClick={onConfirm}
            className={`btn flex-1 justify-center py-3 ${
              confirmStyle === "danger"
                ? "bg-red-500 text-white hover:bg-red-600"
                : "btn-primary"
            }`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
