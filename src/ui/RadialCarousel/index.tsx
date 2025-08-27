'use client';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';

// Mock emoji data with colors for demo
const itemList = [
    { id: 1, emoji: '👌', name: 'All Right', color: 'bg-blue-100' },
    { id: 2, emoji: '😎', name: 'Cool', color: 'bg-purple-100' },
    { id: 3, emoji: '👍', name: 'Thumbs Up', color: 'bg-green-100' },
    { id: 4, emoji: '😍', name: 'Love', color: 'bg-pink-100' },
    { id: 5, emoji: '🙌', name: 'Celebration', color: 'bg-yellow-100' },
    { id: 6, emoji: '😑', name: 'Neutral', color: 'bg-gray-100' },
    { id: 7, emoji: '🤠', name: 'Cowboy', color: 'bg-orange-100' },
    { id: 8, emoji: '😊', name: 'Happy', color: 'bg-red-100' },
    { id: 9, emoji: '🤔', name: 'Thinking', color: 'bg-indigo-100' },
];

interface Item {
    id: string | number;
    emoji: string,
    name: string,
    color: string
}

export default function RadialCarousel() {
    const radius = 150;
    const rotate = useMotionValue(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const lastAngle = useRef(0);
    const velocityRef = useRef(0);
    const isDragging = useRef(false);
    const startPosition = useRef({ x: 0, y: 0 });
    const hasMoved = useRef(false);

    const [isUserDragging, setIsUserDragging] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const rotationSpeedFactor = 2; // Reduced for smoother interaction

    function getAngle(x: number, y: number, centerX: number, centerY: number) {
        return Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    }

    function handlePointerDown(e: React.PointerEvent<HTMLDivElement>, index: number) {
        e.preventDefault();
        e.stopPropagation();
        console.log(index)

        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        startPosition.current = { x: e.clientX, y: e.clientY };
        lastAngle.current = getAngle(e.clientX, e.clientY, centerX, centerY);
        isDragging.current = true;
        hasMoved.current = false;
        setIsUserDragging(true);
    }

    function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
        if (!isDragging.current || !containerRef.current) return;

        const moveDistance = Math.sqrt(
            Math.pow(e.clientX - startPosition.current.x, 2) +
            Math.pow(e.clientY - startPosition.current.y, 2)
        );

        if (moveDistance > 5) {
            hasMoved.current = true;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const newAngle = getAngle(e.clientX, e.clientY, centerX, centerY);
        let delta = newAngle - lastAngle.current;

        // Correct quick jumps between -180 and 180
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        // Apply speed factor to make rotation smoother
        rotate.set(rotate.get() + delta * rotationSpeedFactor);
        velocityRef.current = delta * rotationSpeedFactor;
        lastAngle.current = newAngle;
    }

    function handlePointerUp(e: React.PointerEvent<HTMLDivElement>, item?: Item) {
        const wasDragging = isDragging.current;
        const didMove = hasMoved.current;

        isDragging.current = false;
        setIsUserDragging(false);

        if (wasDragging && !didMove && item) {
            // This was a click, not a drag
            setSelectedItem(item);
        } else if (wasDragging) {
            // This was a drag, apply inertia
            animate(rotate, rotate.get() + velocityRef.current * 8, {
                type: "spring",
                velocity: velocityRef.current * 8,
                damping: 25,
                stiffness: 100,
                mass: 0.8,
                min: -Infinity,
                max: Infinity,
            });
        }

        velocityRef.current = 0;
    }

    function closeModal() {
        setSelectedItem(null);
    }

    return (
        <div className="w-full h-full bg-[#f0eff6] relative overflow-hidden">
            {/* Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: -50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: -50 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className={`${selectedItem.color} rounded-3xl p-8 m-4 max-w-md w-full shadow-2xl border border-white/20`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex-1">
                                    <div className="text-6xl mb-4 text-center">
                                        {selectedItem.emoji}
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                                        {selectedItem.name}
                                    </h2>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X size={24} className="text-gray-600" />
                                </button>
                            </div>
                            <div className="text-gray-600 text-center">
                                <p className="mb-4">This is the {selectedItem.name} emoji!</p>
                                <p className="text-sm">Click outside or press the X to close this modal.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Carousel */}
            <div
                className="w-full h-full flex justify-center items-center relative select-none"
                onPointerMove={handlePointerMove}
                onPointerUp={(e) => handlePointerUp(e)}
                onPointerLeave={(e) => handlePointerUp(e)}
            >
                <motion.div
                    ref={containerRef}
                    className="relative"
                    style={{
                        width: radius * 2,
                        height: radius * 2,
                        touchAction: "none",
                        cursor: isUserDragging ? "grabbing" : "grab",
                    }}
                >
                    {itemList.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="absolute w-16 h-16"
                            style={{
                                top: '50%',
                                left: '50%',
                                translateX: '-50%',
                                translateY: '-50%',
                                rotate: rotate,
                            }}
                        >
                            <div
                                style={{
                                    transform: `
                                        rotate(${(index * 360) / itemList.length}deg)
                                        translate(${radius}px)
                                        rotate(-${(index * 360) / itemList.length}deg)
                                    `,
                                    transformOrigin: "0 0",
                                }}
                                className="relative w-16 h-16"
                            >
                                <motion.div
                                    className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center text-2xl cursor-pointer shadow-lg border-2 border-white/50 hover:scale-110 transition-transform`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onPointerDown={(e) => handlePointerDown(e, index)}
                                    onPointerUp={(e) => handlePointerUp(e, item)}
                                    draggable={false}
                                >
                                    {item.emoji}
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Center decoration */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full shadow-lg border-4 border-purple-200 flex items-center justify-center pointer-events-none">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                </div>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-2 2xl:bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-gray-600 text-sm bg-white/80 px-4 py-2 rounded-full shadow-md">
                    Drag to rotate
                </p>
            </div>
        </div>
    );
}