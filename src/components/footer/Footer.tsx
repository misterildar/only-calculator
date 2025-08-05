import Image from 'next/image';
import Link from 'next/link';
import { FooterForm } from './FooterForm';
import { ADDRESS } from './constants';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer} id='footer'>
      <div className={styles.footerContainer}>
        <div className={styles.footerLeft}>
          <Image
            className={styles.footerLogo}
            src='images/Footer_Logo.svg'
            alt={'Logo'}
            width={345}
            height={73}
          />
          <div className={styles.footerContacts}>
            <Link href='mailto:TimeTrust@gmail.com'>TimeTrust@gmail.com</Link>
            <Link href='tel:+1 415-886-7704'>+1 415-886-7704</Link>
            <div className={styles.socialMedia}>
              <Link href='https://www.linkedin.com/company/timetrust'>
                <Image
                  src={'images/Logo_LinkedIn.svg'}
                  alt={'LinkedIn'}
                  width={24}
                  height={24}
                  className={styles.socialLogo}
                />
              </Link>
              <Link href='https://x.com/timetrustinc'>
                <Image
                  src={'images/Logo_X.svg'}
                  alt={'X'}
                  width={24}
                  height={24}
                  className={styles.socialLogo}
                />
              </Link>
            </div>
          </div>
          <p>GDPR</p>
        </div>
        <div className={styles.footerCenter}>
          {ADDRESS.map((item) => {
            return (
              <div key={item.name}>
                <div>{item.name}</div>
                <div>{item.street}</div>
                <div>{item?.position}</div>
                <div>{item?.ofice}</div>
                <div>{item.address}</div>
                <div>{item?.country}</div>
                <div>{item?.phone}</div>
              </div>
            );
          })}
        </div>
        <div>
          <FooterForm />
        </div>
      </div>
    </footer>
  );
};
