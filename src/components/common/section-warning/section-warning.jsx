import React from 'react';
import styles from './section-warning.module.scss';

const SectionWarning = ({title, text}) => (
    <div className={styles.containr}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
    </div>
);

export default SectionWarning;