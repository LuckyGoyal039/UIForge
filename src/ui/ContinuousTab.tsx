'use client'
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ContinuousTab() {
    const [activeTab, setActiveTab] = useState('home');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const autoChangingRef = useRef<boolean>(true);

    const tabs = [
        { id: 'home', label: 'Home' },
        { id: 'interactions', label: 'Interactions' },
        { id: 'resources', label: 'Resources' },
        { id: 'docs', label: 'Docs' }
    ];

    const getActiveTabIndex = () => {
        return tabs.findIndex(tab => tab.id === activeTab);
    };

    // Function to cycle to the next tab
    const goToNextTab = () => {
        setActiveTab(prevTab => {
            const currentIndex = tabs.findIndex(tab => tab.id === prevTab);
            const nextIndex = (currentIndex + 1) % tabs.length;
            return tabs[nextIndex].id;
        });
    };

    // Setup automatic tab changing
    useEffect(() => {
        // Function to handle the interval
        const startInterval = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            
            intervalRef.current = setInterval(() => {
                if (autoChangingRef.current) {
                    goToNextTab();
                }
            }, 3000);
        };

        // Start the interval
        startInterval();

        // Cleanup on unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    // Function to handle manual tab selection
    const handleTabClick = (tabId: string) => {
        // Temporarily pause auto-changing
        autoChangingRef.current = false;
        
        // Set the active tab manually
        setActiveTab(tabId);
        
        // Resume auto-changing after a delay
        setTimeout(() => {
            autoChangingRef.current = true;
        }, 5000); // Pause auto-changing for 5 seconds after manual selection   
    };

    return (
        <div className='flex justify-center items-center h-full w-full bg-white px-2'>
            <div className="flex flex-col gap-8 w-full">
                <div className="relative flex items-center bg-[#f5f5fa] rounded-full p-1">
                    <motion.div
                        className="absolute h-full top-0 rounded-full bg-black z-0"
                        initial={false}
                        animate={{
                            left: `${(getActiveTabIndex() * 100) / tabs.length}%`,
                            width: `${100 / tabs.length}%`
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 400,    // Increased for more springiness
                            damping: 20,       // Reduced for more bounce
                            mass: 1,         // Added mass for more physics feel
                            velocity: 1.5        // Added initial velocity for more dynamic motion
                        }}
                    />

                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`text-sm relative z-10 flex-1 py-2 md:px-4 text-center rounded-full transition-colors duration-200 ${
                                activeTab === tab.id ? 'text-white' : 'text-gray-700 hover:text-gray-900'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}