import React, { Component, Fragment, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import queryString from 'query-string';
import { formatDateISO, nextDay, prevDay } from '../helpers';
import styles from './newsdesk.module.scss';
// components
import { ArrowLeftIcon, ArrowRightIcon } from '../icons/icons';
import AppHeader from '../components/app-header/app-header';
import SettingsPanel from '../components/settings-panel/settings-panel';
import FloatingButtons from '../components/floating-buttons/floating-buttons';

// import Home from '../components/home/home';
// import Posts from '../components/posts/posts';
// import DailyReports from '../components/daily-reports/daily-reports';
// import PushMessages from '../components/push-messages/push-messages';
// import PageNotFound from '../components/page-not-found/page-not-found';

import LoaderMain from '../components/common/loader-main/loader-main';
// import Loader from '../components/common/loader/loader';
// store
import { connect } from 'react-redux';
import { changeAppStateTime, updateRouterInfo } from '../store/actions';

const Home = lazy(() => import('../components/home/home'));
const Posts = lazy(() => import('../components/posts/posts'));
const DailyReports = lazy(() => import('../components/daily-reports/daily-reports'));
const PushMessages = lazy(() => import('../components/push-messages/push-messages'));
const PageNotFound = lazy(() => import('../components/page-not-found/page-not-found'));


const getPageColor = (pathName) => {
    switch (pathName) {
    case '/': return 'homeColor';
    case '/posts': return 'defaultViewColor';
    case '/posts/': return 'defaultViewColor';
    case '/posts/day': return 'dayVewColor';
    case '/posts/day/': return 'dayVewColor';
    case '/posts/week': return 'weekViewColor';
    case '/posts/week/': return 'weekViewColor';
    case '/dailyreports': return 'dailyreportsColor';
    case '/dailyreports/': return 'dailyreportsColor';
    case '/pushmessages': return 'pushmessagesColor';
    case '/pushmessages/': return 'pushmessagesColor';
    default: return 'defaultViewColor';
    }
};


class Newsdesk extends Component {
    constructor(props){
        super(props);
        this.state = {
            showUserSettings: false,
        };
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleToggleUserSettings = this.handleToggleUserSettings.bind(this);

        // this.hadnleKeyClick = this.hadnleKeyClick.bind(this);
    }

    componentDidMount(){
        window.addEventListener('keydown', this.hadnleKeyClick, false);
        // this.props.updateSearchQuery(this.getSearchQuery());
        this.props.updateRouterInfo(this.getSearchQuery());
    }

    // hadnleKeyClick(evt){
    //     let date = queryString.parse(this.props.location.search).date;
    //     if(date) {
    //         if(evt.key === 'ArrowLeft'){
    //             this.handleUpdateDate(prevDay(date));
    //         } else if ( evt.key === 'ArrowRight') {
    //             this.handleUpdateDate(nextDay(date));
    //         } else {
    //             return;
    //         }
    //     } else {
    //         return;
    //     }
    // }

    handleToggleUserSettings(){
        this.setState({ showUserSettings: !this.state.showUserSettings });
    }

    handleUpdateDate(newDate){
        let search = queryString.parse(this.props.location.search);
        search.date = newDate;
        if(search.categoryId){
            this.props.history.push({
                search: `?date=${search.date}&categoryId=${search.categoryId}`
            });

        } else {
            this.props.history.push({
                search: `?date=${search.date}`
            });
        }
        this.props.changeAppStateTime();
    }

    handleChangeDate(e){
        this.handleUpdateDate(e.target.value);
    }

    handleChangeCategory(e){
        let search = queryString.parse(this.props.location.search);
        search.categoryId = e.target.value;
        if(search.date){
            this.props.history.push({
                search: `?date=${search.date}&categoryId=${search.categoryId}`,
                // pathname: '/odense'
            });

        } else {
            this.props.history.push({
                search: `?categoryId=${search.categoryId}`
            });

        }
        this.props.changeAppStateTime();
    }

    getSearchQuery(){
        let searchQuery = queryString.parse(this.props.location.search) || {};
        let categoryId =  this.props.filteredCategories.legth ? this.props.filteredCategories[0].id : null;
        let date = formatDateISO(new Date());

        if( Object.prototype.hasOwnProperty.call(searchQuery, 'categoryId') ){
            categoryId = searchQuery.categoryId;
        }
        if( Object.prototype.hasOwnProperty.call(searchQuery, 'date') ){
            date = searchQuery.date;
        }

        searchQuery.categoryId = categoryId;
        searchQuery.date = date;
        searchQuery.path = this.props.location.pathname;

        return searchQuery;
    }


    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if ( this.props.appStateChangedAt !== prevProps.appStateChangedAt ||
            this.props.location.pathname !== prevProps.location.pathname )  {
            this.props.updateRouterInfo(this.getSearchQuery());
        }
    }


    componentWillUnmount() {
        window.removeEventListener('keydown', this.hadnleKeyClick, false);
    }

    render() {
        const {
            routerInfo,
            updatingUserSettings
        } = this.props;
        const path = routerInfo.path;
        const pageColor = getPageColor(path);

        return (
            <Fragment>
                <AppHeader pageColor={pageColor}
                    openUserSettings={this.handleToggleUserSettings} 
                    onChangeCategory={this.handleChangeCategory}
                    onChangeDate={this.handleChangeDate}/>
                {path !== '/' &&
                    <Fragment>
                        <div className={`${styles.prevBtn} ${pageColor}`}
                            onClick={() => this.handleUpdateDate(prevDay(routerInfo.date)) }>
                            <ArrowLeftIcon />
                            {/* <span className={styles.prevBtnTooltim}>prevBtn</span> */}
                        </div>
                        <div className={`${styles.nextBtn} ${pageColor}`}
                            onClick={() => this.handleUpdateDate(nextDay(routerInfo.date)) }>
                            <ArrowRightIcon />
                            {/* <span className={styles.nextBtnTooltim}>nextBtn</span> */}
                        </div>
                    </Fragment>
                }
                { updatingUserSettings ? 
                    <div className={styles.userSettingsLoader}>
                        <LoaderMain backgroundColor={pageColor}/>
                    </div> :
                    <div className={styles.appBody}>
                        { this.state.showUserSettings && 
                            <SettingsPanel overlay={true}
                                type='modal'
                                cancelBtn={this.handleToggleUserSettings}
                                closeSettings={this.handleToggleUserSettings} />
                        }
                        <Suspense 
                            fallback={<div className={styles.pageTransitionLoader}>
                                <LoaderMain backgroundColor={pageColor}/>
                            </div>} >
                            <Switch>
                                <Route exact path="/" render={() => <Home />}/>
                                <Route path="/posts" render={() => <Posts />} />
                                <Route path="/dailyreports"render={() => <DailyReports /> } />
                                <Route path="/pushmessages"render={() => <PushMessages />} />
                                <Route render={() => <PageNotFound />} />
                            </Switch>
                        </Suspense>
                    </div> 
                }
                <FloatingButtons routerInfo={routerInfo} openUserSettings={this.handleToggleUserSettings}/>
            </Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        routerInfo: state.appStore.routerInfo,
        filteredCategories: state.appStore.filteredCategories,
        updatingUserSettings: state.appStore.updatingUserSettings,
        appStateChangedAt: state.appStore.appStateChangedAt,
    };
};

const mapDispatchToProps = {
    changeAppStateTime,
    updateRouterInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Newsdesk);
