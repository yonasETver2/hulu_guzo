"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AdCarousel({ images, controls }) {
  return (
    <div className="mt-6 overflow-hidden w-full max-w-screen-md mx-auto relative z-0">
      <motion.div className="flex space-x-4" animate={controls} style={{ x: 0 }}>
        {[...images, ...images].map((src, index) => (
          <motion.div
            key={index}
            className="min-w-[300px] h-[180px] flex-shrink-0 rounded-lg overflow-hidden shadow-md z-0"
          >
            <Image
              src={src}
              alt={`ad-${index}`}
              width={300}
              height={180}
              className="object-cover w-full h-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
