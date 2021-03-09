import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(() => ({
   appBar: {
    marginBottom: '2em',
    paddingTop: '1em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'transparent',
    boxShadow: 'none',
  },

  heading: {
    color: '#e7186f',
  },

  image: {
    marginLeft: '15px',
  },

  brandContainer:{
    justifyContent: 'center',
    display : 'flex',
  },

  profile:{
    display: 'flex',
    justifyContent: 'space-between',
    width: '15em',
  },
}))