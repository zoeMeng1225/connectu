import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  containerBody1:{
    marginLeft:'3%',
    marginRight:'3%',
    padding:'0',
    maxWidth:'100vw',
    marginTop:'8em',
  },

  bottomNav:{
    height: 'content-fit',
    position: 'fixed',
    bottom: '3%',
    right:'5%',
    display: 'flex',
    justifyContent:'center',
    zIndex:'100',
    border:'none',
    padding: '.5em',
    borderRadius:'10px',
  },

  

  //只为一个尺寸的断点给属性；
  [theme.breakpoints.down('sm')]: {
    mainContainer:{
      flexDirection: 'column-reverse',
    },
  }, 

  [theme.breakpoints.up('md')]: {
    bottomNav:{
      display:'none'
    }
  },  

}))