"use client";
import React, { useState } from "react";
import AnimatedCard from "./AnimatedCard";
import PasswordAnalyzer from "./PasswordAnalyzer";
import PasswordGenerator from "./PasswordGenerator";

export default function ToolSwitcher() {
  const [activeTool, setActiveTool] = useState("analyzer");
  const [isActive, setIsActive] = useState(false); // controls animation

  const tabs = [
    { name: "Password Analyzer", key: "analyzer" },
    { name: "Password Generator", key: "generator" },
  ];

  const handleFocus = () => setIsActive(true);
  const handleBlur = () => setIsActive(false);

  return (
    <section id="tools" className="py-16 bg-dark-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedCard isActive={isActive}>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-white mb-2">
              The Free Sentinel Tools
            </h2>
            <p className="text-gray-400">
              Audit your security or forge a new high-entropy password.
            </p>
          </div>

          {/* Tool Switcher Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg p-1 space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTool(tab.key);
                    setIsActive(false); // reset animation when switching
                  }}
                  className={`px-6 py-2 rounded-lg font-medium transition ${
                    activeTool === tab.key
                      ? "bg-accent text-primary shadow-lg" // Active state
                      : "text-accent border border-accent hover:border-accent hover:bg-accent/10 hover:shadow-md" // Inactive state
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tool Content */}
          <div onFocus={handleFocus} onBlur={handleBlur}>
            {activeTool === "analyzer" ? (
              <PasswordAnalyzer onFocus={handleFocus} onBlur={handleBlur} />
            ) : (
              <PasswordGenerator onFocus={handleFocus} onBlur={handleBlur} />
            )}
          </div>
        </AnimatedCard>
      </div>
    </section>
  );
}
