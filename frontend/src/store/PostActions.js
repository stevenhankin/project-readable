import * as api from "../services/api";
import {createToast} from "./ToastActions";


export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";

export const receivePost = post => ({
    type: RECEIVE_POST,
    post
});


export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
});

export const deletePostSuccess = post => ({
    type: DELETE_POST_SUCCESS
});

export const updatePostSuccess = () => ({
    type: UPDATE_POST_SUCCESS

});

export const createPostSuccess = post => ({
    type: CREATE_POST_SUCCESS,
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
 * Thunk : Get category/all posts via REST API from server
 *
 * @param category - undefined if for all posts (default view)
 * @returns {function(*): (JQueryPromise<any> | JQueryPromise<void> | PromiseLike<T> | Promise<T>)}
 */
export const getPosts = () => dispatch =>
            (
        api.fetchPosts()
            .then(
                posts => {
                    dispatch(receivePosts(posts))
                })
);

/**
 * Thunk : Get category posts via REST API from server
 *
 * @param category - undefined if for all posts (default view)
 * @returns {function(*): (JQueryPromise<any> | JQueryPromise<void> | PromiseLike<T> | Promise<T>)}
 */
export const getCategoryPosts = (category) => dispatch =>
    (
        api.fetchCategoryPosts(category)
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
        .then(() => {
            dispatch(createToast('Successfully deleted the post'))
        })
        .then(post => {
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
    api.updatePost(id, title, body, author)
        .then(() => {
            dispatch(createToast('Successfully updated the post'))
        })
        .then(
            dispatch(updatePostSuccess())
        )
);


/**
 * Thunk : Create a NEW post via REST API on server
 *
 * @param postDetails
 * @returns {function(*): (PromiseLike<T> | Promise<T>)}
 */
export const createPost = (postDetails) => dispatch => (
    api.createPost(postDetails)
        .then(() => {
            dispatch(createToast('Successfully created a post'))
        })
        .then(() => {
            dispatch(createPostSuccess(postDetails))
        })

);


/**
 * Thunk : Increase vote score on a post
 *
 * @param id
 * @returns {function(*): (JQueryPromise<any> | JQueryPromise<void> | PromiseLike<T> | Promise<T>)}
 */
export const upVote = (id) => dispatch => (
    api.postVote(id, "upVote")
        .then(
            api.fetchPost(id)
                .then(
                    post => {
                        dispatch(receivePost(post))
                    }
                )
        )
);

/**
 * Thunk : Decrease vote score on a post
 *
 * @param id
 * @returns {function(*): (JQueryPromise<any> | JQueryPromise<void> | PromiseLike<T> | Promise<T>)}
 */
export const downVote = (id) => dispatch => (
    api.postVote(id, "downVote")
        .then(
            api.fetchPost(id)
                .then(
                    post => {
                        dispatch(receivePost(post))
                    }
                )
        )
);
