import React, { useState, useEffect } from "react";
import '../r-main-screen/r-main-screen.css'
import Profile_Screen from "../profile-screen/profile-screen";
import LoginPage from "../LoginPage";
import Dashboard from "../User/Dashboard";
import GoogleLogOutBtn from "../googlelogoutbtn";
import Jobs_Screen from "../jobs-screen/jobs-screen";
import { user_data } from "../../constants/constants";
import Applied_screen from "../applied-screen/applied-screen";
import R_Profile_Screen from "../r-profile-screen/r-profile-screen";
import R_Post_Jobs_Screen from "../r-post-jobs-screen/r-post-jobs-screen";
import R_Post_Screen from "../r-post-screen/r-post-screen";
import No_of_Applicants from "../no_applications/no_of_applications";

function R_MainScreen() {

    const [menubtn_click, setMenubtn_click] = useState(false);
    const [name, setName] = useState(":[");
    const [showPage, setShowPage] = useState(0);

    useEffect(() => {setName(user_data.name)},[]);

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
                        <div className="menu-item" onClick={() => {setShowPage(1)}}>Profile</div>
                        <div className="menu-item" onClick={() => {setShowPage(2)}}>Post Jobs</div>
                        <div className="menu-item" onClick={() => {setShowPage(3)}}>Jobs Posted</div>
                        <div className="menu-item" onClick={() => {setShowPage(4)}}>Applicants</div>
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
                {showPage===0 && 
                <div className="rms-image-div">
                <div className="title-rms-div">
                    <div className="rtop-title">Welcome to</div>
                    <div className="rmain-title">JobPower</div>
                </div>
                <div className="rms-image"></div>
                <p className="rms-p">Find the perfect candidates for your job openings with our powerful job posting platform. Attract top talent and build your dream team today.</p>
            </div>
                }
                {showPage===1 && <R_Profile_Screen />}
                {showPage===2 && <R_Post_Jobs_Screen />}
                {showPage===3 && <R_Post_Screen />}
                {showPage===4 && <No_of_Applicants />}
            </div>
            {/*  */}
        </div>
    )
}

export default R_MainScreen;