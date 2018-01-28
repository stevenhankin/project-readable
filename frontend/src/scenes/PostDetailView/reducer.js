import {RECEIVE_POST} from './actions'

export const reducer = (state={post:{},loading:true}, action) => {
    switch (action.type) {
        case RECEIVE_POST:
            console.log('Got a post for id',action.post);
            // const newState= Object.assign({},state,{post:action.post});
            const newState= {...state,post:action.post, loading:false};
            console.log('newState',newState);
            return newState;
        default:
            console.log('DEFAULT')
            return state;
    }
};
