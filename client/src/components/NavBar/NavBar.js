import React, {useState, useEffect}from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Typography, Button, Toolbar } from '@material-ui/core';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
import useStyle from './NavBar.style';
import Logo from '../../assets/LOGO.png';


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
    <AppBar className= {classes.appBar}  position = "static" color = "inherit">
      <div className = {classes.brandContainer}>
        <img className={classes.image} src={Logo} alt="icon" height="60" />
        <Typography component = {Link} to = "/" className = {classes.heading} variant = "h4" align = "center">ConnectU</Typography>
      </div>
      
      <Toolbar className = {classes.toolbar}>
        {user ? (
          <div className = {classes.profile}>
            <Avatar className = {classes.avater} alt = {user.result.name} src = {user.result.name}>{user.result.name.charAt(0)}</Avatar>
            <Typography className = {classes.userName} variant = "h6">{user.result.name}</Typography>
            <Button variant = "contained" className = {classes.logout} color = "secondary" onClick = {logout}>Log out</Button>
          </div> )
          : (
            <Button component = {Link} to = "/auth" variant = "contained" color = "primary">Login</Button>
          )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar