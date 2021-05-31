/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { BrowserRouter } from 'react-router-dom';
import Routes from './components/routes/Routes'
import { AuthProvider } from './libs';
Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
