import React from 'react';
import styles from './post-note.module.scss';

const PostNoteCard = ({noteText, openNote}) => (
    <div className={styles.noteText} onClick={openNote}>{noteText}</div>
);

export default PostNoteCard;