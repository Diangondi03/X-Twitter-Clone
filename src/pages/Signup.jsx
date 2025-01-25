import React, { useState } from 'react';
import { TextField, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthLayout from '../components/Auth/AuthLayout';
import useStyles from '../components/Auth/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import { SignupSchema } from '../components/Auth/SignupSchema';
import PhotoPicker from '../components/Auth/PhotoPicker';

const Signup = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = { username: '', name: '', email: '', password: '', confirmPassword: '' };
  const [image, setImage] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    setError('');
    const { confirmPassword, ...submitValues } = values;
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { ...submitValues, image },
        {headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (err) {
      setError(err.response.data.message);
    }
    setSubmitting(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const formFields = [
    { name: 'username', label: 'Username', type: 'text', startAdornment: '@' },
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: showPassword ? 'text' : 'password', showToggle: true, toggleHandler: handleClickShowPassword, mouseDownHandler: handleMouseDownPassword, show: showPassword },
    { name: 'confirmPassword', label: 'Confirm Password', type: showConfirmPassword ? 'text' : 'password', showToggle: true, toggleHandler: handleClickShowConfirmPassword, mouseDownHandler: handleMouseDownConfirmPassword, show: showConfirmPassword },
  ];

  return (
    <AuthLayout title="Sign Up for Twitter">
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleChange, handleBlur, values }) => (
          <Form className={styles.form}>
            <PhotoPicker setImage={setImage} />

            {formFields.map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                value={values[field.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                margin="normal"
                variant="outlined"
                className={styles.root}
                helperText={<ErrorMessage className='text-white mb-0' name={field.name} component={"p"} />}
                slotProps={{input:{
                  startAdornment: field.startAdornment ? (
                    <InputAdornment position="start">
                      <Typography sx={{ color: 'white' }}>{field.startAdornment}</Typography>
                    </InputAdornment>
                  ) : null,
                  endAdornment: field.showToggle ? (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={`toggle ${field.name} visibility`}
                        onClick={field.toggleHandler}
                        onMouseDown={field.mouseDownHandler}
                        sx={{ color: "white" }}
                        edge="end"
                      >
                        {field.show ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                }
                }}
              />
            ))}
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Box mt={2}>
              <Typography variant="body1" component="p">
                Already have an account? <Link to="/login" style={{ textDecoration: "none" }}>Login</Link>
              </Typography>
            </Box>
            <Button type="submit" variant="contained" color="primary" className={styles.button} disabled={isSubmitting}>
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Signup;