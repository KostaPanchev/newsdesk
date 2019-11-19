import React from 'react';
import PropTypes from 'prop-types';
import { formatDateDK, getWeekDay } from '../../../../helpers';
import { CalendarIcon } from '../../../../icons/icons';
import styles from './date-picker.module.scss';

const DatePicker = (props) => (
    <div>
        { props.label &&  
            <label htmlFor={props.name}>{props.label}</label>
        }
        <div className={props.whiteTheme ? styles.inputWrapperWhite : styles.inputWrapper}>
            <div className={styles.displayValue}>
                <CalendarIcon className={styles.icon}/>
                <span className={styles.displayText}>
                    {getWeekDay(props.value)}. {formatDateDK(props.value)}
                </span>
            </div>
            <input type="date"
                className={styles.input}
                id='date'
                data-date-inline-picker="true"
                name={props.name}
                onChange={props.onChange}
                value={props.value}
                required={props.required || null}
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            />
        </div>
        <span className="validity"></span>
    </div>
);

DatePicker.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default DatePicker;