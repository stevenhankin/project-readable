import React, { Component } from 'react';
import { fetchPosts } from '../../../services/api.js';

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetchPosts().then(posts => {
      console.log(posts);
      this.setState({
        posts
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Posts</h1>
        <ul>
          {this.state.posts.map(val => {
            return <li key={val.id}>{JSON.stringify(val)}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Posts;
