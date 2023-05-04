import React,{useState} from 'react';

import {Link as Linkk} from 'react-scroll';
import avt from './assets/images/duongg.jpg';
import search from './assets/images/search-normal.png';
import album from './assets/images/album.png';
import './assets/css.css';
import { BiImage,BiUserMinus,BiUserPlus,BiUniversalAccess,BiCommentDots,BiPhotoAlbum,BiSearchAlt,BiHomeHeart,BiCalendarHeart } from "react-icons/bi";

function Sidebar() {
    const [isExpended, setExpendState] = useState(false);
    const menuItems = [
        {
            text:"Slide",
            icon:"<BiHomeHeart/>",
        },
        {
            text:"Employees",
            icon:"images/employees.png",
        },
        {
            text:"Man",
            icon:"images/man.png",
        },
        {
            text:"Woman",
            icon:"images/woman.png",
        },
        {
            text:"Feedback",
            icon:"images/feedback.png",
        },
        {
            text:"Album",
            icon:"images/album.png",
        },

    ]
    return (
        <>
            <div className="sidebar">
                <div className={isExpended ?"sidebar__box": "sidebar__box sidebar__box--NX" }>
                <button className={isExpended?"hamburger hamburger-in":"hamburger hamburger-out"} onClick={()=>setExpendState(!isExpended)}>
                    <span></span><span></span><span></span>
                </button>

                {/* <div className="nav__menu">
                    {
                        menuItems.map(({text,icon}) => (
                            <a href="" className={isExpended ?  "menu-item" : "menu-item menu-item-NX"}>
                                {icon}
                                
                                {isExpended && <p>{text}</p>}
                            {!isExpended && <div className="tooltip">{text}</div>}
                            </a>
                        ))
                    }
                </div> */}
                <div className="nav__menu">
                    <div className={isExpended ?  "menu-search menu-item" : "menu-item menu-search menu-search-NX menu-item-NX"}>
                            <button className="nav__search nav__icon">
                                <BiSearchAlt/>
                            </button>
                            
                            {isExpended && <input type="text" />}
                        {!isExpended && <div className="tooltip">Search</div>}
                    </div>
                    <Linkk to='atm'
                    activeClass="active"
                    smooth={true}
                    className={isExpended ?  "menu-item" : "menu-item menu-item-NX"}>
                        <div className="nav__icon">
                            <BiHomeHeart/>
                        </div>
                        {isExpended && <p>Home</p>}
                    {!isExpended && <div className="tooltip">Home</div>}
                    </Linkk>
                    
                    <Linkk to='slide'
                    activeClass="active"
                    smooth={true}
                    className={isExpended ?  "menu-item" : "menu-item menu-item-NX"}>
                        <div className="nav__icon">
                            <BiImage/>
                        </div>
                        {isExpended && <p>Slide</p>}
                    {!isExpended && <div className="tooltip">Slide</div>}
                    </Linkk>

                    <Linkk to='event'
                    activeClass="active"
                    
                    activeClassName="activeRoute"
                    activeStyle={{ color: 'red'}}
                    smooth={true}
                    className={isExpended ?  "menu-item" : "menu-item menu-item-NX"}>
                        <div className="nav__icon">
                            <BiCalendarHeart/>
                        </div>
                        {isExpended && <p>Event</p>}
                    {!isExpended && <div className="tooltip">Event</div>}
                    </Linkk>

                    <Linkk to='woman' 
                    smooth={true}
                    className={isExpended ?  "menu-item" : "menu-item menu-item-NX"}>
                        <div className="nav__icon">
                            <BiUserMinus/>
                        </div>
                        {isExpended && <p>Women</p>}
                    {!isExpended && <div className="tooltip">Women</div>}
                    </Linkk>

                    <Linkk to='man' 
                    smooth={true}
                    className={isExpended ?  "menu-item" : "menu-item menu-item-NX"}>
                        <div className="nav__icon">
                            <BiUserPlus/>
                        </div>
                        {isExpended && <p>Man</p>}
                    {!isExpended && <div className="tooltip">Man</div>}
                    </Linkk>

                    <Linkk to='user' className={isExpended ?  "menu-item" : "menu-item menu-item-NX"}>
                        <div className="nav__icon">
                            <BiUniversalAccess/>
                        </div>
                        {isExpended && <p>Man</p>}
                    {!isExpended && <div className="tooltip">User</div>}
                    </Linkk>

                    <Linkk to='feedback' className={isExpended ?  "menu-item" : "menu-item menu-item-NX"}>
                        <div className="nav__icon">
                            <BiCommentDots/>
                        </div>
                        {isExpended && <p>Feedback</p>}
                    {!isExpended && <div className="tooltip">Feedback</div>}
                    </Linkk>

                    <Linkk 
                    smooth={true}
                    to='album' className={isExpended ?  "menu-item" : "menu-item menu-item-NX"}>
                        <div className="nav__icon">
                            <BiPhotoAlbum/>
                        </div>
                        {isExpended && <p>Album</p>}
                    {!isExpended && <div className="tooltip">Album</div>}
                    </Linkk>
                    
                </div>

                <div className="nav-footer">
                    {isExpended && (<div className="nav-details">
                        <img src="images/in-love.png" alt="" />
                        <div className="nav-footer-info">
                            <span className="nav-footer-username">Duongg</span>
                            <span className="nav-footer-user-position">My Wedding</span>
                        </div>
                    </div>)} 
                    <div className='logout-img' >
                        <img src="images/exit.png" alt="" />

                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
export default Sidebar