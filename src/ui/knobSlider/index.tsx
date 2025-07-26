'use client';
import React, {
    useState,
    useRef,
    useCallback,
    useEffect,
    MouseEvent,
    TouchEvent,
} from 'react';

type KnobSliderProps = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (val: number) => void;
    size?: number;
    className?: string;
    disabled?: boolean;
    showValue?: boolean;
    color?: string;
};

const KnobSlider: React.FC<KnobSliderProps> = ({
    value = 50,
    min = 0,
    max = 100,
    step = 1,
    onChange,
    size = 60,
    className = '',
    disabled = false,
    showValue = true,
    color = '#6b7280',
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const [lastAngle, setLastAngle] = useState<number | null>(null);
    const [startValue, setStartValue] = useState(value);
    const knobRef = useRef<HTMLDivElement>(null);

    const valueToAngle = (val: number): number => {
        const percentage = (val - min) / (max - min);
        return percentage * 270 - 135;
    };

    const getAngleFromEvent = (event: globalThis.MouseEvent | globalThis.TouchEvent | MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>): number => {
        if (!knobRef.current) return 0;

        const rect = knobRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let clientX = 0;
        let clientY = 0;

        if ('touches' in event && event.touches.length > 0) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else if ('clientX' in event) {
            clientX = (event as MouseEvent<HTMLDivElement>).clientX;
            clientY = (event as MouseEvent<HTMLDivElement>).clientY;
        }

        return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    };

    const handleStart = useCallback(
        (event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
            if (disabled) return;
            event.preventDefault();
            setIsDragging(true);
            setLastAngle(getAngleFromEvent(event));
            setStartValue(currentValue);
        },
        [disabled, currentValue]
    );

    const handleMove = useCallback(
        (event: globalThis.MouseEvent | globalThis.TouchEvent | MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
            if (!isDragging || disabled || lastAngle === null) return;
            event.preventDefault();

            const currentAngle = getAngleFromEvent(event);
            let angleDelta = currentAngle - lastAngle;

            if (angleDelta > 180) angleDelta -= 360;
            else if (angleDelta < -180) angleDelta += 360;

            const sensitivity = 0.9;
            const scaledDelta = angleDelta * sensitivity;
            const valueRange = max - min;
            const valueDelta = (scaledDelta / 270) * valueRange;

            let newValue = Math.max(min, Math.min(max, startValue + valueDelta));
            newValue = Math.round(newValue / step) * step;

            if (newValue !== currentValue) {
                setCurrentValue(newValue);
                onChange?.(newValue);
            }
        },
        [
            isDragging,
            disabled,
            lastAngle,
            startValue,
            min,
            max,
            step,
            currentValue,
            onChange,
        ]
    );

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: globalThis.MouseEvent) => {
            handleMove(e);
        };
        const handleTouchMove = (e: globalThis.TouchEvent) => {
            handleMove(e);
        };
        const handleMouseUp = () => setIsDragging(false);
        const handleTouchEnd = () => setIsDragging(false);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, handleMove]);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const currentAngle = valueToAngle(currentValue);

    return (
        <div className={`relative ${className}`}>
            <div
                ref={knobRef}
                className="relative cursor-pointer select-none"
                style={{ width: size, height: size }}
                onMouseDown={handleStart}
                onTouchStart={handleStart}
            >
                <div className="absolute inset-0 rounded-full p-4 border-2 border-zinc-300">
                    <div className="absolute inset-0 rounded-full bg-purple-50">
                        <div className="absolute inset-0">
                            {Array.from({ length: 54 }, (_, i) => {
                                const angle = i * 5 - 135;
                                const isVisible = angle >= -135 && angle <= 135;

                                return isVisible ? (
                                    <div
                                        key={i}
                                        className={`absolute bg-gray-400 opacity-60 left-1/2 ${i % 6 === 0 ? 'w-0.5 h-3 top-1.5' : 'w-px h-1.5 top-2'
                                            }`}
                                        style={{
                                            transformOrigin: `50% ${size / 2 - 6}px`,
                                            transform: `translateX(-50%) rotate(${angle}deg)`,
                                        }}
                                    />
                                ) : null;
                            })}
                        </div>

                        <div
                            className="absolute rounded-full flex items-center justify-center bg-white shadow-md transition-transform duration-100"
                            style={{
                                width: size - 42,
                                height: size - 42,
                                top: 20,
                                left: 20,
                            }}
                        >
                            {showValue && (
                                <div className="text-3xl font-bold z-10 text-gray-600">
                                    {currentValue}
                                </div>
                            )}

                            <div
                                className="absolute z-10 top-2 left-1/2 transition-transform duration-100"
                                style={{
                                    width: 0,
                                    height: 0,
                                    borderLeft: '8px solid transparent',
                                    borderRight: '8px solid transparent',
                                    borderBottom: `16px solid ${color}`,
                                    transformOrigin: `50% ${(size - 32) / 2 - 8}px`,
                                    transform: `translateX(-50%) rotate(${currentAngle}deg)`,
                                }}
                            />
                        </div>
                    </div>
                </div>

                {isDragging && (
                    <div className="absolute inset-0 rounded-full bg-blue-500 opacity-10 pointer-events-none" />
                )}
            </div>
        </div>
    );
};

const KnobSliderDemo: React.FC = () => {
    const [value1, setValue1] = useState(18);

    return (
        <div className="flex flex-col items-center justify-center min-h-full bg-gray-50 p-8">
            <KnobSlider
                value={value1}
                min={0}
                max={100}
                onChange={setValue1}
                size={200}
                color="#6b7280"
            />
        </div>
    );
};

export default KnobSliderDemo;