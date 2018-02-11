import {fetchComment,putComment,postComment} from '../../../services/api.js'


export const RECEIVE_COMMENT = "RECEIVE_COMMENT";


export const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});


/**
 * Thunk : Get a post via REST API from server
 *
 * @param id
 * @returns {function(*): (PromiseLike<T> | Promise<T>)}
 */
export const getComment = (id) => dispatch => (
    fetchComment(id)
        .then(
            comment => {
                dispatch(receiveComment(comment))
            })
);


/**
 * Thunk : Update a comment via REST API on server then synchronously GETS the comment
 *
 * @param id
 * @param body
 * @returns {function(*): (PromiseLike<T> | Promise<T>)}
 */
export const updateComment = (id, body) => dispatch => (
    putComment(id, body)
        .then(
            dispatch(getComment(id))
        )
);



/**
 * Thunk : Create a NEW comment via REST API on server then synchronously GETS the comment
 * @param c - Comment
 * @returns {function(*): (PromiseLike<T> | Promise<T>)}
 */
export const createComment = (c) => dispatch => (
    postComment(c)
        .then(
            dispatch(getComment(c.id))
        )
);

