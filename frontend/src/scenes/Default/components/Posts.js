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
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Title</th>
              <th>Body</th>
              <th>Author</th>
              <th>Category</th>
              <th>Vote Score</th>
              <th>Deleted</th>
              <th>Comment Count</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(val => {
              return (
                <tr key={val.id}>
                  {/* <td>{JSON.stringify(val)}</td> */}
                  <td>{val.timestamp}</td>
                  <td>{val.title}</td>
                  <td>{val.body}</td>
                  <td>{val.author}</td>
                  <td>{val.category}</td>
                  <td>{val.voteScore}</td>
                  <td>{val.deleted}</td>
                  <td>{val.commentCount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Posts;
