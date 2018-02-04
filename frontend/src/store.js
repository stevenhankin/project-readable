import {createStore, applyMiddleware} from 'redux';
import {reducer} from './scenes/PostDetailView/components/reducer';
import thunk from 'redux-thunk';

export const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);
