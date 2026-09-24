const variants = {
  primary:
    "bg-primary text-white hover:bg-tertiary shadow-sm shadow-primary/20",
  secondary:
    "bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant/50",
  danger: "bg-error text-white hover:bg-error/90",
  ghost: "bg-transparent text-on-surface-variant hover:bg-surface-container",
};

export default function Button({
  children,
  variant = "primary",
  icon: Icon,
  className = "",
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}
