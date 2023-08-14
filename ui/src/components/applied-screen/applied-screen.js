import React, { useState, useEffect } from "react";
import "../applied-screen/applied-screen.css";
import * as constants from '../../constants/constants.js';

function Applied_screen() {
    const [statusFilter, setStatusFilter] = useState("all");
    const [companyFilter, setCompanyFilter] = useState("all");
    const [jobFilter, setJobFilter] = useState("");
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(`${constants.port_address}get_applied_jobs_data/${constants.user_data.email}`)
          .then(response => response.json())
          .then(data => {
            setJobs(data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

    // Filter jobs based on selected status, company, and job filters
    const filteredJobs = jobs.filter(
        (job) =>
            (statusFilter === "all" || job.status === statusFilter) &&
            (companyFilter === "all" || job.company === companyFilter) &&
            (jobFilter === "" ||
                job.job_title.toLowerCase().includes(jobFilter.toLowerCase()))
    );

    // Get a list of unique company and job names for the select dropdowns
    const companyNames = Array.from(new Set(jobs.map((job) => job.company)));
    const jobTitles = Array.from(new Set(jobs.map((job) => job.job_title
    )));

    return (
        <div className="main-div">
            <div className="as-title">Applied Jobs</div>
            <div className="as-filter-div">
                <div id="as-filter-div">
                <label htmlFor="status-filter">Filter by status:</label>
                <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="Applied">Applied</option>
                    <option value="Rejected">Rejected</option>
                </select>
                </div>
                <div id="as-filter-div">
                <label htmlFor="company-filter">Filter by company:</label>
                <select
                    id="company-filter"
                    value={companyFilter}
                    onChange={(e) => setCompanyFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    {companyNames.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
                </div>
                <div id="as-filter-div">
                <label htmlFor="job-filter">Filter by job:</label>
                <select
                    id="job-filter"
                    value={jobFilter}
                    onChange={(e) => setJobFilter(e.target.value)}
                >
                    <option value="">All</option>
                    {jobTitles.map((title) => (
                        <option key={title} value={title}>
                            {title}
                        </option>
                    ))}
                </select>
                </div>
            </div>
            <div className="table-div">
                <table className="jobs-table">
                    <thead>
                        <tr>
                            <th>Applied Date</th>
                            <th>Job Title</th>
                            <th>Company</th>
                            <th>Salary</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredJobs.map((job) => (
                            <tr key={job._id}>
                                <td>{job.date_of_applied}</td>
                                <td>{job.job_title}</td>
                                <td>{job.company}</td>
                                <td>{job.salary}</td>
                                <td className={job.status === "Applied" ? "open" : "closed"}>
                                    {job.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Applied_screen;