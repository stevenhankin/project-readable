import {fetchPost, putPost, postPost, fetchComments} from '../../../services/api.js'

export const RECEIVE_POST = "RECEIVE_POST";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";

export const receivePost = post => ({
    type: RECEIVE_POST,
    post
});

export const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments
});


/**
 * Thunk : Get a post via REST API from server
 *
 * @param id
 * @returns {function(*): (PromiseLike<T> | Promise<T>)}
 */
export const getPost = (id) => dispatch => (
    fetchPost(id)
        .then(
            post => {
                dispatch(receivePost(post))
            })
);


/**
 * Thunk : Get all the categories via REST API from server
 *
 * @returns {function(*): (JQueryPromise<any> | JQueryPromise<void> | PromiseLike<T> | Promise<T>)}
 */
export const getComments = (postId) => dispatch => (
    fetchComments(postId)
        .then(
            comments => {
                dispatch(receiveComments(comments))
            })
);


