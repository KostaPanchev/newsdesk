import React from 'react';
import styles from './errors.module.scss';

const Err = ({err, index}) => {
    let errors = err.errors.map((item, i) => (
        <li className={styles.errDesc} key={i}>- {item.Description}</li>
    ));
    return (
        <div className={styles.errItem}>
            <div></div>
            <div className={styles.title}><span className={styles.errNum}>{index + 1}</span> : in {err.title}</div>
            <ul>
                {errors}
            </ul>
        </div>
    );
};
    
export default Err;