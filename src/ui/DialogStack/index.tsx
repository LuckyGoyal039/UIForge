'use client'
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import InviteFriendsModal from './InviteFriendsModal';
import HowItWorksModal from './HowItWorksModal';

type ActiveDialog = {
  type: 'invite' | 'howItWorks';
  id: number;
};

export default function DialogStack() {
  const [dialogStack, setDialogStack] = useState<ActiveDialog[]>([]);
  const [nextId, setNextId] = useState(1);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  // Update button position on mount and window resize
  useEffect(() => {
    const updateButtonPosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX
        });
      }
    };

    updateButtonPosition();
    window.addEventListener('resize', updateButtonPosition);
    return () => window.removeEventListener('resize', updateButtonPosition);
  }, []);

  const openDialog = (type: 'invite' | 'howItWorks') => {
    const newDialog = { type, id: nextId };
    setDialogStack([...dialogStack, newDialog]);
    setNextId(nextId + 1);
  };

  const closeTopDialog = () => {
    setDialogStack(dialogStack.slice(0, -1));
  };

  const closeAllDialogs = () => {
    setDialogStack([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Invite Friends Button */}
      <button
        ref={buttonRef}
        onClick={() => openDialog('invite')}
        className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <span className="font-medium">Invite Friends</span>
      </button>

      {/* Dialog Container */}
      <AnimatePresence>
        {dialogStack.length > 0 && (
          <>
            {/* Overlay for capturing clicks outside */}
            {dialogStack.length > 0 && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-30 z-40"
                onClick={closeAllDialogs}
              />
            )}
            
            {/* Modals */}
            {dialogStack.map((dialog, index) => {
              // Only "How it Works" modal should be centered, first modal appears above button
              const isFirstModal = index === 0 && dialog.type === 'invite';
              
              return (
                <motion.div
                  key={dialog.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, zIndex: 50 + index }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 500 }}
                  className="fixed bg-white rounded-xl shadow-xl w-full max-w-md"
                  style={{
                    // Position first modal above button, rest in center
                    top: isFirstModal 
                      ? `${buttonPosition.top - 380}px` // Approx height of the invite modal
                      : '50%',
                    left: isFirstModal 
                      ? `${buttonPosition.left - 150}px` // Half of modal width (300px) to center
                      : '50%',
                    transform: isFirstModal 
                      ? 'none' 
                      : 'translate(-50%, -50%)',
                    maxWidth: '400px',
                    // Add slight stacking effect if multiple dialogs
                    marginTop: index > 0 ? `-${(dialogStack.length - index - 1) * 10}px` : 0
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {dialog.type === 'invite' && (
                    <InviteFriendsModal 
                      onClose={closeTopDialog} 
                      onHowItWorks={() => openDialog('howItWorks')} 
                    />
                  )}
                  {dialog.type === 'howItWorks' && (
                    <HowItWorksModal 
                      onClose={closeTopDialog} 
                    />
                  )}
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}