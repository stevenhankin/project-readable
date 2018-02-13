import {fetchPosts} from '../services/api.js'


export const RECEIVE_POSTS = "RECEIVE_POSTS";

export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
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

