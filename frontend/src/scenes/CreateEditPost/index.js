import React from 'react';
import PostFormCreate from "./components/PostEdit";


const CreateEditView = (props) => {

    const postId = props.match && props.match.params.postId;

    return (
        <span>
            <section>
                <PostFormCreate postId={postId}/>
            </section>
        </span>
    );


};

export default CreateEditView;
