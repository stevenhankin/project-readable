import {fetchCategories} from '../services/api.js'
import {RECEIVE_CATEGORIES} from './types'

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


