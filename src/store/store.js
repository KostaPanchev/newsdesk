import { 
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

// import userReducer from './reducers/user-reducer';
import errorsReducer from './reducers/errors-reducer';
import filterReducer from './reducers/filter-reducer';
import postsReducer from './reducers/posts-reducer';
import appReducer from './reducers/app-reducer';
import pushMessagesReducer from './reducers/push-messages-reducer';

const rootReducer = combineReducers({
    appStore: appReducer,
    errorsStore: errorsReducer,
    // userStore: userReducer,
    filterStore: filterReducer,
    postsStore: postsReducer,
    pushMessagesStore: pushMessagesReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));