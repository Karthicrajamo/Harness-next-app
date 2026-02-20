import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative  max-w-md">
      <Search
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />

      <input
        type="text"
        placeholder="Search"
        className="w-full pl-10 pr-4 py-2 text-sm md:text-base 
                   border-2 border-[#2196f3] bg-[#3b83f60e]
                   rounded-lg 
                   focus:outline-none focus:border-[#2196f3]
                   transition"
      />
    </div>
  );
}