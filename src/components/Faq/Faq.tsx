'use client';

import { useState } from 'react';
import styles from './faq.module.scss';
import { FaqItem } from './FaqItem';
import { faqData } from './mock.data';

export function Faq() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <section className={styles.section} id='faq'>
      <div className={styles.container}>
        <h3 className={styles.head_title}>FAQ</h3>
        <div className={styles.list}>
          {faqData.map((item) => (
            <FaqItem
              key={item.id}
              title={item.question}
              content={item.answer}
              isExpanded={item.id === expanded}
              onToggle={() => toggleExpand(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
