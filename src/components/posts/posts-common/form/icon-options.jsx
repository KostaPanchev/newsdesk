import React from 'react';
import PropTypes from 'prop-types';
import styles from './icon-options.module.scss';

import {
    FacebookIcon,
    TwitterIcon,
    SnapchatIcon,
    InstagramIcon,
    VideoCollectionIcon,
    DevicesIcon,
    PhotoLibraryIcon
} from '../../../../icons/icons';

const IconOptiosn = (props) => {
    let icons = {
        Facebook: <FacebookIcon />,
        Twitter: <TwitterIcon />,
        Instagram: <InstagramIcon />,
        Snapchat: <SnapchatIcon />,
        Video: <VideoCollectionIcon />,
        Interaktiv: <DevicesIcon />,
        Galleri: <PhotoLibraryIcon />

    };
    let options = props.options.map(option => 
        <li key={option.id}
            className={props.active.includes(option.id) ? styles.optionActive : styles.option} 
            onClick={() => props.onChange(props.name, option.id)}>
            {icons[option.value]}
        </li>
    );
    let listTitle = null;
    if (props.title){
        listTitle = <label>{props.title}</label>;
    }
    return (
        <div>
            {listTitle}
            <ul className={styles.optionsList}>
                {options}
            </ul>
        </div>
    );
};

IconOptiosn.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    active: PropTypes.array.isRequired,
    title: PropTypes.string
};

export default IconOptiosn;