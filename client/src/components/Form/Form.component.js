import React, { useState, useEffect } from 'react';
import {TextField, Button, Paper, Grid, Avatar} from '@material-ui/core';
import {Link} from 'react-router-dom';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPosts, updatePosts} from '../../actions/posts';
import {useSelector} from 'react-redux';


import makeStyles from './Form.style';

const Form = ({currentId, setCurrentId, show}) => {
  const [postData, setPostData] = useState({title: '', message: '', tags:'', selectedFile: '' });
  //only want current posts
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const classes = makeStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const posts = useSelector(state => state.posts);
  const userPost = posts.map(post => post?.creator === user?.result?._id);
  const userPostLength = userPost.filter(post => post).length;


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
      alert('posted successfully')
    } else {
      dispatch(updatePosts(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  //no current logged in user
  if(!user?.result?.name){
    return (
      <Paper className = {classes.paper1}>
        <h4 className = {classes.paperh4}>Post your event</h4>

        <p className = {classes.paperp}>Share what an exciting event for free with your family, friends, and people.</p>

        <Button component = {Link} to = "/auth" variant = "contained" className = {classes.loginBtn}>Start your sharing</Button>
      </Paper>
    )
  }

  //after we updated, and the form should be cleared.
  const clear = () => {
    setCurrentId(0);
    setPostData({title: '', message: '', tags:'', selectedFile: '' })
  }

  return(
    <>
    <Paper className = {`${classes.paper} ${!show.isToggleOn ? classes.avtive : classes.inactive} `}>
      <Grid className = {classes.userInfo} container>
        <Grid item xs = {6} sm = {12}>
          <div className = {classes.avatar}>
            <Avatar alt = "name" src = {user.result.name} className = {classes.avatarBorder}>
              {user.result.name.charAt(0)}
            </Avatar>
          </div>
          <h5>{user.result.name}</h5>
        </Grid>
        <Grid className = {classes.pieces} item xs = {6} sm = {12}>
          <div>
              <h5 className = {classes.piecesh5}>{userPostLength}</h5>
              <p className = {classes.piecesp}>Posts</p>
          </div>
          .
          <div>
              <h5 className = {classes.piecesh5}>8</h5>
              <p className = {classes.piecesp}>Following</p>
          </div>
          .
          <div>
              <h5 className = {classes.piecesh5}>98</h5>
              <p className = {classes.piecesp}>Followers</p>
          </div>
        </Grid>
      </Grid>

      <div className = {classes.postContent}>
        <h5>
          Let 's {currentId ? 'Editing' : 'Create'} a event</h5>

          <form autoComplete = "off" noValidate className = {`${classes.root} ${classes.form}`} onSubmit = {handleSubmit}>
            
            <TextField name = "message" variant = "outlined" label = "Message" fullWidth value = {postData.message} multiline rows={4} onChange = {e => setPostData({...postData, message: e.target.value})} className ={classes.inputfield}/>

            <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}className ={classes.inputfield}/>

            <div className = {classes.fileInput}> 
              <FileBase type = "file" multiple = {false} onDone = {({base64}) => setPostData({...postData, selectedFile: base64})} className = {classes.fileInputChild} />
            </div>

            <Button className = {classes.buttonSubmit} variant = "contained" size ="small" type ="submit" fullWidth>Submit</Button>
            <Button className = {classes.buttonClear}  variant = "contained" size ="small" type ="submit" onClick = {clear} fullWidth>Clear</Button>
          </form>
      </div>
    </Paper>
    </>
  )
}

export default Form; 