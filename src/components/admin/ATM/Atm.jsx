import React from "react";
import chip from './chip.png';
import VisaLogo from './VisaLogo.png';
import './atm.css';

function Atm(){
    return (
        <>
        <div id="atm" className="body">
            <div class="cricles">
                <div class="circle circle_1"></div>
                <div class="circle circle_2"></div>
            </div>

            <div class="card_group">
                <div class="card">
                    <div class="logo">
                        <img src={VisaLogo} alt="" />
                    </div>

                    <div class="chip">
                        <img src={chip} alt="" />
                    </div>

                    <div class="number">1234 5678 9012 3456</div>
                    <div class="name">Tran Van Duong</div>
                    <div class="from">10/21</div>
                    <div class="to">10/26</div>
                    <div class="ring"></div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Atm