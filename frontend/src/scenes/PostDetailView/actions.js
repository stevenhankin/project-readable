import {fetchPost} from '../../services/api.js'

export const RECEIVE_POST = "RECEIVE_POST";

export const receivePost = post => ({
    type: RECEIVE_POST,
    post
});

export const getPost = (id) => dispatch => (
        fetchPost(id)
        .then(

            post => {
                console.log('In getPost with post',post);
                dispatch(receivePost(post))
            })
);