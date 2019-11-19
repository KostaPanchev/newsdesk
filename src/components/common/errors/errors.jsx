import React from 'react';
import styles from './errors.module.scss';
import Err from './error';

const Errors = (props) => {
    const erorsList = props.errors.map((err, i) => <Err key={i} index={i} err={err}/>);
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
            Ups! Something went wrong
            </div>
            <div className={styles.body}>

                <ul className={styles.errorsList}>
                    { erorsList }
                </ul>
                {props.clearErrors && 
                <button className={styles.btn} onClick={props.clearErrors}>clear errors</button>
                }
            </div>
        </div>
    );
};

export default Errors;