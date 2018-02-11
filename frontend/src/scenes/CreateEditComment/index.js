import React from 'react';
import CommentEdit from "./components/CommentEdit";


const CreateEditComment = (props) => {

    const postId = props.match.params.postId;
    const commentId = props.match.params.commentId;

    return (
        <span>
            <section>
                <CommentEdit parentId={postId} commentId={commentId}/>
            </section>
        </span>
    );


};

export default CreateEditComment;
