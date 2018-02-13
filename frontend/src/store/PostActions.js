import {fetchPosts, postPost, putPost} from '../services/api'
import {fetchPost} from "../services/api";
import * as api from "../services/api";


export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";

export const receivePost = post => ({
    type: RECEIVE_POST,
    post
});


export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
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
    fetchPost(id)
        .then(
            post => {
                dispatch(receivePost(post))
            })
);

/**
 * Thunk : Get all the posts via REST API from server
 *
 * @returns {function(*): (JQueryPromise<any> | JQueryPromise<void> | PromiseLike<T> | Promise<T>)}
 */
export const getPosts = () => dispatch => (
    fetchPosts()
        .then(
            posts => {
                dispatch(receivePosts(posts))
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




