export default function UserIcon({
  size = 24,  
  text = "KA",
  bgColor = "bg-orange-400",
}) {
  return (
    <span
      className={`flex items-center justify-center 
      rounded-full text-white font-semibold ${bgColor}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
      }}
    >
      {text}
    </span>
  );
}