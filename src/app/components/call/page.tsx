"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/app/globalContext/GlobalState";


// Animated Dots Component
const AnimatedDots = () => {
  return (
    <div className="flex items-center space-x-2">
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className="w-2 h-2 rounded-full animate-dot-flow"
          style={{
            animationDelay: `${dot * 0.3}s`, // left to right delay
          }}
        />
      ))}
    </div>
  );
};


export default function Call() {
  const {status} = useGlobalState()
  const route = useRouter()

  const handelBack = () =>{
    route.back()
  }


  return (
    <>
      <div className="flex justify-center mt-20">
        <div className={`w-[350px] border border-gray-200 shadow-md rounded-md p-4 ${status.setting?.theme === "light" ? "bg-gray-200" : "bg-gray-700"}`}>
          <div className="space-y-6">
            {/* Persons */}
            <div className="flex justify-between items-center">
              <Image
                src={
                  status.setting?.theme === "light"
                    ? "/assets/images/person_call.svg"
                    : "/assets/images/person_call_white.svg"
                }
                alt="person call"
                width={48}
                height={48}
              />

              <AnimatedDots />

              <Image
                src={
                  status.setting?.theme === "light"
                    ? "/assets/images/person_recive.svg"
                    : "/assets/images/person_recive_white.svg"
                }
                alt="person receive"
                width={48}
                height={48}
              />
            </div>

            {/* Call buttons */}
            <div className="flex justify-between px-25">
              <button className="bg-[#5376f6] hover:bg-[#5376f6a0] w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer">
                <Image
                  src="/assets/icons/phone.svg"
                  alt="phone"
                  width={24}
                  height={24}
                />
              </button>
              <button
                onClick={handelBack}
                className="bg-[#f85c39] hover:bg-[#f94b23be] w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer"
              >
                <Image
                  src="/assets/icons/hang_up.svg"
                  alt="hang up"
                  width={25}
                  height={24}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
