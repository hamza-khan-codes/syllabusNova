export function Button({ children, className = "",  ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium";
  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}
