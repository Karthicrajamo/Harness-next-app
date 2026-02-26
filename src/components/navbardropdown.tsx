import "./sidebar.css"

export default function NavBarDropDown({
  icon: Icon,
  label,
  onClick,
  iconClass = "text-gray-700 dark:text-gray-700",
  labelClass = "text-xs font-xs  dark:text-white",
  size = 20,
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer
      border-l-4 border-l-transparent border-b border-b-gray-100 dark:border-b-gray-600
      transition-all duration-200
      itemList hover:text-blue-500 dark:hover:text-white hover:border-l-blue-500"
    >
      {Icon && <Icon size={size} className={iconClass} />}

      <span className={`mx-1 ${labelClass}`}>{label}</span>
    </div>
  );
}
