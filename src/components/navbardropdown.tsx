export default function NavBarDropDown({
  icon: Icon,
  label,
  onClick,
  iconClass = "text-gray-700",
  labelClass = "text-sm font-sm",
  size = 20,
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer
      border-l-4 border-l-transparent border-b border-b-gray-100
      transition-all duration-200
      hover:bg-blue-100 hover:text-blue-500 hover:border-l-blue-500"
    >
      {Icon && <Icon size={size} className={iconClass} />}

      <span className={`mx-1 ${labelClass}`}>{label}</span>
    </div>
  );
}
