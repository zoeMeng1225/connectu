import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(3),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop:'.5em',
  },
  fileInput: {
    width: '97%',
    margin: '1em 0',

  },
  buttonSubmit: {
    marginBottom: 10,
    background: '#ef4c78',
    color: '#fff',
    border:'1px solid #ef4c78',
  },

  buttonClear:{
    background: 'none',
    border:'1px solid #ef4c78',
    color:'#ef4c78'
  },

  userInfo:{
    textAlign:'center',
    marginBottom:'2em',
    textAlign:'center'
  },
  pieces:{
    display: 'flex',
    marginTop:'1.5em',
    justifyContent:'space-between',
    fontSize: '.8em'
  },

  piecesp:{
    fontSize: '.8em',
    color: 'gray'
  },
  avatar:{
    width: '100%',
    display:'flex',
    justifyContent:'center',
    marginBottom:'.5em',
  },
  avatarBorder:{
    width:'70px',
    height:'70px',
    borderRadius:'50%',
    backgroundImage:'linear-gradient(#ef8577, #ef4c78)',    
  },

  postContent:{
    textAlign:'center',
    marginTop:'3em',
  },

  inputfield:{
    marginLeft:'0 !important',
    marginRight:'0 !important',
  },

  fileInputChild:{
   backgroundColor:'red' 
  },

  paperh4:{
    color:'#150229'
  },

  paperp:{
    color:'#150229',
    fontSize:'.8em',
    marginTop: '1em',
    marginBottom:'3em'
  },

  loginBtn: {
    backgroundColor: '#ef4c78',
    color:'#fff',

  },

  nologin:{
    marginTop:'1em',
    background:'none',
    border:'none',
    boxShadow:'none'
  },

  paper1:{
    padding:'1em'
  },

  [theme.breakpoints.down('xs')]:{
    paper:{
      // display:'block',
      position:'fixed',
      top:'0',
      left:'0',
      zIndex:'99',
      height:'100vh',
    },
    fileInput:{
      paddingTop:'4em'
    },

    avtive: {
      display: 'block'
    },

    inactive:{
      display: 'none'
    }
  },
}))