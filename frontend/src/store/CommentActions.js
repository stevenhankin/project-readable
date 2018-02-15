import * as api from '../services/api.js'
import * as PostActions from './PostActions'
import {createToast} from "./ToastActions";

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const MODIFY_COMMENT_SUCCESS = "MODIFY_COMMENT_SUCCESS";

export const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments,
    modified: false
});


export const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment,
    modified: false
});

export const modifyCommentSuccess = comment => ({
    type: MODIFY_COMMENT_SUCCESS,
    comment,
    modified: true
});


/**
 * Thunk : Get all the comments for a Post via REST API from server
 *
 * @param postId
 * @returns {function(*): (JQueryPromise<any> | JQueryPromise<void> | PromiseLike<T> | Promise<T>)}
 */
export const getComments = (postId) => dispatch => (
    api.fetchComments(postId)
        .then(
            comments => {
                dispatch(receiveComments(comments))
            })
);


/**
 * Thunk : Get a post via REST API from server
 *
 * @param id
 * @returns {function(*): (PromiseLike<T> | Promise<T>)}
 */
export const getComment = (id) => dispatch => (
    api.fetchComment(id)
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
    api.updateComment(c)
        .then(() => {
            dispatch(createToast('Successfully updated the comment'))
        })
        .then(
            dispatch(modifyCommentSuccess(c))
        )
);


/**
 * Thunk : Create a NEW comment via REST API on server then synchronously GETS the comment
 *
 * @param c - Comment
 * @returns {function(*): (PromiseLike<T> | Promise<T>)}
 */
export const createComment = (c) => dispatch => (
    api.createComment(c)
        .then(() => {
            dispatch(createToast('Successfully created a comment'))
        })
        .then(
            dispatch(modifyCommentSuccess(c))
        )
);


/**
 * Thunk : Delete a comment via REST API
 *
 * @param postId
 * @param commentId
 * @returns {function(*): Promise<Response>}
 */
export const deleteComment = (postId, commentId) => dispatch => (
    api.deleteComment(commentId)
        .then(
            dispatch(getComments(postId))
        )
        .then(() => {
            dispatch(createToast('Successfully deleted the comment'))
        })
        .then(
            /* Need to retrieve the post that this comment belonged
             * to so that the correct comment count is displayed
             */
            dispatch(PostActions.getPost(postId))
        )
);


/**
 * Thunk : Increase vote score on a comment
 *
 * @param id
 * @returns {function(*): (JQueryPromise<any> | JQueryPromise<void> | PromiseLike<T> | Promise<T>)}
 */
export const upVote = (id) => dispatch => (
    api.commentVote(id, "upVote")
        .then(
            api.fetchComment(id)
                .then(
                    post => {
                        dispatch(receiveComment(post))
                    }
                )
        )
);

/**
 * Thunk : Decrease vote score on a comment
 *
 * @param id
 * @returns {function(*): (JQueryPromise<any> | JQueryPromise<void> | PromiseLike<T> | Promise<T>)}
 */
export const downVote = (id) => dispatch => (
    api.commentVote(id, "downVote")
        .then(
            api.fetchComment(id)
                .then(
                    post => {
                        dispatch(receiveComment(post))
                    }
                )
        )
);
