import React, { useState, useEffect } from 'react';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPosts, updatePosts} from '../../actions/posts';
import {useSelector} from 'react-redux';


import makeStyles from './Form.style';

const Form = ({currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({title: '', message: '', tags:'', selectedFile: '' });
  //only want current posts
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const classes = makeStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));



  useEffect(() => {
    if(post){
      setPostData(post);
    } 
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPosts({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updatePosts(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  //no current logged in user
  if(!user?.result?.name){
    return (
      <Paper className = {classes.paper}>
        <Typography variant = "h6" align = "center">
          Please Sign in and create your own events...
        </Typography>
      </Paper>
    )
  }


  //after we updated, and the form should be cleared.
  const clear = () => {
    setCurrentId(0);
    setPostData({title: '', message: '', tags:'', selectedFile: '' })

  }

  return(
    <Paper className = {classes.paper}>
      <form autoComplete = "off" noValidate className = {`${classes.root} ${classes.form}`} onSubmit = {handleSubmit}>
        
        <Typography variant = "h6">{currentId ? 'Editing' : 'Create'} a event</Typography>
        <TextField name = "title" variant = "outlined" label = "Title" fullWidth value = {postData.title} onChange = {e => setPostData({...postData, title: e.target.value})}/>
        <TextField name = "message" variant = "outlined" label = "Message" fullWidth value = {postData.message} onChange = {e => setPostData({...postData, message: e.target.value})}/>
        <TextField name = "tags" variant = "outlined" label = "Tags" fullWidth value = {postData.tags} onChange = {e => setPostData({...postData, tags: e.target.value.split(',')})}/>
        <div className = {classes.fileInput}> <FileBase type = "file" multiple = {false} onDone = {({base64}) => setPostData({...postData, selectedFile: base64})} />
        </div>
        <Button className = {classes.buttonSubmit} variant = "contained" color = "primary" size ="large" type ="submit" fullWidth>Submit</Button>
        <Button variant = "contained" color = "secondary" size ="small" type ="submit" onClick = {clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form; 