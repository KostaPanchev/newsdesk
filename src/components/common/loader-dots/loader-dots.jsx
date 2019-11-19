import React from 'react';
import styles from './loader-dots.module.scss';

const LoaderDotts = () => (
    <div className={styles.loader}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
    </div>
);

export default LoaderDotts;