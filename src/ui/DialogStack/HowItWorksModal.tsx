import React from 'react';
import { X, Mail, CheckCircle, Award } from 'lucide-react';

interface HowItWorksModalProps {
  onClose: () => void;
}

export default function HowItWorksModal({ onClose }: HowItWorksModalProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium text-gray-700">How it works?</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-6">3 easy steps</h3>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Mail size={24} className="text-gray-600" />
            </div>
            <div>
              <p className="text-gray-700">
                Send an invite to your friend who will be as excited as you to access the early access.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="bg-gray-100 p-2 rounded-lg">
              <CheckCircle size={24} className="text-gray-600" />
            </div>
            <div>
              <p className="text-gray-700">
                Once they accept the invite, they will also get the early access like you.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Award size={24} className="text-gray-600" />
            </div>
            <div>
              <p className="text-gray-700">
                If your invited friend upgrade to pro, you both unlock the premium trail.
              </p>
            </div>
          </div>
        </div>

        {/* Got It Button */}
        <button
          onClick={onClose}
          className="w-full bg-black text-white py-3 rounded-md font-medium mt-6 flex items-center justify-center gap-2"
        >
          Got It <span>👍</span>
        </button>
      </div>
    </div>
  );
}