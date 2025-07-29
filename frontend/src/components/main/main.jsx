import { Box, styled } from '@mui/material';
import Nav from '../navbar/navbar';
import Intro from './Intro';

const MainInterface = styled(Box)`
    width:100%;
    height:102vh;
    background-color: black;
`

const Main = () => {
    return (<>
        <MainInterface>
            <Nav />
            <Intro />
        </MainInterface>
    </>);
}
export default Main;