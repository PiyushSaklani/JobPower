import LoginPage from './components/LoginPage';
import FrontPage from './components/FrontPage';
import SignupPage from './components/SignupPage';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import MainPage from './components/MainPage';
import ForgotPassword from './components/forgotpassword';
import ResetPassword from './components/resetpassword';
import MyApplications from './components/Applicants/MyApplication';
import JobsList from './components/Applicants/JobsList';
import AddEducation from './components/Applicants/AddEducation';
import Dashboard from './components/User/Dashboard'
import { useState } from 'react';
import MainScreen from './components/main-screen/main-screen';
import Profile_Screen from './components/profile-screen/profile-screen';
import Jobs_Screen from './components/jobs-screen/jobs-screen';
import Applied_screen from './components/applied-screen/applied-screen';
import R_MainScreen from './components/r-main-screen/r-main-screen';
import R_Profile_Screen from './components/r-profile-screen/r-profile-screen';
import First_Google_user from './components/firstgoogle-user/firstgoogle-user';

function App() {
  const [educationList, setEducationList] = useState([]);

  const handleAddEducation = (education) => {
    setEducationList([...educationList, education]);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
          <Route path="/MyApplications" element={<MyApplications />} />
          <Route path="/JobsList" element={<JobsList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/AddEducation" element={<AddEducation onAddEducation={handleAddEducation} />} />
          
          <Route path="/main-screen" element={<MainScreen />} />
          <Route path="/r-main-screen" element={<R_MainScreen />} />
          <Route path="/profile-screen" element={<Profile_Screen />} />
          <Route path="/r-profile-screen" element={<R_Profile_Screen />} />
          <Route path="/jobs-screen" element={<Jobs_Screen />} />
          <Route path="/applied-screen" element={<Applied_screen />} />
          <Route path="/google_user" element={<First_Google_user />} />
        </Routes>
      </BrowserRouter>

      <ul>
        {educationList.map((education, index) => (
          <li key={index}>
            School: {education.school}, Degree: {education.degree}, Start Date: {education.startDate}, End Date: {education.endDate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;