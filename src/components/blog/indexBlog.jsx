import React from "react";
import {Route, Routes, Link} from 'react-router-dom';
import './assets/style.css';
import {Link as Linkk} from 'react-scroll';
import NavBlog from "./components/NavBlog";
import ScrollToTop from "./components/ScrollToTop";
import Blog from "./components/Blog";
import FooterBlog from "./components/FooterBlog";


function indexBlog(){
    return (
        <div className="blog">
            <div className="_nav">
                <NavBlog></NavBlog>
            </div>
            <div className="_blog-box">
                <Blog></Blog>
            </div>
            <div className="scrolltotop">
                <ScrollToTop></ScrollToTop>
            </div>
            <div className="_footer-blog">
                <FooterBlog></FooterBlog>
            </div>
        </div>
    )
}
export default indexBlog