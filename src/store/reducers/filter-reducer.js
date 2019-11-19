import {
    INIT_FILTER,
    CHANGE_CUSTOM_FILTER,
    CHANGE_PRIORITY,
    CHANGE_WORKBENCH,
    UPDATE_FILTER_SETTINGS,
    SAVE_FILTER_CHANGES
} from '../actionTypes';

import { maxCategoriesWarn } from '../../app-defaults';

const initialState = {
    filterSettings: null,
    settingsChanged: false,
    performanceWarn: null
};

const checkPerformance = (curSettings, newSettings = {}) => {
    let settings = {
        ...curSettings,
        ...newSettings
    };
    // console.log(curSettings, newSettings);
    let maxCategoris = 10;
    let selectedCategoriesLen = settings.customFilter.filter(category => category.selected === true).length;

    if(settings.workbench.id === 0 || (selectedCategoriesLen > maxCategoris && settings.workbench.id === -1)){
        return `Du har valgt mere end ${maxCategoriesWarn} kategorier. For at få en bedre og hurtigere oplevelse, så anbefales det at vælge en eksisterende publikationsplan, eller oprette dit eget custom filter.`;
    } else if (selectedCategoriesLen < 1 && settings.workbench.id === -1) {
        return 'Du har valgt 0 kategorier!';
    } else {
        return null;
    }
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
    case INIT_FILTER : 
    
        let allCategories = action.allCategories;
        let oldCustomFilter = action.initFilter.customFilter;

        let newCustomFilter = allCategories.map(category => {
            let c = {...category},
                id = c.id;
            let oldCategory = oldCustomFilter.find(filterCategory => filterCategory.id === id);
            if (oldCategory){
                c.selected = oldCategory.selected;
            } else {
                c.selected = false;
            }
            return c;
        });
        return {
            ...state,
            filterSettings: {
                ...action.initFilter,
                customFilter: newCustomFilter
            },
            settingsChanged: false,
            performanceWarn: checkPerformance(action.initFilter)
        };

    // not implemented 
    case CHANGE_CUSTOM_FILTER:
        return {
            ...state,
        };

    // not implemented 
    case CHANGE_PRIORITY:
        return {
            ...state,
        };

    // not implemented 
    case CHANGE_WORKBENCH:
        return {
            ...state,
        };

    case UPDATE_FILTER_SETTINGS:
        return {
            ...state,
            filterSettings: {
                ...state.filterSettings,
                ...action.newSettings
            },
            performanceWarn: checkPerformance(state.filterSettings, action.newSettings),
            settingsChanged: true,
            filterChangedAt: new Date().getTime()
        };

    case SAVE_FILTER_CHANGES:
        return {
            ...state,
            settingsChanged: false
        };

    default:
        return state;
    }
};

export default filterReducer;