import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import AppHeader from "./AppHeader";
import { head } from "motion/react-client";

/* ----------------------------------
   Types
----------------------------------- */

interface HeaderProps {
  title: string;
  headerText: string;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
  addButtonText?: string;
}

interface AnimatedCreateButtonProps {
  onClick?: () => void;
  addButtonText?: string;
}

/* ----------------------------------
   Sub Components (OUTSIDE render)
----------------------------------- */

const AnimatedCreateButton: React.FC<AnimatedCreateButtonProps> = ({
  onClick,
  addButtonText
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
      <span className="font-semibold">Add {addButtonText}</span>
    </button>
  );
};

/* ----------------------------------
   Main Header Component
----------------------------------- */

const Header: React.FC<HeaderProps> = ({
  title,
  headerText,
  showCreateButton = true,
  onCreateClick,
  addButtonText
}) => {
  const router = useRouter();
  return (
    <>
      {/* Top Navigation Bar */}
      <AppHeader
        navTab={`${headerText}`}
        onLogout={() => {
          console.log("logout");
        }}
      />

      {/* Page Header */}
      <header className="bg-white border-b border-gray-200 sticky top-14 z-0 px-4 py-3 shadow-sm mt-14">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>

          {showCreateButton && <AnimatedCreateButton onClick={onCreateClick} addButtonText={addButtonText}/>}
        </div>
      </header>
    </>
  );
};

export default Header;
