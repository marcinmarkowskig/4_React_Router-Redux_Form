//ACTION CREATOR - GET - ściągnięcie postów
import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=Wr20'

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}


//ACTION CREATOR - wysłanie postów do API
export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(() => callback());

  return {
    type: CREATE_POST,
    payload: request
  };
}

//ACTION CREATOR - ściągnięcie konkretnego posta
export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}


//ACTION CREATOR - usunięcie posta
export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
  .then(() => callback());

  return {
    type: DELETE_POST,
    payload: id
  }
}
