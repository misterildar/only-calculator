import styles from './Poster.module.scss';
import Link from 'next/link';
import { Button } from '@/ui/button';

import { MAIN_TEXT } from './constants';

export const Poster = () => {
  return (
    <section className={styles.posterContainer}>
      <div className={styles.container}>
        <div className={styles.posterContent}>
          <p className={styles.posterText}>
            {MAIN_TEXT.text}
            <Link href=''>{MAIN_TEXT.link}</Link>
          </p>
          <div className={styles.buttons}>
            <Button text='Calculate' width={210}>
              <Link href='#calculate'></Link>
            </Button>
            <Button variant='transparent' text='Request expert advice' width={450} />
          </div>
        </div>
      </div>
    </section>
  );
};
