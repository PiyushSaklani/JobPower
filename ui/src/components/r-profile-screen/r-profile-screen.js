import React, { useState, useEffect } from "react";
import "../r-profile-screen/r-profile-screen.css";
import * as constants from '../../constants/constants.js';

function R_Profile_Screen() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        age: "",
        gender: "",
        mail: constants.user_data.email,
        phone_number: "",
    });

    useEffect(() => {
        fetch(`${constants.port_address}get_rperson_data/${constants.user_data.email}`)
          .then(response => response.json())
          .then(data => {
            if (data.length > 0) {
              setFormData(data[0]);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }, []);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Check if required fields are empty
        const requiredFields = ['first_name', 'last_name', 'age', 'gender', 'mail'];
        const emptyFields = requiredFields.filter(field => !formData[field]);
    
        if (emptyFields.length > 0) {
          alert('Please fill in all required fields!');
          return;
        }
    
        fetch(`${constants.port_address}add_rperson_data/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div className="ps-main-div">
            <div className="ps-title">My Profile</div>
            <div className="floating-div">
                {/* Personal Details Form */}
                <div className="divider">
                    <div className="divider-line1"></div>
                    <div className="divider-text">Personal Details</div>
                    <div className="divider-line2"></div>
                </div>
                <form className="personal-details-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="first-name">First Name:</label>
                            <input
                                type="text"
                                id="first-name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="div-gap"></div>
                        <div className="form-group">
                            <label htmlFor="last-name">Last Name:</label>
                            <input
                                type="text"
                                id="last-name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="age">Age:</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="div-gap"></div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    {/* Contact details */}
                    <div className="divider">
                        <div className="divider-line1"></div>
                        <div className="divider-text">Contact Details</div>
                        <div className="divider-line2"></div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="mail">Mail:</label>
                            <input
                                type="text"
                                id="mail"
                                name="mail"
                                value={formData.mail}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="div-gap"></div>
                        <div className="form-group">
                            <label htmlFor="phone-number">Phone Number:</label>
                            <input
                                type="text"
                                id="phone-number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="form-btn-div" >
                        <button type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default R_Profile_Screen;


