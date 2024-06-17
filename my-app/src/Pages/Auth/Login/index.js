import React, { useState } from 'react';
import CryptoJS from "crypto-js";
import axios from "axios";

const Login = () =>{
  const initialMessage = { status:'', message:'' };
  const [alertMessage, setAlertMessage] = useState(initialMessage);
  const initialValues = { email: '', pwd: '' };
  const [authData, setAuthData] = useState(initialValues);
  const loginUser = async() =>{
    if(authData?.email?.length>0 && authData?.pwd?.length>0){
      let loginData = { ...authData };
      loginData.pwd = CryptoJS.MD5(authData?.pwd).toString();
      // Make the POST request using Axios
      axios.post(process.env.REACT_APP_USER_LOGIN, loginData).then(function (response) {
        console.log(response.data);
        setAuthData(initialValues);
        setAlertMessage({
          status: response.data?.status==='NOT_MATCHED'?'danger':'success',
          message: response.data?.message
        });
        sessionStorage.setItem('USER_DETAILS', JSON.stringify( response?.data?.data ));
        window.location.href='/dashboard';
      }).catch(function (error) {
        setAlertMessage({
          status: 'danger',
          message: error?.message
        });
        console.error(error);
      });
    } else {
        setAlertMessage({
            status: 'danger',
            message: 'Email Address or Password is Missing.'
          });
    }
  };
  const handleAuthData = (name, value) =>{
    setAuthData({...authData,[name]: value });
  };
 return (<>
      <form>
      <div className="auth-form">
        <div className="auth-form-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-3">
            <div className="auth-title"><b>Login into Account</b></div>
            <div className="auth-subTitle">Access your personal dashboard by logging in.</div>
          </div>
          {alertMessage?.message?.length>0 && (<div className="col-12 mt-3">
            <div className={"alert alert-"+alertMessage?.status+" alert-dismissible"}>
              <button type="button" class="btn-close" data-bs-dismiss="alert" onClick={()=>setAlertMessage( initialMessage )}></button>
              {alertMessage?.message}
            </div>
          </div>)}
          <div className="col-12 mt-3">
            <label className="form-label"><b>Email Address</b></label>
            <input type="email" className="form-control" placeholder="Enter your Email Address" 
              value={authData?.email} autoComplete="login-email" onChange={(event)=>handleAuthData('email',event.target.value)} />
          </div>
          <div className="col-12 mt-3 mb-3">
            <label className="form-label"><b>Password</b></label>
            <input type="password" className="form-control" placeholder="Enter your Password" 
              value={authData?.pwd} autoComplete="current-password" onChange={(event)=>handleAuthData('pwd',event.target.value)} />
          </div>
          <div className="col-12 mt-3 mb-3 d-flex justify-content-end">
            <button type="button" className="btn btn-default btn-writewise" onClick={()=>loginUser()}>Login into your Account</button>
          </div>
        </div>
      </div>
      </div>
      </div>
      </form>
 </>);
};

export default Login;