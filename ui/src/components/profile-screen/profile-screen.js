import React, { useState, useEffect } from "react";
import "../profile-screen/profile-screen.css";
import * as constants from '../../constants/constants.js';

function Profile_Screen() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        age: "",
        gender: "",
        mail: constants.user_data.email,
        phone_number: "",
        school: "",
        board: "",
        university: "",
        study_field: "",
        start_date: "",
        end_date: "",
        skills: "",
    });

    useEffect(() => {
        fetch(`${constants.port_address}get_person_data/${constants.user_data.email}`)
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
        const requiredFields = ['first_name', 'last_name', 'age', 'gender', 'mail', 'school', 'board', 'university', 'study_field', 'start_date', 'end_date', 'skills'];
        const emptyFields = requiredFields.filter(field => !formData[field]);
    
        if (emptyFields.length > 0) {
          alert('Please fill in all required fields!');
          return;
        }
    
        fetch(`${constants.port_address}add_person_data/`, {
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
                alert(`Updated successfully!`);
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
                    {/* Education details */}
                    <div className="divider">
                        <div className="divider-line1"></div>
                        <div className="divider-text">Education Details</div>
                        <div className="divider-line2"></div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="school">School:</label>
                            <input
                                type="text"
                                id="school"
                                name="school"
                                value={formData.school}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="div-gap"></div>
                        <div className="form-group">
                            <label htmlFor="board">Board:</label>
                            <input
                                type="text"
                                id="board"
                                name="board"
                                value={formData.board}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="university">University:</label>
                            <input
                                type="text"
                                id="university"
                                name="university"
                                value={formData.university}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="div-gap"></div>
                        <div className="form-group">
                            <label htmlFor="study-field">Field of study:</label>
                            <input
                                type="text"
                                id="study-field"
                                name="study_field"
                                value={formData.study_field}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="start-date">Start Date:</label>
                            <input
                                type="date"
                                id="start-date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="div-gap"></div>
                        <div className="form-group">
                            <label htmlFor="end-date">End Date:</label>
                            <input
                                type="date"
                                id="end-date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    {/* Skills */}
                    <div className="divider">
                        <div className="divider-line1"></div>
                        <div className="divider-text">Skills</div>
                        <div className="divider-line2"></div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="skills">Skills:</label>
                            <input
                                type="text"
                                id="skills"
                                name="skills"
                                value={formData.skills}
                                onChange={handleInputChange}
                                required
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

export default Profile_Screen;


