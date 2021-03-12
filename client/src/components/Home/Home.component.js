import React, {useState, useEffect} from 'react';
import useStyles from './Home.style';
import {getPosts} from '../../actions/posts';

import Post from '../Posts/Post.component';
import Form from '../Form/Form.component';

import {Grow, Grid, IconButton} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import AddBoxIcon from '@material-ui/icons/AddBox';



const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const [show, setShow] = useState({isToggleOn: true});
  const user = JSON.parse(localStorage.getItem('profile'));

  console.log()

  
  const handleAdd = () => {
    setShow(e => ({
      isToggleOn: !e.isToggleOn
    }))
  }

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch])

  return(
    <Grow in>
        <div className = {classes.containerBody1}>
          <Grid className= {classes.mainContainer} container justify = "space-between" alignItems="stretch" spacing= {3}>
            <Grid item xs = {12} sm = {9}>
              <Post setCurrentId = {setCurrentId}/>
            </Grid>
            <Grid item xs = {12} sm = {3}>
              <Form currentId = {currentId} setCurrentId = {setCurrentId} className = {classes.form} show = {show}/>
            </Grid>
          </Grid>
          <IconButton className = {classes.bottomNav} onClick = {handleAdd} variant="contained" color="primary" disabled={!user} >
             <AddBoxIcon className = {classes.addBtn} fontSize ="large" />
          </IconButton>
        </div>
    </Grow>
  )
} 

export default Home;