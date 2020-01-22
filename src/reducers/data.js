import * as actions from '../actions/actionTypes';

const initialState = {
    loading: false,
    posts: [],
    post: {}
};

let posts;

export const data = (state = initialState, { payload, type }) => {
    switch (type) {
        case actions.LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case actions.GET_POSTS:
            return {
                ...state,
                posts: [...payload],
                loading: false
            }
            break;
        case actions.GET_POST:
            return {
                ...state,
                post: { ...payload },
                loading: false
            }
            break;
        case actions.ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts]
            }
            break;
        case actions.ADD_COMMENT:

            posts = state.posts.map((post) => {
                return post.postId === payload.postId ?
                    { ...post, commentCount: post.commentCount + 1 }
                    : post;
            });

            let post = {
                ...state.post,
                comments: [...state.post.comments, payload.comment],
                commentCount: state.post.commentCount + 1
            };

            return {
                ...state,
                post,
                posts
            }

            break;
        case actions.ADD_LIKE:
            console.log(payload.postId);
            posts = state.posts.map((post) => {
                return post.postId === payload.postId ? payload : post;
            });
            return {
                ...state,
                posts
            }
            break;
        default:
            break;
    }

    return state;
}