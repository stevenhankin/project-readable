import React, {Component} from 'react';
import './App.css';
import Categories from './components/CategoryNav.js';
import Posts from './components/PostsTable.js';

const App = () =>  {
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
    };


export default App;
