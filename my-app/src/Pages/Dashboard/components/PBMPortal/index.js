import React from "react";
import DTable from '@Components/DTable/index.js';

const PBMPortal = () => {
 return (<div>
    <div style={{ padding:'15px' }}>
        <div align="center"><b>CLAIMS REPRICING</b></div>
        <div align="center">(atleast 24 months of data with eligibility)</div>
    </div>
    <DTable content={[
    { "#": 1, 
      "Group Name": "Group Name", 
      "PBM Name": "PBM A",
      "Member ID":"GGGG", 
      "First Name":"XXX", 
      "Last Name":"YYYY",
      "Date of Birth":"04-10-1981",
      "Gender":"F",
      "Date Filled":"23-03-2023",
      "NDC": "50111064702",
      "GPI":"58160040000110",
      "Drug Name":"Fluoxetine HCl",
      "Quantity":"30",
      "Day Supply":"15",
      "Member Paid ($)":"0",
      "Disensing Fee":"608",
      "Plan Paid":"0", 
      "CoPay":"608",
      "Speciality":"false",
      "Mail Order":"NO",
      "Pharmacy NPI":"1699907402",
      "Chain Code":"226",
      "Chain Name":"WALGREENS DRUG STORE"
      }
  ]} />
    <div style={{ marginTop:'35px', padding:'15px' }}>
        <div align="center">& Formulary + Prior Authorizations (PA) and Step Therapy per Drug (GPI/NDC level)</div>
    </div>
    <DTable content={[
    { "#": 1, 
      "NDC Code": "2021301", 
      "Brand Name": "Humulin R",
      "Maintainance Flag":"X", 
      "Brand / Generic Indicators":"SSB", 
      "Formulary Status":"FORMULARY",
      "Tier":"02-01-1990",
      "Tier Label":"BRAND",
      "Tier Description":"PREFERRED BRAND",
      "CoPay Limit Indicator": "",
      "CoPay Limit":"",
      "CoPay Limit Messaging":"",
      "Prior Authorization Indicator":"",
      "Prior Authorization Messaging":"",
      "Quantity Limit Indicator":"",
      "Quantity Limits":"40 IN 28 DAYS",
      "Quantity Limit Messaging":"", 
      "Days Limit Indicator":"",
      "Days Limits":"",
      "Days Limit Messaging":"",
      "Fill Limit Indicator":"",
      "Fill Limit Messaging":"",
      "Age Limit Indicator":"",
      "Age Limit Messaging":"",
      "Special Limit Message":"",
      "Gender Limits Indicator":"",
      "Gender Limit Message":"",
      "Step Therapy Indicator":"",
      "Step Therapy Qualifier":"",
      "Step Therapy Requirements":"",
      "Step Therapy Message":"",
      "Concurrent Use Indicator":"",
      "Concurrent Use":"",
      "Age Gender Indicator":"",
      "Age Gender Limits":"",
      "Age Gender Message":"",
      "Alternative Carrier Indicator":""
      }
  ]} />
    <div style={{ marginTop:'35px', padding:'15px' }}>
        <div align="center"><b>REBATES ESTIMATION</b></div>
    </div>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-4">
            <DTable content={[
                { "#": 1, 
                  "GPI": "Group Name", 
                  "Unit Rebate": "PBM A" }]} />
            </div>
            <div className="col-sm-4" style={{display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{  padding:'15px', backgroundColor:'#eee', border:'1px solid #ccc', borderRadius:'8px'  }}><b>OR</b></span>
            </div>
            <div className="col-sm-4">
            <DTable content={[
                { "#": 1, 
                  "Channel": "R-90", 
                  "Unit Rebate": "$812" }]} />
            </div>
        </div>
    </div>

    <div style={{ marginTop:'35px', padding:'15px' }}>
        <div align="center"><b>INTERNATIONAL SOURCING (Optional)</b></div>
    </div>
    <DTable content={[
                { "#": 1, 
                  "NDC": "XXXX", 
                  "International Unit Price": "$15.20" }]} />
    <div style={{ marginTop:'35px', padding:'15px' }}>
        <div align="center"><b>340B Sourcing (Optional)</b></div>
    </div>
    <DTable content={[
                { "#": "1", 
                  "GPI": "XXXX", 
                  "AWP Discount / Unit Price": "$15.20" }]} />
 </div>);
};

export default PBMPortal;