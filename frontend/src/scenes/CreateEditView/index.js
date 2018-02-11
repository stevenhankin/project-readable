import React from 'react';
import PostFormCreate from "./components/PostEdit.js";

const PostCreateView = (props) => {

    console.log('PostCreateView',props);

   const postId = props.match && props.match.params.postId;

    return  (   <section>


        <PostFormCreate postId={postId}  />

    </section>
);


};

export default PostCreateView;
