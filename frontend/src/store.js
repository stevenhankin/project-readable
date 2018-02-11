import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as DefaultReducer} from './scenes/Default/components/reducer';
import {reducer as CreateEditViewReducer} from './scenes/CreateEditView/components/reducer';
import thunk from 'redux-thunk';

export const store = createStore(
    combineReducers({CreateEditViewReducer,DefaultReducer}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);
