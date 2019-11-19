import React, { Component } from 'react';
import * as DB from '../../store/db/db-api';
import PropTypes from 'prop-types';
import { dailyReportsFetchingInterval } from '../../app-defaults';
import SectionWarning from '../common/section-warning/section-warning';

import Report from './report/report';
// store
import { connect } from 'react-redux';
import { addError, startFetchingData, stopFetchingData } from '../../store/actions';

class DailyReports extends Component {
    constructor(props){
        super(props);
        this.state = {
            reports: [],
            editing: null
        };
        this.startInterval = this.startInterval.bind(this);
        this.getReports = this.getReports.bind(this);
        this.updateReport = this.updateReport.bind(this);
        this.apllyEditMode = this.apllyEditMode.bind(this);
        this.triggerLock = this.triggerLock.bind(this);
    }

    componentDidMount(){
        this.getReports();
        this.startInterval();
    }

    startInterval(){
        this.getReportsInterval = window.setInterval(this.getReports, dailyReportsFetchingInterval);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if ( this.props.routerInfo.date !== prevProps.routerInfo.date || 
            this.props.user.settings.workbench.id !== prevProps.user.settings.workbench.id ||
            this.props.routerInfo.path !== prevProps.routerInfo.path )  {
            this.getReports();
            this.apllyEditMode(null);
        }
    }

    getReports(){
        this.props.startFetchingData();
        let categories = this.props.categories.map(category => category.id);
        let props = {
            uuid: this.props.user.uuid,
            date: this.props.routerInfo.date,
            categories: categories

        };
        DB.getDailyReports(props)
            .then(({data, errors}) => {
                if(errors){
                    this.props.addError(`daily-reports.js, DB.getDailyReports`, errors);
                    this.setState({reports: []});
                } else {
                    if(data){
                        this.setState({reports: data});
                    } else {
                        this.setState({reports: []});
                    }
                    // console.log(data);
                }
                this.props.stopFetchingData();
            });
    }

    updateReport(categoryId, content){
        let post = {
            json: true,
            uuid: this.props.user.uuid,
            category_id: categoryId,
            date: this.props.routerInfo.date,
            trigger_lock: true,
            content
        };
        DB.updateDailyReport(post)
            .then(({data, errors}) => {
                if(errors){
                    this.props.addError(`daily-reports.js, DB.updateDailyReport`, errors);
                } else {
                    this.setState({editing: data});
                }
            });
    }

    triggerLock(id, locked = false){
        let post = {
            json: true,
            uuid: this.props.user.uuid,
            id: parseInt(id, 10),
            trigger_lock: locked,

        };
        
        DB.triggerLock(post).then(({data, errors}) => {
            if(errors){
                this.props.addError(`daily-reports.js, DB.triggerLock`, errors);
            } else {
                // console.log(data);
            }
        });
    }

    apllyEditMode(report){
        if(report){
            // clearInterval(this.getReportsInterval);
            // if(report.id && this.state.editing){    
            //     if(report.id !== this.state.editing.id){
            //         this.triggerLock(this.state.editing.id, false);
            //         this.triggerLock(report.id, true);
            //     }
            // } 
            // if (report.id && !this.state.editing) {
            //     this.triggerLock(report.id, true);
            // }
            if(this.state.editing){
                if(this.state.editing.id) {
                    this.triggerLock(this.state.editing.id, false);
                }
            } else {
                if(report.id){
                    this.triggerLock(report.id, true);
                }
            }
        } else {
            if(this.state.editing){
                if(this.state.editing.id) {
                    this.triggerLock(this.state.editing.id, false);
                }
            }
            // this.startInterval();
            // if(this.state.editing.category.id){
            //     this.triggerLock(this.state.editing.id, false);
            // }
        }
        
        if (report === null || this.state.editing){
            window.setTimeout(() => {
                this.getReports();
            }, 1000);
        }
        

        this.setState({editing: report});
    }

    componentWillUnmount(){
        clearInterval(this.getReportsInterval);
        this.props.stopFetchingData();
    }


    render(){
        if(this.state.reports){
            let reportsList = this.state.reports.map(report => {
                return (
                    <Report key={`${report.category.id}-${this.props.routerInfo.date}`}
                        editing={this.state.editing}
                        apllyEditMode={this.apllyEditMode}
                        report={report}
                        updateReport={this.updateReport} />
                );
            });
            return (
                <div className='container'>
                    {this.props.categories.length ? reportsList : 
                        <SectionWarning
                            title='Du har valgt 0 kategorier!'
                            text='Du skal vælge mindst én kategori eller publikationsplan i "Settings" for at kunne se indhold.'
                        />                   
                    }
                </div>
            );
        }
    }
}

DailyReports.propTypes = {
    user: PropTypes.object.isRequired,
    routerInfo: PropTypes.object.isRequired,
    appStateChangedAt: PropTypes.number,
    fetchingData: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,

    // methods
    addError: PropTypes.func.isRequired,
    startFetchingData: PropTypes.func.isRequired,
    stopFetchingData: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.appStore.user,
        routerInfo: state.appStore.routerInfo,
        appStateChangedAt: state.appStore.appStateChangedAt,
        fetchingData: state.appStore.fetchingData,
        categories: state.appStore.filteredCategories
    };
};

const mapDispatchToProps = {
    addError,
    startFetchingData,
    stopFetchingData
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyReports);