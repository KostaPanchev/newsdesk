import React from 'react';
import PropTypes from 'prop-types';
import styles from './select-input.module.scss';

const SelectInput = ({options = [], className, label, name, placeholder=false, ...rest}) => {
    const optionsList = options.map(option =>
        <option value={option.id} key={option.id}>{option.value}</option>
    );
    return(
        <div className={className}>
            {label && <label htmlFor="">{label} <span>{rest.required && '*'}</span></label>}
            <div className={styles.selectField}>
                <select className={styles.select} name={name} {...rest}>
                    { 
                        placeholder ? <option value='' disabled>{placeholder}</option> :
                            <option value='' >-</option>
                    }
                    {optionsList}
                </select>
            </div>
        </div>
    );
};

SelectInput.propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default SelectInput;