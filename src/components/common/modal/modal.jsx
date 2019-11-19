import React, { Component } from 'react';
import styles from './modal.module.scss';

import PropTypes from 'prop-types';
import Loader from '../loader/loader';
import { CloseIcon } from '../../../icons/icons';


class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalClass: 'overlay'
        };
        this.hendleOverlayClick = this.hendleOverlayClick.bind(this);
        this.hadnleEscKey = this.hadnleEscKey.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    componentDidMount() {
        window.setTimeout(() => {
            this.setState({
                modalClass: 'overlayActive'
            });
        }, 10);
        window.addEventListener('keydown', this.hadnleEscKey, false);
    }

    hadnleEscKey(evt) {
        if (evt.key === 'Escape') {
            this.handleClose();
        }
    }

    hendleOverlayClick(e) {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            this.handleClose();
        }
    }

    handleClose() {
        let confirmMessage = this.props.confirmMessage || 'Ændringer vil ikke blive gemt. Ønsker du at lukke vinduet?';
        if (this.props.confirmClose) {
            if (window.confirm(confirmMessage)) {
                this.setState({
                    modalClass: 'overlay'
                });
                window.setTimeout(() => {
                    this.props.close();
                }, 300);
            }
        } else {
            this.setState({
                modalClass: 'overlay'
            });
            window.setTimeout(() => {
                this.props.close();
            }, 300);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.hadnleEscKey, false);
    }

    render() {
        let {
            padding = '1em' 
        } = this.props;
        return (
            <div className={styles[this.state.modalClass]} onClick={this.hendleOverlayClick}>
                <div className={this.props.big ? styles.modalBig : styles.modal}>
                    {this.props.title && 
                        <header className={styles.header}>
                            <span className={styles.headerTitle}>{ this.props.title }</span>
                            {this.props.fetching && <Loader size='22px' width='50px' border='2px' padding='0px' />}
                        </header>
                    }
                    
                    <div style={{padding: padding}}  className={`${styles.body} force-show-scrollbars`}>
                        {this.props.children}
                    </div>
                    {this.props.controls &&
                        <footer className={styles.footer}>
                            <span onClick={this.handleClose}
                                className={styles.closeBtn}>
                                {this.props.closeBtnTxt || <CloseIcon />}
                            </span>
                        </footer>
                    }
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    big: PropTypes.bool,
    confirmClose: PropTypes.bool,
    confirmMessage: PropTypes.string,
    controls: PropTypes.bool,
    close: PropTypes.func.isRequired,
    closeBtnTxt: PropTypes.string,
    title: PropTypes.string,
    confirm: PropTypes.func,
    cancel: PropTypes.func
};

export default Modal;