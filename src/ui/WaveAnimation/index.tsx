"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type WaveAnimationProps = {
  width?: number;
  height?: number;
  className?: string;
  fullscreen?: boolean;
};

export default function WaveAnimation({
  width = 1000,
  height = 400,
  className = "",
  fullscreen = true
}: WaveAnimationProps) {
  const svgRef = useRef(null);
  const lineRef = useRef(null);
  
  useEffect(() => {
    if (!svgRef.current || !lineRef.current) return;
    
    const svg = svgRef.current;
    const line = lineRef.current;
    
    const svgSize = {
      w: width,
      h: height
    };
    
    // Initial setup
    gsap.set(line, {
      attr: {
        'points': generatePoints(svgSize),
        'stroke': getRandomColor()
      }
    });
    
    // Start animation loop
    animationLoop(line, svgSize);
    
    // Cleanup on unmount
    return () => {
      gsap.killTweensOf(line);
    };
  }, [width, height]);
  
  function animationLoop(line: SVGPolylineElement, svgSize: {w: number, h: number}) {
    gsap.to(line, {
      duration: 0.8,
      attr: {
        'points': generatePoints(svgSize),
        'stroke': getRandomColor()
      },
      ease: 'none',
      onComplete: () => animationLoop(line, svgSize)
    });
  }
  
  function generatePoints(svgSize: {w: number, h: number}) {
    let segments: string[] = [];
    const freq = random(0.05, 0.15);
    const amplitude = random(0.1, 0.55) * svgSize.h * 0.9;
    let p = {x: 0, y: 0};
    
    for (let i = 0; i < svgSize.w; i++) {
      p.x = i;
      p.y = Math.floor(amplitude * Math.sin(p.x * freq) + svgSize.h / 2);
      segments.push(p.x + ',' + p.y);
    }
    
    return segments.join(' ');
  }
  
  function getRandomColor() {
    return 'rgb(' +
      Math.floor(random(0, 255)) + ', ' +
      Math.floor(random(0, 255)) + ',' +
      Math.floor(random(0, 255)) + ')';
  }
  
  function random(min: number, max: number) {
    return min + Math.random() * (max - min);
  }
  
  const svgClasses = fullscreen
    ? "fixed inset-0 w-full h-screen"
    : "fixed w-full top-1/2 transform -translate-y-1/2";
  
  return (
    <svg 
      ref={svgRef}
      className={`${svgClasses} ${className}`}
      width={fullscreen ? "100%" : width}
      height={fullscreen ? "100vh" : height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <polyline
        ref={lineRef}
        fill="none"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}