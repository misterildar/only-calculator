import styles from '../../components/Faq/faq.module.scss';

export function FaqArrow({ isOpen }: { isOpen: boolean | null }) {
  return (
    <svg width='40' height='41' viewBox='0 0 40 41' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M10 25.3643L20 15.3643L30 25.3643'
        stroke='black'
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={`${styles.arrow} ${isOpen ? styles.open : ''}`}
      />
    </svg>
  );
}
