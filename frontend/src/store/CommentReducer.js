import {RECEIVE_COMMENTS,MODIFY_COMMENT_SUCCESS, RECEIVE_COMMENT} from './CommentActions'


export const reducer = (state = {comments: [], comment:{}, loading: true}, action) => {
    switch (action.type) {

        case RECEIVE_COMMENTS:
            console.log('ACTION',action.comments);
            return {...state, comments: action.comments, loading: false};
        case RECEIVE_COMMENT:
            console.log('NOT MODIFY',state,action)
            return {modifiedOK:false, comment: action.comment };

        case MODIFY_COMMENT_SUCCESS:
            console.log('MODIFIED!',state,action)
            return {modifiedOK:true, comment: action.comment  };

        default:
            return state;
    }
};
