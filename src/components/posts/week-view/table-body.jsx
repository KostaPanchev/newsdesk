import React from 'react';
import PropTypes from 'prop-types';
import {getHour, formatTime, formatDateISO} from '../../../helpers';
import Cell from '../posts-common/cell/cell';

const Row = (props) => {
    const tds = props.weekDays.map(weekday => {
        const posts = props.posts.filter(post => formatDateISO(post.published) === weekday);
        return (
            <Cell key={weekday}
                // categoryPriority={{
                //     prioMax: maxPriority,
                //     prioMin: 1
                // }}
                posts={posts}
                date={weekday}
                time={props.time}
                categoryId={props.categoryId}
            />
        );
    });
    return (
        <tr>
            <td id={`posts-row-${props.time}`}>{formatTime(props.time)}</td>
            {tds}
        </tr>
    );
};

const TableBody = ({posts, date, weekDays, categoryId}) => {
    let rows = [];
    for (let i = 0; i < 24 ; i++) {
        const filteredPosts = posts.filter((post) => getHour(post.published) === i);
        rows.push(
            <Row key={i} time={i}
                date={date}
                weekDays={weekDays}
                categoryId={parseInt(categoryId, 10)}
                posts={filteredPosts}
            />
        );
    }
    return(
        <tbody>
            {rows}
        </tbody>
    );
};

TableBody.propTypes = {
    posts: PropTypes.array.isRequired,
    categoryId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    weekDays: PropTypes.array.isRequired,
};

export default TableBody;