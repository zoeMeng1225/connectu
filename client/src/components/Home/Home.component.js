import React, {useState, useEffect} from 'react';
import useStyles from './Home.style';
import {getPosts} from '../../actions/posts';

import {Container, Grow, Grid} from '@material-ui/core';
import {useDispatch} from 'react-redux';

import Post from '../Posts/Post.component';
import Form from '../Form/Form.component';

const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch])

  return(
    <Grow in>
        <Container className = {classes.containerBody}>
          <Grid className= {classes.mainContainer} container justify = "space-between" alignItems="stretch" spacing= {3}>
            <Grid item xs = {12} sm = {7}>
              <Post setCurrentId = {setCurrentId}/>
            </Grid>
            <Grid item xs = {12} sm = {4}>
              <Form currentId = {currentId} setCurrentId = {setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
} 

export default Home;