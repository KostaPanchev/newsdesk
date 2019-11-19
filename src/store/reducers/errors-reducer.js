import { ADD_ERROR, CLEAR_ERRORS } from '../actionTypes';

const initialState = {
    errors: []
};


const errorsReducer = (state = initialState, action) => {
    switch (action.type) {
    case ADD_ERROR:
        let errObj = {
            title: action.title,
            errors: action.errors
        };
        if( false ) {
            return state;
        } else {
            return {
                ...state,
                errors: state.errors.concat(errObj)
            };
        }

    case CLEAR_ERRORS:
        return {
            ...state,
            errors: []
        };

    default:
        return state;
    }
};

export default errorsReducer;