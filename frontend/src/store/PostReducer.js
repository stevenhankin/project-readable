import {RECEIVE_POSTS, RECEIVE_POST, DELETE_POST_SUCCESS, CREATE_POST_SUCCESS,UPDATE_POST_SUCCESS} from './types'

export const reducer = (state = {posts: {}, loading: true}, action) => {
    switch (action.type) {


        case RECEIVE_POSTS:
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
            const thisPost = {};
            thisPost[action.post.id] = action.post;
            return {...state, posts: {...state.posts, ...thisPost}, modified:false};

        case DELETE_POST_SUCCESS:
        case UPDATE_POST_SUCCESS:
            return {...state, modified: true};

        case CREATE_POST_SUCCESS:
            const newPost = {};
            newPost[action.post.id] = action.post;
            return {...state,posts: {...state.posts, ...newPost}, modified: true, createdPostId: action.post.id};

        default:
            return state;
    }
};
