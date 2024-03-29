import React, { useState } from 'react'
import './Login.scss'
import illustration from '../../assets/education.png'
import { Button, CircularProgress, Divider, InputAdornment, TextField } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFormik } from "formik";
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { Google, Twitter } from '@mui/icons-material';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .required('Password is required'),
})

export default function Login() {

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
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
      
        navigate('/user-permissions')
    }

    return (
        <div id='login-cont' className='login-container'>

            <div className='left-panel'>
            </div>
            <div className='login-form-cont'>

                <div className='signup-wrapper'>
                <span className='member'>
                    Not a member?
                </span>
                <span className='member1'>
                   <Link className="up-link" to={"/signup"}>Sign up now</Link>
                </span>
                </div>

                {/* <div className='login-form'> */}
                <div className='form-container'>

                    <div className='header-wrapper'>
                        <div className='form-heading'>
                            Sign in to Dribble
                        </div>
                        <div className='form-txt'>

                            <Button
                                startIcon={<Google />}

                                type='submit'
                                size='large'
                                variant="contained"
                                fullWidth
                                sx={{ bgcolor: '#4385f5', width: '80%', textTransform: 'none' }}>
                                Sign in with Google
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

                                id="email"
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                variant="outlined"
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
                                label="Username"
                                fullWidth
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
                                id='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
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
                            // fullWidth
                            style={{
                                background: '#ea4c8a',
                                textTransform: 'none',
                                width: '200px'
                            }}>
                            Sign In
                        </Button>
                    </form>
                </div>
                {/* </div> */}

            </div>

           

        </div >
    )
}