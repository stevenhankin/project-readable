import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as DefaultReducer} from './store/CategoryReducer';
import {reducer as CreateEditViewReducer} from './scenes/CreateEditPost/components/reducer';
import {reducer as PostDetailViewReducer} from './scenes/PostDetailView/components/reducer';
import {reducer as PostDeleteReducer} from './scenes/PostDeleteView/components/reducer';
import {reducer as CreateEditCommentReducer} from './scenes/CreateEditComment/components/reducer';
import {reducer as PostVoteScoreReducer} from './scenes/components/reducer';
/**
 * New refactored reducers below
 */
import {reducer as PostReducer} from './store/PostReducer';
import {reducer as CategoryReducer} from './store/CategoryReducer';


import thunk from 'redux-thunk';

export const store = createStore(
    combineReducers({CreateEditCommentReducer,CreateEditViewReducer,DefaultReducer,PostDetailViewReducer,PostDeleteReducer,PostVoteScoreReducer,
    PostReducer, CategoryReducer}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);
