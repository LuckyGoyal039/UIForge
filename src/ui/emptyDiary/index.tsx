'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MiniPlant from '@/assets/images/miniPlant.png'
import Image from 'next/image'
const RealisticDiary = () => {
    const [baseDate, setBaseDate] = useState(new Date())
    const [isFlipping, setIsFlipping] = useState(false)
    const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null)

    const getLeftDate = () => {
        const day = baseDate.getDate()
        const evenDay = day % 2 === 0 ? day : day - 1
        return new Date(baseDate.getFullYear(), baseDate.getMonth(), evenDay)
    }

    const getRightDate = () => {
        const left = getLeftDate()
        return new Date(left.getFullYear(), left.getMonth(), left.getDate() + 1)
    }

    const getNextLeftDate = () => {
        const current = getLeftDate()
        return new Date(current.getFullYear(), current.getMonth(), current.getDate() + 2)
    }

    const getPrevRightDate = () => {
        const current = getRightDate()
        return new Date(current.getFullYear(), current.getMonth(), current.getDate() - 2)
    }

    const getPrevLeftDate = () => {
        const current = getLeftDate()
        return new Date(current.getFullYear(), current.getMonth(), current.getDate() - 2)
    }

    const getNextRightDate = () => {
        const current = getRightDate()
        return new Date(current.getFullYear(), current.getMonth(), current.getDate() + 2)
    }

    const formatDate = (date: Date) =>
        `${date.toLocaleString('default', { month: 'long' })}\nDay ${date.getDate()}`

    const handleFlip = (direction: 'next' | 'prev') => {
        if (isFlipping) return

        setIsFlipping(true)
        setFlipDirection(direction)

        const delta = direction === 'next' ? 2 : -2
        const newDate = new Date(baseDate)
        newDate.setDate(baseDate.getDate() + delta)

        setTimeout(() => {
            setBaseDate(newDate)
            setIsFlipping(false)
            setFlipDirection(null)
        }, 800)
    }

    const PageContent = ({ date }: { date: Date }) => (
        <>
            <div className="text-gray-400 text-sm font-medium mb-4 leading-tight whitespace-pre-line">
                {formatDate(date)}
            </div>
            <div className="space-y-2.5">
                {[...Array(14)].map((_, i) => (
                    <div key={i} className="h-px bg-gray-200 w-full" />
                ))}
            </div>
        </>
    )

    const FlippingPage = ({ direction }: { direction: 'next' | 'prev' }) => {
        const isNext = direction === 'next'

        return (
            <motion.div
                className={`absolute  ${isNext ? 'left-[196px] top-[-97px] ' : 'left-4 top-[-125px]'} w-44 h-60`}
                style={{
                    transformOrigin: isNext ? 'left center' : 'right center',
                    transformStyle: 'preserve-3d',
                    zIndex: 30,
                }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: isNext ? -180 : 180 }}
                transition={{
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
            >
                {/* Front face */}
                <div
                    className={`absolute ${isNext ? "top-[-20] left-0" : "top-10 left-0 rotate-[-4deg]"}  bg-white rounded-xl shadow-2xl p-6 border border-gray-100 w-44 h-60`}
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg) rotate(-10deg)',
                    }}
                >
                    <PageContent date={isNext ? getRightDate() : getLeftDate()} />
                </div>

                {/* Back face */}
                <div
                    className="absolute top-0 left-0 bg-white rounded-xl shadow-2xl p-6 border border-gray-100 w-44 h-60"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg) rotate(-10deg)',
                    }}
                >
                    <PageContent date={isNext ? getNextLeftDate() : getPrevRightDate()} />
                </div>
            </motion.div>
        )
    }

    return (
        <div className="flex h-screen w-full bg-stone-200 p-8 items-center justify-center">
            <div className="relative w-[28rem] h-60" style={{ perspective: '1200px' }}>
                <div className="absolute top-[-105px] left-6 z-10 bg-white rounded-xl shadow-xl p-6 w-88 h-56 border border-gray-100">
                </div>

                {/* Base Left Page */}
                <div className="absolute top-[-96px] left-6 z-10 bg-white rounded-xl shadow-xl p-6 w-44 h-60 border border-gray-100 rotate-[-10deg]">
                    <PageContent
                        date={
                            isFlipping && flipDirection === 'next'
                                ? getNextLeftDate()
                                : isFlipping && flipDirection === 'prev'
                                    ? getPrevLeftDate()
                                    : getLeftDate()
                        }
                    />
                </div>

                {/* Base Right Page */}
                <div className="absolute top-[-125px] left-[195px] z-10 bg-white rounded-xl shadow-xl p-6 w-44 h-60 border border-gray-100 rotate-[-10deg]">
                    <PageContent
                        date={
                            isFlipping && flipDirection === 'prev'
                                ? getPrevRightDate()
                                : isFlipping && flipDirection === 'next'
                                    ? getNextRightDate()
                                    : getRightDate()
                        }
                    />
                </div>

                {/* Invisible click areas */}
                {!isFlipping && (
                    <>
                        <div
                            className="absolute top-[-96px] left-6 w-44 h-60 z-20 cursor-pointer"
                            onClick={() => handleFlip('prev')}
                        />
                        <div
                            className="absolute top-[-96px] left-[176px] w-44 h-60 z-20 cursor-pointer"
                            onClick={() => handleFlip('next')}
                        />
                    </>
                )}

                {/* Flip Animation */}
                <AnimatePresence>
                    {isFlipping && flipDirection && <FlippingPage direction={flipDirection} />}
                </AnimatePresence>

                {/* Fold Shadow */}
                <div className="absolute top-[-110px] left-[12.4rem] w-1 h-60 bg-gradient-to-r from-gray-400 to-transparent opacity-30 pointer-events-none z-0 rotate-[-10deg]" />

                {/* Flip Shadow */}
                {/* {isFlipping && (
                    <motion.div
                        className="absolute top-[-110px] left-[12rem] w-6 h-60 bg-gradient-to-r from-gray-600 to-transparent pointer-events-none z-25 rotate-[-10deg]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.4, 0] }}
                        transition={{ duration: 0.8 }}
                    />
                )} */}

                {/* Pulsing cursor */}
                <motion.div
                    className="absolute bottom-25 left-54 w-4 h-5 bg-gray-800"
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
                        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))',
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <Image
                    src={MiniPlant}
                    alt="Mini Plant"
                    width={130}
                    height={130}
                    className='absolute bottom-0 right-0' />
            </div>
        </div>
    )
}

export default RealisticDiary
