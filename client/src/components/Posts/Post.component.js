import React from 'react';
import {Grid, CircularProgress} from '@material-ui/core';
import PostItem from './postItem/PostItem';
import {useSelector} from 'react-redux';

import useStyles from './Post.style';

const Post = ({setCurrentId}) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  
  return(
    !posts.length ? <CircularProgress/> : (
        <Grid className = {classes.container} container alignItems = "stretch" spacing = {2}>
          {posts.map(post => (
            <Grid key = {post._id} item xs = {12} sm = {4} >
              <PostItem post = {post} setCurrentId = {setCurrentId}/>
            </Grid>
          ))}
        </Grid>
    )
  )
}

export default Post; 