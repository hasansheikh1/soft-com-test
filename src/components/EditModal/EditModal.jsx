

import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Chip, InputAdornment, TextField } from '@mui/material';
import { useEffect } from 'react';
import apiClient from '../../shared/apiClient';
import { PhonelinkLockOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { modifyUser } from '../../features/users/usersSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function EditModal({ editOpen, setEditOpen, userDetails }) {
    // const [open, setOpen] = React.useState(false);

    const { id, name, description } = userDetails;

    const [editUser, setEditUser] = React.useState({
        id: id,
        name: name,
        description: description,


    })

    const [checkValidDod, setCheckValidDod] = React.useState(false)
    const dispatch = useDispatch()
    const handleUpdate = () => {
        dispatch(modifyUser(editUser))
        console.log("edituser", editUser)
    }

    useEffect(() => {


        setEditUser(prevState => ({
            ...prevState,
            id: id,
            name: name,
            description: description,

        }));



    }, [userDetails]);






    const handleClickOpen = () => {
        setEditOpen(true);
    };

    const handleClose = () => {
        setEditOpen(false);
    };

    return (
        <React.Fragment>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={editOpen}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Edit User
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
                    <TextField
                        id="name"
                        name='name'
                        sx={{
                            marginBottom: '10px'
                        }}
                        onChange={(e) => { setEditUser({ ...editUser, name: e.target.value }); console.log("v", e.target.value) }}
                        value={editUser.name}
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
                    />
                    {/* <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Email:</label> */}
                    <TextField
                        id="description"
                        name='description'

                        value={editUser.description}
                        sx={{
                            marginBottom: '10px'
                        }}
                        onChange={(e) => { setEditUser({ ...editUser, description: e.target.value }); console.log("v", e.target.value) }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {/* <DraftsOutlinedIcon /> */}
                                    <PersonOutlineOutlinedIcon sx={{ color: 'black', display: 'none' }} />
                                </InputAdornment>
                            ),
                        }}
                        placeholder='Description...'
                        label="Description" variant="outlined"
                        fullWidth />



                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => {
                        handleUpdate();
                        handleClose();
                    }} sx={{
                        bgcolor: '#228b22', color: 'white',
                        '&:hover': {
                            bgcolor: '#228b22',
                            opacity: '0.8'

                        },
                    }}>
                        Update
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}