import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative  max-w-md">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />

      <input
        type="text"
        placeholder="Search"
        className="w-full pl-10 pr-2 py-2 text-xs 
                   border-1 border-gray-200 bg-[#3b83f60e]
                   rounded-lg 
                   focus:outline-none focus:border-gray-200
                   transition"
      />
    </div>
  );
}