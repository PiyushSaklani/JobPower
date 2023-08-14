import React, { useState } from "react";
import "../r-post-jobs-screen/r-post-jobs-screen.css";
import * as constants from '../../constants/constants.js';

export default function R_Post_Jobs_Screen() {
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [jobType, setJobType] = useState("");
    // const [duration, setDuration] = useState("");
    // const [salary, setSalary] = useState("");
    // const [companyName, setCompanyName] = useState("");

    const [title, setTitle] = useState("CyberSecurity Analyst");
    const [description, setDescription] = useState("Monitoring computer networks and systems for security breaches and investigating any security incidents that occur and Developing and implementing security policies and procedures to ensure that the organization's systems and data are protected.");
    const [jobType, setJobType] = useState("Internship");
    const [duration, setDuration] = useState("4-6 months");
    const [salary, setSalary] = useState("10-20k/Momth");
    const [companyName, setCompanyName] = useState("EY");

    const currentDate = new Date();
    var day = currentDate.getDate().toString().padStart(2, "0");
    var month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    var year = currentDate.getFullYear().toString();

    var formattedDate = `${day}/${month}/${year}`;

    const [date, setDate] = useState(formattedDate);

    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 10);

    day = futureDate.getDate().toString().padStart(2, "0");
    month = (futureDate.getMonth() + 1).toString().padStart(2, "0");
    year = futureDate.getFullYear().toString();

    formattedDate = `${day}/${month}/${year}`;
    const [deadline, setDeadline] = useState(formattedDate);

    function add_new_job(new_job) {
        fetch(`${constants.port_address}add_jobs_data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_job)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert(`Job posted successfully!`);
                // handle success or error response from server
            })
            .catch(error => {
                console.error(error);
                // handle network or server error
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        add_new_job({
            job_title: title,
            date_of_post: date,
            discription: description,
            type_of_job: jobType,
            duration_of_job: duration,
            salary: salary,
            deadline: deadline,
            company: companyName,
            mail:constants.user_data.email,
        })

    };

    return (
        <div className="rjs-container">
            <div style={{ display: "flex", width: "100%", height: "94%" }}>
                <div className="rjs-job-div">
                    <div className="ps-title">Preview</div>
                    <div className="Job" key={title}>
                        <div className="job-row1">
                            <div className="job-title">{title}</div>
                            <div className="job-dateOfpost">{date}</div>
                        </div>
                        <div className="dis">Description:</div>
                        <div className="job-discription">{description}</div>
                        <div className="job-row2">
                            <div className="job-type" id="div-to-flex">
                                <div id="subheading">Job type</div>
                                <div>{`: ${jobType}`}</div>
                            </div>
                            <div className="job-duration" id="div-to-flex">
                                <div id="subheading">Duration</div>
                                <div>{`: ${duration}`}</div>
                            </div>
                        </div>
                        <div className="job-row3">
                            <div className="job-salary" id="div-to-flex">
                                <div id="subheading">Salary</div>
                                <div>{`: ${salary}`}</div>
                            </div>
                            <div className="job-deadline" id="div-to-flex">
                                <div id="subheading">Can apply till</div>
                                <div>{`: ${deadline}`}</div>
                            </div>
                        </div>
                        <div className="job-row3">
                            <div className="job-company" id="div-to-flex">
                                <div id="subheading">Company</div>
                                <div>{`: ${companyName}`}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rjs-filter-div">
                    <div className="ps-title">Job details</div>
                    <div className="rjs-details-div">
                        <form onSubmit={handleSubmit} className="rjs-form">
                            <div className="rjs-form-group">
                                <label htmlFor="title" className="rjs-label">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    className="rjs-input"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                            </div>
                            <div className="rjs-form-group">
                                <label htmlFor="description" className="rjs-label">
                                    Job Description
                                </label>
                                <textarea
                                    id="description"
                                    className="rjs-input rjs-textarea"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                ></textarea>
                            </div>
                            <div className="rjs-form-group rjs-form-row">
                                <div className="rjs-form-item">
                                    <label htmlFor="job-type" className="rjs-label">
                                        Job Type
                                    </label>
                                    <input
                                        type="text"
                                        id="job-type"
                                        className="rjs-input"
                                        value={jobType}
                                        onChange={(event) => setJobType(event.target.value)}
                                    />
                                </div>
                                <div className="rjs-form-item">
                                    <label htmlFor="duration" className="rjs-label">
                                        Duration
                                    </label>
                                    <input
                                        type="text"
                                        id="duration"
                                        className="rjs-input"
                                        value={duration}
                                        onChange={(event) => setDuration(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="rjs-form-group rjs-form-row">
                                <div className="rjs-form-item">
                                    <label htmlFor="salary" className="rjs-label">
                                        Salary
                                    </label>
                                    <input
                                        type="text"
                                        id="salary"
                                        className="rjs-input"
                                        value={salary}
                                        onChange={(event) => setSalary(event.target.value)}
                                    />
                                </div>
                                <div className="rjs-form-item">
                                    <label htmlFor="company-name" className="rjs-label">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        id="company-name"
                                        className="rjs-input"
                                        value={companyName}
                                        onChange={(event) => setCompanyName(event.target.value)}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="rjs-button">
                                Upload
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}