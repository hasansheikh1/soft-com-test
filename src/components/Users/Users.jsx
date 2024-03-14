import React, { useEffect, useState } from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
// import { grey, green } from '@mui/material/colors';
import { Box, Button, Chip, CircularProgress, Fab, Menu, MenuItem } from '@mui/material';
import { Delete, Edit, PhonelinkLockOutlined, RemoveRedEyeOutlined, Save } from '@mui/icons-material';
import './Users.scss'
import EditModal from '../EditModal/EditModal';
import AddModal from '../AddModal/AddModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import { useSelector } from 'react-redux';

const Users = () => {
    const { users } = useSelector(state => state.users)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const openn = Boolean(anchorEl);


    useEffect(() => {
        console.log(users)
    }, [])

    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 5,
    });

    const [userDetails, setUserDetails] = useState(
        {
            id: "",
            name: "",
            description: "",

        }

    )
    const [userRows, setUserRows] = useState([])

    // console.log("jj", userDetails)




    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    useEffect(() => {

        // fetchUsers();

    }, [editOpen, open, deleteOpen, setOpen])



    const handleUpdate = (values) => {
        console.log("kk", values)


    }


    const handleRowClick = (params) => {

        console.log("params", params)
        setUserDetails({ ...userDetails, id: params.row.id, name: params.row.name, description: params.row.description })
        // console.log("Row data", userDetails)
    };

    return (
        <div id='user-container' style={{ height: "90vh", width: '100%' }}>
            <Button
                onClick={() => { setOpen(!open) }}
                variant="contained"
                sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
                Add User
            </Button>
            <DataGrid
                onRowClick={handleRowClick}
                rows={users}
                columns={[

                    {
                        field: 'id',
                        headerName: <h4 >User ID</h4>,
                        flex: 1,
                    },
                    {
                        field: 'name',
                        headerName: <h4 >Name</h4>,
                        flex: 1,

                    },
                    {
                        field: 'description',
                        headerName: <h4>Description</h4>,
                        flex: 1
                    },

                    {
                        field: 'actions',
                        headerName: <h4 >Actions</h4>,
                        flex: 1,

                        renderCell: (params) => {
                            // console.log("ass", params)
                            return (
                                <>

                                    {/* <Button
                                        onClick={() => {
                                            setViewOpen(!viewOpen);

                                        }}

                                        startIcon={<RemoveRedEyeOutlined sx={{ color: 'gray' }} />} ></Button> */}
                                    <Button onClick={() => {
                                        setEditOpen(!editOpen);

                                    }}

                                        startIcon={<Edit sx={{ color: 'green', padding: '0px' }} />} >

                                    </Button>
                                    <Button
                                        onClick={() => {
                                            // console.log('fffff', params)
                                            setDeleteOpen(!deleteOpen)

                                        }}

                                        startIcon={<Delete sx={{ color: '#fe6464' }} />} ></Button>


                                </>)
                        }
                    },
                ]}

                rowSelection={false}


                sx={{
                    maxHeight: '500px',
                    padding: '20px',
                    bgcolor: 'white'
                }}

            />
            <EditModal editOpen={editOpen}
                setEditOpen={setEditOpen} userDetails={userDetails} />



            <AddModal
                open={open}
                setOpen={setOpen}

            />
            <DeleteModal deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen}

                userDetails={userDetails} />
        </div>

    );
};

export default Users;


