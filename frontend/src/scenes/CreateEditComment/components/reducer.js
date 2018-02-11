import {RECEIVE_COMMENT} from './actions'

export const reducer = (state = {comment: {}, loading: true}, action) => {
    switch (action.type) {
        case RECEIVE_COMMENT:
            const newState = {...state, comment: action.comment, loading: false};
            return newState;
        default:
            return state;
    }
};
