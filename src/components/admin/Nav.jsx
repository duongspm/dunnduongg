import React from 'react'

import {Link} from 'react-scroll';
import avt from './assets/images/duongg.jpg';
import search from './assets/images/search.png';
// import {BsSearchHeart} from 'react-icon/md';
import './assets/css.css';

function Nav() {
    return (
        <div className='navbar'>
            <div className="logo__navbar">
                Duongg❣️Dunn
            </div>
            <div className="search">
                <div className="search__icon">
                    <img src={search} alt="search" />
                </div>
                <div className="search__input">
                    <input type="text" />
                </div>
            </div>
            <div className="avt">
                <div className="avt__img">
                    <img src={avt} alt="avt" />
                </div>
                <div className="circle">
                    
                </div>
            </div>
        </div>
    )
}
export default Nav