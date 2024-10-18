"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Build from "@/components/build";

import CookieImage from "@/assets/images/cookie.png";

export default function Home() {
  const [count, setCount] = useState(0);
  const [cookiesPerSecond, setCookiesPerSecond] = useState(0);
  const [buildings, setBuildings] = useState([
    { name: "Cursor", cost: 15, cps: 1, quantity: 0 },
    { name: "Grandma", cost: 100, cps: 3, quantity: 0 },
    { name: "Farm", cost: 1100, cps: 10, quantity: 0 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + cookiesPerSecond);
    }, 1000);

    return () => clearInterval(interval);
  }, [cookiesPerSecond]);

  const handleClick = () => {
    setCount(count + 1);
  };

  const buyBuilding = (index: number) => {
    const building = buildings[index];
    if (count >= building.cost) {
      setCount(count - building.cost);
      const newBuildings = [...buildings];
      newBuildings[index].quantity += 1;
      setBuildings(newBuildings);
      setCookiesPerSecond(cps => cps + building.cps);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 flex flex-col items-center justify-center border-r-2 border-gray-300">
        <Image
          src={CookieImage}
          alt="Cookie"
          width={192}
          height={192}
          className="w-48 h-48 mb-4 cursor-pointer"
          onClick={handleClick}
        />
        <p className="text-2xl font-bold">Cookie sayısı: {count.toFixed(1)}</p>
        <p className="text-xl">Cookies per second: {cookiesPerSecond.toFixed(1)}</p>
      </div>
      <div className="w-1/2 p-4 border-l-2 border-gray-300">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Buildings</h2>
          {buildings.map((building, index) => (
            <Build
              key={index}
              name={building.name}
              cost={building.cost}
              cps={building.cps}
              count={count}
              quantity={building.quantity}
              setCount={setCount}
              cookiesPerSecond={cookiesPerSecond}
              setCookiesPerSecond={setCookiesPerSecond}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
