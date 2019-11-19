import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { SettingsIcon, PinIcon, DefaultViewIcon, RssIcon } from '../../icons/icons';
import {postsSectionName, dailyReportsSectionName, pushMessagesSectionName} from '../../app-defaults';

import styles from './floating-buttons.module.scss';

const FloatingButtons = ({routerInfo, openUserSettings}) => {
    return (
        <div className={routerInfo.path === '/' ?  styles.wrapperHome : styles.wrapper  }>     
            <Link className={styles.postsBtn} to={{
                pathname: '/posts',
                search: `date=${routerInfo.date}`}}>
                <DefaultViewIcon/>
                <span className={styles.btnTooltip}>{postsSectionName}</span>
            </Link>
            <Link className={styles.daylyreportsBtn} to={{
                pathname: '/dailyreports',
                search: `date=${routerInfo.date}`}}>
                <PinIcon/>
                <span className={styles.btnTooltip}>{dailyReportsSectionName}</span>
            </Link>
            <Link className={styles.pushmessagesBtn} to={{
                pathname: '/pushmessages',
                search: `date=${routerInfo.date}`}}>
                <RssIcon/>
                <span className={styles.btnTooltip}>{pushMessagesSectionName}</span>
            </Link>
            <span className={styles.settingsBtn} onClick={openUserSettings}>
                <SettingsIcon />
                <span className={styles.btnTooltip}>Brugerindstillinger</span>
            </span>
        </div>
    );
};

FloatingButtons.propTypes = {
    routerInfo: PropTypes.object.isRequired,
    openUserSettings: PropTypes.func.isRequired
};

export default FloatingButtons;