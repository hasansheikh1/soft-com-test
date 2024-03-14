import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CallReceivedOutlined, Close, ExpandLess, ExpandMore, PhoneMissedOutlined, SummarizeOutlined, VerifiedUserOutlined } from '@mui/icons-material';
import { Avatar, Collapse, Menu, MenuItem, SwipeableDrawer, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Main.scss'
import apiClient from '../../shared/apiClient';
import logo from '../../assets/logo.png'

import { useAuth } from '../Context/AuthProvider';


const drawerWidth = 280;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, active }) => ({
    zIndex: active === 'lg' && theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));




const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',

        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Main({ children }) {

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [openMenu, setOpenMenu] = React.useState("reports")
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openDropdown = Boolean(anchorEl);
    const { setToken } = useAuth();
    const navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(!open);
    };

    const handleLogout = () => {


        navigate('/login')


    }


    React.useEffect(() => {

        function handleClickOutside(event) {
            if (openDropdown && anchorEl && !anchorEl.contains(event.target)) {
                // Click occurred outside the menu, so close it
                setAnchorEl(null);
            }
        }

        // Attach the event listener when the component mounts
        document.addEventListener('click', handleClickOutside);

        return () => {
            // Remove the event listener when the component unmounts
            document.removeEventListener('click', handleClickOutside);
        };
    }, [openDropdown, anchorEl]);


    // for responsive check
    const useBreakpoints = () => {
        const breakpoints = {
            isXs: useMediaQuery("(max-width: 640px)"),
            isSm: useMediaQuery("(min-width: 641px) and (max-width: 768px)"),
            isMd: useMediaQuery("(min-width: 769px) and (max-width: 1024px)"),
            isLg: useMediaQuery("(min-width: 1025px)"),
            active: "sm",
        };

        if (breakpoints.isXs) breakpoints.active = "xs";
        if (breakpoints.isSm) breakpoints.active = "sm";
        if (breakpoints.isMd) breakpoints.active = "md";
        if (breakpoints.isLg) breakpoints.active = "lg";

        return breakpoints;
    };

    const { active } = useBreakpoints();

    return (
        <>
            <Box sx={{ display: 'flex' }} className='nav-v2'>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    active={active}
                    open={active === 'lg' && open}
                    sx={{
                        bgcolor: '#526dfe',
                    }}
                >

                    <Toolbar>
                        <div className='main-header'>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {!open && <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    sx={{
                                        marginRight: 5,
                                        // ...(open && { display: 'none' }),
                                    }}
                                >
                                    {!open ? <MenuIcon /> : <Close />}
                                </IconButton>}
                                {/* <img src={samba} alt='as' width={140} /> */}
                            </div>
                            <div>
                                <Avatar
                                    id="basic-button"
                                    aria-controls={openDropdown ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {/* <img src={user} alt='as' width={40} /> */}
                                </Avatar>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={openDropdown}

                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </div>
                        {/* <>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                // ...(open && { display: 'none' }),
                            }}
                        >
                            {!open ? <MenuIcon /> : <Close />}
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            A-K-U
                        </Typography>
                    </>
                    <Button >FDSA</Button> */}
                    </Toolbar>
                </AppBar>
                {active === 'lg' ? (
                    <Drawer variant="permanent" open={open} >
                        <MenuList
                            theme={theme}
                            openMenu={openMenu}
                            setOpenMenu={setOpenMenu}
                            handleDrawerClose={handleDrawerClose}
                        />
                    </Drawer>
                ) : (
                    <SwipeableDrawer
                        open={open}
                        onClose={handleDrawerClose}
                        onOpen={() => { }}
                        PaperProps={{ style: { width: '40%' } }}
                    >

                        <MenuList
                            theme={theme}
                            openMenu={openMenu}
                            setOpenMenu={setOpenMenu}
                            handleDrawerClose={handleDrawerClose}
                        />
                    </SwipeableDrawer>
                )}

                <div style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '20px', background: '#eeeff2', minHeight: '100vh' }}>
                    <DrawerHeader />
                    {children}

                </div>
            </Box>

        </>
    );
}

const MenuList = ({ theme, openMenu, setOpenMenu, handleDrawerClose }) => {

    const [role, setContext] = React.useState(sessionStorage.getItem("role"))



    const items = [

        {
            key: "users",
            name: "Users",
            path: '/user-permissions',
            icon: <VerifiedUserOutlined />,
            child: []
        },


    ]



    return (
        <div style={{ background: '#FFF', height: '100%', color: '#b3b4b9' }}>
            <DrawerHeader
                sx={{
                    display: 'flex',
                    bgcolor: '#526dfe',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h6" noWrap component="div" style={{ paddingLeft: '10px' }}>
                    <img src={logo} alt='logo' width={"40px"} />
                </Typography>
                <IconButton onClick={handleDrawerClose}
                    sx={{
                        color: '#b3b4b9'
                    }}
                >
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider sx={{ bgcolor: 'lightgray' }} />

            <List>
                {items.map((menu, index) => (
                    <React.Fragment key={index}>
                        {menu.child.length > 0 ? (
                            <>
                                {/* <Link className="link-tags" to={`${menu.path}`}> */}
                                <ListItemButton onClick={() => {
                                    if (menu.key === openMenu) setOpenMenu(null)
                                    else setOpenMenu(menu.key)
                                }}>
                                    <ListItemIcon
                                        sx={{
                                            color: '#b3b4b9'
                                        }}>
                                        {menu.icon}
                                    </ListItemIcon>
                                    <ListItemText sx={{ color: '#b3b4b9' }} primary={menu.name} />
                                    {openMenu === menu.key ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                {/* </Link> */}
                                {menu.child.map((child, i) => (
                                    <Collapse key={i} in={openMenu === menu.key} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <Link className="link-tags" to={`${child.path}`}>
                                                <ListItemButton sx={{ pl: 4, color: '#b3b4b9' }}>
                                                    <ListItemIcon sx={{
                                                        color: '#b3b4b9'
                                                    }}>
                                                        {/* {child.icon} */}
                                                        {child.icon}

                                                    </ListItemIcon>
                                                    <ListItemText sx={{ color: '#b3b4b9' }} primary={child.name} />
                                                </ListItemButton>
                                            </Link>
                                        </List>
                                    </Collapse>
                                ))}
                            </>
                        ) : (
                            <Link className="link-tags" to={`${menu.path}`}>
                                <ListItemButton sx={{ color: '#b3b4b9' }}>
                                    <ListItemIcon sx={{ color: '#b3b4b9' }} >
                                        {/* {menu.icon} */}
                                        {menu.icon}
                                    </ListItemIcon>
                                    <ListItemText sx={{ color: '#b3b4b9' }} primary={menu.name} />
                                </ListItemButton>
                            </Link>
                        )}
                    </React.Fragment>
                ))}


            </List>

            <Divider sx={{ bgcolor: 'lightgray' }} />
        </div >
    )
}
