import React, { Component } from 'react';
import { fetchCategories } from '../../../services/api.js';
import { Link } from 'react-router-dom';

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
        {this.state.categories.map(val => {
          return (
            <p key={val.name}>
              <Link to={`/categories/${val.path}`}>{val.name}</Link>
            </p>
          );
        })}
      </div>
    );
  }
}

export default Categories;
