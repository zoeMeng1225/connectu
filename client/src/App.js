import React from 'react';
import {Container} from '@material-ui/core';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import useStyle from './style';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home.component';
import Auth from './components/Auth/Auth.component';

const App = () => {
  const classes = useStyle();

  return(
    <BrowserRouter>
      <Container className = {classes.bodyContainer}>
        <NavBar/>
          <Switch>
            <Route path = "/" exact component= {Home}/>
            <Route path = "/auth" exact component= {Auth}/>
          </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App;