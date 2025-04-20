'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './returnCalculator.module.css'

export default function ReturnCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(15000);
    const [expectedReturns, setExpectedReturns] = useState(23);
    const [timePeriod, setTimePeriod] = useState(5);
    const [investedAmount, setInvestedAmount] = useState(0);
    const [totalReturns, setTotalReturns] = useState(0);

    useEffect(() => {
        const invested = monthlyInvestment * timePeriod * 12;
        setInvestedAmount(invested);

        const r = expectedReturns / 100 / 12;
        const n = timePeriod * 12;
        const futureValue = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

        setTotalReturns(Math.round(futureValue - invested));
    }, [monthlyInvestment, expectedReturns, timePeriod]);


    const formatCurrency = (amount: number) => {
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    const returnPercentage =
        investedAmount > 0
            ? (totalReturns / (investedAmount + totalReturns)) * 100
            : 0;

    return (
        <div className='flex flex-col justify-center items-center h-full w-full bg-[#f0eff6] '>
            <div className="bg-[#f8f7fb]  rounded-3xl  font-sans shadow w-2/3 px-2 py-4 md:p-6">
                <div className="flex justify-between mb-2 items-center">
                    <div className="relative w-20 md:w-30 h-20 md:h-30">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" stroke="#ddd" strokeWidth="10" fill="none" />
                            <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="#2D2D2D"
                                strokeWidth="10"
                                fill="none"
                                strokeDasharray="251.2"
                                strokeDashoffset={251.2 - (251.2 * returnPercentage) / 100}
                                transform="rotate(-90 50 50)"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gray-300" />
                            <div className='flex flex-col'>
                                <p className="text-gray-500 text-xs md:text-sm">Invested Amount</p>
                                <p className="text-xs md:text-sm font-semibold text-gray-500">
                                    {formatCurrency(investedAmount)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gray-800" />
                            <div className='flex flex-col'>
                                <p className="text-gray-500 text-xs md:text-sm">Total Returns</p>
                                <p className="text-xs md:text-sm font-semibold text-gray-500">{formatCurrency(totalReturns)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Monthly Investment */}
                <SliderCard
                    label="Monthly Investment"
                    value={monthlyInvestment}
                    min={1000}
                    max={100000}
                    step={1000}
                    onChange={setMonthlyInvestment}
                    format={formatCurrency}
                />

                {/* Expected Returns */}
                <SliderCard
                    label="Expected Returns"
                    value={expectedReturns}
                    min={1}
                    max={30}
                    step={0.5}
                    onChange={setExpectedReturns}
                    format={(v) => `${v}%`}
                />

                {/* Time Period */}
                <SliderCard
                    label="Time Period"
                    value={timePeriod}
                    min={1}
                    max={30}
                    step={1}
                    onChange={setTimePeriod}
                    format={(v) => `${v} years`}
                />
            </div>
        </div>
    );
}


function SliderCard({
    label,
    value,
    min,
    max,
    step,
    onChange,
    format,
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (val: number) => void;
    format: (val: number) => string;
}) {
    const sliderRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const percent = ((value - min) / (max - min)) * 100;
        sliderRef.current?.style.setProperty('--range-progress', `${percent}%`);
    }, [value, min, max]);

    return (
        <div className="bg-white px-2 py-2 md:p-4 rounded-xl mb-4 shadow-sm">
            <div className="flex justify-between text-sm text-gray-600">
                <span>{label}</span>
                <span className="font-semibold text-black">{format(value)}</span>
            </div>
            <input
                ref={sliderRef}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className={`${styles.slider} w-full appearance-none cursor-pointer`}
            />
        </div>
    );
}

