import React from 'react';
import styles from './is-not-chrome.module.scss';

const IsNotChrome = () => (
    <div className='container'>
        <div className={styles.inner}>
            <div>Newdesk skal åbnes i Google Chrome</div>
            <div>
                <a className={styles.downloadBtn}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.google.com/chrome/">
                    Hent Chrome
                </a>
            </div>
        </div>
        
    </div>
);

export default IsNotChrome;