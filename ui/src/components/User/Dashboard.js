import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { data } from '../const';
import { BsPersonCircle } from 'react-icons/bs';
import GoogleLogOutBtn from '../googlelogoutbtn';
import { useNavigate } from "react-router-dom";
// import '../Login.css'

// // Styles for components
// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         padding: theme.spacing(2),
//     },
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 120,
//     },
// }));

const Dashboard = ({ onAddEducation }) => {
    // const classes = useStyles();

    // State for education details
    // const [school, setSchool] = useState('');
    // const [degree, setDegree] = useState('');
    // const [startdate, setStartdate] = useState('');
    // const [enddate, setEnddate] = useState('');

    // Handle form submission
    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     const response = await fetch('/user/edit_profile/:id', {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ school, degree, startdate, enddate }),
    //     });

    //     onAddEducation({ school, degree, startdate, enddate });
    //     setSchool('');
    //     setDegree('');
    //     setStartdate('');
    //     setEnddate('');
    // };
    const navigate = useNavigate();

    function handleChange() {
        navigate("/signup");
    }

    return (
        <div className='ms-main-con'>
            <div className='ms-title-bar'>
                <h3 className='ms-title'>JobPower</h3>
                <GoogleLogOutBtn />
            </div>
            <div className='ms-con'>
               
            </div>
        </div>
    );
};

export default Dashboard;