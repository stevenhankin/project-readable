import React, { Component } from 'react';
import Posts from '../../components/PostsTable.js';

class CategoryView extends Component {
  render() {
      // console.log(this.props.match.params.category)
    return (
            <section>
                <h1>Category {this.props.match.params.category}</h1>
                <Posts category={this.props.match.params.category}/>
            </section>
    );
  }
}

export default CategoryView;
