import * as types from '../actionTypes';

const initialState = {
    posts: [],
    fetchingPosts: false,
    postsLoaded: false,
    
    tablePostOpen: null,
    newPostForm: false,
    dirtyPostForm: false,
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
    case types.FETCHING_POSTS:
        return {
            ...state,
            fetchingPosts: action.value
        };

    case types.POSTS_LOADED:
        return {
            ...state,
            postsLoaded: true
        };

    case types.UPDATE_POSTS:
        return {
            ...state,
            posts: action.posts
        };

    case types.OPEN_TABLE_POST:
        return {
            ...state,
            tablePostOpen: action.post
        };

    case types.CLOSE_TABLE_POST:
        return {
            ...state,
            tablePostOpen: null
        };
    
    case types.IS_NEW_POST_FORM:
        return {
            ...state,
            newPostForm: action.val
        };

    case types.IS_DIRTY_POST_FORM:
        return {
            ...state,
            dirtyPostForm: action.val
        };
    
    default:
        return state;
    }
};

export default postsReducer;