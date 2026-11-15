"use client";
import React from "react";

export default function GlowingCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-[2px] rounded-xl bg-gradient-to-r from-pink-500 via-blue-500 via-green-500 via-yellow-400 via-red-500 animate-glowBorder bg-[length:400%_400%]">
      <div className="bg-dark-bg rounded-xl p-6 md:p-10 border border-gray-800">
        {children}
      </div>
    </div>
  );
}
