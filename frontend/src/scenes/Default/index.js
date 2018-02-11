import React from 'react';
import './App.css';
import CategoryNav from './components/CategoryNav.js';
import PostsTable from './components/PostsTable.js';

const App = () =>  {
        return (
            <div>
                <section>
                    <CategoryNav/>
                </section>
                <section>
                    <PostsTable/>
                </section>
            </div>
        );
    };


export default App;
