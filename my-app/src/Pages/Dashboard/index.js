import React, { useState, useEffect } from 'react';
import Header from '@Components/Header/index.js';
import Repricing from './components/Repricing/index.js';
import PBMPortal from './components/PBMPortal/index.js';
import './index.css';

const Dashboard = () =>{
  const tabList = [{ id:'repricing', label:'Repricing', component:(<Repricing />)},
    { id:'pbmPortal', label:'PBM Portal', component:(<PBMPortal />)}];
  const [selectTab, setSelectTab] = useState('repricing');
  const [userDetails, setUserDetails] = useState();
  useEffect(()=>{
    let details = sessionStorage.getItem('USER_DETAILS');
    if(details?.length>0){
      details = JSON.parse(details);
      setUserDetails(details);
    }
    document.body.style.backgroundColor='#31597a';
  },[]);
  const handleTabSelection = (id) =>{
    console.log("id", id);
    setSelectTab(id);
  };
  const handleLogout = () =>{
    sessionStorage.removeItem('USER_DETAILS');
    window.location.href='/';
  };
 return (<>
  <Header />
  <div className="dashboard-container">
    <div className="d-flex  justify-content-between align-items-center">
      {/*<div align="right" style={{ position:'absolute', width:'100%' }}>
        
      </div>*/}
      <ul className="nav nav-tabs" style={{ textTransform:'uppercase' }}>
        {tabList?.map((list,index)=>{
          return (<li key={index} className="nav-item" style={{ cursor:'pointer' }} onClick={()=>handleTabSelection(list?.id)}>
            <div className={(list?.id===selectTab)?"nav-link active":"nav-link"}>
              <span style={{ letterSpacing:'1.2px' }}><b>{list?.label}</b></span>
            </div>
          </li>);
        })}
      </ul>  
      <button type="button" className="btn btn-writewise-o" onClick={()=>handleLogout()}><b>Logout</b></button>
    </div>
    <div className="card">
      <div className="card-body">
        {tabList?.filter(list=>list?.id===selectTab)?.[0]?.component}
      </div>
    </div>
  </div>
 </>);
};

export default Dashboard;