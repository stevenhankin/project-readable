import {RECEIVE_POSTS, RECEIVE_POST, DELETE_POST_SUCCESS, CREATE_POST_SUCCESS,UPDATE_POST_SUCCESS} from './PostActions'

export const reducer = (state = {posts: {}, loading: true}, action) => {
    console.log('STATE IS SET TO', state);
    switch (action.type) {

        case RECEIVE_POSTS:
            console.log('RECEIVE_POSTS', action.posts);
            const objOfPosts = action.posts.reduce((postsAcc, post) => {
                postsAcc[post.id] = post;
                return postsAcc;
            }, {});
            return {
                ...state,
                posts: objOfPosts,
                modified: false,
                loading: false
            };
        case RECEIVE_POST:
            const newPost = {};
            newPost[action.post.id] = action.post;
            return {...state, posts: {...state.posts, ...newPost}, modified:false};
        case DELETE_POST_SUCCESS:
        case CREATE_POST_SUCCESS:
        case UPDATE_POST_SUCCESS:
            return {...state, modified: true};
        default:
            return state;
    }
};
