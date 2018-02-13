import {createStore, applyMiddleware, combineReducers} from 'redux';
// import {reducer as DefaultReducer} from './store/CategoryReducer';
// import {reducer as CreateEditViewReducer} from './scenes/CreateEditPost/components/reducer';

// import {reducer as PostDeleteReducer} from './scenes/PostDeleteView/components/reducer';
// import {reducer as CreateEditCommentReducer} from './scenes/CreateEditComment/components/reducer';
// import {reducer as PostVoteScoreReducer} from './scenes/components/reducer';
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
