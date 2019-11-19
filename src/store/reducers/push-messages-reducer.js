import * as types from '../actionTypes';

const initialState = {
    pushMessages: [],
    fetchingpushMessages: false,
    notSupportedFilter: false
    // tablePostOpen: null,
    // newPostForm: false,
    // dirtyPostForm: false,
};

const pushMessagesReducer = (state = initialState, action) => {

    switch (action.type) {
    case types.FETCHING_PUSH_MESSAGES:
        return {
            ...state,
            fetchingpushMessages: action.value
        };


    case types.UPDATE_PUSH_MESSAGES:
        return {
            ...state,
            pushMessages: action.pushMessages
        };
    
    default:
        return state;
    }

};


export default pushMessagesReducer;