import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {getHour} from '../../../helpers';
import { WeekViewIcon, DefaultViewIcon, DayViewIcon } from '../../../icons/icons';
import styles from './day-view.module.scss';

import ListItem from './list-item';
 
const DayView = ({routerInfo, posts}) => {
    const DefaultVewBtn = () => <Link className={styles.headerControlBtn}
        to={{
            pathname: '/posts',
            search: `date=${routerInfo.date}`
        }}><DefaultViewIcon /></Link>;

    const WeekVewBtn = () => <Link className={styles.headerControlBtn}
        to={{
            pathname: '/posts/week',
            search: `date=${routerInfo.date}&categoryId=${routerInfo.categoryId}`
        }}><WeekViewIcon /></Link>;

    const listItems = [];
    for (let i = 0; i < 24 ; i++) {
        listItems.push(
            <ListItem key={i} time={i}
                posts={ posts.filter((post) => getHour(post.published) === i)}
                routerInfo={routerInfo} />
        );
    }

    return (
        <div className='container'>
            <div className={styles.header}>
                <div className={styles.headerIcon}>
                    <DayViewIcon />
                </div>
                <div className={styles.headerControls}>
                    <DefaultVewBtn />
                    <WeekVewBtn />
                </div>
            </div>
            <ul className='force-show-scrollbars'>
                {listItems}
            </ul>
        </div>
    );
};

DayView.propTypes = {
    routerInfo: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
};

export default DayView;