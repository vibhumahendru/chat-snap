import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Login from './login.js'
import Snapchat from './snapchat.js'

class App extends Component {


  onTakePhoto=(dataUri)=>{
    console.log(dataUri);
    this.setState({
      currentImage:dataUri
    })
  }

  render() {

    return (
      <Router>
      <>
      <div className="App">
        <Route path='/login' exact component={Login} />
        <Route path='/main' exact component={Snapchat} />

      </div>
      </>
      </Router>
    );
  }
}



export default App;
