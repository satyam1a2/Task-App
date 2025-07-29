import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useParams, useNavigate,NavLink} from 'react-router-dom';
import { Typography, Grid, Button ,styled} from '@mui/material';
import NotesCard from './Notes-Card';
import { NotesGet } from '../../api/api';


const drawerWidth = 240;

const EditButton = styled(Button)`
    border: 2px solid white;
    font-size: 15px;
    height: 40px;
`;
const NaviButton = styled(NavLink)`
    padding-top:20px;
    padding-bottom:20px;
    color:white;
    text-decoration:none;
    text-align:center;
`

const UserInterface = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [userData, setUserData] = useState([]);
    const [noData, setNoData] = useState(false);
    const [newNote, setNewNote] = useState(false);
    const [clickOnce,setClickOnce] = useState(true);
    const navigate = useNavigate();

    const { username } = useParams();

    const createNewNote = ()=>{
        if(clickOnce){
            setNewNote(true);
            setClickOnce(!clickOnce);
            setNoData(false);
        }
        else{
            setNewNote(false);
            setClickOnce(!clickOnce);
            if(userData.length===0){
                setNoData(true)
                return;
            }
            setNoData(false);
        }
    }
    
    useEffect(() => {
        const userNotes = async () => {
            try {
                const response = await NotesGet(username);
                if (response.status && response.status === 'success') {
                    setUserData(response.userNotes);
                }else if(response.status && response.status === 'empty'){
                    setNoData(true);
                    return;
                } else {
                    navigate('/intro');
                }
            } catch (error) {
                console.log("Error while fetching Data", error);
                navigate('/nonexistent-page');
                return;
            }
        };

        userNotes();
        const intervalId = setInterval(() => userNotes(), 1800000);

        // Clear interval and perform cleanup when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, [username, navigate,setUserData]);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, backgroundColor: '#191919', }} >
                <Toolbar position="fixed" sx={{ zIndex:'2',mr: 2, display: { md: 'none' }}}>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }} >
                        <MenuIcon />
                    </IconButton>
                
                <Box style={{ position: 'absolute',right:'0px', scale: '0.95' }}>
                    <EditButton onClick={createNewNote} sx={{ color: 'white', fontSize: '15px', fontWeight: 'bold', letterSpacing: '1px',scale:{sm:'1',xs:'0.89'} }}> {clickOnce?"Create Notes":"Clear Notes"}</EditButton>
                </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders" >
                <Drawer variant="temporary" open={mobileOpen} onTransitionEnd={handleDrawerTransitionEnd} onClose={handleDrawerClose} ModalProps={{    keepMounted: true, }}
                    sx={{ display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: '#191919',
                    }, }}>
                    <Box style={{ display: 'flex',height:'100%', flexDirection: 'column', gap: '20px', padding: '20px' }}>
                        <Typography style={{ color: 'white', fontSize: '25px',textAlign:'center' }}>{username}</Typography>
                        <Box style={{width:'100%',display:'flex',flexDirection:'column'}}>   
                            <NaviButton className="abc" to={'/intro'}>home</NaviButton>
                            <NaviButton className="abc" to={'/about'}>About</NaviButton>
                            <NaviButton className="abc" to={'/contact'}>Contact</NaviButton>
                            <NaviButton className="abc" to={'/service'}>Service</NaviButton>
                        </Box>
                    </Box>
                </Drawer>

                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: '#191919', // Change the background color to blue #7F27FF
                        },
                    }} open >
                    <Box style={{ display: 'flex',height:'100%', flexDirection: 'column', gap: '40px', padding: '20px' }}>
                        <Typography style={{ color: 'white', fontSize: '25px' }}>{username}</Typography>
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={createNewNote} style={{ border: '2px solid white', color: 'white' }} variant='standard'>{clickOnce?"Create Notes":"Clear Notes"}</Button>
                        </Box>
                        <Box style={{width:'100%',display:'flex',flexDirection:'column'}}>   
                            <NaviButton className="abc" to={'/intro'}>home</NaviButton>
                            <NaviButton className="abc" to={'/about'}>About</NaviButton>
                            <NaviButton className="abc" to={'/contact'}>Contact</NaviButton>
                            <NaviButton className="abc" to={'/service'}>Service</NaviButton>
                        </Box>
                    </Box>
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, minHeight: '100vh', p: 3, marginTop: { xs: '50px',md:'0',lg: '0' }, width: { sm: `calc(100% - ${drawerWidth}px)` }, backgroundColor: ' black' }}>
                <Grid container>
                    <Grid item style={{display: 'flex', gap: '10px' }} xs={12} lg={12} sm={12} md={12}>
                        <Typography style={{ color: 'white', fontSize: '70px', fontWeight: 'bold', letterSpacing: '2px' }}>Notes</Typography>
                    </Grid>
                    <Grid item style={{ height: '80vh', flex: '1', overflow: 'auto', padding: '1px' }} xs={12} lg={12} sm={12} md={12}>
                        <NotesCard newNote={newNote} setNewNote={setNewNote} noData={noData} setNoData={setNoData} userData={userData} setClickOnce={setClickOnce} clickOnce={clickOnce}/>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
export default UserInterface;

// old Color's #7F27FF #9F70FD