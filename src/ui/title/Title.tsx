import React from 'react';
import styles from './Title.module.scss';

interface TitleProps {
  text: string;
  className?: string;
}

export const Title: React.FC<TitleProps> = ({ text, className }) => {
  return <h2 className={`${styles.title} ${className || ''}`}>{text}</h2>;
};
