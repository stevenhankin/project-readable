import React, {Component} from 'react';
import './App.css';
import Categories from './components/Categories.js';
import Posts from './components/Posts.js';

class App extends Component {
    render() {
        return (
            <div>
                <section>
                    <Categories/>
                </section>
                <section>
                    <Posts/>
                </section>
            </div>
        );
    }
}

export default App;
