

import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Alert, Chip, InputAdornment, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import * as yup from 'yup'
import { useFormik } from "formik";
import { addUser } from '../../features/users/usersSlice';
import { useDispatch } from 'react-redux';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const validationSchema = yup.object({
    name: yup
        .string('Enter Username')
        .required('Username is required'),

    description: yup
        .string('Enter Description')
        .required('Description is required'),

})


export default function AddModal({ open, setOpen }) {
    const dispatch = useDispatch()

    const [error, setError] = useState('')



    const handleSubmit = (values) => {



        dispatch(addUser(values))

        console.log('log here', values);

    }

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            handleSubmit({ ...values })
            resetForm();
        }
    })

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setError('');
    };


    return (
        <React.Fragment>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add User
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '500px' }}>
                        {/* <label>Name</label> */}
                        <TextField
                            id="name"
                            name='name'
                            sx={{
                                marginBottom: '10px'
                            }}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            // onChange={(e) => { setAddUser({ ...addUser, name: e.target.value }); console.log("v", e.target.value) }}
                            label="Name" placeholder="John Doe"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {/* <DraftsOutlinedIcon /> */}
                                        <PersonOutlineOutlinedIcon sx={{ color: 'black', display: 'none' }} />
                                    </InputAdornment>
                                ),
                            }}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />

                        <TextField
                            id="description"
                            name='description'
                            type='text'

                            value={formik.values.description}
                            onChange={formik.handleChange}


                            sx={{
                                marginBottom: '10px'
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {/* <DraftsOutlinedIcon /> */}
                                        <PersonOutlineOutlinedIcon sx={{ color: 'black', display: 'none' }} />
                                    </InputAdornment>
                                ),
                            }}
                            placeholder='Enter Description!'
                            label="Description"
                            variant="outlined"
                            fullWidth
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />


                        {error && <Alert severity="error">{error}</Alert>}

                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus
                            type='submit'
                            sx={{
                                bgcolor: '#228b22', color: 'white',
                                '&:hover': {
                                    bgcolor: '#228b22', // Set the hover background color to the same as the default
                                    opacity: '0.8'
                                    // Set the hover text color to the same as the default
                                },
                            }}>
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </BootstrapDialog>
        </React.Fragment>
    );
}