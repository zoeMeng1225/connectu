import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(theme => ({
   appBar: {
    marginBottom: '2em',
    padding: '1em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: 'none',
    backgroundColor: '#ffffff',
    position:'fixed',
    top:'0',
    zIndex:'10',
    left:'0',
    boxSizing: 'border-box'

  },

  image: {
    marginLeft: '15px',
    cursor:'pointer',
    width:'100%'
  },

  brandContainer:{
    width:'100%',
    display: 'flex',
  },

  profile:{
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center'
  },

  profileFlex:{
    display:'flex',
    alignItems: 'center'
  },

  userName:{
    fontSize:'70%',
    marginLeft:'.5em'
  },

  back:{
    display:'flex',
    color: '#254270',
    fontSize:'80%',
    alignItems:'center'
  },
  backChild:{
    marginLeft:'.5em'
  },

  logout:{
    background:'none',
    border:'none',
    boxShadow:'none',
    color: '#ef4c78',
    fontSize:'60%',
    textDecoration:'outlined',
    fontWeight:'100',
  },

  [theme.breakpoints.down('lg')]:{
    appBar:{
      width:'100%',
    }
  }

}))