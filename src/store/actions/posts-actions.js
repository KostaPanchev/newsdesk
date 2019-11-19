import * as types from '../actionTypes';

import { addError, stopFetchingData, startFetchingData} from './index.js';
import * as DB from '../db/db-api';
import { scrollToViewPosts } from '../../helpers';

class Post {
    constructor(post){
        this.id = post.id;
        this.title = post.title;
        this.description = post.description;
        this.published = post.published;
        this.created = post.created;
        this.midified = post.midified;
        this.byline = post.byline;
        this.creator = post.creator;
        this.categories = post.categories;
        this.post_categories = post.post_categories;
        this.is_author = post.is_author;
        this.category_id = post.category_id;
        this.url = post.url;
        this.article_type = post.article_type;
        this.primary_part = post.primary_part;
        this.image_count = post.image_count;
        this.original_keyword = post.original_keyword;
        this.original_keyword_path = post.original_keyword_path;
        this.primary_site = post.primary_site;
        this.image = post.image;
        this.equipment = post.equipment;
        this.format = post.format;
        this.length = post.length;
        this.default = post.default;
        this.social = post.social;
        this.priority = post.priority;
        this.status = post.status;
        this.locked = post.locked;
        this.datetime = post.datetime;
        this.is_published = post.is_published;
        this.imported = (post.creator.uuid === 'Importer' || post.creator.uuid === 'Importer Kodus 2') ? true : false;
        this.note = post.note;
    }
}


// action creators
export const fetchingPosts = bool => ({type: types.FETCHING_POSTS, value: bool});

export const postsLoaded = () => ({type: types.POSTS_LOADED});

export const updatePosts = (posts = []) => ({type: types.UPDATE_POSTS, posts});

export const newPostFormHandler = val => ({type: types.IS_NEW_POST_FORM, val});

export const dirtyPostFormHandler = val => ({type: types.IS_DIRTY_POST_FORM, val});

export const openTablePost = post => ({type: types.OPEN_TABLE_POST, post});

export const closeTablePost = () => ({type: types.CLOSE_TABLE_POST});

//======================================



export const openTablePostHandler = ({post, newForm}) => dispatch => {
    if(newForm){
        dispatch(dirtyPostFormHandler(true));
    }
    dispatch(openTablePost(post));
    dispatch(newPostFormHandler(newForm));
};

export const closeTablePostHandler = () => dispatch => {
    dispatch(closeTablePost());
    dispatch(dirtyPostFormHandler(false));
    dispatch(newPostFormHandler(false));
};


const handleFetchedPostsData = (errTitle, {data, errors}, filter=false) => {
    return((dispatch, getState) => {
        // console.log('handleFetchedPostsData', data);
        dispatch(fetchingPosts(false));
        dispatch(stopFetchingData());
        if(!getState().postsStore.postsLoaded){
            scrollToViewPosts();
        }
        if(!data){ 
            dispatch(addError(`post-actions.jsx, ${errTitle}`, errors));
            dispatch(postsLoaded());
            dispatch(updatePosts([]));
           
        } else {
        // **********************************************

            /// filter posts by priority (if filter)
            let filteredPosts = [];
            if(filter){
                filteredPosts = data.filter(post => {
                    const postPriority = post.priority.value;
                    return (
                        postPriority <= filter.prioMax &&
                    postPriority >= filter.prioMin
                    );
                });
            } else {
                filteredPosts = [...data];
            }


            let posts = [];
            filteredPosts.forEach(post => {
                posts.push(new Post(post));
            });

            // if(filter){
            //     // filter posts by prioryty
            //     posts = data.filter(post => {
            //         const postPriority = post.priority.value;
            //         return (
            //             postPriority <= filter.prioMax &&
            //             postPriority >= filter.prioMin
            //         );
            //     });
            // }
            // let posts = posts.map(post => {
            //     // adds importer key to post
            //     let imported = false;
            //     if(post.creator.uuid === 'Importer' || post.creator.uuid === 'Importer Kodus 2'){
            //         imported = true;
            //     }
            //     let newPost = Object.assign(
            //         post,
            //         {
            //         // published: post.published,
            //             imported
            //         }
            //     );
            //     return newPost;
            // });

            // **********************************************
            dispatch(updatePosts(posts));
            dispatch(postsLoaded());        
        }
    });  
};

export const getPosts = () => (dispatch, getState) => {
    // console.log('getPosts()');
    // dispatch(updatePosts([]));
    const { user, routerInfo, filteredCategories} = getState().appStore;
    switch (routerInfo.path) {
    case '/posts':
        dispatch(getPostsDefault({user, routerInfo}));
        break;
    case '/posts/day':
        dispatch(getPostsByCategory({user, useInterval: false, routerInfo, filteredCategories}));
        break;
    case '/posts/week':
        dispatch(getPostsByCategory({user, useInterval: true, routerInfo, filteredCategories}));
        break;
    default: 
        dispatch(getPostsDefault({user, routerInfo}));
        break;
    }
};


export const getPostsDefault = ({user, routerInfo}) => {
    return (async (dispatch) => {
        dispatch(fetchingPosts(true));
        dispatch(startFetchingData());
        
        const date = routerInfo.date;
        const workbenchId = user.settings.workbench.id;

        if(workbenchId === 0){
            const json = await DB.getAllPosts(date, user.uuid);
            dispatch(handleFetchedPostsData('getAllPosts', json));
        } else if (workbenchId === -1){
            let  filteredCategories = [];
            if(user.settings.customFilter.length){
                let filtered = user.settings.customFilter.filter(category => category.selected);
                filteredCategories = filtered.map(category => category.id);
            }
            const json = await DB.getFilteredPosts(date, user.uuid, filteredCategories);
            dispatch(handleFetchedPostsData('getFilteredPosts', json));
        } else {
            const props = {
                id: workbenchId,
                date,
                uuid: user.uuid
            };
            const json = await DB.getPostsByWorkbench(props);
            dispatch(handleFetchedPostsData('getPostsByWorkbench', json));
        }
    });
};

export const getPostsByCategory = ({user, useInterval, routerInfo, filteredCategories}) => {
    const selectedCategory = filteredCategories.find(category => parseInt(category.id) === parseInt(routerInfo.categoryId));
    let filter = {
        prioMin: selectedCategory.prio_min,
        prioMax: selectedCategory.prio_max
    };
    return(async (dispatch) => {
        let interval = 0;
        if(useInterval){
            interval = user.settings.weekDaysNumber - 1;
        }

        dispatch(fetchingPosts(true));
        dispatch(startFetchingData());
        const props = {
            id: routerInfo.categoryId,
            date: routerInfo.date,
            uuid: user.uuid,
            interval: interval
        };
        const json = await DB.getPostsByCategory(props);
        dispatch(handleFetchedPostsData('getPostsByCategory', json, filter));
    });
};

export const cancelPostForm = () => {
    return((dispatch, getState) => {
        const { newPostForm } = getState().postsStore;
        if(newPostForm){
            dispatch(closeTablePost());
            dispatch(newPostFormHandler(false));
            dispatch(dirtyPostFormHandler(false));
        } else {
            dispatch(dirtyPostFormHandler(false));
        }
    });
};

export const submitPostForm = ({post, mode}) => {
    return (async (dispatch, getState) => {
        const store = getState();
        const { user, routerInfo } = store.appStore;
        const {tablePostOpen} = store.postsStore;

        post.uuid = user.uuid;
        if(mode === 'create'){
            if(tablePostOpen){
                dispatch(closeTablePost());
            }
            const {data, errors} = await DB.createPost(post);
            if(errors){
                dispatch(addError(`post-actions.jsx, DB.createPost`, errors));
            } else {
                dispatch(getPosts());
                dispatch(newPostFormHandler(false));
                dispatch(dirtyPostFormHandler(false));
                if(routerInfo.path !== '/posts/day'){
                    dispatch(openTablePost(data));
                } else {
                    dispatch(closeTablePost());
                }
                    
            }
        } else {
            const {data, errors} = await DB.updatePost(post);
            if(errors){
                dispatch(addError(`post-actions.jsx, DB.updatePost`, errors));
            } else {
                dispatch(getPosts());
                if(routerInfo.path !== '/posts/day'){
                    dispatch(openTablePost(data));
                }
            }
        }
        dispatch(dirtyPostFormHandler(false));
    });
};

export const deletePost = (id) => {
    return (async (dispatch, getState) => {
        const {user} = getState().appStore; 
        let post = {
            id,
            uuid: user.uuid,
            json: true,
        };
        if (window.confirm(`Vil du slette denne?`)) {
            const {data, errors} = await DB.deletePost(post);
            if(errors){
                dispatch(addError(errors));
            } else {
                dispatch(getPosts());
                dispatch(closeTablePost());
                dispatch(newPostFormHandler(false));
            }
        }
    });

};


export const updateNote = (noteText, postId) => {
    return (async (dispatch, getState) => {
        const store = getState();
        const { user } = store.appStore;
        const { tablePostOpen } = store.postsStore;
        const post = {
            post_id: postId,
            uuid: user.uuid,
            note: noteText,
            json: true
        };
        
        const {data, errors} = await DB.updatePostNote(post);
        if(tablePostOpen){
            const note = {
                note: noteText,
                // last_edited: 'For et øjeblik siden af mig'
                last_edited: null
            };
            const newPostData = {
                ...tablePostOpen,
                note
            };
            dispatch(openTablePost(newPostData));
            // this.setState({tablePostOpen: newPostData});
        }
        if(errors){
            dispatch(addError(`post-actions.jsx, DB.updatePostNote`, errors));
        }
    });

};