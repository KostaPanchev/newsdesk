import React from 'react';
import { AddCircleIcon } from '../../../../icons/icons';
import styles from './add-post-btn.module.scss';

const AddPostBtn = (props) => (
    <span className={styles.addPostBtn} onClick={props.onClick}>
        <AddCircleIcon />
    </span>
);

export default AddPostBtn;