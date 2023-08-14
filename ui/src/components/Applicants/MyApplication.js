import React, {Component} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import List from '@material-ui/core/List';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import Rating from '@material-ui/lab/Rating';
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";


function MyApplications(props) {
  const applications = props.applications || [];

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date of Joining</TableCell>
            <TableCell>Salary (per month)</TableCell>
            <TableCell>Recruiter</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {applications.map(app => (
            <TableRow key={app.title}>
              <TableCell>{app.title}</TableCell>
              <TableCell>{app.status}</TableCell>
              <TableCell>{app.dateOfJoining}</TableCell>
              <TableCell>{app.salary}</TableCell>
              <TableCell>{app.recruiter}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default MyApplications;
