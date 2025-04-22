import React, { useState } from 'react';
import { X } from 'lucide-react';

interface InviteFriendsModalProps {
  onClose: () => void;
  onHowItWorks: () => void;
}

export default function InviteFriendsModal({ onClose, onHowItWorks }: InviteFriendsModalProps) {
  const [emails, setEmails] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSendInvite = () => {
    // Handle sending invite logic here
    console.log('Sending invites to:', emails);
    console.log('Message:', message);
    onClose();
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium text-gray-700">Invite Friends</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
          <X size={20} />
        </button>
      </div>

      {/* Form */}
      <div className="p-4 space-y-4">
        {/* Email Input */}
        <div className="space-y-2">
          <label className="block text-gray-700">Email Address</label>
          <input
            type="text"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="example@email.com"
          />
          <p className="text-sm text-gray-500">Use commas to add multiple emails.</p>
        </div>

        {/* Message Input */}
        <div className="space-y-2">
          <label className="block text-gray-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded-md h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            placeholder="Add a personal message..."
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendInvite}
          className="w-full bg-black text-white py-3 rounded-md font-medium flex items-center justify-center gap-2"
        >
          Send Invite <span className="text-lg">→</span>
        </button>

        {/* How it works link */}
        <div className="text-center">
          <button
            onClick={onHowItWorks}
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            How it works?
          </button>
        </div>
      </div>
    </div>
  );
}