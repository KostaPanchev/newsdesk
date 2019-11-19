import React, { Fragment } from 'react';

import PostNoteForm from './post-note-form';
import PostNoteCard from './post-note-card';

import PropTypes from 'prop-types';
import styles from './post-note.module.scss';

const PostNote = ({note, isNoteOpen, openNote, closeNote, updateNote}) => {
    let noteText = note ? note.note : '';
    let content = '';
    if(isNoteOpen){
        content = <PostNoteForm updateNote={updateNote} closeNote={closeNote} noteText={noteText}/>;
    } else {
        content = <PostNoteCard openNote={openNote} noteText={noteText}/>;
    }
    return (
        <div className={styles.postNote}>
            {content}
            {note && <Fragment>
                {note.last_edited && <div className={styles.updatedBy}><span>Opdateret af: </span>{note.last_edited}</div>}
            </Fragment>
            }
            
        </div>
    );
};

PostNote.propTypes = {
    note: PropTypes.object,
    isNoteOpen: PropTypes.bool.isRequired,
    openNote: PropTypes.func.isRequired,
    closeNote: PropTypes.func.isRequired
};

export default PostNote;

