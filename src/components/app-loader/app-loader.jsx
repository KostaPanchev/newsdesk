import React from 'react';
import styles from './app-loader.module.scss';
import LoaderMain from '../common/loader-main/loader-main';

const AppLoader = () => (
    <div className={styles.loaderWrapper}>
        <LoaderMain />
        <div className={styles.title}>
            Newsdesk
        </div>
        <div className={styles.subTitle}>
            Henter kaffe og kage...
        </div>
    </div>
);

export default AppLoader;