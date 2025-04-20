'use client'
// TransactionList.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Receipt, X } from 'lucide-react';

interface Transaction {
    id: string;
    name: string;
    amount: number;
    category: string;
    icon: 'receipt' | 'mobile' | 'burger' | string;
    date?: string;
    time?: string;
    paymentMethod?: {
        type: string;
        lastFour: string;
        brand: string;
    };
}

const transactions = [
    {
        id: '54635',
        name: 'Netflix',
        amount: -6.99,
        category: 'Subscription',
        icon: 'receipt',
        date: 'September 14',
        time: '11:23 am',
        paymentMethod: {
            type: 'Credit Card',
            lastFour: '9342',
            brand: 'VISA'
        }
    },
    {
        id: '54326',
        name: 'Verizon',
        amount: -4.05,
        category: 'Mobile Recharge',
        icon: 'mobile',
        date: 'September 15',
        time: '10:17 am',
        paymentMethod: {
            type: 'Credit Card',
            lastFour: '9342',
            brand: 'VISA'
        }
    },
    {
        id: '54637',
        name: 'Rive',
        amount: -32.00,
        category: 'Subscription',
        icon: 'receipt',
        date: 'September 16',
        time: '02:11 pm',
        paymentMethod: {
            type: 'Credit Card',
            lastFour: '9342',
            brand: 'VISA'
        }
    },
    {
        id: '53421',
        name: 'Figma',
        amount: -15.00,
        category: 'Subscription',
        icon: 'receipt',
        date: 'September 14',
        time: '08:45 am',
        paymentMethod: {
            type: 'Credit Card',
            lastFour: '2316',
            brand: 'MASTERCARD'
        }
    },
    {
        id: '52342',
        name: 'Big Belly Burger',
        amount: -12.05,
        category: 'Restaurant',
        icon: 'burger',
        date: 'September 12',
        time: '09:06 am',
        paymentMethod: {
            type: 'Credit Card',
            lastFour: '2316',
            brand: 'MASTERCARD'
        }
    }
];

const TransactionList = () => {
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isListVisible, setIsListVisible] = useState<boolean>(true);

    const getIcon = (iconType: string) => {
        switch (iconType) {
            case 'receipt':
                return <Receipt size={20} className="text-white" />;
            case 'mobile':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" className="text-white">
                        <path fill="currentColor" d="M16 2H8C6.9 2 6 2.9 6 4v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4-6H8V5h8v8z" />
                    </svg>
                );
            case 'burger':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" className="text-white">
                        <path fill="currentColor" d="M2 16h20v2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-2zm0-8v2h20V8c0-1.1-.9-2-2-2H4C2.9 6 2 6.9 2 8zm9 2H2v4h9v-4zm11 0h-9v4h9v-4z" />
                    </svg>
                );
            default:
                return <Receipt size={20} className="text-white" />;
        }
    };

    const getIconBackground = (iconType: string) => {
        switch (iconType) {
            case 'receipt':
                return 'bg-gray-800';
            case 'mobile':
                return 'bg-gray-800';
            case 'burger':
                return 'bg-gray-800';
            default:
                return 'bg-gray-800';
        }
    };

    const handleTransactionClick = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsListVisible(false);
    };

    const closeDetails = () => {
        setIsListVisible(true);
        setTimeout(() => {
            setSelectedTransaction(null);
        }, 300);
    };

    return (
        <div className='w-full bg-[#f0ece6] py-10 flex justify-center items-center h-full'>
            <div className="w-full max-w-md bg-white rounded-2xl shadow mx-10 lg:mx-24">
                <AnimatePresence mode="wait">
                    {isListVisible ? (
                        <motion.div
                            key="transaction-list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="px-5"
                        >
                            <h2 className="text-lg md:text-xl text-gray-500 md:mb-2">Transactions</h2>
                            <div className="space-y-2 md:space-y-4">
                                {transactions.map((transaction) => (
                                    <motion.div
                                        key={transaction.id}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleTransactionClick(transaction)}
                                        className="flex items-center justify-between cursor-pointer"
                                    >
                                        <div className="flex items-center">
                                            <div className={`w-8 md:w-10 h-8 md:h-10  rounded-full ${getIconBackground(transaction.icon)} flex items-center justify-center mr-3`}>
                                                {getIcon(transaction.icon)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">{transaction.name}</p>
                                                <p className="text-sm text-gray-500">{transaction.category}</p>
                                            </div>
                                        </div>
                                        <div className="text-gray-800 font-medium">
                                            {transaction.amount.toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                                minimumFractionDigits: 2,
                                            })}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <motion.div
                                className="my-4 md:px-3 py-2 md:py-3 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                                whileHover={{ backgroundColor: '#e5e7eb' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="text-sm text-gray-700 font-medium">All Transactions</span>
                            </motion.div>
                        </motion.div>
                    ) : selectedTransaction && (
                        <motion.div
                            key="transaction-detail"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="p-5 relative"
                        >
                            <div className="flex flex-col mb-4">
                                <div className={`w-12 h-12 rounded-xl ${getIconBackground(selectedTransaction.icon)} flex items-center justify-center mr-3`}>
                                    {getIcon(selectedTransaction.icon)}
                                </div>
                                <div className='flex justify-between'>
                                    <div>
                                        <h3 className="font-medium text-lg text-gray-900 ">{selectedTransaction.name}</h3>
                                        <p className="text-gray-500">{selectedTransaction.category}</p>
                                    </div>
                                    <p className="text-lg font-medium text-gray-700">
                                        {selectedTransaction.amount.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                            minimumFractionDigits: 2,
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-b border-gray-200 py-4 space-y-4 my-4">
                                <div>
                                    <p className="text-gray-500 mb-1">#{selectedTransaction.id}</p>
                                    {selectedTransaction.date && (
                                        <p className="text-gray-700">{selectedTransaction.date}</p>
                                    )}
                                    {selectedTransaction.time && (
                                        <p className="text-gray-700">{selectedTransaction.time}</p>
                                    )}
                                </div>

                                {selectedTransaction.paymentMethod && (
                                    <div>
                                        <p className="text-gray-500 mb-1">Paid Via {selectedTransaction.paymentMethod.type}</p>
                                        <p className="text-gray-700">xxxx {selectedTransaction.paymentMethod.lastFour} {selectedTransaction.paymentMethod.brand}</p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={closeDetails}
                                className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500"
                            >
                                <X size={18} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TransactionList;