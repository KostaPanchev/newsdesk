import * as types from '../actionTypes';
import { isEmptyObj, formatDateISO } from '../../helpers';

// import { maxPriority } from '../../app-defaults';

const initCustomFiter = (categories) => {
    let customFilter = categories.map(item => {
        let category = Object.assign(item, {
            selected: false
        });
        return category;
    });
    return customFilter;
};

const userDefaultSettings = {
    workbench: {
        id: 0,
        title: 'All',
    },
    weekDaysNumber: 7,
    customFilter: [],
    showPosts: true,
    showDailyReport: false,

};

const initialState = {
    appDataReady: false,
    newUser: true,
    user: null,
    updatingUserSettings: false,
    userSettings: userDefaultSettings,
    workbenches: [],
    allCategories: [],
    filteredCategories: [],
    postOptions: {},
    fetchingData: false,
    appStateChangedAt: null,
    routerInfo: {
        date: formatDateISO(new Date()),
        categoryId: '',
        path: '/'
    }
};


const appReducer = (state = initialState, action) => {
    switch (action.type) {
    case types.STORE_USER:
        const user = action.payload;
        if (!user){
            return {
                ...state,
                user: null,
            };
        } else {
            if(isEmptyObj(user.settings)){
                return {
                    ...state,
                    // loadingUser: false,
                    user,
                    
                };
            } else {
                return {
                    ...state,
                    // loadingUser: false,
                    user,
                    userSettings: user.settings,
                    newUser: false
                };
            }
        }

    case types.STORE_WORKBENCHES:
        return {
            ...state,
            workbenches: action.payload
        };

    case types.STORE_ALL_CATEGORIES:
        if(!state.userSettings.customFilter.length) {
            return {
                ...state,
                allCategories: action.payload,
                userSettings: {
                    ...state.userSettings,
                    customFilter: initCustomFiter(action.payload)
                }  
            }; 
        } else {
            return {
                ...state,
                allCategories: action.payload
            };
        }

    case types.STORE_FILTERED_CATEGORIES:
        return {
            ...state,
            filteredCategories: action.payload,
        };

    case types.STORE_POST_OPTIONS:
        return {
            ...state,
            postOptions: action.payload,
        };

    case types.LOADING_APP_DATA: 
        return {
            ...state,
            appDataReady: false
        };

    case types.APP_DATA_READY: 
        return {
            ...state,
            appDataReady: true
        };

    case types.CHANGE_APP_STATE_TIME: 
        return {
            ...state,
            appStateChangedAt: new Date().getTime()
        };

    case types.START_FETCHING_DATA:
        return {
            ...state,
            fetchingData: true
        };
    
    case types.STOP_FETCHING_DATA:
        return {
            ...state,
            fetchingData: false
        };

    case types.START_USER_SETTINGS_UPDATE:
        return {
            ...state,
            updatingUserSettings: true
        };

    case types.END_USER_SETTINGS_UPDATE:
        return {
            ...state,
            updatingUserSettings: false
        };

    case types.UPDATE_USER_SETTINGS:
        return {
            ...state,
            user: {
                ...state.user,
                settings: action.data.settings
            },
            // loadingUser: false,
            userSettings: action.data.settings,
            newUser: false,
        };

    case types.RESET_USER_SETTINGS:
        return {
            ...state,
            ...initialState
        };

    case types.UPDATE_ROUTER_INFO: 
        return {
            ...state,
            routerInfo: {...action.payload}
        };

    default:
        return state;
    }

    
};

export default appReducer;