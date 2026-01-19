"use client";

import Image from "next/image";
import Link from "next/link";

interface ActionButtonsProps {
  status: {
    setting?: {
      theme?: "light" | "dark";
    };
  };
  handlePhoneClick: () => void;
  action: number;
  place: number;
}

export default function ActionButtons({
  status,
  handlePhoneClick,
  action,
  place,
}: ActionButtonsProps) {
  const theme = status.setting?.theme === "light";

  return (
    <div className="flex justify-between items-center w-full">
      {/* Left Buttons */}
      <div className="flex space-x-3">
        <Link
          className={`${place === 1 && "pb-1 border-b-2 border-[#5376f6]"}`}
          href={action === 1 ? "/components/home" : "/components/result"}
        >
          <Image
            src={
              theme ? "/assets/icons/bus.svg" : "/assets/icons/bus_white.svg"
            }
            alt="bus"
            width={30}
            height={30}
          />
        </Link>

        <Link className={`${place === 2 && "pb-1 border-b-2 border-[#5376f6]"}`} href="/components/inst_location">
          <div
            className={`rounded-full w-[24px] h-[24px] flex justify-center items-center cursor-pointer ${
              theme ? "bg-[#000000bd]" : "bg-gray-300"
            }`}
          >
            <Image
              src="/assets/icons/location.svg"
              alt="gps"
              width={12}
              height={12}
            />
          </div>
        </Link>

        <Link className={`${place === 3 && "pb-1 border-b-2 border-[#5376f6]"}`} href="tiket">
          <Image
            className="cursor-pointer"
            src={
              theme
                ? "/assets/icons/bus_tiket.svg"
                : "/assets/icons/bus_tiket_white.svg"
            }
            alt="tiket"
            width={24}
            height={24}
          />
        </Link>
      </div>

      {/* Right Button */}
      <div>
        <div
          className={`flex justify-center items-center cursor-pointer ${
            theme ? "bg-gray-300" : "bg-white rounded-full"
          }`}
          onClick={handlePhoneClick}
        >
          <Image
            src="/assets/icons/bus_call.png"
            alt="call"
            width={30}
            height={30}
          />
        </div>
      </div>
    </div>
  );
}
