import Image from 'next/image';
import { SlideCardProps } from './types';

import styles from './Slider.module.scss';

export const SlideCard = ({ slide, index }: SlideCardProps) => {
  return (
    <div className={styles.slide}>
      <div className={styles.imageContainer}>
        <Image
          src={slide.image}
          alt={slide.title}
          width={375}
          height={366}
          className={styles.image}
          priority={index === 0}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{slide.title}</h3>
        <p className={styles.subTitle}>{slide.subTitle}</p>
        <p className={styles.description}>{slide.description}</p>
      </div>
    </div>
  );
};
