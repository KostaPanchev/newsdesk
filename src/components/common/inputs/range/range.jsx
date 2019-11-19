import React, { Component } from 'react';
import InputRange from 'react-input-range';

// import PropTypes from 'prop-types';
import './internal-sass/index.scss';
import styles from './range.module.scss';
import { maxPriority } from '../../../../app-defaults';

class Range extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: this.props.val || 1,
        };
        this.handleChage = this.handleChage.bind(this);
        this.handleOkBtn = this.handleOkBtn.bind(this);
    }

    handleChage(value) {
        this.setState({value});
        // this.props.onChange(this.state.value);
        
    }

    handleOkBtn(){
        this.props.onChange(this.state.value);
    }

    render(){
        return(
            <div className={styles.wrapper}>
                <div className={styles.input}>
                    <InputRange
                        maxValue={this.props.maxValue || maxPriority}
                        minValue={this.props.minValue || 1}
                        step={this.props.step || 1}
                        value={this.state.value}
                        onChange={this.handleChage} />
                </div>
                <div className={styles.btnWrapper}>
                    <span className={styles.btn} onClick={this.handleOkBtn}>OK</span>
                </div>
            </div>
        );
    }
}

export default Range;