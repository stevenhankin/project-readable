import {fetchCategories} from '../services/api.js'


export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";


export const receiveCategories = (categories) => ({
    type: RECEIVE_CATEGORIES,
    categories
});


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


