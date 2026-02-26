import { RootState } from "@/redux/mainStore";
import { useSelector } from "react-redux";
import "./sidebar.css"

export default function UserIcon({
  size = 24,
  text = "ssdhka",
  bgColor = "my-card-gradient",
}) {
  const user = useSelector((state: RootState) => state.authSlice.user);
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
      {user?.userName?.charAt(0).toUpperCase()}
    </span>
  );
}
