import * as api from '../../../services/api.js'

export const RECEIVE_POST = "RECEIVE_POST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";

export const receivePost = post => ({
    type: RECEIVE_POST,
    post
});

export const deletePostSuccess = post => ({
    type: DELETE_POST_SUCCESS,
    post
});



/**
 * Thunk : Get a post via REST API from server
 *
 * @param id
 * @returns {function(*): (PromiseLike<T> | Promise<T>)}
 */
export const getPost = (id) => dispatch => (
    api.fetchPost(id)
        .then(
            post => {
                dispatch(receivePost(post))
            })
);


/**
 * Thunk : DELETE a post via REST API from server
 *
 * @param id
 * @returns {function(*): (JQueryPromise<any> | JQueryPromise<void> | PromiseLike<T> | Promise<T>)}
 */
export const deletePost = (id) => dispatch => (
    api.deletePost(id)
        .then(
            post => {
                dispatch(deletePostSuccess(post))
            })
);





