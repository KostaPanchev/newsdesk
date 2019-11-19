import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './list-item.module.scss';
import { formatTime } from '../../../helpers';
import Form from '../posts-common/form/form';
import Post from '../posts-common/post';
import AddPostBtn from '../posts-common/add-post-btn/add-post-btn';

class ListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            isNewFormOpen: false
        };
        this.openForm = this.openForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }
    openForm(){
        this.setState({isNewFormOpen: true});
    }
    closeForm(){
        this.setState({isNewFormOpen: false});
    }
    render(){
        const {time, posts, routerInfo} = this.props;
        const sortedPosts = [...posts].sort((a, b) => {
            return new Date(a.published).getTime() - new Date(b.published).getTime();
        });
        const postsList = sortedPosts.map(post => 
            <Post key={post.id}
                modalPost={false}
                post={post}
                marginBottom='1em'/>
        );
        return (
            <li className={styles.timelineItem}>
                <span id={`posts-row-${time}`}
                    className={styles.time}>
                    {formatTime(time)}
                </span>
                <div className={styles.body}>
                    <ul className={styles.cardsList}>
                        {postsList}
                    </ul>
                    
                    { this.state.isNewFormOpen ? 
                        <Form onSubmitForm={this.closeForm}
                            cancel={this.closeForm}
                            post={{
                                published: `${routerInfo.date} ${formatTime(time)}`,
                                category_id: parseInt(routerInfo.categoryId, 10)
                            }}
                            mode='create'/> :
                        <AddPostBtn onClick={this.openForm}/>
                    }
                </div>
            </li>
        );
    }
}

ListItem.propTypes = {
    time: PropTypes.number.isRequired,
    routerInfo: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
};

export default ListItem;