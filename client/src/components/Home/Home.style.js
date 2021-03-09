import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  containerBody:{
    padding:'0'
  },


  //只为一个尺寸的断点给属性；
  [theme.breakpoints.down('sm')]: {
    mainContainer:{
      flexDirection: 'column-reverse',
    }
  }
}))