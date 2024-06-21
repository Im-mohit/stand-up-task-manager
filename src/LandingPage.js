import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Typography, Container, Grid } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import Header from './common/Header';
import outputs from './amplify_outputs.json';
import { Amplify } from 'aws-amplify';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { getCurrentUser, signInWithRedirect } from 'aws-amplify/auth';

Amplify.configure(outputs);


const features = [
  { image: 'image_1.png', description: 'Create a task with one click' },
  { image: 'image_2.png', description: 'Manage the task progress with the timer on right side' },
  { image: 'image_3.png', description: 'Easily generate standup summary with just one click' },
  // Add more features as needed
];



const LandingPage = () => {

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        console.log("username", currentUser);
      } catch (error) {
        console.log('User not authenticated', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const redirectToTaskPlanner = async () => {
      try {
        if (user) {
          setLoading(true);
          navigate('/task-planner');
        } else {
          await signInWithRedirect({provider: 'Google'}); // Show sign-in option
        }
      } catch {
        await signInWithRedirect({provider: 'Google'}); // Show sign-in option
      }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const imageStyle = {
    maxWidth: '100%', // Ensure images don't exceed their container's width
    maxHeight: '300px', // Set a maximum height for consistency
    display: 'block', // Ensure images don't have any additional space below them
    margin: 'auto', // Center the image horizontally
  };

  return (
    <Container>
      <Header />
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h2" gutterBottom>
           Welcome to <br />
           Standup Mate
          </Typography>
          <Typography variant="body1" gutterBottom>
            Effortlessly manage tasks, collaborate with your team, and achieve more together.
          </Typography>
          <Button variant="contained" color="primary" size="large" onClick={redirectToTaskPlanner} disabled={loading}>
            {user ? 'Get Started' : 'Signup to get started'}
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Slider {...settings}>
            {features.map((feature, index) => (
              <div key={index}>
                <img
                  src={require(`./assets/${feature.image}`)}
                  alt={`Feature ${index + 1}`}
                  style={imageStyle}
                />
                <div className="description">
                  <Typography variant="body1">{feature.description}</Typography>
                </div>
              </div>
            ))}
          </Slider>
        </Grid>
      </Grid>
      <footer className="footer">
          <nav className="footer-nav">
            <p>&copy; 2024 LeanLyf</p>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Settings</a>
          </nav>
        </footer>
    </Container>
  );
};

export default LandingPage;
