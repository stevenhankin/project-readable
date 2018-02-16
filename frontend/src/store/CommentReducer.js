import {RECEIVE_COMMENTS, MODIFY_COMMENT_SUCCESS, RECEIVE_COMMENT} from './types'

export const reducer = (state = {comments: {}}, action) => {
    switch (action.type) {

        case RECEIVE_COMMENTS:
            const objOfComments = action.comments.reduce((acc, comment) => {
                acc[comment.id] = comment;
                return acc;
            }, {});
            return {
                ...state,
                comments: objOfComments,
                modified: action.modified
            };

        case RECEIVE_COMMENT:
            let comment = {};
            comment[action.comment.id] = action.comment;
            return {
                ...state,
                modified: action.modified, comments: {...state.comments, ...comment}
            };

        case MODIFY_COMMENT_SUCCESS:
            /*
            Merge updated comment into comments
             */
            let newComment = {};
            newComment[action.comment.id] = action.comment;
            return {
                ...state,
                modified: action.modified,
                newCommentId: action.comment.id,
                comments: {...state.comments, ...newComment}
            };

        default:
            return state;
    }
};
