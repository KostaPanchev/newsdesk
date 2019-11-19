import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './posts.module.scss';
import Modal from '../common/modal/modal';
import DailyReports from '../daily-reports/daily-reports';
import DefaultView from './default-view/default-view';
import WeekView from './week-view/week-view';
import DayView from './day-view/day-view';
import Post from './posts-common/post';
import SectionWarning from '../common/section-warning/section-warning';
import PageNotFound from '../page-not-found/page-not-found';
import { postsFetchingInterval } from '../../app-defaults';
import { scrollToViewPosts } from '../../helpers';

// store
import { connect } from 'react-redux';
import {
    stopFetchingData,
    getPosts,
    closeTablePostHandler,
} from '../../store/actions';

class Posts extends Component {
    constructor(props){
        super(props);

        this.getPosts = this.getPosts.bind(this);
    }

    componentDidMount(){
        this.getPosts();
        this.getPostsInterval = window.setInterval(this.getPosts, postsFetchingInterval);
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.routerInfo.date !== prevProps.routerInfo.date || 
            this.props.routerInfo.categoryId !== prevProps.routerInfo.categoryId ||
            this.props.routerInfo.path !== prevProps.routerInfo.path
        ) {
            this.getPosts();
        }
        
        if (this.props.routerInfo.path !== prevProps.routerInfo.path) {
            scrollToViewPosts();
        }
    }

    getPosts(){
        this.props.getPosts();
    }

    componentWillUnmount(){
        clearInterval(this.getPostsInterval);
        this.props.stopFetchingData();
    }

    render(){
        const {
            posts,
            categories,
            routerInfo,
            user
        } = this.props;

        return(
            <section className={styles.postsSection}>
                {categories.length ? 
                    <Fragment>
                        {this.props.tablePostOpen && 
                        <Modal close={this.props.closeTablePostHandler}
                            controls={!this.props.dirtyPostForm}
                            confirmClose={this.props.dirtyPostForm}
                            padding='0'>
                            <Post modalPost={true} post={this.props.tablePostOpen}
                            />
                        </Modal>
                        }
                        <Switch>
                            <Route exact path="/posts" render={() => 
                                <DefaultView routerInfo={routerInfo}
                                    categories={categories}
                                    posts={posts} />
                            } />
    
                            <Route path="/posts/day/" render={() => 
                                <DayView routerInfo={routerInfo} posts={posts} /> 
                            } />
        
                            <Route path="/posts/week/" render={() => 
                                <WeekView routerInfo={routerInfo}
                                    weekDaysNumber={user.settings.weekDaysNumber}
                                    posts={posts} />
                            } />
                            <Route component={PageNotFound} />
                        </Switch>
                        { this.props.showDailyReport && 
                            <div className={styles.dailyReportsWrapper}>
                                <DailyReports />
                            </div>
                        } 
                    </Fragment> :
                    <SectionWarning
                        title='Du har valgt 0 kategorier!'
                        text='Du skal vælge mindst én kategori eller publikationsplan i "Settings" for at kunne se indhold.' />
                }
            </section>

        );
    }
};


Posts.propTypes = {
    routerInfo: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,

    // functions
    getPosts: PropTypes.func.isRequired,
    stopFetchingData: PropTypes.func.isRequired,
    closeTablePostHandler: PropTypes.func.isRequired
};


const mapStateToProps = state => {
    return {
        routerInfo: state.appStore.routerInfo,
        user: state.appStore.user,
        categories: state.appStore.filteredCategories,
        posts: state.postsStore.posts,

        showDailyReport: state.appStore.userSettings.showDailyReport,
        tablePostOpen: state.postsStore.tablePostOpen,
        dirtyPostForm: state.postsStore.dirtyPostForm
    };
};

const mapDispatchToProps = {
    getPosts,
    stopFetchingData,
    closeTablePostHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
