import {RECEIVE_POSTS} from './PostActions'

export const reducer = (state = {posts: [], loading: true}, action) => {
    switch (action.type) {
        case RECEIVE_POSTS:
            return  {...state, posts: action.posts, loading: false};
        default:
            return state;
    }
};
