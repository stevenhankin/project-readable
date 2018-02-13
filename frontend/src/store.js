import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as PostReducer} from './store/PostReducer';
import {reducer as CategoryReducer} from './store/CategoryReducer';
import {reducer as CommentReducer} from './store/CommentReducer';
import {reducer as ToastReducer} from './store/ToastReducer';

import thunk from 'redux-thunk';

export const store = createStore(
    combineReducers({
        CommentReducer,
        PostReducer,
        CategoryReducer,
        ToastReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

