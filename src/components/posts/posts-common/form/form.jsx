import React, { Component } from 'react';
import PropTypes from 'prop-types';
import postStyles from '../post.module.scss';
import styles from './form.module.scss';

import { formatDateISO, getDisplayTime } from '../../../../helpers';
import TextInput from '../../../common/inputs/text-input/text-input';
import SelectInput from '../../../common/inputs/select-input/select-input';
import IconOptiosn from './icon-options';
import Btn from '../../../common/btn/btn';
//store
import { connect } from 'react-redux';
import { maxPriority } from '../../../../app-defaults';

import {
    submitPostForm
} from '../../../../store/actions';


class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            category_id: '',
            date: '',
            time: '',
            title: '',
            description: '',
            byline: '',
            format: '',
            length: '',
            locked: 16,
            priority: '',
            social: [],
            equipment: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeOption = this.handleChangeOption.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmitBtn = this.handleSubmitBtn.bind(this);
    }

    componentDidMount(){
        if(this.props.post){
            let {
                category_id = '',
                published = new Date(),
                title = '',
                description =  '',
                byline = '',
                format = '',
                length = '',
                locked = 16,
                priority = '',
                social = [],
                equipment = []
            } = this.props.post;

            this.setState({
                category_id: category_id || '',
                date: formatDateISO(published),
                time: getDisplayTime(published),
                title,
                description,
                byline,
                format: format.id || '',
                length: length.id || '',
                locked: locked.id || '',
                priority: priority.id || '',
                social,
                equipment
            });
        }
    }

    handleInputChange(event) {
        // this.props.onFormChanges();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }

    handleChangeOption(type, id){
        let values = [...this.state[type]];

        if(values.includes(id)){
            let i = values.indexOf(id);
            values.splice(i, 1);
        } else {
            values.push(id);
        }

        this.setState({
            [type]: values
        });
        // this.props.onFormChanges();
    }

    handleSubmit(event){
        event.preventDefault();
        const post = {
            json: true
        };
        post.date = `${this.state.date} ${this.state.time}`;
        post.category_id = this.state.category_id;
        post.title = this.state.title;
        post.description = this.state.description;
        post.byline = this.state.byline;
        let postOptions = {
            format: parseInt(this.state.format, 10) || '',
            length: parseInt(this.state.length, 10) || '',
            locked: parseInt(this.state.locked, 10) || '',
            priority: parseInt(this.state.priority, 10) || '',
            social: this.state.social,
            equipment: this.state.equipment
        };
        post.options = postOptions;
        if(this.props.mode === 'update'){
            post.id = this.props.post.id;
        }

        this.props.submitPostForm({
            post,
            mode: this.props.mode
        });
        this.props.onSubmitForm();
    }

    handleSubmitBtn(){
        this.formRef.current.submit();
    }

    handleCancel(){
        this.props.cancel();
    }

    render(){
        let {
            format = [],
            length = [],
            locked = [],
            priority = [],
            social = [],
            equipment = []

        } = this.props.postOptions;

        const categoriesList = this.props.categories.map(category =>
            <option key={category.id} value={category.id}>{category.title}</option>
        );

        let curCategory = this.props.categories.find(category => category.id === this.props.post.category_id);

        let prioMax = curCategory.prio_max || maxPriority;
        let prioMin = curCategory.prio_min || 1;

        let prioFilterPriority = priority.filter(prio => {
            let value = parseInt(prio.value, 10);
            return value >= prioMin && value <= prioMax;
        });
        

        return(
            <form  action="" onSubmit={this.handleSubmit} className={styles.form}>
                <div className={styles.header}>
                    <input type="time"
                        name='time'
                        onChange={this.handleInputChange}
                        value={this.state.time} required/>

                    <input type="date"
                        name="date"
                        onChange={this.handleInputChange}
                        value={this.state.date}
                        required/>

                    <select name="category_id"
                        value={this.state.category_id}
                        onChange={this.handleInputChange}
                        required>
                        <option  value=''></option>
                        {categoriesList}
                    </select>
                </div>
                <div className={postStyles.postInner}>
                    <div className={`${postStyles.postMainInfo} ${styles.mainInfo}`}>
                        <TextInput  type='text'
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            name='title'
                            label='Rubrik'
                            placeholder=''
                            minLength={3}
                            maxLength={100}
                            required/>

                        <TextInput type='textarea'
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            name='description'
                            label='Beskrivelse'
                            placeholder=''
                            required
                            maxLength={500}/>

                        <TextInput  type='text'
                            value={this.state.byline}
                            onChange={this.handleInputChange}
                            name='byline'
                            label='Byline'
                            placeholder='F.eks. John Doe, jd@jfmedier.dk'
                            maxLength={50}/>    
                    </div>

                    <div className={`${postStyles.postOptions} ${styles.options}`}>
                        <SelectInput options={format}
                            value={this.state.format}
                            name='format'
                            label='Format'
                            // placeholder='Format'
                            onChange={this.handleInputChange}/>

                        <SelectInput options={length}
                            value={this.state.length}
                            name='length'
                            label='Længde'
                            // placeholder='Length'
                            onChange={this.handleInputChange}/>

                        <SelectInput options={locked}
                            value={this.state.locked}
                            name='locked'
                            label='Låst'
                            // placeholder='Locked'
                            onChange={this.handleInputChange}/>

                        <SelectInput options={prioFilterPriority}
                            value={this.state.priority}
                            name='priority'
                            label='Prioritet'
                            required
                            // placeholder='Priority'
                            onChange={this.handleInputChange}/>

                        <div className={styles.iconOptions}>
                            <IconOptiosn
                                name='social'
                                onChange={this.handleChangeOption}
                                active={this.state.social}
                                options={social}
                                title='Sociale kanaler'/>

                            <IconOptiosn
                                name='equipment'
                                onChange={this.handleChangeOption}
                                active={this.state.equipment}
                                options={equipment}
                                title='Udstyr'/>

                        </div>


                        <div className={styles.buttons}>
                            <Btn text='Annuller'
                                color='secondary'
                                onClick={this.handleCancel}/>
                            <Btn type='submit' text='Gem' />
                        </div>
                    </div>

                </div>

            </form>
        );
    }
}

Form.propTypes = {
    categories: PropTypes.array.isRequired,
    mode: PropTypes.oneOf(['create', 'update']).isRequired,
    onSubmitForm: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    postOptions: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,

    // redux
    submitPostForm: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        postOptions: state.appStore.postOptions,
        categories: state.appStore.filteredCategories

    };
};

const mapDispatchToProps = {
    submitPostForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);






