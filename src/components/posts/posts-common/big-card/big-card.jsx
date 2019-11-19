import React from 'react';
import styles from './big-card.module.scss';
import postStyles from '../post.module.scss';
import { WarningIcon, AddNoteIcon } from '../../../../icons/icons';
import PostNote from '../post-note/post-note';

import { getDisplayTime, formatDateDK } from '../../../../helpers';
import PropTypes from 'prop-types';

import {
    FacebookIcon,
    TwitterIcon,
    SnapchatIcon,
    InstagramIcon,
    VideoCollectionIcon,
    DevicesIcon,
    PhotoLibraryIcon,
    UserIconOutline
} from '../../../../icons/icons';

// store
import { connect } from 'react-redux';

const BigCard = ({ post, postOptions, openNote, closeNote, isNoteOpen, updateNote}) => {
    let icons = {
        Facebook: <FacebookIcon />,
        Twitter: <TwitterIcon />,
        Instagram: <InstagramIcon />,
        Snapchat: <SnapchatIcon />,
        Video: <VideoCollectionIcon />,
        Interaktiv: <DevicesIcon />,
        Galleri: <PhotoLibraryIcon />

    };
    let socialList = null,
        equipmentlList = null;
    if (!(Object.keys(postOptions).length === 0 && postOptions.constructor === Object)) {
        socialList = postOptions.social.map(option =>
            <li key={option.id}
                className={post.social.includes(option.id) ? styles.optionsIconActive : styles.optionsIcon}>
                {icons[option.value]}
            </li>
        );

        equipmentlList = postOptions.equipment.map(option =>
            <li key={option.id}
                className={post.equipment.includes(option.id) ? styles.optionsIconActive : styles.optionsIcon}>
                {icons[option.value]}
            </li>
        );
    }
    // let importedCard = post.imported;
    // if(post.creator.uuid === 'Importer'){
    //     importedCard = true;
    // }
    return (
        <div className={post.is_published ? styles.cardIsPublished : styles.card}>
            <div className={post.imported ? styles.importedCardHeader: styles.createdCardHeader}>
                {/* <span>{post.category_id}</span> */}
                <span className={styles.headerTime}>
                    {formatDateDK(post.published)}, {getDisplayTime(post.published)}
                </span>
                <span className={styles.mainCategory}>
                    {post.original_keyword}
                </span>
                <span className={styles.headerQuickInfo}>
                </span>
            </div>
            <div className={`${styles.body} ${postStyles.postInner}`}>
                <div className={`${styles.mainInfo} ${postStyles.postMainInfo}`}>
                    <h3 className={styles.title}>
                        {post.title.split(' ').length < 6 && 
                        <span className={styles.titleWarnIcon} title="The title should be minimum 5 words"><WarningIcon /></span>}
                        {post.title}
                    </h3>
                    <div className={styles.descriptionWrapper}>
                        <div className={styles.description}>
                            {post.description}
                        </div>
                    </div>
                    <div>
                        { (post.note || isNoteOpen)  ? 
                            <PostNote isNoteOpen={isNoteOpen} openNote={openNote}
                                updateNote={updateNote} closeNote={closeNote}
                                note={post.note}/> :
                            <span onClick={openNote} className={styles.addNoteIcon}>
                                <AddNoteIcon />
                            </span>
                        }
                    </div>
                    {post.byline &&
                        <div className={styles.bylineWrapper}>
                            {post.is_author && <UserIconOutline />}
                            <p className={styles.byline}> {post.byline}</p>
                        </div>
                    }
                </div>
                <div className={`${post.imported ? styles.importedCardOptions : styles.createdCardOptions} ${postStyles.postOptions}`}>
                    <ul className={styles.optionsList}>
                        <li className={styles.optionItem}>
                            <span className={styles.label}>Format</span>
                            <span className={styles.value}>{post.format.value}</span>
                        </li>
                        <li className={styles.optionItem}>
                            <span className={styles.label}>Length</span>
                            <span className={styles.value}>{post.length.value}</span>
                        </li>
                        <li className={styles.optionItem}>
                            <span className={styles.label}>Låst</span>
                            <span className={styles.value}>{post.locked.value}</span>
                        </li>
                        <li className={styles.optionItem}>
                            <span className={styles.label}>Prioritet</span>
                            <span className={styles.value}>{post.priority.value}</span>
                        </li>
                        <li className={styles.optionItem}>
                            <span className={styles.label}>Social</span>
                            <ul className={styles.iconsList}>
                                {socialList}
                            </ul>
                        </li>
                        <li className={styles.optionItem}>
                            <span className={styles.label}>Udstyr</span>
                            <ul className={styles.iconsList}>
                                {equipmentlList}
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

BigCard.propTypes = {
    post: PropTypes.object.isRequired,
    postOptions: PropTypes.object.isRequired,
    isNoteOpen: PropTypes.bool.isRequired,
    openNote: PropTypes.func.isRequired,
    closeNote: PropTypes.func.isRequired
};


const mapStateToProps = state => {
    return {
        postOptions: state.appStore.postOptions
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BigCard);