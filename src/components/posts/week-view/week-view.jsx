import React from 'react';
import PropTypes from 'prop-types';
import styles from '../posts-table.module.scss';
import TableHead from './table-head';
import TableBody from './table-body';
import { plusXDays } from '../../../helpers';

const WeekView = ({routerInfo, posts, weekDaysNumber = 7}) => {
    let weekDays = [];
    for (let i = 0; i < weekDaysNumber; i++) {
        weekDays.push(plusXDays(routerInfo.date, i));
    }
    return (
        <div className={`${styles.tableWrapper} force-show-scrollbars`}>
            <table className={styles.tableWeekView}>
                <TableHead categoryId={routerInfo.categoryId}
                    weekDays={weekDays} />
                <TableBody posts={posts}
                    date={routerInfo.date}
                    weekDays={weekDays}
                    categoryId={routerInfo.categoryId} />
            </table>
        </div>
    );
};

WeekView.propTypes = {
    routerInfo: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    weekDaysNumber: PropTypes.number.isRequired
};

export default WeekView;