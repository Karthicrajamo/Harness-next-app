import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";

/* ----------------------------------
   Types
----------------------------------- */

interface HeaderProps {
  title: string;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
}

interface AnimatedCreateButtonProps {
  onClick?: () => void;
}

/* ----------------------------------
   Sub Components (OUTSIDE render)
----------------------------------- */

const AnimatedCreateButton: React.FC<AnimatedCreateButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-2
        bg-[#3788E5] text-white
        px-4 py-1.5 rounded-lg
        shadow-md hover:bg-blue-700
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        transition-all duration-200 ease-in-out text-sm
      "
    >
      <FiPlus className="w-5 h-5" />
      <span className="font-semibold">Add Operations</span>
    </button>
  );
};

/* ----------------------------------
   Main Header Component
----------------------------------- */

const Header: React.FC<HeaderProps> = ({
  title,
  showCreateButton = true,
  onCreateClick,
}) => {
  const router = useRouter();
  return (
    <>
      {/* Top Navigation Bar */}
      <div className="h-14 w-full fixed top-0 left-0 z-20 px-4 border-b border-gray-200 bg-white flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center">
          <Image
            src="https://res.cloudinary.com/dcgpglrqt/image/upload/v1765774217/Group_454_ynotl6.png"
            alt="Harness ERP Logo"
            width={38}
            height={38}
            className="h-6 md:h-8 w-auto mr-3"
            priority
          />

          <h1
            onClick={() => router.push("/dashboard")}
            className="font-semibold cursor-pointer text-lg text-[#3b82f6]"
          >
            Harness ERP
          </h1>

          <span className="hidden sm:inline pi pi-chevron-right mx-2 text-gray-400 text-xs" />
          <span className="hidden sm:inline text-gray-600 text-sm">Admin</span>
          <span className="hidden sm:inline pi pi-chevron-right mx-2 text-gray-400 text-xs" />
          <span className="hidden sm:inline text-gray-600 text-sm">
            Operation Master
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden sm:block w-40">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pi pi-search text-gray-400 text-xs" />
            <input
              type="text"
              className="pl-8 border border-gray-300 rounded-lg bg-gray-100 w-full py-1 text-sm"
              placeholder="Search..."
            />
          </div>

          {/* Notifications */}
          <span className="pi pi-bell text-gray-500 text-base cursor-pointer" />
          <h3 className="hidden md:flex items-center text-gray-600 border-l pl-2 border-gray-200 text-sm">
            Help
            <span
              className="pi pi-chevron-down"
              style={{
                fontSize: "0.8rem",
                marginLeft: "4px",
                color: "lightgray",
              }}
            ></span>
          </h3>
          {/* Company Name */}
          <span className="hidden sm:block text-sm font-bold text-black">
            JJ Mills Bangladesh Pvt
          </span>

          {/* User Profile */}
          <div className="relative group">
            <div className="bg-orange-400 w-8 h-8 flex items-center justify-center rounded-full text-white text-sm cursor-pointer">
              KA
            </div>

            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block z-30">
              <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                <span className="pi pi-sign-out mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <header className="bg-white border-b border-gray-200 sticky top-14 z-0 px-4 py-3 shadow-sm mt-14">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>

          {showCreateButton && <AnimatedCreateButton onClick={onCreateClick} />}
        </div>
      </header>
    </>
  );
};

export default Header;
