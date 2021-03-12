import React, {useState, useEffect}from 'react';
import {Link, useHistory, useLocation } from 'react-router-dom';
import {Avatar, Typography, Button,Grid } from '@material-ui/core';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
import useStyle from './NavBar.style';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Logo from '../../assets/connectU-logo1.svg';


const NavBar = () => {
  const classes = useStyle();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const disPatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

 
  const logout = () => {
    disPatch({type: 'LOGOUT'})
    history.push('/auth'); // go back to login/ signup page
    setUser();
  }
  

  useEffect(() => {
    const token = user?.token;

    if(token){
      const decodedToken = decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()){
        logout();
      }

    }
    //JWT
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location])


  return(
    <Grid className= {classes.appBar}  position = "static" color = "inherit" container >
      <Grid className = {classes.brandContainer} item xs = {4}>
        <Link to = "/"><img className={classes.image} src={Logo} alt="icon" height="60"/>
       </Link>
      </Grid>
       
      {
        location.pathname !== '/auth' ? 
        <Grid item xs = {7}>
        {user ? (
          <div className = {classes.profile}>
            <div className = {classes.profileFlex}>
              <Avatar className = {classes.avater} alt = {user.result.name} src = {user.result.name}>{user.result.name.charAt(0)}</Avatar>
              <Typography className = {classes.userName} variant = "h6">{user.result.name}</Typography>
            </div>
            <Button variant = "contained" className = {classes.logout} onClick = {logout}>Log out</Button>
          </div> )
          : null }
      </Grid> 
      : 
      <Link to = "/" className = {classes.back}>
        <ArrowBackIcon/>
        <p className = {classes.backChild}>Back</p>       
      </Link>
      }
    </Grid>
  )
}

export default NavBar