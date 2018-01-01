import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './scenes/Home/index.js';
import registerServiceWorker from './registerServiceWorker';

/* TODO
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
*/

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
