'use client';
import React from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  arcLength?: number; // percentage of circle visible (0–100)
}

const Loader: React.FC<LoaderProps> = ({
  size = 40,
  color = "gray",
  strokeWidth = 2,
  arcLength = 70, // default: 40% of circle
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashArray = `${(arcLength / 100) * circumference} ${circumference}`;

  return (
    <div className="flex items-center justify-center">
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        style={{ overflow: "visible" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={dashArray}
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
};

export default Loader;
