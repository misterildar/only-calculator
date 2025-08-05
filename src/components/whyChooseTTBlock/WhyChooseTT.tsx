import { Title } from '@/ui';
import styles from './whyChooseTT.module.scss';
import { whyChooseTTItems } from '@/constants/getWhyChooseTTItems';

const WhyChooseTT = () => {
  return (
    <section className={styles.why_choose_tt}>
      <Title text='WHY CHOOSE TIMETRUST?' />
      <div className={styles.blocks}>
        {whyChooseTTItems.map((item) => (
          <div key={item.id} className={styles.block_wrapper}>
            <div className={styles.title_block}>{item.title}</div>
            <div className={styles.text}>{item.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseTT;
