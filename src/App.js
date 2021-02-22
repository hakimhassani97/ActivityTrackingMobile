import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import Header from './Components/Header';
import Routes from './Constantes/Routes';
import Home from './Pages/Home';
import Profile from './Pages/Profile';

let TitleBehaviour = {}

function App() {
  var history = useHistory()
  let [title, setTitle] = useState(null)
  TitleBehaviour.title = title
  TitleBehaviour.setTitle = setTitle
  return (
    <>
      <Router history={history}>
        <Header></Header>
        <Switch>
          <Route path={['', Routes.home]}>
            {()=>{
              setTitle()
              return <Home></Home>
            }}
          </Route>
          <Route path={Routes.profile}>
            {()=>{
              setTitle('Profile')
              return <Profile></Profile>
            }}
          </Route>
          <Route path={Routes.notifications}></Route>
        </Switch>
      </Router>
    </>
  );
}

export {TitleBehaviour}
export default App;
