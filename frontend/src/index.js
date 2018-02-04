import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';
import './styles/index.css';
import App from './scenes/Default/index.js';
import CategoryView from './scenes/Default/scenes/CategoryView/index.js';
import PostDetailView from './scenes/PostDetailView/index.js';
import {Col, Row, Jumbotron, Image} from 'react-bootstrap';
import {Provider} from 'react-redux';
import {store} from './store';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="App container">
                <Row>
                    <Jumbotron>
                        <Row>
                            <Col xs={10}>
                                <h1>Readable</h1>
                            </Col>
                            <Col xs={1}>
                                <a href="https://stevenhankin.github.io/project-readable/">
                                <Image rounded src="https://www.gravatar.com/avatar/bbed4d2a6f627e45d8de9ed6e0c0a468?s=100"/>
                                </a>
                            </Col>
                        </Row>
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
