import Image from 'next/image';
import { ABOUT_US_TEXT } from './constants';
import styles from './AboutUs.module.scss';

export const AboutUs = () => {
  return (
    <div id='about-us' className={styles.aboutContainer}>
      <p className={styles.aboutHeader}>ABOUT US</p>
      <div className={styles.aboutContent}>
        <div className={styles.aboutImageContainer}>
          <Image
            src={'/images/about_Image.png'}
            alt={'Our Team'}
            fill
            sizes='(max-width: 780px) 100vw, 50vw'
            className={styles.aboutImage}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className={styles.aboutText}>
          {ABOUT_US_TEXT.map((item, index) => {
            return <p key={`AboutUs${index}`}>{item}</p>;
          })}
        </div>
      </div>
    </div>
  );
};
