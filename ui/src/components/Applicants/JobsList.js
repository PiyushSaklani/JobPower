import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

// Styles for components
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const JobsList = () => {
  const classes = useStyles();

  // Define the 'jobs' variable
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Software Engineer',
      recruiter: 'ACME Inc.',
      type: 'Full-time',
      salary: 10000,
      duration: 12,
    },
    {
      id: 2,
      title: 'Web Developer',
      recruiter: 'ABC Corp.',
      type: 'Part-time',
      salary: 8000,
      duration: 6,
    },
    {
      id: 3,
      title: 'Data Analyst',
      recruiter: 'XYZ Corp.',
      type: 'Full-time',
      salary: 12000,
      duration: 24,
    },
  ]);

  // State for search query
  const [query, setQuery] = useState('');

  // State for filters
  const [jobType, setJobType] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [duration, setDuration] = useState('');

  // Filtered jobs based on search query and filters
  const filteredJobs = jobs.filter((job) => {
    const queryMatch =
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.recruiter.toLowerCase().includes(query.toLowerCase());
    const typeMatch = jobType ? job.type === jobType : true;
    const salaryMatch =
      (minSalary ? job.salary >= minSalary : true) &&
      (maxSalary ? job.salary <= maxSalary : true);
    const durationMatch = duration ? job.duration === duration : true;
    return queryMatch && typeMatch && salaryMatch && durationMatch;
  });

  return (
    <Box className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        Active Jobs
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            freeSolo
            options={jobs.map((job) => job.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Jobs"
                variant="outlined"
                fullWidth
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel id="job-type-label">Select Job Type</InputLabel>
            <Select
              labelId="job-type-label"
              value={jobType}
              onChange={(event) => setJobType(event.target.value)}
              label="Select Job Type"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Internship">Internship</MenuItem>
              <MenuItem value="Full-time">Full-time</MenuItem>
              <MenuItem value="Part-time">Part-time</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel id="min-salary-label">Min Salary</InputLabel>
            <Select
              labelId="min-salary-label"
              value={minSalary}
              onChange={(event) => setMinSalary(event.target.value)}
              label="Min Salary"
            >
              <MenuItem value="">No Min</MenuItem>
              <MenuItem value={5000}>$5000</MenuItem>
              <MenuItem value={10000}>$10000</MenuItem>
              <MenuItem value={15000}>$15000</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel id="max-salary-label">Max Salary</InputLabel>
            <Select
              labelId="max-salary-label"
              value={maxSalary}
              onChange={(event) => setMaxSalary(event.target.value)}
              label="Max Salary"
            >
              <MenuItem value="">No Max</MenuItem>
              <MenuItem value={10000}>$10000</MenuItem>
              <MenuItem value={15000}>$15000</MenuItem>
              <MenuItem value={20000}>$20000</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel id="duration-label">Select Duration</InputLabel>
            <Select
              labelId="duration-label"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              label="Select Duration"
            >
              <MenuItem value="">All</MenuItem>
              
              <MenuItem value={6}>6 months</MenuItem>
              <MenuItem value={12}>1 year</MenuItem>
              <MenuItem value={24}>2 years</MenuItem>
              <MenuItem value={0}>Indefinite</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              setQuery('');
              setJobType('');
              setMinSalary('');
              setMaxSalary('');
              setDuration('');
            }}
          >
            Clear Filters
          </Button>
        </Grid>
      </Grid>
      <Box mt={2}>
        {filteredJobs.length === 0 && (
          <Typography variant="subtitle1" align="center">
            No jobs found.
          </Typography>
        )}
        {filteredJobs.map((job) => (
          <Box key={job.id} mt={2} p={2} border={1} borderColor="grey.200" borderRadius={4}>
            <Typography variant="h6">{job.title}</Typography>
            <Typography variant="subtitle1" gutterBottom>
              {job.recruiter} - {job.type}
            </Typography>
            <Typography variant="subtitle2">
              Salary: ${job.salary}/month
              {job.duration > 0 && (
                <span>
                  {' '}
                  | Duration: {job.duration} month{job.duration > 1 && 's'}
                </span>
              )}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default JobsList;