'use client'
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the structure for each menu item
interface MenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

interface CircularMenuProps {
  items: MenuItem[];
  centralIcon?: React.ReactNode;
  radius?: number;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

const CircularMenu: React.FC<CircularMenuProps> = ({
  items = [],
  centralIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="12" r="2" />
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
    </svg>
  ),
  radius = 140,
  isOpen: externalIsOpen,
  onToggle
}) => {
  const [isOpen, setIsOpen] = useState(externalIsOpen || false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle controlled/uncontrolled component pattern
  useEffect(() => {
    if (externalIsOpen !== undefined && externalIsOpen !== isOpen) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (onToggle) onToggle(newIsOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
        if (onToggle) onToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={menuRef}>
      {/* Central button */}
      <motion.button
        onClick={handleToggle}
        className="relative z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md cursor-pointer"
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {centralIcon}
      </motion.button>

      {/* Menu items */}
      <AnimatePresence>
        {isOpen && items.map((item, index) => {
          // Calculate position in the circle
          const angle = (index * (2 * Math.PI)) / items.length;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={item.id}
              className="absolute z-0 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md cursor-pointer"
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{ 
                scale: 1, 
                x, 
                y 
              }}
              exit={{ 
                scale: 0,
                x: 0,
                y: 0
              }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.05,
                ease: "easeOut" 
              }}
              onClick={() => {
                if (item.onClick) item.onClick();
              }}
              style={{ 
                left: "50%", 
                top: "50%", 
                marginLeft: "-20px", 
                marginTop: "-20px" 
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default CircularMenu;