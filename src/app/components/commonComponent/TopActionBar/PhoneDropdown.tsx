"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";

// Define the Provider type
interface Provider {
  phone: string;
  transporter_name: string;
  transporter_name_amh: string;
  // add any other fields you use
}

interface PhoneDropdownProps {
  phoneOpen: boolean;
  providers: Provider[];
  status: {
    setting?: {
      theme?: "light" | "dark";
      lang?: "en" | string;
    };
  };
  onClose: () => void; // new prop for closing
}

export default function PhoneDropdown({
  phoneOpen,
  providers,
  status,
  onClose,
}: PhoneDropdownProps) {
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (phoneRef.current && !phoneRef.current.contains(event.target as Node)) {
        onClose(); // call parent to close dropdown
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!phoneOpen) return null;

  return (
    <div
      ref={phoneRef}
      className={`fixed z-50 top-30 right-2 p-5 rounded-md w-[200px] max-h-[400px] overflow-y-auto shadow-emerald-300 ${
        status.setting?.theme === "light"
          ? "bg-gray-200/95"
          : "bg-gray-900/90"
      }`}
    >
      {providers.map((provider) => (
        <div key={provider.phone} className="mb-2">
          <div className="flex justify-between items-center">
            <p>
              {status.setting?.lang === "en"
                ? provider.transporter_name
                : provider.transporter_name_amh}
            </p>
            <a href={`tel:${provider.phone}`}>
              <button
                type="button"
                className="bg-[#40ff9f] hover:bg-[#40ffa0c1] p-1 rounded-full cursor-pointer"
              >
                <Image
                  src="/assets/icons/phone.svg"
                  alt="phone"
                  width={15}
                  height={15}
                />
              </button>
            </a>
          </div>
          <hr className="mt-2 border-gray-400" />
        </div>
      ))}
    </div>
  );
}
