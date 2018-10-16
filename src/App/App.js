import React, { Component } from 'react';
import './App.css';
import Login from '../Screens/Login/login';
import Home from '../Screens/HomePage/home';

class App extends Component {
  constructor() {
    super()

    this.state = {
      user: true
    }
    this.login = this.login.bind(this)
  }

  componentDidMount() {
    const user = localStorage.getItem('user')

    user && this.setState({ user: true })

  }

  login() {
    this.setState({ user: true })
  }


  render() {
    const { user } = this.state
    return (
      <div className="App">
        {
          !user && <Login login={this.login} />

        }
        {
          user && <Home />
        }
      </div>
    );
  }
}

export default App;
