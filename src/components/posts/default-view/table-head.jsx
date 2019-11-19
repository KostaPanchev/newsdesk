import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DayViewIcon, DefaultViewIcon, WeekViewIcon } from '../../../icons/icons';
import { maxPriority } from '../../../app-defaults';
import styles from '../posts-table.module.scss';

const TableHead = ({categories, date}) => {

    const ths = categories.map(category => {
        let priority = null;
        if(category.prio_min && category.prio_max){
            if (category.prio_min > 1 || category.prio_max < maxPriority){
                priority = <span className={styles.priorityLabel}>{category.prio_min} - {category.prio_max}</span>;
            }
        }
        return (
            <th key={`${category.id}-${category.index}`}>
                <div className={styles.thCellDefault}>
                    <div className={styles.headTitle}>{category.title}</div>
                    {category.note &&
                <div className={styles.headSubtitle}>
                    {category.note}
                </div>
                    }
                    <div className={styles.headContorols}>
                        <Link to={{
                            pathname: `/posts/day`,
                            search: `date=${date}&categoryId=${category.id}`
                        }}><DayViewIcon /></Link>
                        <Link to={{
                            pathname: `/posts/week`,
                            search: `date=${date}&categoryId=${category.id}`
                        }}><WeekViewIcon /></Link>
                        { priority }
                    </div>
                </div>
            </th>
        );
    }
    );

    return(
        <thead>
            <tr>
                <th><DefaultViewIcon /></th>
                {ths}
            </tr>
        </thead>
    );
};


TableHead.propTypes = {
    categories: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired
};

export default TableHead;