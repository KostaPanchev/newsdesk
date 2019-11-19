import React from 'react';
import PropTypes from 'prop-types';
import TableHead from './table-head';
import TableBody from './table-body';
import styles from '../posts-table.module.scss';

const DefaultView = (props) => {
    const { routerInfo, categories, posts } = props;
    return (
        <div className={`${styles.tableWrapper} force-show-scrollbars`}>
            <table className={styles.tableDefaultView}>
                <TableHead date={routerInfo.date}
                    categories={props.categories}/>
                <TableBody posts={posts}
                    date={routerInfo.date}
                    categories={categories}
                />
            </table>
        </div>
    );
};

DefaultView.propTypes = {
    routerInfo: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
};


export default DefaultView;