"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Build from "@/components/build";
import CookieImage from "@/assets/images/cookie.png";

type Building = {
  name: string;
  cost: number;
  cps: number;
  quantity: number;
  clickBonus: number;
};

export default function Home() {
  const [count, setCount] = useState<number>(0);
  const [cookiesPerSecond, setCookiesPerSecond] = useState<number>(0);
  const [buildings, setBuildings] = useState<Building[]>([
    { name: 'Cursor', cost: 15, cps: 1, quantity: 0, clickBonus: 1 },
    { name: 'Grandma', cost: 100, cps: 5, quantity: 0, clickBonus: 2 },
    { name: 'Farm', cost: 1100, cps: 15, quantity: 0, clickBonus: 3 },
    { name: 'Mine', cost: 12000, cps: 47, quantity: 0, clickBonus: 4 },
    { name: 'Factory', cost: 130000, cps: 260, quantity: 0, clickBonus: 5 },
    { name: 'Bank', cost: 1400000, cps: 1400, quantity: 0, clickBonus: 6 },
    { name: 'Temple', cost: 20000000, cps: 7800, quantity: 0, clickBonus: 7 },
  ]);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const res = await fetch('/api/session');
        if (res.ok) {
          const response = await res.json();
          setCount(response.data.count);
          setCookiesPerSecond(response.data.cookiesPerSecond);
          setBuildings(response.data.buildings);
        }
      } catch (error) {
        console.log("No saved progress found.", error);
      }
    };
    loadProgress();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + cookiesPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [cookiesPerSecond]);

  const handleClick = () => {
    const totalClickBonus = buildings.reduce((acc, building) => acc + building.quantity * building.clickBonus, 0);
    setCount((prevCount) => prevCount + 1 + totalClickBonus);
  };

  const canBuyBuilding = (index: number) => {
    const building = buildings[index];
    if (index === 0) return count >= building.cost;
    const previousBuilding = buildings[index - 1];
    return previousBuilding.quantity >= 10 && count >= building.cost;
  };

  const buyBuilding = (index: number) => {
    const building = buildings[index];
    if (canBuyBuilding(index)) {
      const newCount = count - building.cost;
      const newBuildings = [...buildings];
      newBuildings[index].quantity += 1;
      newBuildings[index].cost = Math.floor(newBuildings[index].cost * 1.1);

      setCount(newCount);
      setBuildings(newBuildings);
      setCookiesPerSecond((cps) => cps + building.cps);

      updateSession(newCount, cookiesPerSecond + building.cps, newBuildings);
    }
  };

  const updateSession = async (count: number, cps: number, buildings: Building[]) => {
    try {
      await fetch('/api/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count, cookiesPerSecond: cps, buildings }),
      });
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  };

  useEffect(() => {
    const saveInterval = setInterval(() => {
      updateSession(count, cookiesPerSecond, buildings);
    }, 10000);

    return () => clearInterval(saveInterval);
  }, [count, cookiesPerSecond, buildings]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center border-b-2 md:border-r-2 border-gray-300 p-4">
        <Image
          src={CookieImage}
          alt="Cookie"
          width={192}
          height={192}
          className="w-36 h-36 md:w-48 md:h-48 mb-4 cursor-pointer"
          onClick={handleClick}
        />
        <p className="text-xl md:text-2xl font-bold">Cookie: {Math.floor(count)}</p>
        <p className="text-lg md:text-xl">Cookies per second: {Math.floor(cookiesPerSecond)}</p>
      </div>

      <div className="w-full md:w-1/2 p-4">
        <div className="flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Buildings</h2>
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
              buyBuilding={() => buyBuilding(index)}
              canBuy={canBuyBuilding(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}