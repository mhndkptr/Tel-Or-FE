export default function ToastContent({ title, type, description, classname = "" }) {
  return (
    <div className={`${classname}`}>
      <div className="font-bold">{title}</div>
      {description && <div className="text-sm">{description}</div>}
    </div>
  );
}
