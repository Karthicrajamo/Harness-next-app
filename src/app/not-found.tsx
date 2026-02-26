import Image from "next/image";
import React from "react";
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#3b83f6]/5">
        <Image
        src="/NoImage.png"
        alt="No data found"
        width={500}
        height={500}
        priority
      />
     
    </div>
  );
};

export default NotFound;
//  <p className="text-[#002455] font-bold">The page you are looking for does not exist.</p>
