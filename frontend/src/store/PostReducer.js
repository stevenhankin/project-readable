import {RECEIVE_POSTS, RECEIVE_POST, DELETE_POST_SUCCESS} from './PostActions'

export const reducer = (state = {posts: [], post: {}, loading: true}, action) => {
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
                loading: false
            };
        case RECEIVE_POST:
            return {...state, post: action.post, loading: false};
        case DELETE_POST_SUCCESS:
            return {...state, deleted: true};
        default:
            return state;
    }
};
