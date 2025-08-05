import { FaqArrow } from '@/ui';
import styles from './faq.module.scss';

interface Props {
  title: string;
  content: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export function FaqItem({ title, content, isExpanded, onToggle }: Props) {
  return (
    <div className={`${styles.faq} ${isExpanded ? styles.faq__active : ''}`}>
      <div
        className={`${styles.question} ${isExpanded ? styles.question_show : ''}`}
        onClick={onToggle}
      >
        <p>{title}</p>
        <div>
          <FaqArrow isOpen={isExpanded} />
        </div>
      </div>

      <div className={`${styles.answer} ${isExpanded ? styles.show : ''} `}>{content}</div>
    </div>
  );
}
