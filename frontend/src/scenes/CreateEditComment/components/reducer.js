import {RECEIVE_COMMENT,MODIFY_COMMENT_SUCCESS} from './actions'

export const reducer = (state ={}, action) => {
    switch (action.type) {
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
