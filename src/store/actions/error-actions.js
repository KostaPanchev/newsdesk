import { ADD_ERROR, CLEAR_ERRORS } from '../actionTypes';

export const addError = (title, errors) => ({type: ADD_ERROR, title, errors});

export const clearErrors = () => ({type: CLEAR_ERRORS});