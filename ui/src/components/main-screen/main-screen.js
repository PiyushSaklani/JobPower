import React, { useState, useEffect } from "react";
import '../main-screen/main-screen.css'
import Profile_Screen from "../profile-screen/profile-screen";
import LoginPage from "../LoginPage";
import Dashboard from "../User/Dashboard";
import GoogleLogOutBtn from "../googlelogoutbtn";
import Jobs_Screen from "../jobs-screen/jobs-screen";
import { user_data } from "../../constants/constants";
import Applied_screen from "../applied-screen/applied-screen";

function MainScreen() {

    const [menubtn_click, setMenubtn_click] = useState(false);
    const [name, setName] = useState(":[");
    const [showPage, setShowPage] = useState(0);

    useEffect(() => { setName(user_data.name) }, []);

    return (
        <div className="main-screen-div">
            {/* App Bar */}
            <div className="main-screen-appbar">
                {
                    !menubtn_click &&
                    <div className="main-screen-menu-btn" onClick={() => { setMenubtn_click(true) }}>
                        <div className="menu-icon"></div>
                    </div>
                }
                {
                    menubtn_click &&
                    <div className="main-screen-menu-title">
                        <>Menu</>
                        <div className="menu-back-btn" onClick={() => { setMenubtn_click(false) }}></div>
                    </div>
                }
                <div className="user-name" >{name}</div>
            </div>
            {/*  */}
            {/* Menu */}
            {
                menubtn_click &&
                <div className="main-screen-menu">
                    <div>
                        <br /><br />
                        <div className="menu-item" onClick={() => { setShowPage(1) }}>Profile</div>
                        <div className="menu-item" onClick={() => { setShowPage(2) }}>Jobs</div>
                        <div className="menu-item" onClick={() => { setShowPage(3) }}>Applied</div>
                    </div>

                    <div>
                        <div className="signOut-btn-div">
                            {/* <button className="signOut-btn" onClick={() => { console.log("Sign Out button Pressed") }} >Sign Out</button> */}
                            <GoogleLogOutBtn />
                        </div>
                        <br />
                    </div>
                </div>
            }
            {/*  */}
            {/* MainScreen Div */}
            <div className="main-screen-maindiv">
                {showPage === 0 &&
                    <div className="ms-image-div">
                        <div className="title-ms-div">
                            <div className="top-title">Welcome to</div>
                            <div className="main-title">JobPower</div>
                        </div>
                        <div className="ms-image"></div>
                        <p className="ms-p">Discover your dream job and take the next step in your career with our job search platform.</p>
                    </div>
                }
                {showPage === 1 && <Profile_Screen />}
                {showPage === 2 && <Jobs_Screen />}
                {showPage === 3 && <Applied_screen />}
            </div>
            {/*  */}
        </div>
    )
}

export default MainScreen;