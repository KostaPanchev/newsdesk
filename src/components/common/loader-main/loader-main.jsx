import React from 'react';
import styles from './loader-main.module.scss';

const LoaderMain = ({backgroundColor = 'defaultViewColor'}) => {
    return (
        <div>
            <div className={styles.loader}>
                <div className={`${backgroundColor} ${styles.rect1}`}></div>
                <div className={`${backgroundColor} ${styles.rect2}`}></div>
                <div className={`${backgroundColor} ${styles.rect3}`}></div>
                <div className={`${backgroundColor} ${styles.rect4}`}></div>
                <div className={`${backgroundColor} ${styles.rect5}`}></div>
            </div>
        </div>
    );
};

export default LoaderMain;