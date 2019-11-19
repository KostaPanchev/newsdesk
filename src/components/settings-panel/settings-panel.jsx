import React, { Component } from 'react';
import styles from  './settings-panel.module.scss';
import Workbenches from '../workbencshes/workbenches';
import PropTypes from 'prop-types';
import Checkbox from '../common/inputs/checkbox/checkbox';
import { WarningIcon, CloseIcon } from '../../icons/icons';
import Loader from '../common/loader/loader';
import Btn from '../common/btn/btn';

import { connect } from 'react-redux';
import {
    initFilter,
    changeCustomFilter,
    updateUserSettings,
    resetUserSettings,
    updateFilterSettings,
    loadingAppData
} from '../../store/actions';


// import { maxPriority } from '../../app-defaults'; // !!!

class SettingsPanel extends Component {
    constructor(props){
        super(props);
        this.handleChangeCustomFilter = this.handleChangeCustomFilter.bind(this);
        this.handleChangeWorkbench = this.handleChangeWorkbench.bind(this);
        this.handleSaveChanges = this.handleSaveChanges.bind(this);
        this.handleResetSettings = this.handleResetSettings.bind(this);
        this.hendleOverlayClick = this.hendleOverlayClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.hadnleEscKey = this.hadnleEscKey.bind(this);
    }

    componentDidMount(){
        this.props.initFilter(this.props.userSettings, this.props.allCategories);
        window.addEventListener('keydown', this.hadnleEscKey, false);

    }


    handleChangeCustomFilter(e){
        e.preventDefault();
        let target = '';
        if(e.target.hasAttribute('data-categoryid')){
            target = e.target;
        } else {
            target = e.target.parentNode;
        }
        let category = {
            id: parseInt(target.dataset.categoryid, 10),
            title: target.dataset.categorytitle
            // maxPriority: maxPriority
        };

        this.props.changeCustomFilter(category);
        // console.log(category);
        let customFilter = [];
        if(category.id === -1) {
            customFilter = this.props.filterSettings.customFilter.map(item => {
                item.selected = true;
                return item;
            });
        } else if (category.id === 0){
            customFilter = this.props.filterSettings.customFilter.map(item => {
                item.selected = false;
                return item;
            });
        } else {
            customFilter = this.props.filterSettings.customFilter.map(item => {
                if(category.id === item.id){
                    item.selected = !item.selected;
                    return item;
                } else {
                    return item;
                }
            });
        }

        this.props.updateFilterSettings({customFilter});
    }


    handleChangeWorkbench(e){
        let target = '';
        if(e.target.hasAttribute('data-workbenchid')){
            target = e.target;
        } else {
            target = e.target.parentNode;
        }
        let workbench = {
            id: parseInt(target.dataset.workbenchid, 10),
            title: target.dataset.workbenchtitle
        };

        this.props.updateFilterSettings({workbench});
    }


    handleSaveChanges(){
        if(this.props.type === 'intro') {
            this.props.loadingAppData();
        }
        this.props.updateUserSettings(this.props.uuid, {...this.props.filterSettings});
        if(this.props.type === 'modal'){
            this.props.closeSettings();
        }
    }

    handleResetSettings(){
        if(window.confirm('Er du sikker på at du vil nulstille dine indstillinger til default?')){
            let post = {
                uuid: this.props.uuid,
                json: true,
                settings: null
            };
            this.props.resetUserSettings(post);
        }
    }

    hendleOverlayClick(e) {
        // if(this.props.overlay){
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            this.handleCancel();
        }
        // }
    }

    hadnleEscKey(evt) {
        if (evt.key === 'Escape') {
            this.handleCancel();
        }
    }

    handleCancel(){
        if(this.props.settingsChanged){
            if(window.confirm('Hvis du lukker vinduet nu, vil dine ændringer ikke blive gemt. Vil du lukke vinduet?')){
                this.props.cancelBtn();
            }
        } else {
            this.props.cancelBtn();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.hadnleEscKey, false);
    }

    render(){
        if(this.props.filterSettings) {
            let { 
                // showPosts,
                showDailyReport
                // weekDaysNumber 
            } = this.props.filterSettings;
            
            return(
                <div>
                    <div onClick={this.hendleOverlayClick} className={this.props.overlay ? styles.overlay : styles.panel}>
                        <div className={styles.inner}>
                            { this.props.cancelBtn && 
                            <span className={styles.closeBtn} onClick={this.handleCancel}>
                                <CloseIcon />
                            </span>
                            }
                            <div className={styles.body}>
                                <div className={styles.title}>Brugerindstillinger</div>
                                <div className={styles.additionalSettings}>
                                    <Checkbox checked={showDailyReport}
                                        name='user-settings__showDayliReports'
                                        id='user-settings__showDayliReports'
                                        onChange={() => this.props.updateFilterSettings({showDailyReport: !showDailyReport})}
                                        label={`Vis 'Overleveringer' både på en selvstændig side og samtidigt direkte under min publikationsplan`}/>
                                    {/* <li>
                                        <Checkbox checked={showPosts}
                                            name='user-settings__showPosts'
                                            id='user-settings__showPosts'
                                            onChange={() => this.props.updateFilterSettings({showPosts: !showPosts})}
                                            label='show posts'/>
                                    </li>
                                    <li>
                                        <label htmlFor='user-settings__weekDaysNumber'>weekDaysNumber:</label>
                                        <input type="number" value={weekDaysNumber}
                                            onChange={(e) => this.updateSettings({weekDaysNumber: e.target.value})}/>
                                    </li> */}
                                </div>
                                {this.props.filterSettings && 
                                <Workbenches
                                    workbenches={this.props.workbenches}
                                    userSettings={this.props.filterSettings}
                                    onChangeCustomFilter={this.handleChangeCustomFilter}
                                    onWorkbenchChange={this.handleChangeWorkbench}/> 
                                }
                                
                            </div>
                            
                            <div className={styles.footer}>
                                {this.props.performanceWarn &&
                                <div className={styles.performanceWarn}>
                                    <span className={styles.warningIcon}>
                                        <WarningIcon />
                                    </span>
                                    <p>{this.props.performanceWarn}</p>
                                </div>
                                }
                                <div className={styles.footerButtons}>
                                    <Btn text='Reset' color='secondary' onClick={this.handleResetSettings}/>
                                    <Btn text='Gem' onClick={this.handleSaveChanges}/>
                                </div>
    
                            </div>
                        </div>
                    
                    </div>
                </div>
            );
        } else {
            return <Loader />;
        }

    }
};

SettingsPanel.propTypes = {
    type: PropTypes.string.isRequired,
    updateUserSettings: PropTypes.func.isRequired,
    userSettings: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        uuid: state.appStore.user.uuid,
        performanceWarn: state.filterStore.performanceWarn,
        settingsChanged: state.filterStore.settingsChanged,
        filterSettings: state.filterStore.filterSettings,
        userSettings: state.appStore.userSettings,
        allCategories: state.appStore.allCategories,
        workbenches: state.appStore.workbenches
    };
};

const mapDispatchToProps = {
    initFilter,
    resetUserSettings,
    updateFilterSettings,
    changeCustomFilter,
    updateUserSettings,
    loadingAppData
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPanel);