import React from "react";
import BitCoin from "public/bitcoin.webp";
import Image from "next/image";

const Card = ({ item, handleClick }: { item: any; handleClick: any }) => {
  const handleClickWrapper = () => {
    handleClick(item.id);
  };

  return (
    <div
      className="flex flex-col justify-center w-full border border-solid border-white border-opacity-15 rounded-md overflow-hidden cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-b from-transparent to-opacity-20"
      onClick={handleClickWrapper}
      style={{
        padding: "2.5em 1.5em",
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05) 50%)",
        zIndex: 40,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.backgroundImage =
          "radial-gradient(circle at 50% 0,#380054,#1c0e27 59%,#100e11),linear-gradient(rgba(255,255,255,.1),rgba(255,255,255,.05) 70%)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.backgroundImage =
          "linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05) 50%)";
      }}
    >
      <div className="max-w-395 max-h-280 min-w-395 min-h-280">
        
        <Image src={BitCoin} alt={"coin"} width={395} height={280} />
      </div>
      <div
        className="text-xl font-semibold mt-4"
        style={{
          marginTop: "1rem",
          marginBottom: "0.5rem",
          fontWeight: 900,
        }}
      >
        {item.name}
      </div>
      <div
        className="text-sm text-gray-400 mt-2"
        style={{ marginTop: "0.5rem" }}
      >
        {item.description}
      </div>
    </div>
  );
};

export default Card;
