"use client";

import { useState } from "react";
import Image from "next/image";

import CookieImage from "@/assets/images/cookie.png";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Image
        src={CookieImage}
        alt="Cookie"
        className="w-32 h-32 mb-4 cursor-pointer"
        onClick={handleClick}
      />
      <p className="text-2xl font-bold">Cookie: {count}</p>
    </div>
  );
};

export default Counter;
