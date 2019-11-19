import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Publication from './publication/publication';
// import styles from './push-messages.module.scss';
import { pushMessagesInterval } from '../../app-defaults';
import SectionWarning from '../common/section-warning/section-warning';

// store
import { connect } from 'react-redux';
import { stopFetchingData, getPushMessages, updateSinglePushMessage } from '../../store/actions';

class PushMessages extends Component {
    constructor(props){
        super(props);
        this.getMessages = this.getMessages.bind(this);
    }
    
    componentDidMount(){
        this.getMessages();
        this.getMessagesInterval = window.setInterval(this.getMessages, pushMessagesInterval);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (
            this.props.routerInfo.date !== prevProps.routerInfo.date || 
            this.props.routerInfo.categoryId !== prevProps.routerInfo.categoryId ||
            this.props.routerInfo.path !== prevProps.routerInfo.path
        )  {
            this.getMessages();
        }
    }

    getMessages() {
        this.props.getPushMessages();
    }

    componentWillUnmount(){
        clearInterval(this.getMessagesInterval);
        this.props.stopFetchingData();
    }


    render(){
        let messages = this.props.pushMessages.map(publication => (
            <Publication key={publication.id}
                publication={publication}
                updateMessage={this.props.updateSinglePushMessage}
                fetching={this.props.fetchingData}/>
        ));
        
        return(
            <div className='container'>
                { this.props.notSupportedFilter && 
                     <SectionWarning 
                         title='Der er ikke valgt en publikationsplan!'
                         text='Der skal vælges en publikationsplan for at se dens tilhørende push beskeder. Custom filtre kan ikke indeholde push beskeder.' />
                }
                <div>
                    {messages}
                    { (!messages.length && !this.props.notSupportedFilter) && 
                        <SectionWarning 
                            title='Der findes ingen push beskeder!'
                            text='Denne publikationsplan har ikke nogen push beskeder tilknyttet sig. Kontakt en Admin, hvis der skal oprettes push beskeder til den valgte publikationsplan. Der kan ikke tilføjes push beskeder til custom filtre.' />

                    }
                </div>
            </div>
        );
    }
}

PushMessages.propTypes = {
    // functions
    getPushMessages: PropTypes.func.isRequired,
    stopFetchingData: PropTypes.func.isRequired,
    updateSinglePushMessage: PropTypes.func.isRequired,
    // props
    pushMessages: PropTypes.array.isRequired,
    notSupportedFilter: PropTypes.bool.isRequired,
    routerInfo: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
    return {
        pushMessages: state.pushMessagesStore.pushMessages,
        notSupportedFilter: state.pushMessagesStore.notSupportedFilter,
        routerInfo: state.appStore.routerInfo,
        fetchingData: state.appStore.fetchingData,
    };
};

const mapDispatchToProps = {
    getPushMessages,
    updateSinglePushMessage,
    stopFetchingData
};

export default connect(mapStateToProps, mapDispatchToProps)(PushMessages);