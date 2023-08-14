import React, { useState, useEffect } from "react";
import "../r-post-screen/r-post-screen.css";
import * as constants from '../../constants/constants.js';

function R_Post_Screen() {
    const [statusFilter, setStatusFilter] = useState("all");
    const [companyFilter, setCompanyFilter] = useState("all");
    const [jobFilter, setJobFilter] = useState("");
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(`${constants.port_address}get_posted_jobs/${constants.user_data.email}`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setJobs(data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

    return (
        <div className="main-div">
            <div className="as-title">Posted Jobs</div>
            <div className="table-div">
                <table className="jobs-table">
                    <thead>
                        <tr>
                            <th>Opening date</th>
                            <th>Ending date</th>
                            <th>Job Title</th>
                            <th>Company</th>
                            <th>Salary</th>
                            <th>Job type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job._id}>
                                <td>{job.date_of_post}</td>
                                <td>{job.deadline}</td>
                                <td>{job.job_title}</td>
                                <td>{job.company}</td>
                                <td>{job.salary}</td>
                                <td>{job.type_of_job}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default R_Post_Screen;