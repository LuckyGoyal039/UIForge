'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const ScrubSlider = () => {
  const [value, setValue] = useState(46);
  const trackRef = useRef<HTMLDivElement>(null);
  const MIN = 0;
  const MAX = 100;

  // Convert value to percentage
  const getPercent = (val: number) => ((val - MIN) / (MAX - MIN)) * 100;

  // Convert position to value
  const positionToValue = (x: number) => {
    if (!trackRef.current) return value;
    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
    return Math.round(MIN + percent * (MAX - MIN));
  };

  // Mouse/touch move handlers
  const handleMove = (clientX: number) => {
    const newValue = positionToValue(clientX);
    setValue(newValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleMove(e.clientX);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
  };

  const onTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
  };

  return (
    <div className="flex justify-center items-center h-[300px]">
      <div className="relative w-[300px] h-[60px]">
        {/* Slider Track */}
        <div
          ref={trackRef}
          className="absolute top-1/2 -translate-y-1/2 w-full h-16 bg-white rounded-xl shadow-inner flex items-center px-3 cursor-pointer"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Tick Marks */}
          <div className="w-full flex justify-between items-center pointer-events-none">
            {Array.from({ length: 21 }).map((_, i) => (
              <div
                key={i}
                className={clsx('w-[1px] h-8 bg-gray-300', {
                  'h-10 bg-black': Math.round(getPercent(value)) === i * 5,
                })}
              />
            ))}
          </div>

          {/* Temperature Value Bubble */}
          <motion.div
            className="absolute -top-10"
            initial={false}
            animate={{
              left: `${getPercent(value)}%`,
              x: '-50%',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <AnimatePresence>
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center bg-black text-white text-sm px-2 py-1 rounded-lg shadow"
              >
                {value}°C
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Movable Pointer Line */}
          <motion.div
            className="absolute top-[4px] h-10 w-[2px] bg-black pointer-events-none"
            initial={false}
            animate={{
              left: `${getPercent(value)}%`,
              x: '-50%',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrubSlider;
