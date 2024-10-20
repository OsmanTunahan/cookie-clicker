import React from 'react';
import Image from "next/image";

interface BuildProps {
  name: string;
  cost: number;
  cps: number;
  count: number;
  quantity: number;
  setCount: (count: number) => void;
  cookiesPerSecond: number;
  setCookiesPerSecond: (cps: number) => void;
  buyBuilding: () => void;
  canBuy: boolean;
}

const getBuildImage = async (buildName: string) => {
  const image = await import(`../assets/images/buildings/${buildName?.toLowerCase()}.png`);
  return image.default;
}

const Build: React.FC<BuildProps> = ({ name, cost, quantity, buyBuilding, canBuy }) => {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadImage = async () => {
      const image = await getBuildImage(name);
      setImageSrc(image);
    };
    loadImage();
  }, [name]);

  return (
    <div className="flex items-center justify-between mb-2 border-b-2 border-gray-200 w-full p-2">
      {imageSrc && (
        <Image
          src={imageSrc}
          height={48}
          width={48}
          alt="Building"
          className="w-10 h-10 mr-4"
        />
      )}

      <div className="flex-1">
        <span className="font-bold text-sm md:text-base">{name}</span>
        <p className="text-xs md:text-sm">Cost: {cost} cookies</p>
        <p className="text-xs md:text-sm">Owned: {quantity}</p>
      </div>
      <button
        className={`ml-4 px-2 py-1 md:px-4 md:py-2 ${canBuy ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded text-xs md:text-base`}
        onClick={canBuy ? buyBuilding : undefined}
        disabled={!canBuy}
      >
        Buy
      </button>
    </div>
  );
};

export default Build;