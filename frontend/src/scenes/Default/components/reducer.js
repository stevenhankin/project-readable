import {RECEIVE_POSTS, RECEIVE_CATEGORIES} from './actions'

export const reducer = (state = {posts: [], categories: [], loading: true}, action) => {
    switch (action.type) {
        case RECEIVE_POSTS:
            return  {...state, posts: action.posts, loading: false};
        case RECEIVE_CATEGORIES:
            return {...state, categories: action.categories.categories};
        default:
            return state;
    }
};
