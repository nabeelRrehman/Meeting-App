import React, { Component } from 'react';
import './App.css';
import Routers from '../Router/routes';
import {Provider} from 'react-redux'
import store from '../store'

class App extends Component {


  render() {
    return (
      <div className="App">

        <Provider store={store}>
          <Routers />
        </Provider>

      </div>
    );
  }
}

export default App;
