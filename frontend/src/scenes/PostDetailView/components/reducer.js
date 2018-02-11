import {RECEIVE_POST, RECEIVE_COMMENTS} from './actions'

export const reducer = (state = {post: {}, loading: true}, action) => {
    switch (action.type) {
        case RECEIVE_POST:
            const newState = {...state, post: action.post, loading: false};
            return newState;
        case RECEIVE_COMMENTS:
            console.log('ACTION',action.comments);
            return {...state, comments: action.comments, loading: false};
        default:
            return state;
    }
};
