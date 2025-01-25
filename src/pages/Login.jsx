import React, { useContext, useState } from 'react';
import { TextField, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthLayout from '../components/Auth/AuthLayout';
import useStyles from '../components/Auth/styles';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";
import { Formik, Form, ErrorMessage } from 'formik';
import { LoginSchema } from '../components/Auth/LoginSchema';

const Login = () => {
  const { login } = useContext(AuthContext);
  const styles = useStyles();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = { email: '', password: '' };

  const handleSubmit = async (values, { setSubmitting }) => {
    setError('');
    try {
      await login(values.email, values.password);
    } catch (err) {
      setError('Invalid email or password');
    }
    setSubmitting(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <AuthLayout title="Login to X Clone">
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleChange, handleBlur, values }) => (
          <Form className={styles.form}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onInput={()=>{setError('')}}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              variant="outlined"
              className={styles.root}
              autoComplete=''
              
              helperText={<ErrorMessage className='text-white mb-0' name="email" component={"p"} />}
            />
            <TextField
              label="Password"
              
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              onInput={()=>{setError('')}}

              onBlur={handleBlur}
              fullWidth
              margin="normal"
              variant="outlined"
              className={styles.root}
              helperText={<ErrorMessage className='text-white mb-0' name="password" component={"p"} />}
              slotProps={{input:{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      sx={{color:"white"}}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
              }}
            />

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Box>
              <Typography variant="body1" component="p">
                Don't have an account? <Link to="/signup" style={{ textDecoration: "none" }}>Sign up</Link>
              </Typography>
            </Box>
            <Button type="submit" variant="contained" color="primary" className={styles.button} disabled={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;