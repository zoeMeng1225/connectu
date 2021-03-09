import * as api from '../api/index.js';
import {CREATE, 
        UPDATE, 
        DELETE, 
        LIKEPOST, 
        FETCH_ALL} from '../constants/actionsTypes';


//Action Creators
export const getPosts = () => async (dispatch) => {
  try{
    const {data} = await api.fetchPosts();
    dispatch({type: FETCH_ALL, payload: data});
    
  }catch(error){ 
    console.log(error.message);
  }
}

export const createPosts = post => async(dispatch) => {
  try{
    const {data} = await api.createPost(post);
    dispatch({type: CREATE, payload: data});

  }catch(error){
    console.log(error.message);
  }
}

export const updatePosts = (id, post) => async(dispatch) => {
  try{
    const {data} = await api.updatePost(id, post);
    dispatch({type: UPDATE, payload: data});
  }catch(error){
    console.log(error.message);
  }
}

export const deletePosts = id => async(dispatch) => {
  try{
    await api.deletePosts(id);
  
    dispatch({type: DELETE, payload: id});
  }catch(error){
    console.log(error.message);
  }
}

export const likePosts = id => async(dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try{
    const { data } = await api.likePost(id, user?.token);  
    dispatch({type: LIKEPOST, payload: data});
  }catch(error){
    console.log(error.message);
  }
}