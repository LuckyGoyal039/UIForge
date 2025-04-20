'use client'
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Map, X } from 'lucide-react';

const ViewMap: React.FC = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);
  
  const handleToggleMap = () => {
    setIsMapOpen(!isMapOpen);
    // Reset position when reopening
    if (!isMapOpen) setMapPosition({ x: 0, y: 0 });
  };

  // Locations based on reference images
  const locations = [
    { name: "Big Belly Burger", top: 40, left: 72, isPrimary: true },
    { name: "Contessa", top: 39, left: 32, hasFood: true },
    { name: "Life Alive", top: 52, left: 20, hasFood: false },
    { name: "Arlington", top: 52, left: 38, isTransit: true },
    { name: "Davio's", top: 70, left: 34, hasFood: true },
    { name: "Boston Public Garden", top: 25, left: 55, isGarden: true }
  ];

  return (
    <div className="font-sans w-full h-full flex items-center justify-center px-10 bg-white">
      {!isMapOpen ? (
        <motion.button
          className="flex items-center gap-2 bg-[#e5e5ee] text-gray-800 px-6 py-3 rounded-full shadow-sm w-1/2"
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleMap}
        >
          <Map size={20} className="text-gray-500" />
          <span className="font-medium">View on Map</span>
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 50 }}
            animate={{ opacity: 1, height: 300 }}
            exit={{ opacity: 0, height: 50 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-4xl overflow-hidden shadow-lg w-full bg-gray-100"
            ref={constraintsRef}
          >
            {/* Map Header with Close Button */}
            <div className="absolute top-4 right-4 z-20 text-gray-700">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleMap}
                className="bg-white p-1 rounded-full shadow-md"
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Map Content with Drag Functionality */}
            <div className="h-full w-full relative overflow-hidden">
              {/* Draggable Map Container */}
              <motion.div
                drag
                dragControls={dragControls}
                dragMomentum={false}
                dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
                dragElastic={0.1}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                style={{ touchAction: 'none' }}
                animate={{ x: mapPosition.x, y: mapPosition.y }}
                onDragEnd={(_, info) => {
                  setMapPosition({
                    x: mapPosition.x + info.offset.x,
                    y: mapPosition.y + info.offset.y
                  });
                }}
              >
                {/* Map Background - Made larger to allow for scrolling/panning */}
                <div className="h-600 w-600 bg-gray-200 relative" style={{ width: '900px', height: '900px' }}>
                  {/* Streets */}
                  <div className="absolute top-1/2 left-0 right-0 h-4 bg-white opacity-60 transform -translate-y-1/2">
                    <div className="absolute bottom-0 left-1/2 text-xs text-gray-500 transform -translate-x-1/2 translate-y-6">
                      ST JAMES AVE
                    </div>
                  </div>
                  <div className="absolute top-0 bottom-0 right-1/4 w-4 bg-white opacity-60 transform translate-x-1/2">
                    <div className="absolute bottom-16 right-0 text-xs text-gray-500 transform rotate-90 origin-right">
                      COLUMBUS AVE
                    </div>
                  </div>

                  {/* Garden area */}
                  <div className="absolute top-0 right-0 h-64 w-64 bg-gray-300 opacity-50 rounded-bl-full"></div>

                  {/* Map Points */}
                  {locations.map((location, index) => (
                    <motion.div
                      key={index}
                      className="absolute"
                      style={{
                        top: `${location.top}%`,
                        left: `${location.left}%`,
                      }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {location.isPrimary ? (
                        <motion.div
                          className="bg-black text-white rounded-full p-1 shadow-lg flex items-center justify-center"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 3, repeatDelay: 1 }}
                        >
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </motion.div>
                      ) : location.isTransit ? (
                        <div className="bg-white rounded-full p-1 shadow-md">
                          <div className="bg-gray-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
                            <span className="text-xs">T</span>
                          </div>
                        </div>
                      ) : location.isGarden ? (
                        <div className="bg-white rounded-full p-1 shadow-md">
                          <div className="text-gray-500 text-xs">⚙️</div>
                        </div>
                      ) : location.hasFood ? (
                        <div className="bg-white rounded-full p-1 shadow-md">
                          <div className="text-gray-500 text-xs">🍽️</div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-full p-1 shadow-md">
                          <div className="text-gray-500 text-xs">🏢</div>
                        </div>
                      )}
                      <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                        {location.name}
                      </div>
                    </motion.div>
                  ))}

                  {/* User Location Indicator (Hand icon) */}
                  <motion.div
                    className="absolute"
                    style={{ top: "52%", left: "45%" }}
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <div className="text-sm">👋</div>
                  </motion.div>

                  {/* Parking icon */}
                  <div className="absolute" style={{ top: "70%", left: "80%" }}>
                    <div className="bg-white rounded-full p-1 shadow-md">
                      <div className="text-gray-500 text-xs">P</div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ViewMap;