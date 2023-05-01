import React,{useState} from 'react';

import {Link} from 'react-scroll';
import avt from './assets/images/duongg.jpg';
import search from './assets/images/search-normal.png';
import album from './assets/images/album.png';
import './assets/css.css';

function Sidebar() {
    const [isExpended, setExpendState] = useState(false);
    const menuItems = [
        {
            text:"Slide",
            icon:"images/slides.png",
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

                <div className="nav__menu">
                    {
                        menuItems.map(({text,icon}) => (
                            <a href="" className={isExpended ?  "menu-item" : "menu-item menu-item-NX"}>
                                <img src={icon} alt="" />
                                {isExpended && <p>{text}</p>}
                            {!isExpended && <div className="tooltip">{text}</div>}
                            </a>
                        ))
                    }
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