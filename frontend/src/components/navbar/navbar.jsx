import { Box, styled, Button, Toolbar, AppBar, Typography, Drawer } from '@mui/material';
import './navbar.css';
import { useEffect, useState } from 'react';
import Login from '../login/login.jsx';
import { Link, NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditToolbar = styled(Toolbar)`
    background-color: black;
    width: 100%;
    display: flex;
    justify-content: center;
    box-shadow: 0px 1px 5px 1px rgba(255,255,255,0.75);
    -webkit-box-shadow: 0px 1px 5px 1px rgba(255,255,255,0.75);
    -moz-box-shadow: 0px 1px 5px 1px rgba(255,255,255,0.75);
`;

const EditButton = styled(Button)`
    border: 2px solid white;
    font-size: 15px;
    width: 100px;
    height: 40px;
    :hover{
        scale:1.05;
    }
    :active{
        scale:0.95;
    }
`;

const UsernameTypo = styled(Typography)`
    color:white;
`

const ChangeLink = styled(NavLink)`
    text-decoration:none;
    cursor:pointer;
`
const StyledMenu = styled((props) => (
    <Menu
        {...props}
    />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(0.5),
            backgroundColor:'#272829    ',
            minWidth:140,
            width:140
        },
}));

const NaviButton = styled(NavLink)`
    padding-top:20px;
    padding-bottom:20px;
    color:white;
    text-decoration:none;
    text-align:center;
`
const EditAccountIcon = styled(AccountCircleIcon)`
background: linear-gradient(to right, #ff6a00, #ee0979);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`
const Nav = () => {
    const [openLog, setLog] = useState(false);
    const [username, setUsername] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const navigate = useNavigate();
    const drawerWidth = 240;

    useEffect(() => {
        const name = localStorage.getItem('username');
        setUsername(name);
        console.log("Navbar username is ", name);
    }, [username])

    const openLogin = () => {
        setLog(true);
    };
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };
    const Logout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        console.log("Log Out SuccessFull");
        navigate('/intro');
        setUsername('');
        window.location.reload();
    }
    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: 'black', }} >
                <EditToolbar position="fixed">
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' }, position: 'absolute', left: '5vh'}} >
                        <MenuIcon sx={{fontSize:'35px'}} />
                    </IconButton>
                    <Box sx={{ width:{sm:'50%',lg:'40%'}, display: { xs: 'none', sm: 'flex' }, justifyContent: 'space-around' }}>
                        <ChangeLink className='abc' to={'/intro'}>Home</ChangeLink>
                        <ChangeLink className='abc' to={'/about'}>About</ChangeLink>
                        <ChangeLink className='abc' to={'/contact'}>Contact</ChangeLink>
                        <ChangeLink className='abc' to={'/service'}>Service</ChangeLink>
                        {username && <ChangeLink className='abc' to={`/user/${username}`}>Notes</ChangeLink>}
                    </Box>
                    <Box style={{ position: 'absolute', right: '25px', scale: '0.95' }}>
                        {
                            username ? <>
                                <Box style={{ textDecoration: 'none', display: 'flex', gap: '5px', cursor: 'pointer' }} onClick={handleClick}>
                                    <EditAccountIcon sx={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',backgroundImage: 'linear-gradient(90deg, rgba(0,116,182,1) 0%, rgba(0,116,182,0) 100%)', color: 'white', width: '35px', height: '35px' }} />
                                    <UsernameTypo style={{ fontSize: '18px', paddingTop: '7px' }} variant='p'>{username}</UsernameTypo>
                                </Box>

                                <StyledMenu sx={{display:'flex',flexDirection:'column'}} id="basic-menu" MenuListProps={{ 'aria-labelledby': 'basic-button'}} anchorEl={anchorEl} open={open} onClose={handleClose} >
                                    <Button onClick={()=>{navigate(`/user/${username}`)}} style={{width:'100%',color:'white'}} variant="text">Notes</Button>
                                    <Button onClick={()=>{navigate(`/about`)}} style={{width:'100%',color:'white'}} variant="text">About</Button>
                                    <Button onClick={Logout} style={{width:'100%',color:'white'}} variant="text">Log Out</Button>
                                </StyledMenu>

                            </>
                                :
                                <Link to={`/intro?login=true`}>
                                    <EditButton onClick={openLogin} sx={{ color: 'white', fontSize: '20px', fontWeight: 'bold', letterSpacing: '1px',textTransform: 'lowercase',scale:{sm:'1',xs:'0.89'} }}> Login </EditButton>
                                </Link>
                        }
                    </Box>
                </EditToolbar>
            </AppBar>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders" >
                <Drawer variant="temporary" open={mobileOpen} onTransitionEnd={handleDrawerTransitionEnd} onClose={handleDrawerClose} ModalProps={{ keepMounted: true, }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: '#191919',
                        },
                    }}>
                    <Box style={{width:'100%',display:'flex',flexDirection:'column',paddingTop:'30px'}}>
                        <Box style={{width:'100%',display:'flex',flexDirection:'column'}}>   
                            <NaviButton className="abc" to={'/intro'}>home</NaviButton>
                            <NaviButton className="abc" to={'/about'}>About</NaviButton>
                            <NaviButton className="abc" to={'/contact'}>Contact</NaviButton>
                            <NaviButton className="abc" to={'/service'}>Service</NaviButton>
                            {username && <NaviButton className="abc" to={`/user/${username}`}>Notes</NaviButton>}
                        </Box>
                    </Box>
                </Drawer>
            </Box>
            {openLog && <Login open={openLog} setLog={setLog} />}
        </>
    );
};

export default Nav;