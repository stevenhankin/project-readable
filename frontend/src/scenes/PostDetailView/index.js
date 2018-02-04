import React, {Component} from 'react';
import PostForm from "./components/PostForm.js";

const PostDetailView = (props) => (
    <section>

        <PostForm postId={props.match.params.postId}/>

        <h1>Comments</h1>
        <section>
        </section>

    </section>
);

export default PostDetailView;
