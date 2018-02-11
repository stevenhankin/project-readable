import {RECEIVE_POST, DELETE_POST_SUCCESS} from './actions'

export const reducer = (state = {post: {}, loading: true}, action) => {
    switch (action.type) {
        case RECEIVE_POST:
            const newState = {...state, post: action.post, loading: false};
            return newState;
        case DELETE_POST_SUCCESS:
            console.log('ACTION',action.post);
            return {...state, deleted:true};
        default:
            return state;
    }
};
