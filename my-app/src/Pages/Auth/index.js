import React from 'react';
import Header from '@Components/Header/index.js';
import Login from './Login/index.js';
import Register from './Register/index.js';
import './index.css';

const Auth = () =>{
 return (<>
    <Header />
    <div className="auth-view">
      <div className="auth-container"><Login /></div>
      <div className="auth-container"><Register /></div>
    </div>
 </>);
};

export default Auth;