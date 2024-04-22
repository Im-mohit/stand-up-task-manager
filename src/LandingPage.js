import React from 'react';
import { Button, Typography, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import videoFile from './assets/lower_res_landing.mov'; // Import the video file

const LandingPage = () => {
  const navigate = useNavigate();

  const redirectToTaskPlanner = () => {
    navigate('/task-planner');
  };

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h2" gutterBottom>
            Welcome to Daily Sync Hub
          </Typography>
          <Typography variant="body1" gutterBottom>
            Effortlessly manage tasks, collaborate with your team, and achieve more together.
          </Typography>
          <Button variant="contained" color="primary" size="large" onClick={redirectToTaskPlanner}>
            Get Started
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <video width="400" height="400" controls>
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LandingPage;
