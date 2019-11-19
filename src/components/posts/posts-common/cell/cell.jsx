import React from 'react';
import styles from './cell.module.scss';

import PropTypes from 'prop-types';
import {formatTime} from '../../../../helpers';
import SmallCard from '../small-card/small-card';
import AddPostBtn from '../../posts-common/add-post-btn/add-post-btn';

import { connect } from 'react-redux';

import {
    openTablePostHandler
} from '../../../../store/actions';

const Cell = (props) => {
    let sortedPosts = [...props.posts].sort((a, b) => {
        return new Date(a.published).getTime() - new Date(b.published).getTime();
    });
    const postsList = sortedPosts.map(post =>
        <SmallCard key={post.id} post={post} openTablePost={props.openTablePostHandler} curCategoryId={props.categoryId}/>
    );
    return (
        <td>
            <div className={styles.cell}>
                <div className={styles.posts}>
                    { postsList }
                </div>
                <AddPostBtn onClick={() => props.openTablePostHandler({
                    post: {
                        published: `${props.date} ${formatTime(props.time)}`,
                        category_id: props.categoryId
                    },
                    newForm: true
                })}/>
            </div>
        </td>
    );
};

Cell.propTypes = {
    posts: PropTypes.array,
    categoryId: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    openTablePostHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        // searchQuery: state.appStore.searchQuery,
    };
};

const mapDispatchToProps = {
    // addError,
    openTablePostHandler
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);