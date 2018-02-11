import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as DefaultReducer} from './scenes/Default/components/reducer';
import {reducer as CreateEditViewReducer} from './scenes/CreateEditPost/components/reducer';
import {reducer as PostDetailViewReducer} from './scenes/PostDetailView/components/reducer';
import {reducer as PostDeleteReducer} from './scenes/PostDeleteView/components/reducer';
import {reducer as CreateEditCommentReducer} from './scenes/CreateEditComment/components/reducer';

import thunk from 'redux-thunk';

export const store = createStore(
    combineReducers({CreateEditCommentReducer,CreateEditViewReducer,DefaultReducer,PostDetailViewReducer,PostDeleteReducer}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);
