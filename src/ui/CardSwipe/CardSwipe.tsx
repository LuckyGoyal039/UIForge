// CardSwipe.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define a type for our card data
interface CardData {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Props for our CardSwipe component
interface CardSwipeProps {
  cards: CardData[];
  onCardClick?: (card: CardData) => void;
}

// Individual Card component
const Card: React.FC<{ data: CardData; onClick?: () => void }> = ({ data, onClick }) => {
  return (
    <div 
      className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-xs mx-auto flex flex-col text-black"
      onClick={onClick}
    >
      <div className="p-4 rounded-2xl mb-6">
        {data.icon}
      </div>
      <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
      <p className="text-gray-500  mb-6">{data.description}</p>
      <button className="bg-gray-800 text-white py-3 px-6 rounded-full font-medium">
        Get Started
      </button>
    </div>
  );
};

const CardSwipe: React.FC<CardSwipeProps> = ({ cards, onCardClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [startX, setStartX] = useState(0);

  // Handle touch/mouse events for swiping
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (startX === 0) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    
    // Determine swipe direction
    if (Math.abs(diff) > 20) {
      setDirection(diff > 0 ? 1 : -1);
    } else {
      setDirection(0);
    }
  };

  const handleTouchEnd = () => {
    if (direction !== 0) {
      // Calculate new index based on swipe direction
      let newIndex = currentIndex;
      if (direction < 0 && currentIndex < cards.length - 1) {
        newIndex = currentIndex + 1;
      } else if (direction > 0 && currentIndex > 0) {
        newIndex = currentIndex - 1;
      }
      
      setCurrentIndex(newIndex);
    }
    
    // Reset
    setDirection(0);
    setStartX(0);
  };

  const goToCard = (index: number) => {
    setDirection(index > currentIndex ? -1 : 1);
    setCurrentIndex(index);
  };

  const handleCardClick = (card: CardData) => {
    if (onCardClick) {
      onCardClick(card);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative overflow-hidden py-6">
      <div
        className="relative h-96"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction < 0 ? -300 : 300 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Card
              data={cards[currentIndex]}
              onClick={() => handleCardClick(cards[currentIndex])}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center mt-4 gap-2">
        {cards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToCard(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-4 bg-gray-500' : 'w-2 bg-gray-300'
            }`}
            aria-label={`Go to card ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSwipe;