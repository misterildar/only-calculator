'use client';
import Link from 'next/link';
import logoTT from '../../../public/images/logo_TT.png';
import styles from './header.module.scss';
import Image from 'next/image';

const Header = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={styles.header}>
      <div className={styles.container}>
        <Image className={styles.logo} alt='logo' width={344} height={73} src={logoTT} />
        <div className={styles.links}>
          <Link className={styles.link} href='#top' onClick={scrollToTop}>
            Home
          </Link>
          <Link className={styles.link} href='#how-it-works'>
            How It Works
          </Link>
          <Link className={styles.link} href='#calculator'>
            Calculator
          </Link>
          <Link className={styles.link} href='#faq'>
            FAQ
          </Link>
          <Link className={styles.link} href='#about-us'>
            About us
          </Link>
          <Link className={styles.link} href='#footer'>
            Contacts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;
