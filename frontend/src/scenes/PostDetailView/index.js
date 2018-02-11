import React from 'react';
import PostFormCreate from "./components/PostView";
import Comments from "./components/Comments"

const PostDetailView = (props) => {

    console.log('PostDetailView', props);

    const postId = props.match && props.match.params.postId;

    return (
        <span>
            <section>
                <PostFormCreate postId={postId}/>
            </section>
            <section>
                <Comments  postId={postId}></Comments>
            </section>
        </span>
    );


};

export default PostDetailView;
