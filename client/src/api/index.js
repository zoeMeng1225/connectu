import axios from 'axios';

const API = axios.create({baseURL : 'https://connectu-backend.herokuapp.com/'});

//help middleware run
//it will be happened before all of requests. 
API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
})


export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch( `/posts/${id}`, updatedPost);
export const deletePosts = id => API.delete(`posts/${id}`);
export const likePost = id => API.patch(`posts/${id}/likePost`);

export const signIn = formData => API.post('/users/signin', formData);
export const signUp = formData => API.post('/users/signup', formData); 