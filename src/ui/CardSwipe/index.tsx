'use client'
import CardSwipe from './CardSwipe';
import { X } from 'lucide-react';
import { GiSteeltoeBoots } from "react-icons/gi";
import { FaBookReader } from "react-icons/fa";
import { RiDrinks2Line } from "react-icons/ri";

export default function Card() {
  const cards = [
    {
      id: 1,
      title: "Running",
      description: "Feel the endorphins! Get a quick energy boost.",
      icon: <GiSteeltoeBoots size={90} />
    },
    {
      id: 2,
      title: "Reading",
      description: "Sharpen your mind & escape to new adventures.",
      icon: <FaBookReader size={90} />
    },
    {
      id: 3,
      title: "Drink Water",
      description: "Stay hydrated & energized. Your body will thank you!",
      icon: <RiDrinks2Line size={90} />
    }
  ];

  const handleCardClick = (card) => {
    console.log(`Card clicked: ${card.title}`);
    // Handle the card click, e.g., navigate to a details page
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-100 p-4">
      <CardSwipe cards={cards} onCardClick={handleCardClick} />
    </div>
  );
}