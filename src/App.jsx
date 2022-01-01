
import React, { useState } from 'react';
import './App.css';
import * as Api from "./api/Api"
import { login } from './api/authentication';
import { Mainapp } from './components/Mainapp';
import { Login } from './components/Login';
const App = () => {
  const [loggedIn, setLogin] = useState(false);
  React.useEffect(()=>{
    if(sessionStorage.tkn && sessionStorage.user)setLogin(true)
    else setLogin(false)
  }, [])

  if(loggedIn) return <Mainapp></Mainapp>
  else return <Login onClick={setLogin}></Login>

  
}

export default App;
