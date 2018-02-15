import React from 'react';
import PostFormCreate from "./components/PostView";
import Comments from "./components/Comments"

const PostDetailView = (props) => {

    const postId = props.match && props.match.params.postId;

    return (
        <span>
            <section>
                <PostFormCreate postId={postId}/>
            </section>
            <hr/>
            <section>
                <Comments postId={postId}/>
            </section>
        </span>
    );


};

export default PostDetailView;
