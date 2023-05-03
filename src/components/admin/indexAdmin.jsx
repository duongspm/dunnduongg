import React from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Atm from './ATM/Atm';
import Slide from './Photo/Slide';
import {Route, Routes, Link} from 'react-router-dom';
import './assets/css.css';
import Event from './components/Event';


function indexAdmin(){
    return (
        <div className="_content">
                <div className="_sidebar">
                    <Sidebar></Sidebar>
                </div>
                <div className="container">
                    <div>
                        <Atm></Atm>
                    </div>
                    <div className="content">
                        <Slide></Slide>
                    </div>
                    <div className="content">
                        <Event></Event>
                    </div>
                </div>

                {/* <div className="nav">
                    <Nav/>
                </div> */}
            
        </div>
    )
}
export default indexAdmin