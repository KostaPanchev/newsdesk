import React from 'react';
import styles from './page-not-found.module.scss';

const PageNotFound = () => (
    <div className={styles.wrapper}>
        <div className={styles.notFound404}>404</div>
        <div>Page not found</div>
    </div>
);

export default PageNotFound;