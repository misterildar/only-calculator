import { Slider } from '@/components/slider/Slider';
import { Calculator } from '@/components/calculator/Calculator';
import { Footer } from '@/components/footer/Footer';
import { Poster } from '@/components/poster/Poster';
import { AboutUs } from '@/components/aboutUs/AboutUs';

import styles from './page.module.scss';
import { Faq } from '@/components/Faq/Faq';
import Header from '@/components/header/Header';
import KeyAdvantages from '@/components/keyAdvantagesBlock/KeyAdvantages';
import WhyChooseTT from '@/components/whyChooseTTBlock/WhyChooseTT';
import { HowItWorks } from '@/components/howItWorks/HowItWorks';

export default function HomePage() {
  return (
    <main className={styles.main} id='top'>
      {/* <Header />
      <Poster />
      <HowItWorks /> */}
      <Calculator />
      {/* <KeyAdvantages />
      <WhyChooseTT />
      <Faq />
      <AboutUs />
      <Slider />
      <Footer /> */}
    </main>
  );
}
