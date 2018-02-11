import React from 'react';
import PostDelete from "./components/PostDelete";


const PostDeleteView = (props) => {

    const postId = props.match && props.match.params.postId;

    return (
        <span>
            <section>
                <PostDelete postId={postId}/>
            </section>
        </span>
    );


};

export default PostDeleteView;
