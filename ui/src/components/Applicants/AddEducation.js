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

const AddEducation = ({ onAddEducation }) => {
  const classes = useStyles();

  // State for education details
  const [school, setSchool] = useState('');
  const [degree, setDegree] = useState('');
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => { 
    event.preventDefault();

    const response = await fetch('/user/edit_profile/:id', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ school, degree, startdate, enddate }),
    });

    onAddEducation({ school, degree, startdate, enddate });
    setSchool('');
    setDegree('');
    setStartdate('');
    setEnddate('');
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Education
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="School / University"
              name='school'
              variant="outlined"
              fullWidth
              value={school}
              onChange={(event) => setSchool(event.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Degree"
              name='degree'
              variant="outlined"
              fullWidth
              value={degree}
              onChange={(event) => setDegree(event.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Start Date"
              name='startdate'
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={startdate}
              onChange={(event) => setStartdate(event.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="End Date"
              name='enddate'
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={enddate}
              onChange={(event) => setEnddate(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddEducation;