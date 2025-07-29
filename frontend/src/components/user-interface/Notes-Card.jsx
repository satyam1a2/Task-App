import { Box, styled, InputBase, Typography,Button,Snackbar } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { DeleteNote, updateNote } from '../../api/api';
import { useEffect, useState } from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { CreateNotes } from '../../api/api';
import { useParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Slide from '@mui/material/Slide';
import CancelIcon from '@mui/icons-material/Cancel';
import Spinner from './gear-spinner.svg';

const CardContainer = styled(Box)`
    border-radius:10px;
    width:100%;
    height:100%;
    padding:15px;
    grid-template-columns: auto auto auto auto;
    @media (max-width: 1400px) {
        grid-template-columns: auto auto auto;
    }
    @media (max-width: 1100px) {
        grid-template-columns: auto auto;
    }
    @media (max-width: 670px) {
        grid-template-columns: auto;
    }
    @media(min-height:900px){
        grid-template-rows: auto auto auto;
    }
`;

const EditTextArea = styled(TextareaAutosize)`
    width:100%;
    border:0;
    outline:0;
    min-height:180px;
    max-height:180px;
    border-radius:10px;
    font-size:20px;
    background:none;
    border:2px solid white;
    padding:10px;
    color:white;
    overflow:hidden;
    resize:none;
    ::placeholder{
        color:#ffffffb0;
    }
`

const Card = styled(Box)`
    border-radius: 20px;
    height: 380px;
    min-width: 200px;
    padding: 20px;
    max-width:330px;
    backdrop-filter: blur(10px);
    -webkit-box-shadow: 0px 0px 10px 3px rgba(255,255,255,1);
    -moz-box-shadow: 0px 0px 10px 3px rgba(255,255,255,1);
    box-shadow: 0px 0px 10px 3px rgba(255,255,255,1);
    border:2px solid white;
`;

const TooltipClassDetail = {
    popper: {
        sx: {
            [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
            {
                marginTop: '0px',
            },
            [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
            {
                marginBottom: '0px',
            },
            [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
            {
                marginLeft: '0px',
            },
            [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
            {
                marginRight: '0px',
            },
        },
    },
}

const EditDeleteButton = styled(DeleteIcon)`
    :hover{
        scale:0.95;
    }
    :active{
        scale:1.05;
    }
`

const NoteData = {
    title:'',
    desciption:'',
    validTill:2
}

const NotesCard = ({newNote,userData,noData,setNewNote,setNoData,setClickOnce,clickOnce}) => {
    const [editUserId, setEditUser] = useState(null);
    const [editableData, setEditableData] = useState(userData);
    const [clickEdit, setClickEdit] = useState(false);
    const [newNoteData,setNewNoteData] = useState(NoteData);
    const [errorMessage, setError] = useState('');
    const [signMessage, setSignMessage] = useState("");
    const [ErrorSnackbar, setErrorSnackbar] = useState(false);
    const [SuccessSnackbar, setSuccessSnackbar] = useState(false);
    const [loading ,setloading] = useState(true);
    const {username} = useParams();
    
    useEffect(() => {
        setEditableData(userData);
    }, [userData,setEditableData,setNoData]);

    useEffect(()=>{
        const timeout = setTimeout(() => {
            setloading(false);
        }, 2500);

        return () => {
            clearTimeout(timeout);
        };
    },[])

    const SlideTransition = (props) => {
        return <Slide {...props} direction="up" />;
    };

    const closeErrorSnackBar = () => {
        setErrorSnackbar(false);
    }

    const closeSuccessSnackBar = () => {
        setSuccessSnackbar(false);
    }



    const userNoteDelete = async (index) => {
        const updateNote = await editableData.filter(data => data._id !== index);
        try {
            const response = await DeleteNote(username,index);
            if (response.status === 'success') {
                await setEditableData(updateNote);
                setSuccessSnackbar(true);
                setSignMessage("Note Deleted");
                console.log('The Note is finally Deleted with id : ', index);
            }
            else{
                setErrorSnackbar(true);
                setError(response.message);
            }
        } catch (err) {
            console.log("Error while Deleting the Notes");
        }
    }


    const handleEditClick = async (data, index) => {
        if (clickEdit) {
            // const updatedData = await editableData.find(data=>data._id===editUserId);
            try{
                const response = await updateNote(username,data, index);
                if (response.status === 'success') {
                    console.log("Update Notes is Successfully")
                    const updatedData = await editableData.map((item) =>
                        item._id === index ? {...response.Notes} : item
                    )
                    await setEditableData(updatedData);
                    setSuccessSnackbar(true);
                    setSignMessage("Update SuccessFull");
                    setEditUser(null);
                } else {
                    setErrorSnackbar(true);
                    setError("Not Working Server is Down");
                    return;
                }
            }
            catch{
                console.log("Error while updating the Data");
            }
        } else {
            setEditUser(index);
        }
        setClickEdit(!clickEdit);
    }

    const handleInputTitleChange = (e, index) => {
        if (index === editUserId) {
            const newTitle = e.target.value;
            const updatedData = editableData.map((item) =>
                item._id === index ? { ...item, title: newTitle } : item
            );
            setEditableData(updatedData);
        }
    }

    const handleDecriptionChange = (e, index) => {
        if (index === editUserId) {
            const newDes = e.target.value;
            const updatedData = editableData.map((item) =>
                item._id === index ? { ...item, description: newDes } : item
            )
            setEditableData(updatedData);
        }
    }

    const calculateDateDifference = (startDateString, currentDateString, validTill, index) => {
        const startDate = new Date(startDateString);
        const currentDate = new Date(currentDateString);
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(Math.abs((currentDate - startDate) / oneDay));
        
        return `${diffDays}/${validTill}`;
    };

    const handleCompleted = async (e, index) => {
        if (e.target.checked) {
            try{
                const updatedData = await editableData.map((item) =>
                    item._id === index ? { ...item, completed: true, color: '#09DE15' } : item
                    // #1d4ed8 #22c55e  #84cc16 #f0fff0
                )
                const updateNotes = await updatedData.find((item) => item._id === index);
                const response = await updateNote(username,updateNotes, index);
                if (response.status === 'success') {
                    console.log("Update Notes is Successfully")
                    setSuccessSnackbar(true);
                    setSignMessage("Note Completed");
                    await setEditableData(updatedData);
                } else{
                    setErrorSnackbar(true);
                    setError(response.message);
                }
            } catch(error){
                console.log("Error while Updating the completed Note");
            }
        }
    }

    const handleInputChange=(e)=>{
        setNewNoteData({...newNoteData,[e.target.name]:e.target.value});
        console.log(newNoteData);
    }

    const deleteNewNote = ()=>{
        setNewNote(false);
        if(userData.length===0){
            setNoData(true);
        }
        setClickOnce(!clickOnce);
    }

    const CreateNote = async ()=>{
        const response = await CreateNotes(username,newNoteData);
        console.log(response);
        if(response.status ==='success'){
            console.log("Note is Created");
            const updateNotes = await [...editableData,response.note];
            await setEditableData(updateNotes);
            setNewNote(false);
            setClickOnce(true);
            setNewNoteData(NoteData);
            setSuccessSnackbar(true);
            setSignMessage("Note Created");
        } else{
            setErrorSnackbar(true);
            setError(response.message);
        }
    }
    const currentDate = new Date();
    const NoteDate = (currentDate)=>{
        const curr = new Date(currentDate);
        const formatDate = Intl.DateTimeFormat('en-US', { 
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(curr); 
        console.log(currentDate);
        return formatDate;
    }

    return (
        <>
            <CardContainer sx={{position:'relative',display: noData ? 'flex' : 'grid', gap: '20px',padding:'20px' }}>
                {/* {loading && <CircularProgress sx={{position:'absolute',top:'40%',left:'50%',transform:'translate(-50%,-50%'}}/>} */}
                {loading && <img src={Spinner} style={{position:'absolute',top:'40%',left:'50%',transform:'translate(-50%,-50%',width:'50px'}} alt='spinner revolving'/>}
                {
                    newNote &&<Card style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#1d4ed8' }}>
                        <Box style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <Typography style={{color:'white',fontSize:'20px',fontWeight:'bold'}} variant='p'>Create New Note</Typography>
                        </Box>
                        <Box>
                            <InputBase name='title' onChange={(e)=>handleInputChange(e)} placeholder='Enter Title' style={{ color: 'white', padding: '5px', width: '100%', border: '2px solid white',borderRadius:'5px'}} />
                        </Box>
                        <Box>
                            <EditTextArea onChange={(e)=>handleInputChange(e)} style={{minHeight:'130px',maxHeight:'130px'}} name='description' placeholder='Enter Desciption' />
                        </Box>
                        <Box>
                            <InputBase name='validTill' onChange={(e)=>handleInputChange(e)} type="number" placeholder='Note Valid Till' style={{ color: 'white', padding: '5px', width: '100%', border: '2px solid white',borderRadius:'5px'}} />
                        </Box>
                        <Box style={{display:'flex',justifyContent:'center'}}>
                            <Button variant='standard' onClick={CreateNote} style={{border:'2px solid white',width:'100px',color:'white'}}>Create</Button>
                        </Box>
                        <EditDeleteButton onClick={deleteNewNote} style={{ color:'white', width: '28px', height: '28px', cursor: 'pointer' ,position:'absolute',top:'15px',right:'15px'}} />
                    </Card>
                }
                {
                    !noData && !loading ?
                        editableData.map((data) => {
                            return (
                                <Card key={data._id} style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: data.color }}>
                                    <Box style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                                        <Box style={{ position: 'relative', bottom: '2px', display: 'flex', gap: '5px' }}>
                                            <Tooltip slotProps={TooltipClassDetail} title="Save">
                                                <EditNoteIcon onClick={() => handleEditClick(data, data._id)} style={{ color: editUserId === data._id ? 'lime' : 'white', width: '31px', height: '31px', cursor: 'pointer' }} />
                                            </Tooltip>
                                            <Tooltip slotProps={TooltipClassDetail} title="Delete">
                                                <EditDeleteButton style={{ color: 'white', width: '28px', height: '28px', cursor: 'pointer' }} onClick={() => userNoteDelete(data._id)} />
                                            </Tooltip>
                                        </Box>
                                        <Tooltip slotProps={TooltipClassDetail} title="Today's Date">
                                            {NoteDate(data.currdate)}
                                        </Tooltip>
                                    </Box>
                                    <Box>
                                        <InputBase onChange={(e) => handleInputTitleChange(e, data._id)} value={data.title} placeholder='Enter Title' style={{ pointerEvents: editUserId === data._id ? 'auto' : 'none', color: 'white', padding: '5px', width: '100%', borderBottom: '2px solid white' }} />
                                    </Box>
                                    <Box>
                                        <EditTextArea onChange={(e) => handleDecriptionChange(e, data._id)} style={{ pointerEvents: editUserId === data._id ? 'auto' : 'none' }} value={data.description} />
                                    </Box>
                                    <Box style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <Box style={{ color: 'white' }}>{calculateDateDifference(data.currdate, currentDate, data.validTill, data._id)}</Box>
                                        <Box style={{ display: 'flex', gap: '5px' }}>
                                            <input type="checkbox" style={{ cursor: 'pointer' }} onChange={(e) => handleCompleted(e, data._id, data)} checked={data.completed} />
                                            <Typography style={{ color: 'white' }}>Completed</Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            )
                        })
                        :
                        !loading && <Box style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', color: 'white' }}>
                            <h1 style={{ textAlign: 'center' }}> No Data Found </h1>
                        </Box>
                }
                {SuccessSnackbar && <Snackbar open={SuccessSnackbar} TransitionComponent={SlideTransition} autoHideDuration={2000} onClose={closeSuccessSnackBar}>
                    <Box style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '280px', fontWeight: 'bold', padding: '15px', backgroundColor: '#0BDA51', borderRadius: '10px' }}>
                        <Box style={{ display: 'flex', gap: '20px' }}><CheckCircleIcon /><span style={{ marginTop: '4px' }}>{signMessage}</span></Box>
                    </Box>
                </Snackbar>}

                {ErrorSnackbar && <Snackbar open={ErrorSnackbar} TransitionComponent={SlideTransition} autoHideDuration={2000} onClose={closeErrorSnackBar}>
                    <Box style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '280px', fontWeight: 'bold', padding: '15px', backgroundColor: 'crimson', borderRadius: '10px' }}>
                        <Box style={{ display: 'flex', gap: '15px' }}><CancelIcon style={{fontSize:'26px'}} /><span style={{ marginTop: '4px' }}>{errorMessage}</span></Box>
                    </Box>
                </Snackbar>}
            </CardContainer>
        </>
    );
};

export default NotesCard;