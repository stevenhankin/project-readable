import {fetchPost,putPost,postPost} from '../../../services/api.js'


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
export const updatePost = (id, title, body, author) => dispatch => (
    putPost(id, title, body, author)
        .then(
            dispatch(getPost(id))
        )
);


/**
 * Thunk : Create a NEW post via REST API on server
 * @param postDetails
 * @returns {function(*): (PromiseLike<T> | Promise<T>)}
 */
export const createPost = (postDetails) => dispatch => (
    postPost(postDetails)
        .then(
            dispatch(getPost(postDetails.id))
        )
);
