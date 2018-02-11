import {fetchPost} from '../../../services/api.js'
import {putPost} from '../../../services/api.js'

export const RECEIVE_POST = "RECEIVE_POST";

export const receivePost = post => ({
    type: RECEIVE_POST,
    post
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
 * Thunk : Update a post via REST API on server
 *
 * @param id
 * @param title
 * @param body
 * @returns {function(*): (PromiseLike<T> | Promise<T>)}
 */
export const updatePost = (id, title, body) => dispatch => (
    putPost(id, title, body)
        .then(
            dispatch(getPost(id))
        )
);