import React from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Atm from './ATM/Atm';
import Slide from './Photo/Slide';
import {Route, Routes, Link} from 'react-router-dom';
import './assets/css.css';
import Event from './components/Event';
import ToggleLove from "./components/ToggleLove/ToggleLove";
import Album from "./components/Album";
import Man from "./components/Man";
import Woman from "./components/Woman";


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
                    <div className="content">
                        <Woman></Woman>
                    </div>
                    <div className="content">
                        <Man></Man>
                    </div>
                    <div className="content">
                        <Album></Album>
                    </div>
                </div>
                <div className="toggle">
                    <ToggleLove></ToggleLove>
                </div>
                {/* <div className="nav">
                    <Nav/>
                </div> */}
            
        </div>
    )
}
export default indexAdmin