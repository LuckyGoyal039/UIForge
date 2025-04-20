'use client'
import CardSwipe from './CardSwipe';
import { X } from 'lucide-react';

export default function Card() {
  const cards = [
    {
      id: 1,
      title: "Running",
      description: "Feel the endorphins! Get a quick energy boost.",
      icon: <X size={24} />
    },
    {
      id: 2,
      title: "Reading",
      description: "Sharpen your mind & escape to new adventures.",
      icon: <X size={24} />
    },
    {
      id: 3,
      title: "Drink Water",
      description: "Stay hydrated & energized. Your body will thank you!",
      icon: <X size={24} />
    }
  ];

  const handleCardClick = (card) => {
    console.log(`Card clicked: ${card.title}`);
    // Handle the card click, e.g., navigate to a details page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <CardSwipe cards={cards} onCardClick={handleCardClick} />
    </div>
  );
}