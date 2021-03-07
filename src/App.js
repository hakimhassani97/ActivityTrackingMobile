import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from './Components/Header';
import Routes from './Constantes/Routes';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import { createBrowserHistory } from 'history';
import { PrivateRoute, PublicRoute } from './Helpers/Auth';

let TitleBehaviour = {}
let history = createBrowserHistory()

function App() {
  let [title, setTitle] = useState(null)
  TitleBehaviour.title = title
  TitleBehaviour.setTitle = setTitle
  return (
    <>
      <Router history={history}>
        <Header></Header>
        <Switch>
          <PrivateRoute path={[Routes.base, Routes.base_mobile, Routes.home]} exact component={()=>{
              setTitle()
              return <Home></Home>
            }}>
          </PrivateRoute>
          <PrivateRoute path={Routes.profile} component={()=>{
              setTitle('Profile')
              return <Profile></Profile>
            }}>
          </PrivateRoute>
          <PublicRoute path={Routes.login} component={()=>{
              setTitle('Login')
              return <Login></Login>
            }}>
          </PublicRoute>
          <PublicRoute path={Routes.register} component={()=>{
              setTitle('Register')
              return <Register></Register>
            }}>
          </PublicRoute>
          <PrivateRoute path={Routes.notifications} component={()=>{
              setTitle('Notifications')
              return ''
            }}>
          </PrivateRoute>
          {/* web routes */}
          <PrivateRoute path={[Routes.whome]} exact component={()=>{
              setTitle()
              return <Home></Home>
            }}>
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
}

export {TitleBehaviour, history}
export default App;
