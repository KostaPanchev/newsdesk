import React from 'react';
import styles from './loader.module.scss';

const Loader = (props) => {
    let {
        position = 'static',
        size = '50px',
        border = '5px',
        color = '#03A9F4',
        padding = '.5em',
        width = '100%'
    } = props;

    let wrapperStyles = {
        padding,
        width
    };

    if (position === 'absolute'){
        wrapperStyles.width = '100%';
        wrapperStyles.position = 'absolute';
        wrapperStyles.height = '100%';
        wrapperStyles.left = 0;
        wrapperStyles.top = 0;
        wrapperStyles.alignItems = 'center';
        wrapperStyles.backgroundColor = 'rgba(218, 218, 218, 0.2)';
    }

    let loaderStyles = {
        width: size,
        height: size,
        borderTopColor: color,
        borderTopWidth: border
    };

    return(
        <div className={styles.loaderWrapper} style={wrapperStyles}>
            <div className={styles.loader} style={loaderStyles}></div>
        </div>
    );
};

export default Loader;

