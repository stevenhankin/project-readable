import * as api from '../../services/api.js'


export const RECEIVE_POST = "RECEIVE_POST";

export const receivePost = (post) => ({
    type: RECEIVE_POST,
    post
});

/**
 * Thunk : Increase vote score on a post
 *
 * @param id
 * @returns {function(*): (JQueryPromise<any> | JQueryPromise<void> | PromiseLike<T> | Promise<T>)}
 */
export const upVote = (id) => dispatch => (
    api.postVote(id,"upVote")
        .then (
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
    api.postVote(id,"downVote")
        .then (
            api.fetchPost(id)
                .then(
                    post => {
                        dispatch(receivePost(post))
                    }
                )
        )
);
