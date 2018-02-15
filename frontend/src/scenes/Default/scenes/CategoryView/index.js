import React, {Component} from 'react';
import CategoryNav from '../../components/CategoryNav'
import Posts from '../../components/PostsTable.js';


class CategoryView extends Component {
    render() {
        return (
            <span>
                <section>
                    <CategoryNav  category={this.props.match.params.category}/>
                </section>
            <section>
                <Posts category={this.props.match.params.category}/>
            </section>
        </span>
        );
    }
}

export default CategoryView;
