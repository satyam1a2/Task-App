import { Grid, styled, Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from 'react';
import { useNavigate,Link} from 'react-router-dom';
import CustomizedTimeline from './TimeLine';
import FacebookIcon from '@mui/icons-material/Facebook';
import './Intro.css';
const ChangeH2 = styled('h2')`
    color: white;
    font-size: 55px;
    background-image:radial-gradient(circle at 33% 100%, #fed373 4%, #f15245 30%, #d92e7f 62%, #9b36b7 85%, #515ecf);
    background-clip:text;
    color:transparent;
    ::selection{
        background-color:transparent;
    }
`;
const ChangeP = styled('p')`
    color:white;
    font-size:20px;
    margin-top:10px;
`
const AnimateGrid = styled(Box)`
    min-width:380px;
    animation: fadeInFromBottom 1s forwards;
    position:relative;
    @keyframes fadeInFromBottom {
        0%{
            opacity: 0;
            top:40px;
        }
        100%{
            opacity:1;
            top:-10px;
        }
    }
`

const EditInstagramIcon = styled(InstagramIcon)`
    width:40px;
    height:40px;
    cursor:pointer;
    :hover{
        scale:1.05;
    }
    :active{
        scale:0.95;
    }
`
const EditTwitterIcon = styled(TwitterIcon)`
    width:40px;
    height:40px;
    cursor:pointer;
    :hover{
        scale:1.05;
    }
    :active{
        scale:0.95;
    }
`
const EditFaceBook = styled(FacebookIcon)`
    width:40px;
    height:40px;
    cursor:pointer;
    :hover{
        scale:1.05;
    }
    :active{
        scale:0.95;
    }
`
const EditLinkedInIcon = styled(LinkedInIcon)`
    width:40px;
    height:40px;
    cursor:pointer;
    :hover{
        scale:1.05;
    }
    :active{
        scale:0.95;
    }
`
const ScrollTrack = styled(Box)`
    height:4.5px;
    position:fixed;
    left:0px;
    width:100%;
    transform-origin:left;
    scale: 0 1;
    background-color:white;
    animation:scroll-watch linear;
    animation-timeline:scroll();
    @keyframes scroll-watch {
        to{
            scale:1 1;
        }
    }
    background: rgb(174,58,180);
    background: linear-gradient(90deg, rgba(174,58,180,1) 0%, rgba(253,64,29,1) 61%, rgba(252,176,69,1) 100%);
`

const TransferNotes = styled(Box)`
    background: rgb(34,193,195);
    ${'' /* background: radial-gradient(circle at 33% 100%, #fed373 4%, #f15245 30%, #d92e7f 62%, #9b36b7 85%, #515ecf); */}
    background: #ee0979;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #ff6a00, #ee0979);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #ff6a00, #ee0979); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    animation: fadeIn 1s forwards;
    position:relative;
    top:100px;
    cursor:pointer;
    @keyframes fadeIn {
        0%{
            opacity: 0;
            right:100px;
        }
        100%{
            opacity:1;
            right:0px;
        }
    }
`

const Intro = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const name = localStorage.getItem('username');
        if (name) {
            setUsername(name);
        }
    }, [username]);
    console.log(username);
    const openInstagram = () => {
        window.open('https://www.instagram.com/', '_blank', 'noopener noreferrer');
    };
    const openLinkedin = () => {
        window.open('https://www.linkedin.com/', '_blank', 'noopener noreferrer');
    }
    const openX = () => {
        window.open('https://twitter.com/', '_blank', 'noopener noreferrer');
    }
    return (
        <>
            <ScrollTrack sx={{ top: { sm: '64px', xs: '56px' } ,zIndex:'3'}}></ScrollTrack>
            <Grid container style={{ backgroundColor: 'black' }}>
                <Grid style={{ minHeight: '100vh', height: '700px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} item>
                    <Box style={{ maxWidth: { sm: '400px', xs: '350px' } }}>
                        <AnimateGrid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <ChangeH2 sx={{ textAlign: 'center', fontSize: { xs: '50px', sm: '65px' } }} >Schedule Your Progress</ChangeH2>
                            <ChangeP>Created by The Students of IIT ROPER</ChangeP>
                        </AnimateGrid>
                        <Box style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                username && <TransferNotes onClick={() => { navigate(`/user/${username}`) }} style={{ width: '230px', borderRadius: '20px', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60px', backgroundColor: 'cyan' }}>
                                    <Box style={{ display: 'flex', fontSize: '20px', gap: '15px' }}>
                                        <Box>Manage Notes</Box>
                                        <ArrowForwardIcon style={{ fontSize: '25px' }} />
                                    </Box>
                                </TransferNotes>
                            }
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%', minHeight: '700px', paddingTop: '110px', paddingBottom:'200px' ,backgroundColor: 'black', overflow: 'hidden',display:'flex',justifyContent:'center',alignItems:'center' }}>
                <CustomizedTimeline />
            </Box>
            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="footer-col">
                            <h4>company</h4>
                            <ul>
                                <li><Link href="#">about us</Link></li>
                                <li><Link href="#">our services</Link></li>
                                <li><Link href="#">privacy policy</Link></li>
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h4>get help</h4>
                            <ul>
                                <li><Link href="#">FAQ</Link></li>
                                <li><Link href="#">Documentation</Link></li>
                                <li><Link href="#">Terms of Service and Privacy Policy</Link></li>
                                <li><Link href="#">Email Support</Link></li>
                                <li><Link href="#">Privacy Policy</Link></li>
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h4>Get in Touch</h4>
                            <ul>
                                <li><Link href="#">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h4>follow us</h4>
                            <div class="social-links" style={{display:'flex',gap:'5px'}}>
                                <EditFaceBook sx={{color:'white'}}/>
                                <EditTwitterIcon sx={{color:'white'}} />
                                <EditInstagramIcon sx={{color:'white'}}/>
                                <EditLinkedInIcon sx={{color:'white'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <Box style={{ padding: '20px', position: 'fixed', bottom: '0px', right: '0px', display: 'flex', gap: '20px' }}>
                <EditInstagramIcon onClick={openInstagram} style={{ color: 'white' }} />
                <EditTwitterIcon onClick={openX} style={{ width: '40px', color: 'white', height: '40px', cursor: 'pointer' }} />
                <EditLinkedInIcon onClick={openLinkedin} style={{ color: 'white', width: '40px', height: '40px', cursor: 'pointer' }} />
            </Box>
        </>
    );
};

export default Intro;
