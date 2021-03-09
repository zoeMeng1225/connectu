import React from 'react';
import {Card,
        CardActions, 
        CardContent, 
        CardMedia, 
        Button, 
        Typography} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import { deletePosts, likePosts } from '../../../actions/posts';

import useStyles from './PostItem.style';

const PostItem = ({post, setCurrentId}) => {
  const classes = useStyles();
  const dispatch = useDispatch(); 
  const user = JSON.parse(localStorage.getItem('profile'));
  
  console.log(post.likes.length)
  console.log(post)

  const Likes = () => {
    //if someone gave like
    if(post.likes.length > 0){
      return post.likes.find(like => like === (user?.result?.googleId || user?.result?._id)) 
      ? (
         <><ThumbUpAltIcon fontSize = "small"/> 
          &nbsp;{post.likes.length > 2 ? `You and ${post.likes.length -1} others likes` : `${post.likes.length} like${post.likes.length > 1 ? 's': ''}`}</>
      ) : (
        <><ThumbUpAltOutlined fontSize = "small"/> &nbsp;{post.likes.length === 1 ? 'Like' : 'Likes'}</>
      )
    }
    return <><ThumbUpAltOutlined fontSize = "small"/> &nbsp;Like</>
  }

  return(
    <Card className = {classes.card}>
      <CardMedia className = {classes.media} image = {post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title = {post.title}/>
      <div className = {classes.overlay}>
        <Typography variant = "h6"> {post.name}</Typography>
        <Typography variant = "body2">{moment(post.createAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && 
        <div className = {classes.overlay2}>
          <Button 
              style = {{color : '#fff'}} 
              size = "small" 
              onClick = {() => setCurrentId(post._id)} >
            <EditOutlinedIcon   fontSize = "default"/>
          </Button>
        </div>}

      
      <div className = {classes.details}>
        <Typography variant = "body2" color = "textSecondary">{post.tags.map(tag => ` #${tag}`)}</Typography>
      </div>
      <Typography className= {classes.title} variant = "h6"  gutterbuttom = "true" color = "textSecondary">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>

      <CardActions className = {classes.cardActions}>
        {/* disabled: dont allows user who not logged in like the post; */}
        <Button size = "small" color = "primary" disabled = {!user?.result} onClick = {() => dispatch(likePosts(post._id))}>
           <Likes/>
        </Button>

        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && 
        <Button size = "small" color = "primary" onClick = {() => dispatch(deletePosts(post._id))}>
          <DeleteIcon fontSize = "small"/>
          Delete
        </Button>}
        
      </CardActions>

    </Card>
  )
}

export default PostItem;