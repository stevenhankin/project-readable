import React from 'react';
import CategoryNav from './components/CategoryNav.js';
import PostsTable from './components/PostsTable.js';

const DefaultView = () =>  {
        return (
            <span>
                <section>
                    <CategoryNav category='all'/>
                </section>
                <section>
                    <PostsTable/>
                </section>
            </span>
        );
    };


export default DefaultView;
