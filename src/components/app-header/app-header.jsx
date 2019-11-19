import React  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

//components
import Loader from '../common/loader/loader';
import DatePicker from '../common/inputs/date-picker/date-picker';
import styles from './app-header.module.scss';

import { SettingsIcon, ExitIcon } from '../../icons/icons';

import {APIRoot, postsSectionName, dailyReportsSectionName, pushMessagesSectionName} from '../../app-defaults';


const exitLink = pathName => {
    const linkStart = 'https://jourbox.dk/logout?to=/login?to=/newsdesk';
    let link = '';
    if(pathName.includes('post')) {
        link = `${linkStart}/posts`;
    } else if (pathName.includes('dailyreports')) {
        link = `${linkStart}/dailyreports`;
    } else if (pathName.includes('pushmessages')) {
        link = `${linkStart}/pushmessages`; 
    }
    return link;
};

const ViewTitle = ({text}) => (
    <span className={styles.viewTitle}>
        {text}
    </span>
);

const AppHeader = (props) => {
    const categoriesList = props.categories.map(category => 
        <option key={category.id}
            value={category.id}>
            {category.title} {category.note && `| ${category.note}`}
        </option>
    );
    const Categories = () => <select value={props.routerInfo.categoryId}
        className={styles.categories}
        onChange={props.onChangeCategory}>
        {categoriesList}
    </select>;

    return(
        <header className={`${props.routerInfo.path === '/' ? styles.headerHome : styles.header} ${props.pageColor}`}>
            <a href={`${APIRoot}/newsdesk`}
                className={`${styles.logo} ${styles.lineAfter}`}>
                Newsdesk</a>
            {/* <Link to='/posts' className={`${styles.logo} ${styles.lineAfter}`}>Newsdesk</Link> */}
            <Route exact path="/" render={ () => <ViewTitle text={''} />} />
            <Route path="/posts" render={ () => <ViewTitle text={postsSectionName} />} />
            <Route path="/dailyreports" render={ () => <ViewTitle text={dailyReportsSectionName} />} />
            <Route path="/pushmessages" render={ () => <ViewTitle text={pushMessagesSectionName} />} />

            { props.fetchingData &&
                <Loader size='18px'
                    width='30px'
                    border='2px'
                    padding='0px'
                    color='#607D8B'/>
            } 
            <div className={`${styles.mainControls} ${styles.lineAfter}`}>
                <DatePicker name='datePicker' value={props.routerInfo.date} onChange={props.onChangeDate}/>
                <Route path="/posts/day" component={Categories} />
                <Route path="/posts/week" component={Categories} />
            </div>

            { props.userSettings.workbench &&
                <span className={`${styles.openWorkbenchesBtn}`}
                    onClick={props.openUserSettings}>
                    <SettingsIcon />
                    {props.userSettings.workbench.title}
                </span>
            }
            <span className={styles.user}>
                {props.userEmail || 'undefined'}
            </span>
            <a href={exitLink(props.routerInfo.path)}
                className={styles.exitLink} title='Log out'>
                <ExitIcon />
            </a>
        </header>
    );
};

AppHeader.propTypes = {
    pageColor: PropTypes.string.isRequired,
    openUserSettings: PropTypes.func.isRequired,
    onChangeCategory: PropTypes.func.isRequired,
    onChangeDate: PropTypes.func.isRequired,

    // from redux
    routerInfo: PropTypes.object.isRequired,
    fetchingData: PropTypes.bool.isRequired,
    userSettings: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    userEmail: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    return {
        routerInfo: state.appStore.routerInfo,
        fetchingData: state.appStore.fetchingData,
        userSettings: state.appStore.userSettings,
        categories: state.appStore.filteredCategories,
        userEmail: state.appStore.user.email
    };
};

const mapDispatchToProps = {
};


// export default AppHeader;

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);