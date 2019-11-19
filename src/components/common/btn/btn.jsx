import React from 'react';
import styles from './btn.module.scss';
import PropTypes from 'prop-types';

const Btn = (props) => {

    let {
        text,
        color = 'primary',
        type = 'default',
        ...rest
    } = props;

    if(type === 'submit') {
        return (
            <input type='submit'
                className={styles[color]}
                value={text} {...rest} />
        );
    } else {
        return (
            <span className={styles[color]}
                {...rest}>
                {text}
            </span>
        );
    }

};

Btn.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'submit']),
    color: PropTypes.oneOf(['primary', 'secondary'])
};

export default Btn;