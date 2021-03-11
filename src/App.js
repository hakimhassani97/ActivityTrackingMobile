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
import WHome from './Web/WHome';
import Stats from './Web/Stats';
import Step from './Web/Step';
import Sitting from './Web/Sitting';
import Temp from './Web/Temp';
import Door from './Web/Door';

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
          <PrivateRoute path={[Routes.base_web, Routes.whome]} exact component={()=>{
              setTitle('List of the elderly')
              return <WHome></WHome>
            }}>
          </PrivateRoute>
          <PrivateRoute path={[Routes.wstats+'/:uid']} exact component={(props)=>{
              setTitle('Stats of the elderly')
              return <Stats {...props}></Stats>
            }}>
          </PrivateRoute>
          <PrivateRoute path={[Routes.wsitting+'/:uid']} exact component={(props)=>{
              setTitle('Sitting tracking of the elderly')
              return <Sitting {...props}></Sitting>
            }}>
          </PrivateRoute>
          <PrivateRoute path={[Routes.wstep+'/:uid']} exact component={(props)=>{
              setTitle('Walk tracking of the elderly')
              return <Step {...props}></Step>
            }}>
          </PrivateRoute>
          <PrivateRoute path={[Routes.wtemp+'/:uid']} exact component={(props)=>{
              setTitle('Temperature tracking')
              return <Temp {...props}></Temp>
            }}>
          </PrivateRoute>
          <PrivateRoute path={[Routes.wdoor+'/:uid']} exact component={(props)=>{
              setTitle('Door opening tracking')
              return <Door {...props}></Door>
            }}>
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
}

export {TitleBehaviour, history}
export default App;
