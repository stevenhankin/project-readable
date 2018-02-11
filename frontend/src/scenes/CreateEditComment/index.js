import React from 'react';
import CommentEdit from "./components/CommentEdit";


const CreateEditComment = (props) => {

    const commentId = props.match.params.commentId;
    const postId = props.match.params.postId;



    return (
        <span>
            <section>
                <CommentEdit postId={postId} commentId={commentId}/>
            </section>
        </span>
    );


};

export default CreateEditComment;
