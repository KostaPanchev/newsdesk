import React, { Component } from 'react';
import TextInput from '../../common/inputs/text-input/text-input';
import styles from './form.module.scss';
import publicationStyles from '../publication/publication.module.scss';
import Btn from '../../common/btn/btn';
import { WarningIcon } from '../../../icons/icons';

class Publication extends Component {
    constructor(props){
        super(props);
        this.state = {
            message_1: '',
            message_2: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount(){
        if(this.props.publication){
            this.setState({
                message_1: this.props.publication.message_1,
                message_2: this.props.publication.message_2
            });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
            formChanged: true,
            [name]: value
        });
    }

    handleSave(){
        const publication = {
            message_1: this.state.message_1,
            message_2: this.state.message_2
        };
        this.props.onSave(publication);
    }

    handleCancel(){
        this.props.onCancel();
    }

    render(){
        return(
            <div className={styles.form}>
                <div className={publicationStyles.messages}>
                    <div className={publicationStyles.message}>
                        <TextInput type='textarea'
                            onChange={this.handleInputChange}
                            value={this.state.message_1}
                            name='message_1'
                            label='Rubrik 1'
                            maxLength={100}/>
                    </div>
                    <div className={publicationStyles.message}>
                        <TextInput type='textarea'
                            onChange={this.handleInputChange}
                            value={this.state.message_2}
                            label='Rubrik 2'
                            name='message_2'
                            maxLength={100}/>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.footerInner}>
                        <div className={styles.formWarning}>
                            <WarningIcon />
                            <div className={styles.formWarnText}>
                            OBS! Feltet er kun til nyhedsredaktører.<br />
                            Rubrik 1 skal udfyldes. Hvis feltet er tomt, udsender vi ikke push-beskeden</div>
                        </div>
                        <div className={styles.buttons}>
                            <Btn color='secondary' text='Annuller' onClick={this.handleCancel}/>
                            <Btn text='Gem' onClick={this.handleSave}/>
                            {/* <span className={styles.cancelBtn} onClick={this.handleCancel}>cancel</span>
                    <span className={styles.saveBtn} onClick={this.handleSave}>save</span> */}
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Publication;