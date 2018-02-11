import {fetchPosts,fetchCategories,fetchComments} from '../../../services/api.js'


export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
});

export const receiveCategories = (categories) => ({
    type: RECEIVE_CATEGORIES,
    categories
});


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
 * Thunk : Get all the categories via REST API from server
 *
 * @returns {function(*): (JQueryPromise<any> | JQueryPromise<void> | PromiseLike<T> | Promise<T>)}
 */
export const getCategories = () => dispatch => (
    fetchCategories()
        .then(
            categories => {
                dispatch(receiveCategories(categories))
            })
);


