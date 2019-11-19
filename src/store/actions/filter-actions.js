import * as types from '../actionTypes';


export const initFilter = (initFilter, allCategories) => ({type: types.INIT_FILTER, initFilter, allCategories});

export const saveFilterChanges = () => ({ type: types.SAVE_FILTER_CHANGES});

export const changeCustomFilter = (category, allCategories) => ({type: types.CHANGE_CUSTOM_FILTER, category, allCategories});

export const updateFilterSettings = newSettings => ({type: types.UPDATE_FILTER_SETTINGS, newSettings});
