import {fetchPost} from '../../../services/api.js'
import {putPost} from '../../../services/api.js'
import {postPost} from '../../../services/api.js'


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

// POST /posts
// USAGE:
//     Add a new post
//
// PARAMS:
//     id - UUID should be fine, but any unique id will work
// timestamp - timestamp in whatever format you like, you can use Date.now() if you like
// title - String
// body - String
// author - String
// category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

export const createPost = (postDetails) => dispatch => (
    postPost(postDetails)
        .then(
            dispatch(getPost(postDetails.id))
        )
);
