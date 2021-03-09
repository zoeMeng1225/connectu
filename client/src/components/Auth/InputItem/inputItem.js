import React from 'react';
import {TextField, Grid, InputAdornment, IconButton} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const InputItem = ({name, label, half, handleChange, type, autoFocus, handleShowPassword}) => {
  return(
      <Grid item xs = {12} sm = {half ? 6 : 12} >
        <TextField 
          name = {name}
          label = {label} 
          onChange = {handleChange} 
          autoFocus = {autoFocus} 
          type = {type}
          fullWidth
          required
          variant = "outlined"
          InputProps = {name === 'password' ? {
            endAdornment: (
              <InputAdornment position = "end">
                <IconButton onClick = {handleShowPassword}>
                  {type === 'password' ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                </IconButton>
              </InputAdornment>
            )}: null}
          />
      </Grid>
  )
} 

export default InputItem;