import React from 'react';
import styles from './home.module.scss';

const Home = () => (
    <div className={styles.homePage}>
        <h1 className={styles.title}>Newsdesk</h1>
        {/* <div className={styles.adnimationWrapper}>
        Newsdesk 2.0 for 
            <div class={styles.droppingTexts}>
                <div>Journalists</div>
                <div>Project Managers</div>
                <div>Coders</div>
                <div>EVERYONE!</div>
            </div>
        </div> */}
    </div>
);

export default Home;