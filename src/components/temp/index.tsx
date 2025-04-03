'use client'
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface PostSchedulerProps {
  initialMessage?: string;
  onPost?: (message: string, scheduledTime?: Date) => void;
}

const PostScheduler: React.FC<PostSchedulerProps> = ({
  initialMessage = '',
  onPost = () => { },
}) => {
  const [message, setMessage] = useState(initialMessage);
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date>(new Date());

  const handlePost = () => {
    if (isScheduling) {
      onPost(message, scheduledDate);
    } else {
      onPost(message);
    }
    setMessage('');
    setIsScheduling(false);
  };

  const toggleScheduling = () => {
    setIsScheduling(!isScheduling);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setScheduledDate(newDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const newDate = new Date(scheduledDate);
    newDate.setHours(hours, minutes);
    setScheduledDate(newDate);
  };

  const formattedDate = format(scheduledDate, 'dd MMM yyyy');
  const formattedTime = format(scheduledDate, 'h:mm a');
  useEffect(() => {
    console.log(1 + 2);
  })

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="relative">
        <textarea
          placeholder="What's up?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full min-h-[60px] outline-none resize-none text-gray-700 placeholder-gray-400"
        />

        <AnimatePresence>
          {isScheduling && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 border-t pt-2"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="relative flex-1">
                  <input
                    type="date"
                    onChange={handleDateChange}
                    className="w-full py-2 pr-10 px-3 bg-gray-50 rounded-md outline-none appearance-none"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                <div className="relative flex-1">
                  <input
                    type="time"
                    onChange={handleTimeChange}
                    className="w-full py-2 pr-10 px-3 bg-gray-50 rounded-md outline-none appearance-none"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <button
                  onClick={() => setIsScheduling(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          className="flex items-center justify-end mt-2 gap-2"
        >
          {!isScheduling && (
            <button
              onClick={toggleScheduling}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          )}

          <motion.button
            onClick={handlePost}
            className={`px-4 py-2 rounded-md font-medium ${isScheduling ? 'bg-black text-white w-full' : 'bg-black text-white'}`}
            layout
          >
            {isScheduling ? 'Schedule' : 'Post'}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {isScheduling && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-gray-500 mt-2 text-center"
            >
              Will be posted on {formattedDate}, {formattedTime}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PostScheduler;