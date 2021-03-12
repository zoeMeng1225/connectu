import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import InputItem from './InputItem/inputItem';
import {signin, signup} from '../../actions/auth';

import useStyles from './Auth.style';
import Icon from './Icon';



const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassWord, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({firstName: '', 
                                            lastName: '', 
                                            email: '', 
                                            password: '', 
                                            comfirmPassword: ''});
  const dispatch = useDispatch(); 
  const history = useHistory();
  const classes = useStyles();


  const handleSubmit = e => {
    e.preventDefault(); 

    //sign up
    if(isSignUp){
      dispatch(signup(formData, history));
    }else{ //sign in
      dispatch(signin(formData,history));
    } 
  }

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const switchMode = () => {
    setIsSignUp(prevIsSignup => !prevIsSignup);
    setShowPassword(false);
  }
  

  const handleShowPassword = () => {
    setShowPassword(!showPassWord);
  }
  
  const googleSuccess = async res => {
    //?.: 允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效, 操作符的功能类似于 . 链式操作符，不同之处在于: 在引用为空 或者 undefined的情况下不会引起错误, 该表达式短路返回值是 undefined。
    const result = res?.profileObj;
    const token = res?.tokenId;

    //try...catch 可以测试代码中的错误。
    try{
      dispatch({type : 'AUTH', data: {result, token}});
      //redirect back the home
      history.push('/');
    }catch(error){ 
      console.log(error)
    }

  }
  const googleFailure = error => {
    console.log(error);
  }

  return(
    <Container component = "main" maxWidth = "xs" >
      <Paper className = {classes.paper} elevation= {3}>
        <Typography variant = "h6">{isSignUp ? 'Sign Up' : 'Log into ConnectU'}</Typography>
        <form className = {classes.form} onSubmit = {handleSubmit}>
          <Grid container spacing={2}>
            {//&&: only isSignup , then ....
              isSignUp && (
                <>
                  <InputItem name = "firstName" label = "First Name" handleChange = {handleChange} autoFocus half autoComplete/>
                  <InputItem name = "lastName" label = "Last Name" handleChange = {handleChange} half autoComplete/>
                </>
              )}
              <InputItem name = "email" label = "email" handleChange = {handleChange} type = "email" autoComplete/>

              <InputItem 
                name = "password" label = "Password" handleChange = {handleChange} type = {showPassWord ? "text" : "password"} autoComplete="password" handleShowPassword = {handleShowPassword} />
                {
                  isSignUp && 
                    <InputItem name = "comfirmPassword" label = "Comfirm Password" type = "password" handleChange = {handleChange} autoComplete="comfirmPassword"/>
                }
              </Grid>
            
              <Button type = "submit" fullWidth variant = 'contained' color = "secondary" className = {classes.submit}>
                {
                  isSignUp ? 'Sign Up' : 'Login'
                }
              </Button>
              {
                !isSignUp &&  <GoogleLogin
                clientId = "640400566021-foj5ntqeig4skcqjr4crf8qs990c0ft0.apps.googleusercontent.com"
                render = {renderProps => (
                  <Button className = {classes.googleButton} onClick = {renderProps.onClick} fullWidth color = "secondary" disabled = {renderProps.disabled} startIcon = {<Icon/>} variant = "outlined" > Sign in with Google </Button>
                )}
                onSuccess = {googleSuccess}
                onFailure = {googleFailure}
                cookiePolicy = 'single_host_origin'
              />
              }
             
       
          <Grid container justify = "flex-end">
                <Grid item>
                    {
                      isSignUp ?
                      <div style= {{fontSize: ".8em"}}>Already have an account? 
                        <Button onClick = {switchMode} style= {{fontSize: ".8em"}}>
                          <span style = {{color: "#d91861"}}>Sign in</span>
                        </Button>
                      </div>: 
                      <div style= {{fontSize: ".8em"}}>Don't have an account, 
                        <Button onClick = {switchMode} style= {{fontSize: ".8em"}}> 
                          <span style = {{color: "#d91861"}}>Sign up</span>
                        </Button>
                      </div>
                    }
                </Grid>
          </Grid>
        </form>
      </Paper>

    </Container>
  ) 
}

export default Auth;