import React, { useState, useEffect } from "react";
import "../jobs-screen/jobs-screen.css";
import * as constants from '../../constants/constants.js';

function Jobs_Screen() {
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");
    const [jobsData, setJobsData] = useState([]);

    useEffect(() => {
        const fetchJobsData = async () => {
            const response = await fetch(`${constants.port_address}get_jobs_data/`);
            const data = await response.json();
            // console.log(data);
            setJobsData(data);
        };
        fetchJobsData();
    }, []);

    function add_applied_job(applied_job) {
        fetch(`${constants.port_address}add_applied_jobs_data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(applied_job)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // handle success or error response from server
            })
            .catch(error => {
                console.error(error);
                // handle network or server error
            });
    }

    function handleApplyClick(appliedjob) {
        const confirmed = window.confirm(
            `Are you sure you want to apply for the ${appliedjob.job_title} job?`
        );
        if (confirmed) {
            // submit the resume or perform other actions here...
            const today = new Date();
            const formattedDate = today.toLocaleDateString('en-US');
            alert(`Resume submitted successfully!`);
            add_applied_job({
                job_title: appliedjob.job_title,
                date_of_applied: formattedDate,
                type_of_job: appliedjob.type_of_job,
                salary: appliedjob.salary,
                company: appliedjob.company,
                email: constants.user_data.email,
            })
        }
    }

    const filteredObj = jobsData.filter((job) => {
        if (selectedTitle && job.job_title !== selectedTitle) {
            return false;
        }
        if (selectedType && job.type_of_job !== selectedType) {
            return false;
        }
        if (selectedCompany && job.company !== selectedCompany) {
            return false;
        }
        if (
            selectedStartDate &&
            Date.parse(job.date_of_post) < Date.parse(selectedStartDate)
        ) {
            return false;
        }
        if (
            selectedEndDate &&
            Date.parse(job.date_of_post) > Date.parse(selectedEndDate)
        ) {
            return false;
        }
        if (
            selectedStartDate &&
            selectedEndDate &&
            (Date.parse(job.date_of_post) < Date.parse(selectedStartDate) ||
                Date.parse(job.date_of_post) > Date.parse(selectedEndDate))
        ) {
            return false;
        }
        return true;
    });

    const companyNames = Array.from(new Set(jobsData.map(job => job.company)));

    return (
        <div className="main-div">
            <div className="ps-title">Available Jobs</div>
            <div style={{ display: "flex", width: "100%", height: "94%" }}>
                <div className="job-div">
                    {filteredObj.length === 0 ? (
                        <div className="no-records">No records available</div>
                    ) : (
                        filteredObj.map((job) => (
                            <div className="Job" key={`${job._id}`}>
                                <div className="job-row1">
                                    <div className="job-title">{job.job_title}</div>
                                    <div className="job-dateOfpost">{job.date_of_post}</div>
                                </div>
                                <div className="dis">Description:</div>
                                <div className="job-discription">{job.discription}</div>
                                <div className="job-row2">
                                    <div className="job-type" id="div-to-flex">
                                        <div id="subheading">Job type</div>
                                        <div>{`: ${job.type_of_job}`}</div>
                                    </div>
                                    <div className="job-duration" id="div-to-flex">
                                        <div id="subheading">Duration</div>
                                        <div>{`: ${job.duration_of_job}`}</div>
                                    </div>
                                </div>
                                <div className="job-row3">
                                    <div className="job-salary" id="div-to-flex">
                                        <div id="subheading">Salary</div>
                                        <div>{`: ${job.salary}`}</div>
                                    </div>
                                    <div className="job-deadline" id="div-to-flex">
                                        <div id="subheading">Can apply till</div>
                                        <div>{`: ${job.deadline}`}</div>
                                    </div>
                                </div>
                                <div className="job-row3">
                                    <div className="job-company" id="div-to-flex">
                                        <div id="subheading">Company</div>
                                        <div>{`: ${job.company}`}</div>
                                    </div>
                                </div>
                                <div className="apply-btn">
                                    <button
                                        className="btn-for-apply"
                                        onClick={() => handleApplyClick(job)}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="filter-div">
                    <label htmlFor="job-title-filter">Filter by job title:</label>
                    <select
                        id="job-title-filter"
                        value={selectedTitle}
                        onChange={(e) => setSelectedTitle(e.target.value)}
                    >
                        <option value="">All jobs</option>
                        {[...new Set(jobsData.map(job => job.job_title))].map((jobTitle) => (
                            <option key={jobTitle} value={jobTitle}>
                                {jobTitle}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="job-type-filter">Filter by job type:</label>
                    <select
                        id="job-type-filter"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="">All types</option>
                        <option value="Internship">Internship</option>
                        <option value="Full-Time Employment">Full-Time Employment</option>
                    </select>
                    <label htmlFor="job-company-filter">Filter by company:</label>
                    <select
                        id="job-company-filter"
                        value={selectedCompany}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                    >
                        <option value="">All companies</option>
                        {companyNames.map((companyName) => (
                            <option key={companyName} value={companyName}>
                                {companyName}
                            </option>
                        ))}
                    </select>
                    {/* <label htmlFor="job-date-filter">Filter by date of posting:</label>
                    <div style={{ display: "flex" }}>
                        <input
                            type="date"
                            id="job-start-date"
                            value={selectedStartDate}
                            onChange={(e) => setSelectedStartDate(e.target.value)}
                        />
                        <span style={{ margin: "0 10px" }}>to</span>
                        <input
                            type="date"
                            id="job-end-date"
                            value={selectedEndDate}
                            onChange={(e) => setSelectedEndDate(e.target.value)}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Jobs_Screen;