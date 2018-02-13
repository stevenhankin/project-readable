import {RECEIVE_COMMENTS, MODIFY_COMMENT_SUCCESS, RECEIVE_COMMENT} from './CommentActions'

export const reducer = (state = {comments: [], loading: true}, action) => {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            const objOfComments = action.comments.reduce((acc, comment) => {
                acc[comment.id] = comment;
                return acc;
            }, {});
            return {
                ...state,
                comments: objOfComments,
                loading: false
            };

        case RECEIVE_COMMENT:
            let newComment = {};
            newComment[action.comment.id] = action.comment;
            let s = {...state, comments: {...state.comments, ...newComment}};
            return s;

        case MODIFY_COMMENT_SUCCESS:
            console.log('MODIFIED!', state, action)
            return {...state,modifiedOK: true, comment: action.comment};

        default:
            return state;
    }
};
