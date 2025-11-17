"use client";

import React, { useState, useRef, useEffect } from 'react';

interface ProfileImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProfileImage({ src, alt, className = "" }: ProfileImageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const [isLaunching, setIsLaunching] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
    e.preventDefault();
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    const deltaX = clientX - startPosRef.current.x;
    const deltaY = clientY - startPosRef.current.y;
    
    const maxDrag = 120;
    const constrainedX = Math.max(0, Math.min(deltaX, maxDrag));
    const constrainedY = Math.max(-30, Math.min(deltaY, 30));
    
    setDragDistance(constrainedX);
    setPosition({ x: constrainedX, y: constrainedY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleMouseUp = () => {
    handleRelease();
  };

  const handleTouchEnd = () => {
    handleRelease();
  };

  const launchAnimation = () => {
    if (dragDistance < 20) return;

    setIsLaunching(true);

    const startTime = Date.now();
    const duration = 800;
    const startX = dragDistance;
    const targetX = -150;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutBounce = (t: number) => {
        if (t < 1 / 2.75) {
          return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
          return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        } else if (t < 2.5 / 2.75) {
          return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        } else {
          return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        }
      };

      const easedProgress = easeOutBounce(progress);
      const currentX = startX + (targetX - startX) * easedProgress;
      
      setPosition({ x: currentX, y: 0 });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setPosition({ x: 0, y: 0 });
          setDragDistance(0);
          setIsLaunching(false);
        }, 200);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const handleRelease = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (dragDistance >= 20) {
      launchAnimation();
    } else {
      setPosition({ x: 0, y: 0 });
      setDragDistance(0);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging]);

  const scale = 1;
  const rotation = isDragging ? dragDistance / 8 : 0;

  return (
    <div className="mb-8 relative">
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`h-32 w-32 md:h-40 md:w-40 rounded-2xl object-cover 
          border-2 border-muted-foreground/20 shadow-lg 
          transition-all duration-300 select-none
          ${isDragging ? 'cursor-grabbing shadow-2xl' : 'cursor-grab hover:scale-105'}
          ${isLaunching ? 'transition-none' : ''}
          ${className}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
          filter: isDragging ? 'brightness(1.1)' : 'brightness(1)',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        draggable={false}
      />
    </div>
  );
}