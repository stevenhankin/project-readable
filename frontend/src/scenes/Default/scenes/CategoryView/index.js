import React, { Component } from 'react';
import Posts from '../../components/Posts.js';

class CategoryView extends Component {
  render() {
      console.log(this.props.match.params.category)
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Readable</h1>
            </header>
            <section>
                <h1>Category {this.props.match.params.category}</h1>
                <Posts category={this.props.match.params.category}/>
            </section>
        </div>
    );
  }
}

export default CategoryView;
