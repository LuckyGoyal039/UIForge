'use client'
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { AnimatePresence, motion } from 'framer-motion';
import { currencies } from './country';

const CurrencySwap = () => {
    const [fromAmount, setFromAmount] = useState('9.90');
    const [toAmount, setToAmount] = useState('831.75');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
    const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);

    const exchangeRates: { [key: string]: number } = {
        USD: 1,
        INR: 84.02,
        JPY: 157.23,
        CNY: 7.31,
        CHF: 0.89,
    };

    const convertCurrency = (amount: string, from: string, to: string): string => {
        const usdAmount = parseFloat(amount) / exchangeRates[from];
        const convertedAmount = usdAmount * exchangeRates[to];
        return convertedAmount.toFixed(2);
    };

    const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFromAmount(value);
        if (value) {
            const converted = convertCurrency(value, fromCurrency, toCurrency);
            setToAmount(converted);
        } else {
            setToAmount('');
        }
    };

    const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setToAmount(value);
        if (value) {
            const converted = convertCurrency(value, toCurrency, fromCurrency);
            setFromAmount(converted);
        } else {
            setFromAmount('');
        }
    };

    const handleFromCurrencyChange = (currency: string) => {
        setFromCurrency(currency);
        setIsFromDropdownOpen(false);
        if (fromAmount) {
            const converted = convertCurrency(fromAmount, currency, toCurrency);
            setToAmount(converted);
        }
    };

    const handleToCurrencyChange = (currency: string) => {
        setToCurrency(currency);
        setIsToDropdownOpen(false);
        if (fromAmount) {
            const converted = convertCurrency(fromAmount, fromCurrency, currency);
            setToAmount(converted);
        }
    };

    const getExchangeRate = () => {
        const rate = convertCurrency('1', fromCurrency, toCurrency);
        return `1 ${fromCurrency} ≈ ${rate} ${toCurrency}`;
    };

    const getCurrencyFlag = (code: string): React.ReactNode => {
        return currencies.find(c => c.code === code)?.flag || '';
    };

    const handleProceed = () => {
        // alert(`Converting ${fromAmount} ${fromCurrency} to ${toAmount} ${toCurrency}`);
    };

    return (
        <div className='w-full h-full flex justify-center items-center bg-[#f0eff6]'>
            <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-4">
                <h2 className="text-gray-600 text-lg font-medium mb-2">Swap Currency</h2>

                {/* From Currency Input */}
                <div className="mb-1">
                    <div className="bg-[#f0eff6] rounded-t-lg px-4 py-2 flex items-center justify-between gap-2">
                        <input
                            type="number"
                            value={fromAmount}
                            onChange={handleFromAmountChange}
                            className="bg-transparent text-lg font-semibold text-gray-900 flex-1 outline-none w-36 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            placeholder="0.00"
                        />
                        <div className="relative">
                            <button
                                onClick={() => setIsFromDropdownOpen(!isFromDropdownOpen)}
                                className="flex items-center gap-2 bg-white rounded-lg px-2 py-1 shadow-sm border border-gray-200 hover:bg-zinc-100 w-28 text-sm"
                            >
                                <span className="text-xs">{getCurrencyFlag(fromCurrency)}</span>
                                <span className="font-medium text-gray-900">{fromCurrency}</span>
                                {isFromDropdownOpen ? (
                                    <FaChevronUp className="w-4 h-4 text-gray-500" />
                                ) : (
                                    <FaChevronDown className="w-4 h-4 text-gray-500" />
                                )}
                            </button>

                            <AnimatePresence>
                                {isFromDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10 min-w-[170px]"
                                    >
                                        {currencies.map((currency) => (
                                            <button
                                                key={currency.code}
                                                onClick={() => handleFromCurrencyChange(currency.code)}
                                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-zinc-100 first:rounded-t-lg last:rounded-b-lg"
                                            >
                                                <span className="text-lg">{currency.flag}</span>
                                                <span className="font-medium text-gray-900">{currency.code}</span>
                                                {fromCurrency === currency.code && (
                                                    <span className="ml-auto text-green-500">✓</span>
                                                )}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* To Currency Input */}
                <div className="mb-2">
                    <div className="bg-[#f0eff6] rounded-b-lg px-4 py-2 flex items-center justify-between gap-2">
                        <input
                            type="number"
                            value={toAmount}
                            onChange={handleToAmountChange}
                            className="bg-transparent text-lg font-semibold text-gray-900 flex-1 outline-none w-36 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            placeholder="0.00"
                        />
                        <div className="relative">
                            <button
                                onClick={() => setIsToDropdownOpen(!isToDropdownOpen)}
                                className="flex items-center gap-2 bg-white rounded-lg px-2 py-1 shadow-sm border border-gray-200 hover:bg-gray-50 w-28 text-sm"
                            >
                                <span className="text-md">{getCurrencyFlag(toCurrency)}</span>
                                <span className="font-medium text-gray-900">{toCurrency}</span>
                                {isToDropdownOpen ? (
                                    <FaChevronUp className="w-4 h-4 text-gray-500" />
                                ) : (
                                    <FaChevronDown className="w-4 h-4 text-gray-500" />
                                )}
                            </button>

                            <AnimatePresence>
                                {isToDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10 min-w-[170px] text-sm"
                                    >
                                        {currencies.map((currency) => (
                                            <button
                                                key={currency.code}
                                                onClick={() => handleToCurrencyChange(currency.code)}
                                                className="w-full flex items-center gap-3 px-4 py-1 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                                            >
                                                <span className="text-sm">{currency.flag}</span>
                                                <span className="font-medium text-gray-900">{currency.code}</span>
                                                {toCurrency === currency.code && (
                                                    <span className="ml-auto text-green-500">✓</span>
                                                )}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Proceed Button */}
                <button
                    onClick={handleProceed}
                    className="w-full bg-gray-900 text-white font-medium py-2 rounded-xl hover:bg-gray-800 transition-colors mb-2"
                >
                    Proceed
                </button>

                {/* Exchange Rate Display */}
                <div className="text-center text-gray-500 text-sm">
                    {getExchangeRate()}
                </div>

                {/* Click outside to close dropdowns */}
                {(isFromDropdownOpen || isToDropdownOpen) && (
                    <div
                        className="fixed inset-0 z-0"
                        onClick={() => {
                            setIsFromDropdownOpen(false);
                            setIsToDropdownOpen(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default CurrencySwap;
