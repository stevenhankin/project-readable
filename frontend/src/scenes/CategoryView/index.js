import React, { Component } from 'react';
import Posts from '../Default/components/PostsTable.js';

class CategoryView extends Component {
  render() {
    return (
        <span>
            <section>
                <h1>Posts for <strong>{this.props.match.params.category}</strong></h1>
                <Posts category={this.props.match.params.category}/>
            </section>
        </span>
    );
  }
}

export default CategoryView;
