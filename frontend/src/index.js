import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './styles/index.css';
import App from './scenes/Default/index.js';
import CategoryView from './scenes/Default/scenes/CategoryView/index.js';
import PostDetailView from './scenes/PostDetailView/index.js';
import {Row, Jumbotron} from 'react-bootstrap';
import {Provider} from 'react-redux';
import {store} from './store';


console.log('store state is', store.getState());

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="App container">
                <Row>
                    {/*<header className="App-header">*/}
                    {/*<h1 className="App-title">Readable</h1>*/}
                    {/*</header>*/}
                    <Jumbotron>
                        <h1>Readable</h1>
                        <p>Project showcasing Redux with React</p>
                    </Jumbotron>
                </Row>
                <Row>
                    <Route exact path="/" component={App}/>
                    <Route path="/categories/:category" component={CategoryView}/>
                    <Route path="/posts/:postId" component={PostDetailView}/>
                </Row>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
