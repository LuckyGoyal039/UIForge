'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FundData {
    value: number;
    change: number;
    label: string;
    isPositive: boolean;
}

interface FundWeightProps {
    funds: FundData[];
    autoSlide?: boolean;
    slideInterval?: number;
    className?: string;
}

const FundWeight: React.FC<FundWeightProps> = ({
    funds,
    autoSlide = true,
    slideInterval = 3000,
    className = ""
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!autoSlide || funds.length <= 1 || isHovered) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % funds.length);
        }, slideInterval);

        return () => clearInterval(interval);
    }, [autoSlide, slideInterval, funds.length, isHovered]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % funds.length);
    }, [funds.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + funds.length) % funds.length);
    }, [funds.length]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                event.preventDefault();
                handlePrev();
            } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                event.preventDefault();
                handleNext();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev]);

    const [isScrolling, setIsScrolling] = useState(false);
    
    const handleWheel = useCallback((event: React.WheelEvent) => {
        event.preventDefault();
        
        if (isScrolling) return;
        
        setIsScrolling(true);
        
        if (Math.abs(event.deltaY) > 50) {
            if (event.deltaY > 0) {
                handleNext();
            } else if (event.deltaY < 0) {
                handlePrev();
            }
        }
        
        setTimeout(() => {
            setIsScrolling(false);
        }, 300);
    }, [handleNext, handlePrev, isScrolling]);

    const currentFund = funds[currentIndex];

    return (
        <div className='w-full h-full flex justify-center items-center bg-[#F9F5EF]'>
            <div 
                className={`relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer select-none ${className}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onWheel={handleWheel}
                tabIndex={0}
                role="region"
                aria-label="Fund data carousel"
                style={{ touchAction: 'pan-y' }}
            >

                {funds.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:opacity-100 z-10"
                            aria-label="Previous fund"
                        >
                            <svg className="w-4 h-4 text-gray-600 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute left-3 bottom-1/2 transform translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:opacity-100 z-10"
                            aria-label="Next fund"
                        >
                            <svg className="w-4 h-4 text-gray-600 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </>
                )}

                <div className="relative h-30 flex flex-col justify-between group">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 25,
                                duration: 0.3
                            }}
                            className="flex flex-col justify-between h-30 w-30"
                        >
                            <div className="text-4xl font-bold text-gray-900 mb-2">
                                {currentFund.value}Cr
                            </div>

                            <div className="flex items-center space-x-1 mb-4">
                                <span className={`text-sm font-medium ${currentFund.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                    {currentFund.isPositive ? '+' : ''}{currentFund.change}%
                                </span>
                                <svg
                                    className={`w-4 h-4 ${currentFund.isPositive ? 'text-green-600' : 'text-red-600'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d={currentFund.isPositive
                                            ? "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                            : "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        }
                                    />
                                </svg>
                            </div>

                            <div className="text-xl font-semibold text-gray-700 mt-auto">
                                {currentFund.label}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {funds.length > 1 && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
                        {funds.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`rounded-full transition-all duration-200 hover:bg-gray-500 ${
                                    index === currentIndex 
                                        ? 'w-2 h-6 bg-gray-600' 
                                        : 'w-2 h-2 bg-gray-300'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}


            </div>
        </div>
    );
};

const FundWeightWithDefaults: React.FC = () => {
    const defaultFunds: FundData[] = [
        { value: 2.7, change: 12, label: "Stocks", isPositive: true },
        { value: 3.5, change: 8, label: "Funds", isPositive: true },
        { value: 1.8, change: -5, label: "Bonds", isPositive: false },
        { value: 4.2, change: 15, label: "ETFs", isPositive: true },
    ];

    return <FundWeight funds={defaultFunds} autoSlide={true} slideInterval={2000} />;
};

export default FundWeightWithDefaults;