import React from 'react';
import './index.css';

const Header = () =>{
 return (<>
  <div className="header-view">
  <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <img src="./logo-with-slogan.png" className="header-logo" /> 
        </div>
        <div className="col-md-9">
          <div className="header-subTitle">PHARMACY BENEFIT MANAGEMENT (PBM) PORTAL</div>
        </div>
      </div>
    </div>
  </div>
 </>);
};

export default Header;