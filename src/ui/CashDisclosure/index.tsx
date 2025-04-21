'use client'

import { useState, useRef, useEffect } from 'react';
import { Wallet, Plus, X, Check, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CashDisclosure = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(34.00);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const modalRef = useRef(null);
  
  const cards = [
    { lastFour: '6756', type: 'visa' },
    { lastFour: '4632', type: 'mastercard' }
  ];

  // Process animation effect
  useEffect(() => {
    let progressInterval;
    
    if (isProcessing) {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          // Simulate slight random variations in progress speed
          const increment = Math.random() * 8 + 3; 
          const newProgress = prev + increment;
          
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setIsProcessing(false);
            setIsProcessingComplete(true);
            setBalance(prevBalance => prevBalance + selectedAmount);
            return 100;
          }
          return newProgress;
        });
      }, 100); // Update every 100ms
    }
    
    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isProcessing, selectedAmount]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSelectedAmount(null);
    setIsProcessingComplete(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAmount(null);
    setIsProcessingComplete(false);
    setProgress(0);
  };

  const handleSelectCard = (index) => {
    setSelectedCardIndex(index);
  };

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
  };

  const handleAddCash = () => {
    if (selectedAmount && !isProcessing && !isProcessingComplete) {
      setIsProcessing(true);
      setProgress(0);
    }
  };

  // Animation variants for cards and buttons
  const cardVariants = {
    unselected: { 
      borderColor: "#e5e7eb", 
      backgroundColor: "#fff" 
    },
    selected: { 
      borderColor: "#111827", 
      backgroundColor: "#f9fafb",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  const amountVariants = {
    unselected: { 
      scale: 1,
      backgroundColor: "#f9fafb" 
    },
    selected: { 
      scale: 1.05,
      borderColor: "#111827",
      backgroundColor: "#f3f4f6",
      transition: { type: "spring", stiffness: 500, damping: 20 }
    },
    hover: {
      scale: 1.02,
      backgroundColor: "#f3f4f6"
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const successIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30,
        delay: 0.2
      }
    }
  };

  const balanceVariants = {
    initial: { scale: 1 },
    updated: { 
      scale: [1, 1.1, 1],
      color: ["#374151", "#047857", "#374151"],
      transition: { duration: 1 }
    }
  };

  // Main container variants - with adjusted timing for smoother effect
  const containerVariants = {
    wallet: {
      width: "100%",
      height: "auto",
      borderRadius: "1rem",
      backgroundColor: "#f9fafb",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay: 0.1
      }
    },
    modal: {
      width: "100%",
      height: "auto",
      borderRadius: "1rem",
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 25,
        delay: 0.15
      }
    }
  };

  // Content animation variants - with added delays
  const walletContentVariants = {
    visible: { 
      opacity: 1, 
      transition: { 
        delay: 0.2, 
        duration: 0.4 
      } 
    },
    hidden: { 
      opacity: 0,
      transition: { 
        duration: 0.25 
      } 
    }
  };

  const modalContentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 0.4,
        staggerChildren: 0.15
      }
    }
  };

  const modalItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        delay: 0.1
      }
    }
  };

  // Progress bar animation variants
  const progressBarVariants = {
    initial: { width: 0 },
    animate: { 
      width: `${progress}%`,
      transition: { ease: "easeOut", duration: 0.2 }
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center px-10">
      {/* Single container that morphs between wallet and modal */}
      <motion.div
        initial="wallet"
        animate={isModalOpen ? "modal" : "wallet"}
        variants={containerVariants}
        className="overflow-hidden"
        layoutId="container"
      >
        {/* Wallet Content - visible when modal is closed */}
        <AnimatePresence mode="wait">
          {!isModalOpen && (
            <motion.div 
              key="wallet-content"
              variants={walletContentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="px-4 py-2 flex items-center justify-between w-full"
            >
              <div className="flex items-center">
                <motion.div 
                  layoutId="wallet-icon"
                  className="bg-gray-100 p-2 rounded-full mr-3"
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 25,
                    delay: 0.1
                  }}
                >
                  <Wallet className="text-gray-400" size={48} />
                </motion.div>
                <div>
                  <div className="text-gray-500 text-sm">Wallet</div>
                  <motion.p 
                    layoutId="balance"
                    className="font-semibold text-xl text-gray-700"
                    key={balance}
                    initial="initial"
                    animate="updated"
                    variants={balanceVariants}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 25,
                      delay: 0.1
                    }}
                  >
                    ${balance.toFixed(2)}
                  </motion.p>
                </div>
              </div>
              <motion.button 
                className="bg-gray-900 text-white rounded-full px-4 py-2 flex items-center"
                onClick={handleOpenModal}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Plus size={18} className="mr-1" /> Add Cash
              </motion.button>
            </motion.div>
          )}

          {/* Modal Content - visible when modal is open */}
          {isModalOpen && (
            <motion.div
              key="modal-content"
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              ref={modalRef}
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <motion.div 
                      layoutId="wallet-icon"
                      className="bg-gray-100 p-2 rounded-full mr-3"
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 25,
                        delay: 0.15
                      }}
                    >
                      <Wallet className="text-gray-400" size={24} />
                    </motion.div>
                    <motion.div 
                      layoutId="balance"
                      className="font-semibold text-xl text-gray-600"
                      key={balance}
                      variants={balanceVariants}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 25,
                        delay: 0.15
                      }}
                    >
                      ${balance.toFixed(2)}
                    </motion.div>
                  </div>
                  <motion.button 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={handleCloseModal}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: { delay: 0.5 }
                    }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4">
                {/* Payment Mode */}
                <motion.div 
                  className="flex justify-between items-center mb-3"
                  variants={modalItemVariants}
                >
                  <div className="text-gray-500">Payment Mode</div>
                  <motion.button 
                    className="bg-white border border-gray-200 rounded-full px-3 py-1 text-sm flex items-center"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <CreditCard size={16} className="mr-1" /> Add Card
                  </motion.button>
                </motion.div>

                {/* Card Options */}
                <motion.div 
                  className="space-y-2 mb-6"
                  variants={modalItemVariants}
                >
                  {cards.map((card, index) => (
                    <motion.div 
                      key={card.lastFour}
                      variants={cardVariants}
                      initial="unselected"
                      animate={selectedCardIndex === index ? "selected" : "unselected"}
                      whileHover={{ backgroundColor: "#f9fafb" }}
                      className="border rounded-lg p-3 flex justify-between items-center cursor-pointer"
                      onClick={() => handleSelectCard(index)}
                    >
                      <div className="flex items-center text-gray-500">
                        <motion.div 
                          className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                            selectedCardIndex === index ? 'border-gray-900 bg-gray-900' : 'border-gray-300'
                          }`}
                          animate={{ 
                            backgroundColor: selectedCardIndex === index ? "#111827" : "#ffffff",
                            borderColor: selectedCardIndex === index ? "#111827" : "#d1d5db"
                          }}
                        >
                          {selectedCardIndex === index && (
                            <motion.div 
                              className="w-2 h-2 bg-white rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            ></motion.div>
                          )}
                        </motion.div>
                        <div>•••• {card.lastFour}</div>
                      </div>
                      <div>
                        {card.type === 'visa' && <span className="font-bold">VISA</span>}
                        {card.type === 'mastercard' && (
                          <div className="flex">
                            <div className="w-5 h-5 bg-black rounded-full opacity-80"></div>
                            <div className="w-5 h-5 bg-gray-400 rounded-full opacity-80 -ml-2"></div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Cash Options */}
                <motion.div 
                  className="text-gray-500"
                  variants={modalItemVariants}
                >
                  <div className="mb-3">Cash</div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[50, 100, 300].map((amount) => (
                      <motion.div
                        key={amount}
                        variants={amountVariants}
                        initial="unselected"
                        animate={selectedAmount === amount ? "selected" : "unselected"}
                        whileHover="hover"
                        className={`py-2 px-4 rounded-full text-center cursor-pointer border-2 ${
                          selectedAmount === amount ? 'border-gray-900' : 'border-transparent bg-gray-50'
                        }`}
                        onClick={() => handleSelectAmount(amount)}
                      >
                        ${amount}
                      </motion.div>
                    ))}
                  </div>

                  {/* Button with progress animation */}
                  <div className="relative">
                    <motion.button
                      className="w-full bg-gray-900 text-white rounded-full py-3 flex items-center justify-center font-medium overflow-hidden"
                      onClick={isProcessingComplete ? handleCloseModal : handleAddCash}
                      disabled={(!selectedAmount && !isProcessingComplete) || isProcessing}
                      variants={buttonVariants}
                      whileHover={(selectedAmount || isProcessingComplete) && !isProcessing ? "hover" : "idle"}
                      whileTap={(selectedAmount || isProcessingComplete) && !isProcessing ? "tap" : "idle"}
                      style={{ 
                        opacity: (selectedAmount || isProcessingComplete) && !isProcessing ? 1 : 0.7 
                      }}
                    >
                      {/* Progress bar */}
                      {isProcessing && (
                        <motion.div 
                          className="absolute left-0 bottom-0 h-full bg-gray-700 opacity-70"
                          variants={progressBarVariants}
                          initial="initial"
                          animate="animate"
                          key={progress}
                        />
                      )}
                      
                      {/* Button text */}
                      {isProcessingComplete ? (
                        <div className="flex items-center relative z-10">
                          <motion.div
                            variants={successIconVariants}
                            initial="hidden"
                            animate="visible"
                            className="mr-1"
                          >
                            <Check size={18} />
                          </motion.div>
                          <span>Done</span>
                        </div>
                      ) : isProcessing ? (
                        <div className="flex items-center relative z-10">
                          <span>Processing... {Math.round(progress)}%</span>
                        </div>
                      ) : (
                        <div className="flex items-center relative z-10">
                          <Plus size={18} className="mr-1" /> Add Cash
                        </div>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CashDisclosure;