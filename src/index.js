import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './store/reducers';
const store = createStore(reducers);


//const routes = makeMainRoutes();

const app = (
  <Provider store ={store} >
    <App />
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
