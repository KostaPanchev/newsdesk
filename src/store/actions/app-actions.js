import * as types from '../actionTypes';
import { addError, saveFilterChanges} from './index.js';
import * as DB from '../db/db-api';


// action creators
const storeUserInfo = payload => ({type: types.STORE_USER, payload});

const storeWorkbenches = payload => ({type: types.STORE_WORKBENCHES, payload});

const storeAllCategories = payload => ({type: types.STORE_ALL_CATEGORIES, payload});

const storeFilteredCategories = payload => ({type: types.STORE_FILTERED_CATEGORIES, payload});

const storePostOptions = payload => ({type: types.STORE_POST_OPTIONS, payload});

export const loadingAppData = () => ({type: types.LOADING_APP_DATA});

const appDataReady = () => dispatch =>  window.setTimeout(() => dispatch({type: types.APP_DATA_READY}), 500);

const startUserSettingsUpdate = () => ({type: types.START_USER_SETTINGS_UPDATE});

const endUserSettingsUpdate = () => ({type: types.END_USER_SETTINGS_UPDATE});
// long version of the above
// const endUserSettingsUpdate = () => {
//     return(dispatch => {
//         window.setTimeout(() => {
//             dispatch({
//                 type: types.END_USER_SETTINGS_UPDATE
//             });
//         }, 500);
//     });
// };

export const updateRouterInfo = payload => ({type: types.UPDATE_ROUTER_INFO, payload});

export const changeAppStateTime = () => ({type: types.CHANGE_APP_STATE_TIME});

export const startFetchingData = () => ({type: types.START_FETCHING_DATA});

export const stopFetchingData = () => dispatch =>  window.setTimeout(() => dispatch({type: types.STOP_FETCHING_DATA}), 1000);
// long version of the above line
// export const stopFetchingData = () => {
//     return ( dispatch => {
//         window.setTimeout(() => {
//             dispatch({
//                 type: types.STOP_FETCHING_DATA
//             });
//         }, 1000);
//     });
// };

// ================================================================
// START OF INITIAL APP DATA LOAD
// ================================================================

export const getInitailAppData = uuid => dispatch => dispatch(getUser(uuid)); 


export const getUser = (uuid) => {
    return (async dispatch => {
        const {data, errors} = await DB.getUser(uuid);
        if (!errors) {
            dispatch(storeUserInfo(data));
            dispatch(getWorkbenches());
        } else {
            dispatch(storeUserInfo(null));
            dispatch(addError('app-actions.js, "getUser"', errors));
        }

    });
};

const getWorkbenches = () => {
    return (async dispatch => {
        const {data, errors} = await DB.getWorkbenches();
        if (!errors) {
            dispatch(storeWorkbenches(data));
            dispatch(getAllCategories());
        } else {
            dispatch(addError('app-actions.js, "getWorkbenches"', errors));
        }
    });
};


const getAllCategories = () => {
    return (async (dispatch, getState) => {
        const workbenchId = getState().appStore.userSettings.workbench.id;
        const {data, errors} = await  DB.getAllCategories();
        if (!errors) {
            dispatch(storeAllCategories(data));
            dispatch(getFilteredCategories(workbenchId));
        } else {
            dispatch(addError('app-actions.js, "getAllCategories"', errors));
        }
    });
};

const getFilteredCategories = (workbenchId) => {
    return((dispatch, getState) => {
        const {userSettings} = getState().appStore;
        switch (workbenchId) {
        case 0:
            DB.getAllCategories()
                .then(({data, errors}) => {
                    if (!errors) {
                        dispatch(storeFilteredCategories(data));
                    } else {
                        dispatch(addError('app-actions.js, "getFilteredCategories"', errors));
                    }
                    dispatch(getPostOptions());
                });
            break;
        case -1:
            DB.getAllCategories()
                .then(({data, errors}) => {
                    if (!errors) {
                        let filteredCategoris;
                        if(userSettings.customFilter.length){
                            let filtered = userSettings.customFilter.filter(category => category.selected);
                            let filteredIds = filtered.map(category => category.id);
                            filteredCategoris = data.filter(category => filteredIds.includes(category.id));
                        }
                        dispatch(storeFilteredCategories(filteredCategoris));
                    } else {
                        dispatch(addError('app-actions.js, "getFilteredCategories"', errors));
                    }
                    dispatch(getPostOptions());
                });
            break;
        default:
            DB.getFilteredCategories(workbenchId)
                .then(({data, errors}) => {
                    if (!errors) {
                        dispatch(storeFilteredCategories(data));
                    } else {
                        dispatch(addError('app-actions.js, "getFilteredCategories"', errors));
                    }
                    dispatch(getPostOptions());
                });
        }
    });
};

const getPostOptions = () => {
    return(async dispatch => {
        const {data, errors} = await  DB.getPostOptions();
        if (!errors) {
            dispatch(storePostOptions(data));
            dispatch(appDataReady());
        } else {
            dispatch(addError('app-actions.js, "getFilteredCategories"', errors));
        }
    });
};

// ================================================================
// END OF INITIAL APP DATA LOAD
// ================================================================





export const updateUserSettings = (uuid, newSettings) => {
    let post = {
        uuid,
        json: true,
        settings: {
            ...newSettings
        }
    };
    return(async dispatch => {
        dispatch(loadingAppData());
        dispatch(startUserSettingsUpdate());
        dispatch(saveFilterChanges());
        const {data, errors} = await  DB.updateUserSettings(post);
        if (!errors) {
            dispatch({
                type: types.UPDATE_USER_SETTINGS,
                data
            });
            dispatch(changeAppStateTime());
            dispatch(getFilteredCategories(data.settings.workbench.id));
            dispatch(endUserSettingsUpdate());
        } else {
            dispatch(endUserSettingsUpdate());
            dispatch(addError('app-actions.js, "updateUserSettings"', errors));
        }
    });
};

export const resetUserSettings = (post) => {
    return(async dispatch => {
        dispatch(loadingAppData());
        const {data, errors} = await  DB.updateUserSettings(post);
        if (!errors) {
            dispatch({
                type: types.RESET_USER_SETTINGS,
                data
            });
            dispatch(getUser(post.uuid));
        } else {
            dispatch(addError('app-actions.js, "resetUserSettings"', errors));
        }
    });
};

