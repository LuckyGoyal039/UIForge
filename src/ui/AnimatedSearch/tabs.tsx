'use client';
import { useState, useEffect, useRef, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPaperclip, FiUser, FiMessageCircle, FiList, FiChevronUp } from "react-icons/fi";

interface Props {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    filters: { files?: boolean; people?: boolean; chats?: boolean; lists?: boolean };
    counts: { all: number; files: number; people: number; chats: number; list: number };
}

export default function Tabs({ activeTab, setActiveTab, filters, counts }: Props) {
    const [isMobile, setIsMobile] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const tabs = [
        { id: "all", label: "All", count: counts.all },
        filters.files && { id: "files", label: "Files", count: counts.files, icon: <FiPaperclip className="w-4 h-4" /> },
        filters.people && { id: "people", label: "People", count: counts.people, icon: <FiUser className="w-4 h-4" /> },
        filters.chats && { id: "chats", label: "Chats", count: counts.chats, icon: <FiMessageCircle className="w-4 h-4" /> },
        filters.lists && { id: "lists", label: "Lists", count: counts.list, icon: <FiList className="w-4 h-4" /> },
    ].filter(Boolean) as { id: string; label: string; count: number; icon?: JSX.Element }[];

    if (isMobile) {
        return (
            <div className="relative w-30 pb-1" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full bg-white border border-gray-300 rounded-md px-2 py-1 text-sm flex items-center justify-between hover:border-gray-400 transition text-center"
                >
                    <div className="flex items-center space-x-1 text-black text-center">
                        {tabs.find((tab) => tab.id === activeTab)?.icon}
                        <span>{tabs.find((tab) => tab.id === activeTab)?.label}</span>
                        <span className="px-1 py-[1.5px] text-[11px] bg-[#f2f2f2] rounded-md text-[#828282]">
                            {tabs.find((tab) => tab.id === activeTab)?.count}
                        </span>
                    </div>
                    <FiChevronUp className={`transition-transform duration-200 text-black ${dropdownOpen ? 'rotate-0' : 'rotate-180'}`} />
                </button>

                <AnimatePresence>
                    {dropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 text-black"
                        >
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-2 py-1 text-sm hover:bg-gray-100 flex items-center space-x-2 ${activeTab === tab.id ? "bg-gray-100 font-semibold" : ""}`}
                                >
                                    {tab.icon}
                                    <span className="block">{tab.label}</span>
                                    <span className="ml-auto px-2 py-[1.5px] text-[11px] bg-[#f2f2f2] rounded-md text-[#828282]">{tab.count}</span>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // Desktop tabs view
    return (
        <div className="flex space-x-2 -mb-1">
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative pb-1 text-sm font-medium transition-colors cursor-pointer ${activeTab === tab.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <div className="flex items-center space-x-1 px-1 mb-1">
                        {tab.icon}
                        <span className={`${activeTab === tab.id ? "font-semibold" : ""}`}>{tab.label}</span>
                        <span className="px-2 py-[1.5px] text-[11px] bg-[#f2f2f2] rounded-md text-[#828282]">{tab.count}</span>
                    </div>

                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="underline"
                            className="absolute left-0 right-0 h-0.5 bg-gray-900 rounded-full"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
