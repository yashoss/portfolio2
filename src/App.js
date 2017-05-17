import React, { Component } from 'react';
import Home from './Home';
import Projects from './Projects';
import About from './About';
import Contact from './Contact';
import { hashHistory } from 'react-router';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router history={ hashHistory }>
        <div className="App">
          <Link to="/"><img src="http://res.cloudinary.com/dzjhhor8g/image/upload/v1494707456/yh_logo_sz546i.png" className="logo" id="yh" alt="Y.H logo"></img></Link>
          <Route exact path="/" component={ Home } />
          <Route path="/projects" component={ Projects } />
          <Route path="/about" component={ About } />
          <Route path="/contact" component={ Contact } />
        </div>
      </Router>
    );
  }
}

export default App;
