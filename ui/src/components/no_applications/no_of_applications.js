import React, { useState, useEffect } from "react";
import "../applied-screen/applied-screen.css";
import * as constants from '../../constants/constants.js';

function No_of_Applicants() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllAppliedJobs();
      setJobs(data);

      // Fetch applicant name for each job
      Promise.all(
        data.map((job) => {
          return fetch(`${constants.port_address}check_user/${job.email}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: job.email })
          })
            .then((response) => response.json())
            .then((applicant) => {
              console.log(applicant);
              job.applicant_name = applicant ? `${applicant.name}` : "Unknown";
            })
            .catch((error) => {
              console.log(error);
            });
        })
      )
      .then(() => {
        // Update jobs state with updated job objects
        setJobs([...data]);
      });
    }
    fetchData();
  }, []);

  async function getAllAppliedJobs() {
    try {
      const response = await fetch(`${constants.port_address}all_applicants/`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Error fetching applied jobs: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleAccept(job) {
    job.status = "Accepted";
    // Call API to update job status
    alert(`You have accepted ${job.applicant_name} for the job: ${job.job_title}`);
  }

  function handleReject(job) {
    job.status = "Rejected";
    // Call API to update job status
    alert(`You have rejected ${job.applicant_name} for the job: ${job.job_title}`);
  }

  // Get a list of unique company and job names for the select dropdowns
  const companyNames = Array.from(new Set(jobs.map((job) => job.company)));
  const jobTitles = Array.from(new Set(jobs.map((job) => job.job_title)));

  // Filter jobs to only include those with company = "EF"
  const filteredJobs = jobs.filter((job) => job.company === "EY");

  return (
    <div className="main-div">
      <div className="as-title">Job Applicants</div>
      <div className="table-div">
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Applied Date</th>
              <th>Job Title</th>
              <th>Applicant Name</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job._id}>
                <td>{job.date_of_applied}</td>
                <td>{job.job_title}</td>
                <td>{job.applicant_name}</td>
                <td>{job.salary}</td>
                <td>
                  {(
                    <>
                      <button onClick={() => handleAccept(job)} className="ar-btn">Accept</button>
                      <button onClick={() => handleReject(job)} className="ar-btn">Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default No_of_Applicants;