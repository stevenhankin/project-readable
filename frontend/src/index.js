import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './styles/index.css';
import App from './scenes/Default/index.js';
import CategoryView from './scenes/Default/scenes/CategoryView/index.js';
import PostDetailView from './scenes/PostDetailView/index.js';

import {Provider} from 'react-redux';
import {store} from './store';


console.log('store state is',store.getState());

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="container-fluid">
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Readable</h1>
                    </header>
                    <Route exact path="/" component={App}/>
                    <Route path="/categories/:category" component={CategoryView}/>
                    <Route path="/posts/:post" component={PostDetailView}/>
                </div>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
