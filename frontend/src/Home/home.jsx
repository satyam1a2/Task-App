import UserInterface from "../components/user-interface/user-interface.jsx";
import {BrowserRouter,Routes,Route,Outlet,Navigate} from 'react-router-dom';
import PageNo from "../components/user-interface/PageNotFound.jsx";
import Nav from "../components/navbar/navbar.jsx";
import About from "../components/main/About.jsx";
import Intro from "../components/main/Intro.jsx";

const PrivateRoute = ()=>{
    return localStorage.getItem("token") ?
    <>
        <Outlet/>
    </>:
    <Navigate replace to="/intro"/>
}

const Home = ()=>{

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/intro" element={<><Nav/><Intro/></>}/>
                    <Route path="/about" element={<><Nav/><About/></>}/>
                    <Route path="/nonexistent-page" element={<PageNo/>}/>
                    <Route element={<PrivateRoute />}>
                        <Route path="user/:username" element={<UserInterface/>}/>
                    </Route>
                    <Route path="*" element={<Navigate replace to="/intro"/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Home;