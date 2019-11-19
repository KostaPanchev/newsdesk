import React from 'react';
import PropTypes from 'prop-types';
import { formatDateDK, getWeekDay, formatDateISO } from '../../../helpers';
import { Link } from 'react-router-dom';
import { DefaultViewIcon, WeekViewIcon, DayViewIcon } from '../../../icons/icons';
import styles from '../posts-table.module.scss';

const TableHead = ({categoryId, weekDays }) => {

    const weekDaysList = weekDays.map((weekDay, i) => 
        <th key={i} 
            className={`${weekDay === formatDateISO(new Date()) && styles.currentDay}`}>
            <div className={styles.thCellWeek}>
                <div>{getWeekDay(weekDay)}. {formatDateDK(weekDay, false)}</div>
                <div className={styles.headContorols}>
                    <Link to={{
                        pathname: `/posts/day`,
                        search: `date=${weekDay}&categoryId=${categoryId}`
                    }}><DayViewIcon /></Link>
                    <Link to={{
                        pathname: `/posts`,
                        search: `date=${weekDay}`
                    }}><DefaultViewIcon /></Link>
                </div>
            </div>
        </th>
    );

    return(
        <thead>
            <tr>
                <th><WeekViewIcon /></th>
                {weekDaysList}
            </tr>
        </thead>
    );
};

TableHead.propTypes = {
    categoryId: PropTypes.string.isRequired,
    weekDays: PropTypes.array.isRequired,
};

export default TableHead;