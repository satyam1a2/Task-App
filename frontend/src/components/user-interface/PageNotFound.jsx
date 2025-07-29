import { Box,Button,styled} from "@mui/material";
import NotFound from './404-error.jpg';
import { useNavigate } from "react-router-dom";
const EditButton = styled(Button)`
    background-color:crimson;
    color:white;
    width:150px;
    :hover{
        background-color:crimson;
    }
    :active{
        backgroud-color:crimson;
    }
`
const PageNo = ()=>{
    const navigate = useNavigate();
    return (<>
        <Box sx={{width:'100%',height:'90vh',backgroundColor:'white',flexDirection:'column',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <img style={{width:'350px',height:'350px'}} src={NotFound} alt="Not Found " />
            <Box style={{display:'flex',gap:'10px'}}>
                <EditButton onClick={()=>{navigate('/intro')}}>Go Home</EditButton>
                <EditButton onClick={()=>{navigate('/contact')}}>Contact Us</EditButton>
            </Box>
        </Box>
    </>)
}
export default PageNo;