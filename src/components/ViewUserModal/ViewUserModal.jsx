

import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Chip, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { useEffect } from 'react';
import apiClient from '../../shared/apiClient';
import { PhonelinkLockOutlined } from '@mui/icons-material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ViewUserModal({ editOpen, setEditOpen, userDetails, handleUpdate }) {
    // const [open, setOpen] = React.useState(false);

    const { name, email, context, did } = userDetails;

    const [viewUser, setViewUser] = React.useState({

        name: name,
        email: email,
        context: context,
        did: did,
        password: ''

    })

    const [diD, setdiD] = React.useState([])

    const [checkValidDod, setCheckValidDod] = React.useState(false)

    useEffect(() => {
        setdiD(did)
    }, [did])


    // useEffect(() => {

    //     // setdiD(did)

    //     // setViewUser({
    //     //     name: name,
    //     //     email: email,
    //     //     context: context,
    //     //     did: diD,
    //     //     password: ''
    //     // })

    //     // console.log('didd', diD)
    //     // const myTimeout = setTimeout(myGreeting, 5000);

    //     setTimeout(() => {

    //         console.log("Edit Details", viewUser)

    //     }, 1000)


    // }, [viewOpen, diD])


    useEffect(() => {


        setViewUser(prevState => ({
            ...prevState,
            name: name,
            email: email,
            context: context,
            did: diD,
            password: ''
        }));

        setTimeout(() => {
            console.log("Edit Details", viewUser);
        }, 1000);

    }, [userDetails, diD]);



    // useEffect(() => {

    //     if (viewOpen == true) {

    //         setdiD(did)
    //     }

    // }, [viewOpen])



    const handleClickOpen = () => {
        setEditOpen(true);
    };

    const handleClose = () => {
        setEditOpen(false);
    };

    return (
        <React.Fragment>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open dialog
            </Button> */}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={editOpen}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    User Details
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
                <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '500px' }}>
                    {/* <label>Name</label> */}
                    <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Name:</label>

                    <TextField
                        disabled
                        id="name"
                        name='name'
                        sx={{
                            marginBottom: '10px'
                        }}
                        onChange={(e) => { setViewUser({ ...viewUser, name: e.target.value }); console.log("v", e.target.value) }}
                        value={viewUser.name}
                        placeholder="John Doe"
                        variant="outlined"
                        fullWidth
                    // InputProps={{
                    //     startAdornment: (
                    //         <InputAdornment position="start">
                    //             {/* <DraftsOutlinedIcon /> */}
                    //             <PersonOutlineOutlinedIcon sx={{ color: 'black', display: 'none' }} />
                    //         </InputAdornment>
                    //     ),
                    // }}
                    />
                    <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Email:</label>
                    <TextField
                        id="email"
                        name='email'
                        disabled
                        value={viewUser.email}
                        sx={{
                            marginBottom: '10px'
                        }}
                        onChange={(e) => { setViewUser({ ...viewUser, email: e.target.value }); console.log("v", e.target.value) }}
                        // InputProps={{
                        //     startAdornment: (
                        //         <InputAdornment position="start">
                        //             {/* <DraftsOutlinedIcon /> */}
                        //             <PersonOutlineOutlinedIcon sx={{ color: 'black', display: 'none' }} />
                        //         </InputAdornment>
                        //     ),
                        // }}
                        placeholder='johndoe1@example.com'
                        variant="outlined"
                        fullWidth />

                    <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Context:</label>
                    <TextField
                        id="context"
                        name='context'
                        disabled
                        value={viewUser.context}
                        sx={{
                            marginBottom: '10px'
                        }}
                        onChange={(e) => { setViewUser({ ...viewUser, context: e.target.value }); console.log("v", e.target.value) }}
                        placeholder='Context'
                        variant="outlined"

                        fullWidth
                    />

                    <label style={{ fontWeight: 'bold', fontSize: '14px' }}>DID:</label>

                    <TextField
                        sx={{ marginBottom: '10px' }}
                        disabled
                        InputProps={{
                            startAdornment: (
                                <div style={{ marginBottom: '5px', display: 'flex', gap: '5px', overflowX: 'scroll', padding: '10px', minWidth: '100%' }}>
                                    {diD.map((v, i) => (
                                        <Chip key={i} color="secondary" label={v} icon={<PhonelinkLockOutlined />} />
                                    ))}
                                </div>
                            )
                        }}
                        fullWidth
                    />
                    {/* <label style={{ fontWeight: 'bold', fontSize: '14px' }}>DID:</label>



                    <div style={{ marginBottom: '5px' }}>
                        {diD.map((v, i) => (
                            <Chip key={i} color="secondary" label={v} icon={<PhonelinkLockOutlined />} />
                        ))}
                    </div> */}

                    {/* <InputLabel sx={{ fontWeight: 'bold', fontSize: '14px', color: 'black' }}>DID:</InputLabel>
                    <Input
                        
                        readOnly
                        disabled
                        startAdornment={
                            <div style={{ marginBottom: '5px', display: 'flex', gap: '5px' }}>
                                {diD.map((v, i) => (
                                    <Chip key={i} color="secondary" label={v} icon={<PhonelinkLockOutlined />} />
                                ))}
                            </div>
                        }
                    /> */}

                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
}