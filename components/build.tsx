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
}

const getBuildImage = async (buildName: string) => {
  const image = await import(`../assets/images/buildings/${buildName?.toLowerCase()}.png`);
  return image.default;
}

const Build: React.FC<BuildProps> = ({ name, cost, cps, count, quantity, setCount, cookiesPerSecond, setCookiesPerSecond, buyBuilding }) => {
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
          height={64}
          width={64}
          alt="Cookie"
          className="w-12 h-12 mr-4"
        />
      )}

      <div className="flex-1">
        <span className="font-bold">{name}</span>
        <p className="text-sm">Cost: {cost} cookies</p>
        <p className="text-sm">Owned: {quantity}</p>
      </div>
      <button
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={buyBuilding}
      >
        Buy
      </button>
    </div>
  );
};

export default Build