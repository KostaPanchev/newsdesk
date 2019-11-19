import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import IsNotChrome from './components/is-not-chrome/is-not-chrome';
import Intro from './components/intro/intro';
import Newsdesk from './newsdesk/newsdesk';
import AppLoader from './components/app-loader/app-loader';
import Errors from './components/common/errors/errors';


// store
import { connect } from 'react-redux';
import {getInitailAppData, clearErrors } from './store/actions';

import { basename } from './app-defaults';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            isChrome: false,
            testing: false
        };
    }

    componentDidMount(){
        var isChrome = !!window.chrome;
        if (isChrome) { 
            this.setState({isChrome: true});
            this.uuid = document.getElementById('uuid').value;
            this.props.getInitailAppData(this.uuid);
        } else {
            this.setState({isChrome: false});
        }
        if(document.getElementById('api')){
            if(document.getElementById('api').value !== 'https://jourbox.dk'){
                this.setState({
                    testing: true
                });
            }
        }
    }

    render() {
        let errors = null;
        if (this.props.errors.length) {
            errors = <Errors errors={this.props.errors}
                clearErrors={this.props.clearErrors}/>;
        }
        if(!this.state.isChrome) {
            return <IsNotChrome />;
        // } else if (this.props.user && !this.props.loadingUser) {
        } else if (this.props.appDataReady) {
            return (
                <Fragment>
                    {this.state.testing && 
                        <div style={{
                            padding: '.5rem 2rem',
                            backgroundColor: 'red',
                            color: '#fff',
                            position: 'fixed',
                            bottom: '.5rem',
                            left: '.5rem',
                            borderRadius: '.5rem',
                            zIndex: '9999999'
            
                        }}> TEST SERVER!!! </div>}
                    { this.props.newUser ? 
                        <Intro updateUserSettings={this.updateUserSettings}
                            userSettings={this.props.userSettings} /> :
                        <Router basename={basename}>
                            <Route render={(routerProps) => <Newsdesk {...routerProps}/>}  />
                        </Router>
                    }
                    { errors }
                    
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <AppLoader />
                    {errors}
                </Fragment>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        appDataReady: state.appStore.appDataReady,
        // user: state.appStore.user,
        newUser: state.appStore.newUser,
        loadingUser: state.appStore.loadingUser,
        errors: state.errorsStore.errors
    };
};

const mapDispatchToProps = {
    getInitailAppData,
    clearErrors
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
