import styles from './HowItWorks.module.scss';
import { HowDataType } from './types';

interface IProps {
  content: HowDataType;
}

export function HowBlock({ content }: IProps) {
  return (
    <div className={styles.block}>
      <div className={styles.title_block}>
        <div className={styles.dot}></div>
        <h3 className={styles.title}>{content.title}</h3>
      </div>
      <p className={styles.description}>{content.description}</p>
    </div>
  );
}
