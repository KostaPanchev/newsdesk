import React from 'react';
import {getHour, formatTime, getCategoryPriority} from '../../../helpers';
import Cell from '../posts-common/cell/cell';
import { maxPriority } from '../../../app-defaults';
import PropTypes from 'prop-types';

const Row = ({categories, posts, date, time}) => {
    const tds = categories.map(category => {
        let postsData = [];

        let filterByCategory = posts.filter(post => post.categories.includes(category.id));
        // let filterByCategory = posts.filter(post => post.category_id === category.id);

        if( (category.prio_min && category.prio_max) &&
            (category.prio_max <= maxPriority || category.prio_min >= 1)
        ) {
            postsData = filterByCategory.filter(post => {
                let priorityVal = getCategoryPriority(post, category.id);
                return (
                    priorityVal <= category.prio_max &&
                    priorityVal >= category.prio_min
                );
            }
                
            );
        } else {
            postsData = [...filterByCategory];
        }

        return (
            <Cell key={`${category.id}-${category.index}`}
                posts={postsData}
                date={date}
                time={time}
                // categoryPriority={{
                //     prioMax: category.prio_max || maxPriority,
                //     prioMin: category.prio_min || 1
                // }}
                categoryId={category.id}
            />
        );

    });

    return (
        <tr>
            <td id={`posts-row-${time}`}>{formatTime(time)}</td>
            {tds}
        </tr>
    );
};


const TableBody = ({date, categories, posts}) => {
    let rows = [];
    for (let i = 0; i < 24 ; i++) {
        rows.push(
            <Row key={i} time={i} date={date}
                categories={categories}
                posts={ posts.filter((post) => getHour(post.published) === i)}
            />
        );
    }

    return (
        <tbody>
            { rows }
        </tbody>
    );
};

TableBody.propTypes = {
    date: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired
};


export default TableBody;