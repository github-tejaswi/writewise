import React from "react";
import FileUpload from '@Components/FileUpload/index.js';

const Repricing = () =>{
 return (<div className="container-fluid">
    <div className="row">
        <div className="col-sm-12">
            <div>Get Repricing Template:</div>
            <a href="./writewise-repricing.xlsx"><button className="btn btn-writewise">Download CSV Template File</button></a>
            <FileUpload />
        </div>
    </div>
 </div>);
};

export default Repricing;