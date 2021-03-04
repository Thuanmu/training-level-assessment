import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from "react-redux";
import { createStore } from "redux";
import Header from "./components/layout/header/header";
import Footer from "./components/layout/footer/footer";


ReactDOM.render(
  <BrowserRouter>
    {/* <Provider> */}
      <App/>
    {/* </Provider> */}
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
