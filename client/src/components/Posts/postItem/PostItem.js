import React from 'react';
import {Card,
        CardActions,  
        CardMedia, 
        Button,
        Avatar} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import { deletePosts, likePosts } from '../../../actions/posts';
import ReadMoreReact from 'read-more-react';


import useStyles from './PostItem.style';

const PostItem = ({post, setCurrentId}) => {
  const classes = useStyles();
  const dispatch = useDispatch(); 
  const user = JSON.parse(localStorage.getItem('profile'));
  const content = `" ${post.message} "`;


  
  const Likes = () => {
    //if someone gave like
    if(post.likes.length > 0){
      return post.likes.find(like => like === (user?.result?.googleId || user?.result?._id)) 
      ? (
         <div className = {classes.commonBody1}>
          <FavoriteIcon fontSize = "small" className = {classes.favoriteIcon}/> 
          &nbsp;<p className = {classes.likecommon}>{post.likes.length > 2 ? `Liked by You and ${post.likes.length -1} others`: `${post.likes.length} like${post.likes.length > 1 ? 's': ''}`}</p> 
        </div>
      ) : (
        <div className = {classes.commonBody1}>
          <FavoriteBorderOutlinedIcon className = {classes.favoriteIcon} fontSize = "small"/> 
            <p className = {classes.likecommon}>&nbsp;{post.likes.length === 1 ? 'Like' : 'Likes'}</p>
        </div>
      )
    }

  return <div className = {classes.commonBody1}>
            <FavoriteBorderOutlinedIcon fontSize = "small" className = {classes.favoriteIcon}/>
            <p className = {classes.likecommon}> &nbsp;Like</p>
         </div>
  }

  return(
    <Card className = {classes.card}>
      <div className = {classes.userInfo}> 
        <Avatar alt="user's name" src={post.name}>{post.name.charAt(0)}</Avatar>
        <div className = {classes.overlay}>
          <h5 className = {classes.h5}> {post.name}</h5>
          <p className = {classes.p}>{moment(post.createAt).fromNow()}</p>
        </div>
      </div>
      <CardMedia className = {classes.media} image = {post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}/>


      <CardActions className = {classes.cardActions}>
        {/* disabled: dont allows user who not logged in like the post; */}
        <Button color = "primary" disabled = {!user?.result} onClick = {() => dispatch(likePosts(post._id))}>
           <Likes/>
        </Button>

        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && 
        <Button size = "small" color = "primary" onClick = {() => dispatch(deletePosts(post._id))} className={classes.deleteIcon}>
          <DeleteOutlineIcon fontSize = "small"/>
        </Button>}
      </CardActions>

      
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && 
        <div className = {classes.overlay2}>
          <Button style = {{color : '#fff'}} size = "small" onClick = {() => setCurrentId(post._id)} >
            <MoreHorizIcon fontSize = "default" className={classes.MoreHorizIcon}/>
          </Button>
        </div>}

      
      {/* <Typography className= {classes.title} variant = "h6"  gutterbuttom = "true" color = "textSecondary">{post.title}</Typography> */}
      <div className = {classes.contents}>
          {
            post.message.length < 50 
            ?
            <p>" {post.message} "</p>
            :
            <ReadMoreReact text = {content} min = {50} max = {100} ideal = {90}  readMoreText="...(read more)" className = {classes.readmore}/>
          }
          <p className ={classes.tag}>{post.tags.map(tag => ` #${tag}`)}</p>
      </div>
    </Card>
  )
}

export default PostItem;