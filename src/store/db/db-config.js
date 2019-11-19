import { APIRoot } from '../../app-defaults';

const DBConfig = {
    // APIUrl : '/newsdesk-ui/api',
    APIUrl : `${APIRoot}/newsdesk-ui/api`,
    pushAPIUrl: `${APIRoot}/newsdesk-push/api`,
    getInit : {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
};

export default DBConfig;