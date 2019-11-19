import React, { Component } from 'react';
import styles from './publication.module.scss';
import Loader from '../../common/loader/loader';
import Form from '../form/form';
import { RssIcon } from '../../../icons/icons';
import { formatDateDK } from '../../../helpers';

class Publication extends Component {
    constructor(props){
        super(props);
        this.state = {
            isActive: false,
            formChanged: false,
            message_1: '',
            message_2: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOpenForm = this.handleOpenForm.bind(this);
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

    handleSave(publication){
        publication.id = this.props.publication.id;
        this.props.updateMessage(publication);
        this.setState({isActive: false});
    }

    handleCancel(){
        this.setState({isActive: false});
    }

    handleOpenForm(){
        this.setState({isActive: true});
    }

    render(){
        let isActive = this.state.isActive;
        let { publication, fetching } = this.props;
        return(
            <div className={isActive ? styles.publicationActive : styles.publication}>
                <div className={isActive ? styles.headerActive : styles.header}>
                    <span className={styles.rssIcon}>
                        <RssIcon />
                    </span>
                    <div className={styles.title}>{publication.publication}</div>
                    {fetching && <Loader size='20px' width='80px' border='3px' padding='0px'/> }
                </div>
                <div className={styles.body}>
                    <div className={styles.publicationInfo}>
                        <div className={styles.publicationInfoTitle}>
                            Skriv push-besked
                        </div>
                        <div className={styles.titleWrapper}>
                            { publication.updated &&
                            <div className={styles.subTitle}>Sidst opdateret d. {formatDateDK(publication.updated)} af {publication.updated_by}</div>
                            }
                        </div>
                    </div>
                    <div className={styles.publicationContent}>
                        {isActive ? 
                            <Form publication={this.props.publication}
                                onSave={this.handleSave}
                                onCancel={this.handleCancel}/> :

                            <div className={styles.messages}>
                                <div className={styles.message} onClick={this.handleOpenForm}>
                                    <p className={styles.publicationLabel}>Rubrik 1</p>
                                    <p className={styles.messageText}>{this.props.publication.message_1}</p>
                                </div>
                                <div className={styles.message} onClick={this.handleOpenForm}>
                                    <p className={styles.publicationLabel}>Rubrik 2</p>
                                    <p className={styles.messageText}>{this.props.publication.message_2}</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Publication;