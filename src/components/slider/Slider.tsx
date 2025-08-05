'use client';

import { useState } from 'react';

import { Arrow } from '@/ui';
import { SlideCard } from './SlideCard';
import { mockSlidesData } from './mockData';

import styles from './Slider.module.scss';

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const SLIDE_WIDTH = 871;
  const SLIDE_GAP = 24;
  const SLIDE_OFFSET = SLIDE_WIDTH + SLIDE_GAP;

  const nextSlide = () => {
    if (currentSlide < mockSlidesData.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${currentSlide * SLIDE_OFFSET}px)` }}
        >
          {mockSlidesData.map((slide, index) => (
            <SlideCard key={slide.id} slide={slide} index={index} />
          ))}
        </div>
      </div>
      <button className={styles.prevButton} onClick={prevSlide} disabled={currentSlide === 0}>
        <Arrow />
      </button>
      <button
        className={styles.nextButton}
        onClick={nextSlide}
        disabled={currentSlide === mockSlidesData.length - 1}
      >
        <div className={styles.rotate}>
          <Arrow />
        </div>
      </button>
    </section>
  );
};
