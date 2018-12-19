import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Route, Router } from 'react-router-dom';
import './App.css';
import Home from './containers/Home/Home';
import Callback from './containers/Callback/Callback';
import Auth from './containers/Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: null
    }
  }


  // goTo(route) {
  //   this.props.history.replace(`/`)
  // }

  login() {
    auth.login();
  }

  logout() {
    auth.logout();
  }

  componentDidMount() {
    const { renewSession } = auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = auth;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
           
              <Button
                bsStyle="primary"
                className="btn-margin"

              >
                Home
              </Button>
            {
              !isAuthenticated() && (
                  <Button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    id="qsLogoutBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
            
          </Navbar.Header>
        </Navbar>
        <Router history={history}>
          <div>
              <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
              <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} /> 
              }}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
