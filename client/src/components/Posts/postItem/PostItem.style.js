import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 'auto',
    paddingTop: '56.25%',
  },

  userInfo:{
    display:'flex',
    padding:'1em',
  },

  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },

  h5:{
    fontWeight:'600',
  },

  p:{
    fontWeight:'200',
    fontSize:'.6em',
    color: 'gray',
  },



  overlay: {
   marginLeft:'.5em'
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '0',    
  },
  grid: {
    display: 'flex',
  },

  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  MoreHorizIcon:{
    color:'#e7186f',
  },
  likecommon:{
    fontSize:'.8em',
    color:'#262626',
    textTransform: 'capitalize'
  },
  favoriteIcon:{
    color: '#e7186f',
  },
  commonBody:{
    display: 'block',
    textAlign: 'left',
  },
  commonBody1:{
    display: 'flex',
  },

  deleteIcon:{
    color: '#e7186f',
  },
  contents:{
    paddingRight:'1.5em',
    paddingLeft:'1.5em',
    paddingBottom:'1.5em',
    wordBreak: 'break-word',
    fontSize:'.8em'
  },
  tag:{
    color:'#254270',
    fontWeight:'200'
  },
});
