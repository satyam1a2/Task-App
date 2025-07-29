import { useContext, useEffect, useState } from 'react';
import { styled, Box, TextField, Button, Typography, Snackbar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { UserLogin } from '../../api/api';
import { DataContext } from '../../context/DataContext.js';
import { useNavigate } from 'react-router-dom';
import { signingUser } from '../../api/api';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Slide from '@mui/material/Slide';
import CancelIcon from '@mui/icons-material/Cancel';


const LoginBox = styled(Box)`
  background-color: #191919;
  justify-content:space-between;
  outline:2px solid white;
  outline-offset: -10px;
`;

const LoginTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  color: white;
  font-size: 50px;
  font-weight: bold;
  padding: 15px;
  padding-bottom: 30px;
`;
const LoginEntry = styled(Box)`
  padding-left: 25px;
  padding-right: 25px;
  display: flex;
  justify-content:center;
  align-items:center;
`;

const EditTypography = styled(TextField)`
    & label.Mui-focused {
        color: white;
    }

    & .MuiInput-underline:after {
        border-bottom-color: white;
    }
    & .MuiInput-underline:before{
        border-bottom-color:white;
    }
    & .MuiInput-underline:active{
        border-bottom-color:white;
    }
    &:hover {
        & .MuiInput-underline:before {
            border-bottom-color: white;
        }
        & .MuiInput-underline {
            border-bottom-color: white;
        }
    }
`;

const EditButton = styled(Button)`
  width: 170px;
  height: 40px;
  background-color: white;
  color: black;
  font-weight: bold;
  border: 0;
`;

const LoginButtonBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-item: center;
  width: 100%;
`;

const SignButtonBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-item: center;
  width: 100%;
`;

const SignBox = styled(Box)`
  background-color: #191919;
  justify-content:space-between;
  outline:2px solid white;
  outline-offset: -10px;
`

const ErrorTypography = styled(Typography)`
    font-weight:bold;
    font-size:13px;
`

const SignUser = {
    username: "",
    email: "",
    password: ""
}

const LoginUserData = {
    username: "",
    password: ""
}

const Login = ({ open, setLog }) => {
    const [signUser, setSignUser] = useState(SignUser);
    const [loginUser, setLoginUser] = useState(LoginUserData);
    const [openSig, setSign] = useState(true);
    const [errorMessage, setError] = useState('');
    const { setAccount } = useContext(DataContext);
    const [ErrorSnackbar, setErrorSnackbar] = useState(false);
    const [SuccessSnackbar, setSuccessSnackbar] = useState(false);
    const [loginUsername, setLoginUsername] = useState(false);
    const [loginPassword, setLoginPassword] = useState(false);
    const [signUsername, setSignUsername] = useState(false);
    const [signEmail, setSignEmail] = useState(false);
    const [signPassword, setSignPassword] = useState(false);
    const [signMessage, setSignMessage] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
    },[loginUser,signUser])
    const SlideTransition = (props) => {
        return <Slide {...props} direction="up" />;
    };

    const closeErrorSnackBar = () => {
        setErrorSnackbar(false);
    }
    const closeSuccessSnackBar = () => {
        setSuccessSnackbar(false);
    }

    const handleClose = () => {
        setLog(false); // Set open to false to close the dialog
        navigate('/intro');
    };

    const openSign = () => {
        setSign(false);
        setError('');
    }

    const openLogIn = () => {
        setSign(true);
        setError('');
    }
    const validCharacters = /^[a-zA-Z0-9_]+$/;

    const LoginUser = async () => {
        try {
            if (!loginUser.username || !loginUser.password) {
                if (!loginUser.username && !loginUser.password) {
                    setLoginUsername(true);
                    setLoginPassword(true);
                    setError('Username and Password is Required');
                    setErrorSnackbar(true);
                    return;
                }
                if (!loginUser.username) {
                    setLoginUsername(true);
                    setError('Username is Required');
                    setErrorSnackbar(true);
                    return;
                } else {
                    setError('');
                    setLoginUsername(false);
                }

                if (!loginUser.password) {
                    setLoginPassword(true);
                    setError('Password is Required');
                    setErrorSnackbar(true);
                    return;
                } else {
                    setLoginPassword(false);
                    setError('');
                }
            }

            const response = await UserLogin(loginUser);

            if (response.status && response.status === 'success') {
                localStorage.setItem("token", response.token);
                localStorage.setItem("username", response.username);
                setAccount({ username: response.username });
                setSignMessage('Login Success');
                setSuccessSnackbar(true);
                await setTimeout(() => {
                    navigate(`/user/${response.username}`);
                }, 1000);
                console.log("Login Success");
            }
            else {
                console.log(response);
                setError(response.message);
                setErrorSnackbar(true);
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
        }
    };
    const handleEnterKeyLogin = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            LoginUser();
        }
    };
    const handleEnterKeySign = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            SignUp();
        }
    };
    const SignUp = async () => {
        try {
            if (!signUser.username || !signUser.password || !signUser.email) {

                if (!signUser.username && !signUser.password && !signUser.email) {
                    setSignUsername(true);
                    setSignEmail(true);
                    setSignPassword(true);
                    setError("All Field's are required");
                    setErrorSnackbar(true);
                    return;
                } else if (!signUser.username && !signUser.password) {
                    setSignUsername(true);
                    setSignPassword(true);
                    setError("All Field's are required");
                    setErrorSnackbar(true);
                    return;
                } else if (!signUser.password && !signUser.email) {
                    setSignEmail(true);
                    setSignPassword(true);
                    setError("All Field's are required");
                    setErrorSnackbar(true);
                    return;
                } else if (!signUser.username && !signUser.email) {
                    setSignEmail(true);
                    setSignUsername(true);
                    setError("All Field's are required");
                    setErrorSnackbar(true);
                    return;
                }

                if (!signUser.username) {
                    setSignUsername(true);
                    setError('Username is Required');
                    setErrorSnackbar(true);
                    return;
                } else {
                    setError('');
                    setSignUsername(false);
                }

                if (!signUser.email) {
                    setSignEmail(true);
                    setError('Email is Required');
                    setErrorSnackbar(true);
                    return;
                } else {
                    setError('');
                    setSignEmail(false);
                }

                if (!signUser.password) {
                    setSignPassword(true);
                    setError('Password is Required');
                    setErrorSnackbar(true);
                    return;
                } else {
                    setSignPassword(false);
                    setError('');
                }
                
            }
            else if(signUser.username.length < 3 || signUser.username.length > 20){
                setSignUsername(true);
                setError('Username must comes between 3 to 20 letters');
                setErrorSnackbar(true);
                return ;
            }
            else if(!validCharacters.test(signUser.username)){
                setSignUsername(true);
                setError('Username must not Contain Alphanumeric or white space');
                setErrorSnackbar(true);
                return;
            }
            else if(signUser.username.trim() !== signUser.username){
                setSignUsername(true);
                setError('Username Should not contain any white space');
                setErrorSnackbar(true);
                return;
            }
            else{

            }

            const response = await signingUser(signUser);

            if (response.status === 'success') {
                console.log("SignUp is successfull");
                setSignMessage('SignUp is successfull')
                setSuccessSnackbar(true);
                await setLoginUser({ username: signUser.username,password: signUser.password});
                await setTimeout(() => {
                    setSign(true)
                    setSuccessSnackbar(false);
                    setSignMessage('');
                }, 1000);
            } else {
                setError(response.message);
                setErrorSnackbar(true);
            }
        } catch (error) {
            if (error.response?.status === 409) {
                console.log(error.response.data.message);
                setError(error.response.data.message);
                return;
            }
        }
    }

    const OnSignInputChange = (e) => {
        setSignUser({ ...signUser, [e.target.name]: e.target.value });
        setSignUsername(false);
        setSignEmail(false);
        setSignPassword(false);
        setError('');
        console.log(e.target.name, e.target.value);
    }

    const OnLoginInputChange = (e) => {
        setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
        setLoginUsername(false);
        setLoginPassword(false);
        setError('');
    }

    return (
        <>{openSig ?
            <Dialog maxWidth={true} onClose={handleClose} open={open}>
                <LoginBox sx={{ width: {xs:'320px', sm: '600px', md: '700px' },minHeight:'350px',maxHeight:'440px',height:{sm:'350px',xs:'420px'}, paddingTop: { xs: '15px', sm: '0px' }, display: { sm: 'flex' } }}>
                    <Box sx={{ width: { sm: '40%' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LoginTypography variant="p">Login</LoginTypography>
                    </Box>
                    <LoginEntry sx={{ width: { sm: '60%' }, height: { sm: '100%' } }}>
                        <Box style={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '100%', justifyContent: 'center' }}>
                            <Box style={{ display: 'flex', flexDirection: 'column', gap: '10px', }}>
                                <EditTypography value={loginUser.username} error={loginUsername} variant="standard" name="username" label="Enter Username" sx={{ input: { color: "white" }, "label": { color: "white" } }} onChange={(e) => { OnLoginInputChange(e) }} onKeyDown={handleEnterKeyLogin} ></EditTypography>
                                <EditTypography value={loginUser.password} error={loginPassword} variant="standard" name="password" type="password" label="Enter password" sx={{ input: { color: "white" }, "label": { color: "white" } }} onChange={(e) => { OnLoginInputChange(e) }} onKeyDown={handleEnterKeyLogin} ></EditTypography>
                                {errorMessage && <Box style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><ErrorTypography style={{ color: 'crimson' }} variant="p">{errorMessage}</ErrorTypography></Box>}
                                {signMessage && <Box style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><ErrorTypography style={{ color: 'lime' }} variant="p">{signMessage}</ErrorTypography></Box>}
                            </Box>
                            <LoginButtonBox >
                                <EditButton onClick={LoginUser} variant="outlined">Login</EditButton>
                            </LoginButtonBox>
                            <Box style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <Typography variant="p" style={{ color: 'white' }}> You Look New hare{" "}<span onClick={openSign} style={{ color: "#50C4ED", cursor: "pointer" }}> Create an Account </span> </Typography>
                            </Box>
                        </Box>
                    </LoginEntry>
                </LoginBox>
            </Dialog>
            :
            <Dialog maxWidth={true} open={open} onClose={handleClose}>
                <SignBox sx={{ width: {xs:'320px', sm: '600px', md: '700px' },minHeight:'350px',maxHeight:'440px',height:{sm:'350px',xs:'440px'}, paddingTop: { xs: '15px', sm: '0px' }, display: { sm: 'flex' } }}>
                    <Box sx={{ width: { sm: '40%' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LoginTypography variant="p">Sign Up</LoginTypography>
                    </Box>
                    <LoginEntry sx={{ width: { sm: '60%' }, height: { sm: '100%' } }}>
                        <Box style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%', justifyContent: 'center' }}>
                            <Box style={{ display: 'flex', flexDirection: 'column', gap: '5px'}}>
                                <EditTypography error={signUsername} variant="standard" onChange={(e) => { OnSignInputChange(e); }} name="username" label="Enter Username" sx={{ input: { color: "white" }, "label": { color: "white" } }} onKeyDown={handleEnterKeySign}></EditTypography>
                                <EditTypography error={signEmail} variant="standard" onChange={(e) => { OnSignInputChange(e); }} name="email" label="Enter Email" sx={{ input: { color: "white" }, "label": { color: "white" } }} onKeyDown={handleEnterKeySign}></EditTypography>
                                <EditTypography error={signPassword} variant="standard" onChange={(e) => { OnSignInputChange(e); }} name="password" type="password" label="Enter Password" sx={{ input: { color: "white" }, "label": { color: "white" } }} onKeyDown={handleEnterKeySign}></EditTypography>
                                {errorMessage && <Box style={{ width: '100%', height: '3vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'crimson' }}><ErrorTypography variant="p">{errorMessage}</ErrorTypography></Box>}
                                {signMessage && <Box style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><ErrorTypography style={{ color: 'lime' }} variant="p">{signMessage}</ErrorTypography></Box>}
                            </Box>
                            <SignButtonBox> <EditButton style={{ marginTop: "10px" }} onClick={SignUp} variant="outlined" > Sign Up </EditButton> </SignButtonBox>
                            <SignButtonBox><EditButton style={{ marginTop: "10px", backgroundColor: "white", border: "1px solid #7F27FF", color: 'black' }} onClick={openLogIn} variant="outlined" > Account Existed</EditButton> </SignButtonBox>
                        </Box>
                    </LoginEntry>
                </SignBox>
            </Dialog>
        }
            {SuccessSnackbar && <Snackbar open={SuccessSnackbar} TransitionComponent={SlideTransition} autoHideDuration={1000} onClose={closeSuccessSnackBar}>
                <Box style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '280px', fontWeight: 'bold', padding: '15px', backgroundColor: '#0BDA51', borderRadius: '10px' }}>
                    <Box style={{ display: 'flex', gap: '10px' }}><CheckCircleIcon /><span style={{ marginTop: '4px' }}>{signMessage}</span></Box>
                </Box>
            </Snackbar>}

            {ErrorSnackbar && <Snackbar open={ErrorSnackbar} TransitionComponent={SlideTransition} autoHideDuration={2000} onClose={closeErrorSnackBar}>
                <Box style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '280px', fontWeight: 'bold', padding: '15px', backgroundColor: 'crimson', borderRadius: '10px' }}>
                    <Box style={{ display: 'flex', gap: '10px' }}><CancelIcon style={{fontSize:'26px'}}  /><span style={{ marginTop: '4px' }}>{errorMessage}</span></Box>
                </Box>
            </Snackbar>}

        </>
    );
};

export default Login;