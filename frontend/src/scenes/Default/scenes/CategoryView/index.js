import React from 'react';
import CategoryNav from '../../components/CategoryNav'
import Posts from '../../components/PostsTable.js';


function CategoryView (props) {
        return (
            <span>
                <section>
                    <CategoryNav  category={props.match.params.category}/>
                </section>
            <section>
                <Posts category={props.match.params.category}/>
            </section>
        </span>
        );
}

export default CategoryView;
