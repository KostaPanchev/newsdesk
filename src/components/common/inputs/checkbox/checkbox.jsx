import React from 'react';
import styles from './checkbox.module.scss';
import PropTypes from 'prop-types';

const Checkbox = (props) => {
    let {
        wrpperClass = '',
        inputClass = '',
        name,
        id,
        label,
        onChange,
        ...rest
    } = props;
    return (
        <div className={wrpperClass}>
            <input className={`${styles.checkbox} ${inputClass}`}
                type="checkbox"
                id={id} 
                onChange={onChange}
                {...rest}/>
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Checkbox;