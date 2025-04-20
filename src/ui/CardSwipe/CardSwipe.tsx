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
      className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-xs mx-auto flex flex-col items-center"
      onClick={onClick}
    >
      <div className="bg-gray-100 p-4 rounded-2xl mb-6">
        {data.icon}
      </div>
      <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
      <p className="text-gray-500 text-center mb-6">{data.description}</p>
      <button className="bg-gray-800 text-white py-3 px-6 rounded-full font-medium">
        Get Started
      </button>
    </div>
  );
};

// Icons for our cards
const RunningIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 16l-4-4 4-4" />
    <path d="M8 8l4 4-4 4" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 010-5H20" />
  </svg>
);

const WaterIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L4.5 10c-1.5 1.5-2 3.5-2 5.5 0 4.14 3.36 7.5 7.5 7.5s7.5-3.36 7.5-7.5c0-2-0.5-4-2-5.5L12 2z" />
  </svg>
);

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