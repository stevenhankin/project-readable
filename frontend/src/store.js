import {createStore, applyMiddleware, combineReducers} from 'redux';


/**
 * New refactored reducers below
 */
import {reducer as PostReducer} from './store/PostReducer';
import {reducer as CategoryReducer} from './store/CategoryReducer';
import {reducer as CommentReducer} from './store/CommentReducer';

import thunk from 'redux-thunk';

export const store = createStore(
    combineReducers({
         CommentReducer
        , PostReducer
        , CategoryReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

