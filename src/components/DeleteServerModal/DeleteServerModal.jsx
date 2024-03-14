

import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import apiClient from '../../shared/apiClient';
import { DeleteOutline, DeleteOutlineRounded } from '@mui/icons-material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function DeleteServerModal({ deleteOpen, setDeleteOpen, userDetails, handleDelete }) {

    const { id, name, email, context, did } = userDetails;


    const [editUser, setEditUser] = React.useState({})

    useEffect(() => {
        setEditUser({

            id: id,

        })
    }, [userDetails, deleteOpen])


    const handleClickOpen = () => {
        setDeleteOpen(true);
    };
    const handleClose = () => {
        setDeleteOpen(false);
    };




    return (
        <React.Fragment>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open dialog
            </Button> */}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={deleteOpen}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Delete User
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
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px'
                    }}>

                        <DeleteOutlineRounded sx={{
                            fontSize: '35px',
                            fontWeight: 'bold',
                            color: 'gray'
                        }} />
                        <span style={{
                            width: "100%",
                            textAlign: 'center',
                            color: 'gray'
                        }} >Are you sure you want to delete this user?</span>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={handleClose}>No, Cancel</Button>
                    <Button autoFocus onClick={() => {
                        handleDelete(editUser);
                        handleClose();
                    }}
                        sx={{
                            bgcolor: '#c81e1e',
                            padding: '10px',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            '&:hover': {
                                bgcolor: '#c81e1e', // Set the hover background color to the same as the default
                                opacity: '0.8'
                                // Set the hover text color to the same as the default
                            },
                        }}>
                        Delete
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}