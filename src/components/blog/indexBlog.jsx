import React from "react";
import {Route, Routes, Link} from 'react-router-dom';
import './assets/style.css';
import {Link as Linkk} from 'react-scroll';
import NavBlog from "./components/NavBlog";


function indexBlog(){
    return (
        <div className="blog">
            <div className="_nav">
                <NavBlog></NavBlog>
                
            </div>
        </div>
    )
}
export default indexBlog