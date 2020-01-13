import axios from "axios";
import * as actions from './actionTypes';

//Authentication

export const signUp = (data, history) => async dispatch => {
    console.log(data);
    let [response, responseErr] = await handle(axios.post('/signup', data));
    if (response) {
        const FBIdToken = `Bearer ${response.data.token}`;
        localStorage.setItem('FBIdToken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
        dispatch(getUserData(history));
        dispatch({ type: actions.AUTH_SUCCESS });
        history.push('/');
    }

    if (responseErr) {
        console.error(responseErr.response.data);
    }
}

const handle = (promise) => {
    return promise
        .then(data => ([data, undefined]))
        .catch(error => Promise.resolve([undefined, error]));
}

export const signIn = (data, history) => async dispatch => {

    let [response, responseErr] = await handle(axios.post('/login', data));

    if (response) {
        const FBIdToken = `Bearer ${response.data.token}`;
        localStorage.setItem('FBIdToken', FBIdToken);
        //Set authorization header with jwt token
        axios.defaults.headers.common['Authorization'] = FBIdToken;
        dispatch(getUserData(history));
        dispatch({ type: actions.AUTH_SUCCESS });
        history.push('/');
    }

    if (responseErr) {
        dispatch({ type: actions.AUTH_FAIL, payload: responseErr.response.data });
    }

}

export const signOut = (history) => {
    localStorage.removeItem('FBIdToken');
    history.push('/login');
    return {
        type: actions.UNAUTH_SUCCESS
    }
}

//USER

export const getUserData = (history) => async dispatch => {
    let [response, responseErr] = await handle(axios.get('/user'));
    if (response) {
        dispatch({ type: actions.SET_USER, payload: response.data });
    }
    if (responseErr) console.error(responseErr.response);
}

//POST

export const addPost = data => async dispatch => {
    // instance.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
    let [response, responseErr] = await handle(axios.post('/post', data));
    if (response) {
        dispatch({ type: actions.ADD_POST, payload: response.data })
    }
    if (responseErr) console.error(responseErr.response);
}

export const getPosts = data => async dispatch => {
    let [response, responseErr] = await handle(axios.get('/posts'));
    if (response) {
        dispatch({ type: actions.GET_POSTS, payload: response.data })
    }
    if (responseErr) console.error(responseErr.response);
}