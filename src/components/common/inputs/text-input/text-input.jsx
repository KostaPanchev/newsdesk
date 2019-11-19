import React from 'react';
import PropTypes from 'prop-types';
import styles from './text-input.module.scss';

const TextInput = (props) => {
    let {
        type = 'text',
        value = '',
        maxLength,
        label = null,
        ...rest
        
    } = props;
    
    let maxLengthTag = null;
    if (maxLength) {
        maxLengthTag = <div className={styles.length}>
            <span>{value.length}</span> / <span>{maxLength}</span>
        </div>;
    }
    const textInput = <input type={type}
        maxLength={maxLength}
        value={value}
        {...rest}
    />;

    const textArea = <textarea
        maxLength={maxLength}
        value={value}
        {...rest}></textarea>;

    let inputField = '';
    if (type === 'textarea') {
        inputField = textArea;
    } else {
        inputField = textInput;
    }
    return( 
        <div className={styles.textInput}>
            { label &&  
                    <label htmlFor={props.name}>{props.label} {rest.required && '*'}</label>
            }
            <div className={styles.inputField}>
                { inputField }
                {/* <span className={styles.validity}></span> */}
            </div>
            { maxLengthTag }
        </div>
    );
};

TextInput.propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired, // text, textarea
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    maxlength: PropTypes.number
};

export default TextInput;