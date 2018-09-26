import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import NavBar from './Components/NavBar';
import FooterPage from './Components/FooterPage';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import Contact from './Components/Contact';
import About from './Components/About';
import Login from './Components/Login';
import Home from './Components/Home';
import Question from './Components/Question';
import ResponseDare from './Components/ResponseDare'
import SocialShare from './Components/SocialShare';
import ResponsePlayer from './Components/ResponsePlayer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <NavBar />
      <FooterPage />  
      </div>
      </BrowserRouter>

    );
  }
}

export default App;
