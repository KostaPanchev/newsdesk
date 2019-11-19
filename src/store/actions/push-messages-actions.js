import * as types from '../actionTypes';
import { addError, stopFetchingData, startFetchingData} from './index.js';
import * as DB from '../db/db-api';


// action creators
export const fetchingPushMessages = value => ({type: types.FETCHING_POSTS, value});

export const updatePushMessages = (pushMessages = []) => ({type: types.UPDATE_PUSH_MESSAGES, pushMessages});

export const setNotSupportedFilter = value => ({type: types.SET_NOT_SUPPORTED_FILTER, value});


// =============================================

export const getPushMessages = () => {
    return ( async (dispatch, getState) => {
        const { user, routerInfo } = getState().appStore;
        
        dispatch(startFetchingData());
        dispatch(setNotSupportedFilter(false));

        const workbenchId = user.settings.workbench.id;
        
        if(workbenchId === 0 || workbenchId === -1){
            dispatch(stopFetchingData());
            dispatch(setNotSupportedFilter(true));
        } else {
            let props = {
                uuid: user.uuid,
                workbench_id: workbenchId,
                date: routerInfo.date,
                json: true
            };

            const json = await DB.getPushMessages(props);
            let {data, errors} = json;
            if(errors){
                dispatch(addError('DB.getPushMessages', errors));
                dispatch(updatePushMessages([]));
            } else {
                if(data){
                    dispatch(updatePushMessages(data));
                } else {
                    dispatch(updatePushMessages([]));
                }
            }
            dispatch(stopFetchingData());
        }
    });
};

export const updateSinglePushMessage = (publication) => {
    return ( async (dispatch, getState) => {
        const { user } = getState().appStore;
        let props = Object.assign(
            publication, {
                uuid: user.uuid,
                json: true
            }
        );
        const json = await DB.updatePushMessage(props);
        const {data, errors} = json;
        if(errors.length){
            dispatch(addError('DB.updatePushMessage', errors));
        } else {
            // this.getMessages();
        }
        dispatch(getPushMessages());
    });
};