'use client';

import { motion } from 'framer-motion';
import { Slide } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ScrollIndicatorProps {
  slides: Slide[];
  currentSlideIndex: number;
  onSlideClick: (index: number) => void;
}

export default function ScrollIndicator({
  slides,
  currentSlideIndex,
  onSlideClick,
}: ScrollIndicatorProps) {
  return (
    <div className="fixed right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-40 hidden sm:block">
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col space-y-2">
          {slides.map((slide, index) => (
            <motion.button
              key={slide.id}
              onClick={() => onSlideClick(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-200 hover:scale-125',
                index === currentSlideIndex
                  ? 'bg-blue-500 shadow-lg'
                  : 'bg-slate-300 dark:bg-slate-600 hover:bg-blue-400 dark:hover:bg-blue-400'
              )}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.9 }}
              title={slide.title || `Slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Progress text */}
        <div className="mt-3 text-center">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {currentSlideIndex + 1} / {slides.length}
          </span>
        </div>
      </div>
    </div>
  );
}