import {CREATE, 
  UPDATE, 
  DELETE, 
  LIKEPOST, 
  FETCH_ALL} from '../constants/actionsTypes';
  

export default (posts =[], action) => {
  switch(action.type){
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      return posts.map(post => post._id === action.payload._id ? action.payload : post );
    case DELETE:
      return posts.filter(post => post._id !== action.payload);
    case LIKEPOST:
      return posts.map(post => post._id === action.payload._id ? action.payload : post );
    default: 
      return posts;
  }
};