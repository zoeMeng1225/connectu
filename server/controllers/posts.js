import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';


export const getPosts = async (req, res) => {
  try{
    const postMessage = await PostMessage.find();
    res.status(200).json(postMessage);
  }catch(error){
    res.status(404).json({message: error.message});
  }
}

// export const getPost = async(req,res) => {
//   const {id} = req.body;
//   try {
//     const post = await PostMessage.findById(id);
//   } catch (error) {
//     res.status(404).json({message: error.message});
//   }

// }

export const createPost = async (req, res) => {
  const post = req.body;
  const newPostMessage = new PostMessage({ ...post, creator: req.userId, createAt: new Date().toISOString()})
  // const newPostMessage = new PostMessage({...post});
  try{
    await newPostMessage.save();
    //succeful creation;
    res.status(201).json(newPostMessage);
  }catch(error){
    res.status(409).json({message: error.message});
  }
}

export const deletePost = async (req, res) => {
  const {id} = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).send(`No post with _id: ${id}`);
  }

  await PostMessage.findByIdAndRemove(id);
  res.json({message: 'Post deleted successfully'});
}

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const {title, message, creator, selectedFile, tags} = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).send(`No post with _id: ${id}`);
  }
  
  const updatedPost = {title, message, creator, selectedFile, tags, _id: id};
  await PostMessage.findByIdAndUpdate(id, updatedPost, {new: true})
  
  res.json(updatePost);
}


export const likePost = async(req, res) => {
  const {id} = req.params;
  console.log(req.userId);
  
  if(!req.userId) {
    return res.json({message : 'Unauthenticated' });
  }

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).send(`No post with _id: ${id}`);
  }

  const post = await PostMessage.findById(id); // findById:from mongoose
  const index = post.likes.findIndex(id => id === String(req.userId));
  if(index === -1){
    //like the post
    post.likes.push(req.userId);
  }else{
    //unlike
    post.likes = post.likes.filter(id => id !== String(req.userId)); //String()： convert to String
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
  res.status(200).json(updatedPost);
}