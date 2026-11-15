"use client";
import React from "react";
import "./AnimatedCard.css";

/**
 * AnimatedCard
 * Shows an animated gradient border only when `isActive` is true.
 */
export default function AnimatedCard({ children, isActive = false, className = "" }) {
  return (
    <div className={`animated-card-wrapper ${className}`}>
      <div className={`animated-card-border ${isActive ? "active" : ""}`}>
        <div className="animated-card-inner">{children}</div>
      </div>
    </div>
  );
}
