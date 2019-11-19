import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import styles from './post-note.module.scss';

class PostNoteForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            note: props.noteText || ''
        };
        this.textInput = React.createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
        this.closeNote = this.closeNote.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.emitChangeDebounced = debounce(this.emitChange, 250);
    }

    focusTextInput() {
        this.textInput.current.focus();
    }

    componentDidMount(){
        this.focusTextInput();
    }

    handleChange(e){
        this.setState({
            note: e.target.value
        });
        this.emitChangeDebounced(e.target.value);
    }

    emitChange(value) {
        this.props.updateNote(value);
    }

    closeNote(){
        if(this.state.note === ''){
            window.alert("Du kan ikke gemme en tom note");
        }
        this.props.closeNote();
    }


    render(){
        return(
            <textarea onChange={this.handleChange}
                className={styles.noteTextarea}
                ref={this.textInput}
                name="note"
                value={this.state.note}
                onBlur={this.closeNote}
            ></textarea>
        );
    }
}

export default PostNoteForm;