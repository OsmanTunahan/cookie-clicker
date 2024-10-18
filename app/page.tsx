"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Build from "@/components/build";

import CookieImage from "@/assets/images/cookie.png";

export default function Home() {
  const [count, setCount] = useState(0);
  const [cookiesPerSecond, setCookiesPerSecond] = useState(0);
  const [buildings, setBuildings] = useState([
    { name: 'Cursor', cost: 15, cps: 0.3, quantity: 0 },
    { name: 'Grandma', cost: 100, cps: 5, quantity: 0 },
    { name: 'Farm', cost: 1100, cps: 15, quantity: 0 },
    { name: 'Mine', cost: 12000, cps: 47, quantity: 0 },
    { name: 'Factory', cost: 130000, cps: 260, quantity: 0 },
    { name: 'Bank', cost: 1400000, cps: 1400, quantity: 0 },
    { name: 'Temple', cost: 20000000, cps: 7800, quantity: 0 }
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

      if (building.name === 'Cursor' && newBuildings[index].quantity % 10 === 0) {
        setCount(count * 1.5);
      } else if (building.name === 'Grandma' && newBuildings[index].quantity % 20 === 0) {
        setCookiesPerSecond(cps => cps * 2);
      } else if (building.name === 'Farm' && newBuildings[index].quantity % 5 === 0) {
        setCookiesPerSecond(cps => cps * 1.2);
      } else if (building.name === 'Mine' && newBuildings[index].quantity % 3 === 0) {
        setCookiesPerSecond(cps => cps * 1.5);
      } else if (building.name === 'Factory' && newBuildings[index].quantity % 2 === 0) {
        setCount(count * 2);
      } else if (building.name === 'Bank') {
        setCookiesPerSecond(cps => cps * 2.5);
      } else if (building.name === 'Temple') {
        setCookiesPerSecond(cps => cps * 3);
      }

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
        <p className="text-2xl font-bold">Cookie: {Math.floor(count)}</p>
        <p className="text-xl">Cookies per second: {Math.floor(cookiesPerSecond)}</p>
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
