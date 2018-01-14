import React, { Component } from 'react';
import fetchCategories from '../../../services/api.js';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    fetchCategories().then(({ categories }) => {
      this.setState({
        categories
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Categories</h1>
        <ul>
          {this.state.categories.map(val => {
            return <li key={val.name}>{val.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Categories;
