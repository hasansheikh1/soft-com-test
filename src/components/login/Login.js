import React, { useState } from 'react'
import './Login.scss'
import illustration from '../../assets/education.png'
import { Button, CircularProgress, Divider, InputAdornment, TextField } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import apiClient from '../../shared/apiClient';
import { useFormik } from "formik";
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';
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

    const { setToken } = useAuth();

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

    const [loading, setLoading] = useState(false)

    const handleSubmit = (values) => {
        setLoading(true)
        setToken(true)
        navigate('/')
    }

    return (
        <div id='login-cont' className='login-container'>

            <div className='left-panel'>

            </div>
            <div className='login-form-cont'>

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
                            endIcon={loading && <CircularProgress />}
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

            {/* <div className='login-wrapper'>

                <div className='form-container'>
                    <div className='form-heading'>
                        <img src={logo} width={"100px"} alt="logo" />
                    </div>
                    <div className='form-txt'>
                        Enter your details to signin to your account
                    </div>

                    <form onSubmit={formik.handleSubmit} style={{ width: '80%' }}>
                        <div className='email-field'>
                            <TextField
                              
                                id="email"
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                variant="outlined"
                                label="Username"
                                sx={{
                                 
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
                            endIcon={loading && <CircularProgress />}
                            type='submit'
                            size='large' variant="contained"
                            fullWidth style={{ background: '#1A42BC', }}>
                            Sign-in
                        </Button>
                    </form>
                </div>
            </div> */}

        </div >
    )
}