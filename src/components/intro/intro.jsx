import React, { Component } from 'react';
import SettingsPanel from '../settings-panel/settings-panel';
import styles from './intro.module.scss';
import { CheckIcon, SettingsIcon } from '../../icons/icons';

class Intro extends Component {
    constructor(props){
        super(props);
        this.state = {
            startAnimation: false
        };
        this.openSettings = this.openSettings.bind(this);
        this.closeSettings = this.closeSettings.bind(this);
    }

    componentDidMount(){
        // window.setTimeout(() => {
        //     this.setState({startAnimation: true});
        // }, 2000);
    }

    openSettings(){
        this.setState({startAnimation: true});
    }

    closeSettings(){
        this.setState({startAnimation: false});
    }

    render(){
        let animated = this.state.startAnimation;
        return (
            <div className={`container ${ animated ? styles.wrapperAnimated : styles.wrapper}`}>
                <header className={ animated ? styles.headerAnimated : styles.header} onClick={this.closeSettings}>
                    <div className={styles.circleTop}>
                        { animated ? <CheckIcon /> : '1' }
                    </div>
                    <h1 className={styles.title}>Velkommen til Newsdesk</h1>
                    <p className={styles.intro}>Her kan du få et overblik over forskellige publikationsplaner på tværs af redaktioner i Jysk Fynske Medier.
    Kom godt igang og start med at vælge kategorierne her under i settings. </p>
                </header>
                <div className={ animated ? styles.bodyAnimated :  styles.body} onClick={this.openSettings}>
                    <div className={styles.circleBottom}>
                        { animated ? <SettingsIcon /> : '2' }
                    </div>
                    <div className={!animated ? styles.settingsOverlay : ''}></div>
                    <SettingsPanel type='intro'/>
                </div>
            </div>
        );
    }
};

export default Intro;