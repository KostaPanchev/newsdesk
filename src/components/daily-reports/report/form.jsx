import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import TextInput from '../../common/inputs/text-input/text-input';
import styles from './report.module.scss';
import Btn from '../../common/btn/btn';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: '',
            templateIsUsed: false
        };
        this.useTemplate = this.useTemplate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.emitChangeDebounced = debounce(this.emitChange, 250);
    }

    componentDidMount(){
        if(this.props.report.content){
            this.setState({content: this.props.report.content});
        }
    }

    useTemplate(){
        let newText;
        if(this.state.content){
            newText = (`${this.state.content}

--------- skabelon -----------
${this.props.report.template}`);
        } else {
            newText = this.props.report.template;
        }

        this.setState({
            content: newText,
            templateIsUsed: true
        });
        this.props.updateReport(this.props.report.category.id, newText);
    }

    handleChange(e){
        this.setState({
            content: e.target.value
        });
        this.emitChangeDebounced(e.target.value);
    }

    emitChange(value) {
        this.props.updateReport(this.props.report.category.id, value);
    }

    
    render(){
        return (
            <div className={styles.form}>
                {(this.props.report.template && !this.state.templateIsUsed) && 
                    <div className={styles.templateBtnWrapper}>
                        <span className={styles.templateBtn}
                            onClick={this.useTemplate}>
                            Indsæt skabelon
                        </span>
                    </div>
                }                
                <TextInput type='textarea'
                    name='content'
                    value={this.state.content}
                    onChange={this.handleChange}
                    placeholder='Skriv tekst her'
                    maxLength={2400}/>
                <div className={styles.btnWrapper}>
                    <Btn text='OK' onClick={() => this.props.apllyEditMode(null)}/>
                </div>
            </div>
        );
    }
    
} 

Form.propTypes = {
    report: PropTypes.object.isRequired,
    apllyEditMode: PropTypes.func.isRequired
};

export default Form;