import React from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

function indexAdmin(){
    return (
        <div>
            <div className="nav">
                {/* <Nav/> */}
            </div>
            <div className="_sidebar">
                <Sidebar></Sidebar>
            </div>
        </div>
    )
}
export default indexAdmin