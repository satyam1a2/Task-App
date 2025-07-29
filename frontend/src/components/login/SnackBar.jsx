import React from "react";
import { Snackbar } from "@mui/material";
import Slide from '@mui/material/Slide';

const CustomSnackbar = ({ open, setSnackbarOpen, message,setSnackbarMessage}) => {
    const CloseSnackBar = ()=>{
        setSnackbarOpen(false);
        setSnackbarMessage('');
    }
    return (
        <Snackbar
            open={open}
            onClose={CloseSnackBar}
            TransitionComponent={(props) => <Slide {...props} direction="up" />}
            message={message}
            autoHideDuration={3000}
        />
    ); //const CloseSnackBar = ()=>{}
};

export default CustomSnackbar;