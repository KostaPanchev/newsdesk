import React from 'react';
import PropTypes from 'prop-types';

import Card from './card';
import Form from './form';

import LoaderDots from '../../common/loader-dots/loader-dots';
import { PinIcon } from '../../../icons/icons';
import styles from './report.module.scss';

const Report = (props) => {
    let {report, updateReport, apllyEditMode} = props;
    let reportClass = styles.report;
    let headerClass = styles.header;
    let editing = false;
    if (props.editing){
        if(props.editing.category.id === report.category.id){
            editing = true;
            reportClass = styles.reportEditMode;
        }
    }
    if(report.content){
        headerClass = styles.headerFilled;
    }
    if(report.locked && !editing){
        reportClass = styles.reportLocked;
        headerClass = styles.headerLocked;
    }
    return(
        <div className={reportClass}>
            <div className={headerClass}>
                {(report.locked && !editing) && 
                <div className={styles.LoaderWritingWrapper}>
                    <LoaderDots />
                </div>
                }
                <div className={styles.categoryTitle}>
                    { (report.content && !report.locked) && <span className={styles.pinIcon}>
                        <PinIcon />
                    </span> }
                    <span className={styles.title}>
                        {report.category.title}
                        {report.category.note && <span className={styles.titleNote}>{report.category.note}</span>}
                    </span>
                </div>
            </div>
            <div className={styles.body}>
                { editing ?
                    <Form report={report}
                        updateReport={updateReport}
                        apllyEditMode={apllyEditMode}/> :
                    <Card report={report}
                        apllyEditMode={apllyEditMode}/>
                }
            </div>
        </div>
    );
};

Report.propTypes = {
    report: PropTypes.object.isRequired,
    apllyEditMode: PropTypes.func.isRequired,
    updateReport: PropTypes.func.isRequired,
};

export default Report;