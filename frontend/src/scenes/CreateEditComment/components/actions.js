import {fetchComment,putComment,postComment} from '../../../services/api.js'


export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const MODIFY_COMMENT_SUCCESS = "MODIFY_COMMENT_SUCCESS";

export const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});

export const modifyCommentSuccess = comment => ({
    type: MODIFY_COMMENT_SUCCESS,
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
 * @param c - comment
 * @param body
 * @returns {function(*): (PromiseLike<T> | Promise<T>)}
 */
export const updateComment = (c) => dispatch => (
    putComment(c)
        .then(
            dispatch(modifyCommentSuccess(c))
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
            dispatch(modifyCommentSuccess(c))
        )
);

