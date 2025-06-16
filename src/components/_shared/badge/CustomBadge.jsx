export default function CustomBadge({ rounded = "full", weight = "medium", type, children, className }) {
  return (
    <div
      className={`rounded-${rounded} font-${weight} md:text-sm text-xs md:px-3 md:py-1.5 px-2.5 py-2 flex items-center justify-center ${
        type === "success"
          ? "bg-green-50 text-green-600"
          : type === "info"
          ? "text-blue-50 bg-blue-500"
          : type === "danger"
          ? "text-red-600 bg-red-50"
          : type === "warning"
          ? "bg-amber-50 text-amber-400"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
