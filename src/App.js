import React, {useState, useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import {observer} from 'mobx-react-lite'
import Header from "./Components/Header";
import Clients from "./Components/Clients/Clients";
import Actions from './Components/Actions/Actions'
import Analytics from './Components/Analytics/Analytics'

import {ClientsConext} from './Store/ClientsStore'
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

export const App = observer((props) => {
  
  // props.history.push('/bla')
  console.log("store value is ", props)
  return (
    <Router>
      <div className="App">
        <Header  />
        <Route exact path="/clients" render={() => <Clients />} />
        <Route exact path="/actions" render={() => <Actions />} />
        <Route exact path="/analytics" render={() => <Analytics />} />
      </div>
    </Router>
  );
})

// export default (App)
