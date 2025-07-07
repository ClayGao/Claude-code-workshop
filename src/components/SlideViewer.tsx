'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Presentation } from '@/lib/types';
import Slide from './Slide';
import ScrollIndicator from './ScrollIndicator';
import ClientDate from './ClientDate';
import { debounce } from '@/lib/utils';

interface SlideViewerProps {
  presentation: Presentation;
}

export default function SlideViewer({ presentation }: SlideViewerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Track which slide is currently in view
  useEffect(() => {
    if (!containerRef.current) return;

    const updateCurrentSlide = debounce(() => {
      const container = containerRef.current;
      if (!container) return;

      const slides = container.querySelectorAll('[data-slide-index]');
      const containerHeight = container.clientHeight;
      const centerPoint = container.scrollTop + containerHeight / 2;

      let closestSlide = 0;
      let minDistance = Infinity;

      slides.forEach((slide, index) => {
        const slideElement = slide as HTMLElement;
        const slideTop = slideElement.offsetTop;
        const slideCenter = slideTop + slideElement.offsetHeight / 2;
        const distance = Math.abs(slideCenter - centerPoint);

        if (distance < minDistance) {
          minDistance = distance;
          closestSlide = index;
        }
      });

      setCurrentSlideIndex(closestSlide);
    }, 100);

    const container = containerRef.current;
    container.addEventListener('scroll', updateCurrentSlide);
    
    // Initial update
    updateCurrentSlide();

    return () => {
      container.removeEventListener('scroll', updateCurrentSlide);
    };
  }, [presentation.slides]);

  const scrollToSlide = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const slide = container.querySelector(`[data-slide-index="${index}"]`) as HTMLElement;
    if (slide) {
      const slideTop = slide.offsetTop;
      const targetScroll = slideTop - 100; // 100px offset from top

      container.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex-1 relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 md:left-80 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Slide navigation */}
      <ScrollIndicator
        slides={presentation.slides}
        currentSlideIndex={currentSlideIndex}
        onSlideClick={scrollToSlide}
      />

      {/* Main content area */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto scroll-smooth"
      >
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          {/* Presentation header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              {presentation.title}
            </h1>
            {presentation.description && (
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-2">
                {presentation.description}
              </p>
            )}
            {(presentation.author || presentation.date) && (
              <div className="flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-500">
                {presentation.author && (
                  <span>by {presentation.author}</span>
                )}
                {presentation.author && presentation.date && (
                  <span>•</span>
                )}
                {presentation.date && (
                  <ClientDate date={presentation.date} />
                )}
              </div>
            )}
          </motion.div>

          {/* Slides */}
          <div className="space-y-16">
            {presentation.slides.map((slide, index) => (
              <div
                key={slide.id}
                data-slide-index={index}
                className="scroll-mt-24"
              >
                <Slide 
                  slide={slide} 
                  index={index}
                  isActive={index === currentSlideIndex}
                />
              </div>
            ))}
          </div>

          {/* Footer spacing */}
          <div className="h-32" />
        </div>
      </div>
    </div>
  );
}