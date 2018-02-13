import {RECEIVE_POST} from './actions'

export const reducer = (state = {post: []}, action) => {
    switch (action.type) {
        case RECEIVE_POST:
            return  {...state, post: action.post};
        default:
            return state;
    }
};
