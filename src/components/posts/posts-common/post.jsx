import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DeleteIcon, EditIcon } from '../../../icons/icons';
import Loader from '../../common/loader/loader';
import BigCard from './big-card/big-card';
import Form from './form/form';
import styles from './post.module.scss';

import {
    getPosts,
    updateNote,
    deletePost,
    cancelPostForm,
    dirtyPostFormHandler,
    submitPostForm
} from '../../../store/actions';


class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            editMode: this.props.editMode || false,
            isNoteOpen: false
        };
        this.toEditMode = this.toEditMode.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.handleCancelForm = this.handleCancelForm.bind(this);
        this.handleOpenNote = this.handleOpenNote.bind(this);
        this.handleCloseNote = this.handleCloseNote.bind(this);
        this.handleUpdateNote = this.handleUpdateNote.bind(this);
    }
    componentDidMount(){
        if(this.props.editMode){
            this.setState({editMode: true});
        }
    }

    toEditMode(){
        if(this.props.modalPost){
            this.props.dirtyPostFormHandler(true);
        }
        if(this.props.editMode){
        } else {
            this.setState({editMode:true});
        }
    }

    onSubmitForm(post, mode){
        // this.props.submitPostForm({post, mode});
        // this.props.submitForm(post, mode);
        this.setState({editMode: false});
    }

    handleCancelForm(){
        if(this.props.modalPost){
            this.props.cancelPostForm();
        }
        this.setState({editMode: false});
    }

    handleOpenNote(){
        this.setState({isNoteOpen: true});
    }

    handleCloseNote(){
        this.setState({isNoteOpen: false});
        this.props.getPosts();
    }

    handleUpdateNote(note){
        this.props.updateNote(note, this.props.post.id);
    }



    render(){
        const {
            post,
            marginBottom = '0'
        } = this.props;

        return (
            <div style={{marginBottom}} className={styles.post}>
                { (this.props.fetchingPosts &&  !this.state.editMode) && 
                    <div className={styles.loaderWrapper}>
                        <Loader size='35px' border='2px' padding='0px' width='80px'/>
                    </div>
                }
                <div className={styles.body}>
                    { this.state.editMode ? 
                        <Form post={post}
                            cancel={this.handleCancelForm}
                            onSubmitForm={this.onSubmitForm}
                            closeDayViewForm={this.props.closeDayViewForm}
                            mode={this.props.editMode ? 'create' : 'update'}/> :
                        <BigCard post={post}
                            isNoteOpen={this.state.isNoteOpen}
                            openNote={this.handleOpenNote}
                            closeNote={this.handleCloseNote}
                            updateNote={this.handleUpdateNote}/>
                    }
                </div>
                {!this.state.editMode && 
                <Fragment>
                    { !post.imported && 
                    <div className={styles.controls}>
                        <span onClick={this.toEditMode}
                            className={styles.controlsBtnEdit}>
                            Edit
                            <EditIcon />
                        </span>
                        <span onClick={() => this.props.deletePost(post.id)}
                            className={styles.controlsBtnDelete}>
                            Delete
                            <DeleteIcon />
                        </span>
                    </div>
                    }
                </Fragment>
                }
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    
    // redux
    getPosts: PropTypes.func.isRequired,
    updateNote: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    cancelPostForm: PropTypes.func.isRequired,
    dirtyPostFormHandler: PropTypes.func.isRequired,
    submitPostForm: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        fetchingPosts: state.postsStore.fetchingPosts,
        editMode: state.postsStore.newPostForm
    };
};

const mapDispatchToProps = {
    getPosts,
    updateNote,
    deletePost,
    cancelPostForm,
    dirtyPostFormHandler,
    submitPostForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);