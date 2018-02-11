import {RECEIVE_POST} from './actions'

export const reducer = (state = {post: {}, loading: true}, action) => {
    switch (action.type) {
        case RECEIVE_POST:
            const newState = {...state, post: action.post, loading: false};
            return newState;
        default:
            return state;
    }
};
