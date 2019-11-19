import React from 'react';
import styles from './small-card.module.scss';

import PropTypes from 'prop-types';
import { getDisplayTime, getCategoryPriority } from '../../../../helpers';
import { UserIcon, AddIcon, WarningIcon, CommentIcon } from '../../../../icons/icons';

const SmallCard = ({post, openTablePost, curCategoryId}) => {
    // let descLen = 80;
    // let desc = '';
    let priority = null;
    let locked = null;
    let note = null;
    let isAuthor = null;
    let titleWarn = false;
    let mainCategory = null;


    
    // if(post.description.length > descLen){
    //     desc = `${post.description.substring(0, descLen)}...`;
    // } else {
    //     desc = post.description;
    // }


    if(post.priority.value){
        let priorityVal = getCategoryPriority(post, curCategoryId);
        priority = <span className={styles[`priority-${priorityVal}`]}>
            {priorityVal}
        </span>;
    }
    
    if(post.locked.value === 'Plus historie') {
        locked = <span className={styles.locked}>
            <AddIcon />
        </span>;
    }
    if(post.is_author){
        isAuthor = <span className={styles.isAuthor}>
            <UserIcon />
        </span>;
    }
    if(post.note){
        note = <span className={styles.note}>
            <CommentIcon />
        </span>;
    }

    if(post.title.split(' ').length < 6){
        titleWarn = <span className={styles.warnIcon}>
            <WarningIcon />
        </span>;
    }
    if(post.original_keyword.length > 10){
        mainCategory = `${post.original_keyword.substring(0, 10)}...`;
    } else {
        mainCategory = post.original_keyword;
    }
    // if(post.creator.uuid === 'Importer'){
    //     importedCard = true;
    // }
    return (
        <div className={post.is_published ? styles.cardPublihed : styles.card}
            onClick={ () => openTablePost({
                post: post,
                newForm: false
            }) }>
            <div className={post.imported ? styles.importedCardHeader : styles.createdCardHeader}>
                <span className={styles.time}>
                    {getDisplayTime(post.published)}
                </span>
                <span className={styles.categoryTitle}>
                    {mainCategory}
                </span>
                <span  className={styles.quickInfo}>
                    {priority}
                </span>
            </div>
            <div className={post.imported ? styles.importedCardBody : styles.createdCardBody}>
                <h5 className={styles.postTitle}>{post.title}</h5>
                {/* <p className={styles.postDesc}>{desc}</p> */}
                {/* <NoteIcon /> */}
            </div>
            <div className={styles.footer}>
                {isAuthor}
                {note}
                {locked}
                {titleWarn}
            </div>
        </div>
    );
};

SmallCard.propTypes = {
    post: PropTypes.object.isRequired,
    openTablePost: PropTypes.func.isRequired
};

export default SmallCard;