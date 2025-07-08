'use client'
import React, { JSX, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './trees.module.css'
import {
    FiChevronLeft,
    FiLayers,
    FiGrid,
    FiMousePointer,
    FiZap,
    FiSettings,
    FiPlay,
    FiArrowRight,
    FiVolume2,
    FiTarget,
    FiType,
    FiLayout,
    FiBox,
    FiToggleLeft,
    FiEdit,
    FiImage,
    FiList,
    FiSliders,
    FiMove,
    FiRotateCw,
    FiMaximize2,
    FiMinimize2,
    FiRefreshCw,
    FiMusic,
    FiHeadphones,
    FiBell,
    FiSpeaker,
    FiMic,
    FiHeart,
    FiStar,
    FiLoader,
    FiCheck,
    FiX,
    FiUser,
    FiShoppingCart,
    FiSearch,
    FiMenu,
    FiHome,
    FiMail
} from 'react-icons/fi';
import { IconType } from 'react-icons';

// Define types for menu items
interface MenuItem {
    id: string;
    label: string;
    icon?: IconType;
    hasSubmenu?: boolean;
}

interface MenuData {
    [key: string]: MenuItem[];
}

// Define props type
interface TreeMenuProps {
    onItemClick?: (item: MenuItem, level: string) => void;
}

// Define valid section types
type SectionType = 'foundation' | 'components' | 'gestures' | 'interactions' | 'patterns';
type SubSectionType = 'animations' | 'transitions' | 'haptics' | 'audio-feedback' | 'microinteractions';

const TreeMenu: React.FC<TreeMenuProps> = ({ onItemClick = () => { } }) => {
    const [activeSection, setActiveSection] = useState<SectionType | null>(null);
    const [activeSubSection, setActiveSubSection] = useState<SubSectionType | null>(null);

    const menuData: MenuData = {
        main: [
            { id: 'foundation', label: 'Foundation', icon: FiLayers, hasSubmenu: true },
            { id: 'components', label: 'Components', icon: FiGrid, hasSubmenu: true },
            { id: 'gestures', label: 'Gestures', icon: FiMousePointer, hasSubmenu: true },
            { id: 'interactions', label: 'Interactions', icon: FiZap, hasSubmenu: true },
            { id: 'patterns', label: 'Patterns', icon: FiSettings, hasSubmenu: true }
        ],
        foundation: [
            { id: 'typography', label: 'Typography', icon: FiType },
            { id: 'colors', label: 'Colors', icon: FiLayout },
            { id: 'spacing', label: 'Spacing', icon: FiLayout },
            { id: 'grid-system', label: 'Grid System', icon: FiGrid },
            { id: 'shadows', label: 'Shadows', icon: FiBox },
            { id: 'border-radius', label: 'Border Radius', icon: FiBox }
        ],
        components: [
            { id: 'buttons', label: 'Buttons', icon: FiToggleLeft },
            { id: 'inputs', label: 'Inputs', icon: FiEdit },
            { id: 'cards', label: 'Cards', icon: FiBox },
            { id: 'modals', label: 'Modals', icon: FiMaximize2 },
            { id: 'navigation', label: 'Navigation', icon: FiMenu },
            { id: 'forms', label: 'Forms', icon: FiList },
            { id: 'tables', label: 'Tables', icon: FiGrid },
            { id: 'images', label: 'Images', icon: FiImage },
            { id: 'icons', label: 'Icons', icon: FiStar },
            { id: 'avatars', label: 'Avatars', icon: FiUser }
        ],
        gestures: [
            { id: 'tap', label: 'Tap', icon: FiMousePointer },
            { id: 'double-tap', label: 'Double Tap', icon: FiMousePointer },
            { id: 'long-press', label: 'Long Press', icon: FiMousePointer },
            { id: 'swipe', label: 'Swipe', icon: FiMove },
            { id: 'pinch', label: 'Pinch', icon: FiMinimize2 },
            { id: 'zoom', label: 'Zoom', icon: FiMaximize2 },
            { id: 'rotate', label: 'Rotate', icon: FiRotateCw },
            { id: 'pan', label: 'Pan', icon: FiMove },
            { id: 'drag', label: 'Drag & Drop', icon: FiLayout }
        ],
        interactions: [
            { id: 'animations', label: 'Animations', icon: FiPlay, hasSubmenu: true },
            { id: 'transitions', label: 'Transitions', icon: FiArrowRight, hasSubmenu: true },
            { id: 'haptics', label: 'Haptics', icon: FiTarget, hasSubmenu: true },
            { id: 'audio-feedback', label: 'Audio Feedback', icon: FiVolume2, hasSubmenu: true },
            { id: 'microinteractions', label: 'Microinteractions', icon: FiZap, hasSubmenu: true }
        ],
        patterns: [
            { id: 'loading', label: 'Loading States', icon: FiLoader },
            { id: 'empty-states', label: 'Empty States', icon: FiBox },
            { id: 'error-states', label: 'Error States', icon: FiX },
            { id: 'success-states', label: 'Success States', icon: FiCheck },
            { id: 'onboarding', label: 'Onboarding', icon: FiUser },
            { id: 'search', label: 'Search Patterns', icon: FiSearch },
            { id: 'checkout', label: 'Checkout Flow', icon: FiShoppingCart },
            { id: 'dashboard', label: 'Dashboard Layout', icon: FiHome },
            { id: 'messaging', label: 'Messaging', icon: FiMail }
        ],
        animations: [
            { id: 'fade', label: 'Fade In/Out', icon: FiPlay },
            { id: 'slide', label: 'Slide', icon: FiArrowRight },
            { id: 'scale', label: 'Scale', icon: FiMaximize2 },
            { id: 'rotate', label: 'Rotate', icon: FiRotateCw },
            { id: 'bounce', label: 'Bounce', icon: FiRefreshCw },
            { id: 'spring', label: 'Spring', icon: FiZap },
            { id: 'elastic', label: 'Elastic', icon: FiRefreshCw },
            { id: 'pulse', label: 'Pulse', icon: FiHeart }
        ],
        transitions: [
            { id: 'page-transitions', label: 'Page Transitions', icon: FiArrowRight },
            { id: 'modal-transitions', label: 'Modal Transitions', icon: FiMaximize2 },
            { id: 'tab-transitions', label: 'Tab Transitions', icon: FiLayout },
            { id: 'accordion-transitions', label: 'Accordion', icon: FiList },
            { id: 'carousel-transitions', label: 'Carousel', icon: FiImage },
            { id: 'drawer-transitions', label: 'Drawer', icon: FiSliders }
        ],
        haptics: [
            { id: 'light-impact', label: 'Light Impact' },
            { id: 'medium-impact', label: 'Medium Impact' },
            { id: 'heavy-impact', label: 'Heavy Impact' },
            { id: 'intense-impact', label: 'Intense Impact' },
            { id: 'custom', label: 'Custom' }
        ],
        'audio-feedback': [
            { id: 'button-sounds', label: 'Button Sounds', icon: FiSpeaker },
            { id: 'notification-sounds', label: 'Notification Sounds', icon: FiBell },
            { id: 'success-sounds', label: 'Success Sounds', icon: FiCheck },
            { id: 'error-sounds', label: 'Error Sounds', icon: FiX },
            { id: 'ambient-sounds', label: 'Ambient Sounds', icon: FiMusic },
            { id: 'voice-feedback', label: 'Voice Feedback', icon: FiMic },
            { id: 'spatial-audio', label: 'Spatial Audio', icon: FiHeadphones }
        ],
        microinteractions: [
            { id: 'hover-effects', label: 'Hover Effects', icon: FiMousePointer },
            { id: 'loading-indicators', label: 'Loading Indicators', icon: FiLoader },
            { id: 'progress-bars', label: 'Progress Bars', icon: FiSliders },
            { id: 'toggles', label: 'Toggles', icon: FiToggleLeft },
            { id: 'button-states', label: 'Button States', icon: FiToggleLeft },
            { id: 'form-validation', label: 'Form Validation', icon: FiCheck },
            { id: 'tooltips', label: 'Tooltips', icon: FiBox },
            { id: 'dropdown-menus', label: 'Dropdown Menus', icon: FiList }
        ]
    };

    const handleItemClick = (item: MenuItem, level: string = 'main'): void => {
        if (item.hasSubmenu) {
            if (level === 'main') {
                setActiveSection(item.id as SectionType);
                setActiveSubSection(null);
            } else if (level === 'interactions') {
                setActiveSubSection(item.id as SubSectionType);
            }
        } else {
            onItemClick(item, level);
        }
    };

    const handleBackClick = (): void => {
        if (activeSubSection) {
            setActiveSubSection(null);
        } else if (activeSection) {
            setActiveSection(null);
        }
    };

    const renderMenuItem = (item: MenuItem, level: string = 'main'): JSX.Element => (
        <motion.li
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
        >
            <button
                onClick={() => handleItemClick(item, level)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 group"
            >
                <div className="flex items-center space-x-3">
                    {item.icon && (
                        <item.icon className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                    )}
                    <span className="text-gray-800 font-medium">{item.label}</span>
                </div>
                {item.hasSubmenu && (
                    <FiChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
                )}
            </button>
        </motion.li>
    );

    const renderBackButton = (title: string): JSX.Element => (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 px-4 py-3 border-b border-gray-200 mb-2"
        >
            <button
                onClick={handleBackClick}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
                <FiChevronLeft className="w-4 h-4" />
                <span className="text-sm font-medium">{title}</span>
            </button>
        </motion.div>
    );

    const getCurrentMenuData = (): MenuItem[] => {
        if (activeSubSection) return menuData[activeSubSection] || [];
        if (activeSection) return menuData[activeSection] || [];
        return menuData.main;
    };

    const getCurrentLevel = (): string => {
        if (activeSubSection) return activeSubSection;
        if (activeSection) return activeSection;
        return 'main';
    };

    const getTitle = (): string | null => {
        if (activeSubSection) {
            const subItem = menuData.interactions.find((item: MenuItem) => item.id === activeSubSection);
            return subItem?.label || activeSubSection;
        }
        if (activeSection) {
            const mainItem = menuData.main.find((item: MenuItem) => item.id === activeSection);
            return mainItem?.label || activeSection;
        }
        return null;
    };

    return (
        <div className='flex justify-center items-center bg-white w-full h-full'>
            <div className="w-72 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="h-96 relative">
                    <div className="absolute inset-0 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeSection}-${activeSubSection}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className={`${styles.hideScrollbar} h-full overflow-y-auto overflow-x-auto`}
                            >
                                {getTitle() && renderBackButton(getTitle()!)}
                                <ul className="py-2">
                                    {getCurrentMenuData().map((item: MenuItem) => renderMenuItem(item, getCurrentLevel()))}
                                </ul>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreeMenu;