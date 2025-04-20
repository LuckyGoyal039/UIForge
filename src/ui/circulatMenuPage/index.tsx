'use client'
import React from 'react';
import CircularMenu from './circularMenu';
import { Bell, Box, Search, PencilLine, Image, Wrench, Clock } from 'lucide-react';

const CircularMenuPage: React.FC = () => {
  const menuItems = [
    {
      id: "search",
      icon: <Search className="w-5 h-5 text-gray-600" />,
      label: "Search",
      onClick: () => console.log("Search clicked")
    },
    {
      id: "notification",
      icon: <Bell className="w-5 h-5 text-gray-600" />,
      label: "Notifications",
      onClick: () => console.log("Notifications clicked")
    },
    {
      id: "cube",
      icon: <Box className="w-5 h-5 text-gray-600" />,
      label: "3D Object",
      onClick: () => console.log("3D Object clicked")
    },
    {
      id: "photos",
      icon: <Image className="w-5 h-5 text-gray-600" />,
      label: "Photos",
      onClick: () => console.log("Photos clicked")
    },
    {
      id: "pencil",
      icon: <PencilLine className="w-5 h-5 text-gray-600" />,
      label: "Edit",
      onClick: () => console.log("Edit clicked")
    },
    {
      id: "tools",
      icon: <Wrench className="w-5 h-5 text-gray-600" />,
      label: "Tools",
      onClick: () => console.log("Tools clicked")
    },
    {
      id: "time",
      icon: <Clock className="w-5 h-5 text-gray-600" />,
      label: "Time",
      onClick: () => console.log("Time clicked")
    },
    {
      id: "wave",
      icon: <Bell className="w-5 h-5 text-gray-600" />,
      label: "Waveform",
      onClick: () => console.log("Waveform clicked")
    }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <CircularMenu items={menuItems} radius={120} />
    </div>
  );
};

export default CircularMenuPage;