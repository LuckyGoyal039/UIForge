"use client";

import React from 'react';

interface FrameProps {
    children: React.ReactNode;
    className?: string;
    title: string;
}

const Frame = ({
    children,
    className = "",
    title
}: FrameProps) => {
    return (
        <div className="w-full max-w-screen-md">
            <div className={`bg-white dark:bg-gray-900 rounded-xl border-4 border-gray-200 dark:border-gray-700 shadow-sm h-72 md:h-[60vh] lg:h-[70vh] ${className}`}>
                <div className="w-full h-full text-gray-900 dark:text-gray-100 rounded-xl overflow-hidden">
                    {children}
                </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-300 flex flex-col">
                <p className="font-medium text-white md:text-lg">{title}</p>
                <p>{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: '2-digit' })}</p>
            </div>
        </div>
    );
};

export default Frame;
