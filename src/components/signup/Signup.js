import React, { useState } from 'react'
import './Signup.scss'
import illustration from '../../assets/education.png'
import { Button, CircularProgress, Divider, InputAdornment, TextField } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFormik } from "formik";
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { Google, Twitter } from '@mui/icons-material';
import { styled } from "@mui/system";

const validationSchema = yup.object({
    name: yup
        .string('Enter your full name')
       
        .required('Name is required!'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required!'),
    password: yup
        .string('Enter your password')
        .required('Password is required!'),
})

const MuiText = styled(TextField)({
    "& .MuiInputBase-input": {
      width: 200, // Set your desired width here
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      background: "white",
      // Add border styles for focus and active states
      border: "1px solid #ccc",
      "&:focus, &:active": {
        borderColor: "red", // Change to your desired color
      },
    },
    "& .MuiSelect-select": {
      borderRadius: "20px",
    },
  });
  
export default function Signup() {

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            name:'',
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("formik values", values)
            handleSubmit(values)
        }
    })


    const handleSubmit = (values) => {
      
        navigate('/login')
    }

    return (
        <div id='signup-cont' className='login-container'>

            {/* <div className='left-panel'>
            </div> */}
            <div className='login-form-cont'>

                {/* <div className='login-form'> */}
                <div className='form-container'>

                    <div className='header-wrapper'>
                        <div className='form-heading'>
                            Sign Up to Dribble
                        </div>
                        <div className='form-txt'>

                            <Button
                                startIcon={<Google />}

                                type='submit'
                                size='large'
                                variant="contained"
                                fullWidth
                                sx={{ bgcolor: '#4385f5', width: '80%', textTransform: 'none' }}>
                                Sign-Up with Google
                            </Button>

                            <Button
                                startIcon={<Twitter sx={{ color: '#6f6b80' }} />}
                                variant="contained"
                                style={{ background: '#f2f2f2', textTransform: 'none' }}
                            >

                            </Button>

                        </div>
                    </div>

                    <Divider style={{ color: 'lightgray', fontWeight: '700', width: "80%" }} > Or</Divider>

                    <form onSubmit={formik.handleSubmit}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            width: '80%'
                        }}>

                        


                        <div className='email-field'>
                            <TextField

                                id="name"
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                variant="outlined"
                                label="Name"
                                fullWidth
                                placeholder='John Doe'
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: 'pink',
                                            boxShadow: '0px 0px 5px rgba(255, 192, 203, 0.5)', 
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'pink', 
                                            boxShadow: '0px 0px 5px rgba(255, 192, 203, 0.5)', 
                                        },
                                    },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">

                                            <PersonOutlineOutlinedIcon sx={{ color: 'black' }} />
                                        </InputAdornment>
                                    ),
                                }}

                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </div>
                        <div className='email-field'>
                            <TextField

                                id="email"
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                variant="outlined"
                                label="Email"
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: 'pink',
                                            boxShadow: '0px 0px 5px rgba(255, 192, 203, 0.5)', 
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'pink', 
                                            boxShadow: '0px 0px 5px rgba(255, 192, 203, 0.5)', 
                                        },
                                    },
                                }}
                                placeholder='johndoe1@example.com'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">

                                            <PersonOutlineOutlinedIcon sx={{ color: 'black' }} />
                                        </InputAdornment>
                                    ),
                                }}

                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </div>
                        <div className='password-field'>
                            <TextField

                                name='password'
                                type='password'
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: 'pink',
                                            boxShadow: '0px 0px 5px rgba(255, 192, 203, 0.5)', 
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'pink', 
                                            boxShadow: '0px 0px 5px rgba(255, 192, 203, 0.5)', 
                                        },
                                    },
                                }}
                                id='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                variant="outlined"
                                label="Password"
                                placeholder='Password'
                                InputProps={{

                                    startAdornment: (
                                        <InputAdornment position="start">

                                            <LockOutlinedIcon sx={{ color: 'black' }} />
                                        </InputAdornment>
                                    ),
                                }}

                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </div>
                        <Button
                            // endIcon={loading && <CircularProgress />}
                            type='submit'
                            size='large'
                            variant="contained"
                            fullWidth
                            style={{
                                background: '#ea4c8a',
                                textTransform: 'none',
                                
                            }}>
                            Sign Up
                        </Button>
                    </form>
                </div>
                {/* </div> */}

            </div>

           

        </div >
    )
}