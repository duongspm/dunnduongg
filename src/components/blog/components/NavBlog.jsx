import React from "react";
import {Route, Routes, Link} from 'react-router-dom';
import '../assets/style.css';
import {Link as Linkk} from 'react-scroll';


function NavBlog(){
    return (
        <div className="nav">
            <div className="blog__header">
                <p>🌠 I sell takeaway coffee. Would you like to support me? <span>Buy Now </span></p>
            </div>
        </div>
    )
}
export default NavBlog