import React from 'react';
import PropTypes from 'prop-types';
import styles from './report.module.scss';
import { Lockicon, AddCircleIcon } from '../../../icons/icons';

const Card = ({report, apllyEditMode}) => (
    <div className={styles.card}>
        { report.content ?
            <div className={styles.cardContent}>
                {report.locked ?
                    <p className={styles.cardContentTextLocked}>
                        {report.content}
                    </p>
                    :<p onClick={() => apllyEditMode(report)} className={styles.cardContentText}>
                        {report.content}
                    </p>}
                {report.locked && 
                <div className={styles.lockedWrapper}>
                    <div className={styles.locked}>
                        <span className={styles.lockedIcon}><Lockicon /></span>
                        <span className={styles.lockedUser}>{report.lock_triggered_by}</span> is typing...
                    </div>
                </div>
                }
            </div> :
            <div className={styles.addBtn}
                onClick={() => apllyEditMode(report)}>
                <AddCircleIcon />
            </div>
        }
    </div>
);

Card.propTypes = {
    report: PropTypes.object.isRequired,
    apllyEditMode: PropTypes.func.isRequired
};

export default Card;