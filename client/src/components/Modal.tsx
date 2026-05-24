type ModalProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  size?: "sm" | "md" | "lg";
};

function Modal({ title, children, onClose, size = "md" }: ModalProps) {
  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-xl",
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        className={`${sizeClass} max-h-[85vh] w-full overflow-y-auto rounded-3xl bg-white p-6 shadow-xl`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-zinc-900">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-zinc-400 hover:text-zinc-700"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;
