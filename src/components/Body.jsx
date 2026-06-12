import Navbar from "./Navbar.jsx"
import {Outlet} from "react-router-dom"
import Footer from "./Footer.jsx"
import {BASE_URL} from "../utils/constants"
import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {addUser} from "../utils/userSlice"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"


const Body = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((store) => store.user);

    const fetchUser = async() => {
        try{
            const res = await axios.get(BASE_URL + "/profile/view",{
                withCredentials: true
            });
            dispatch(addUser(res.data));
        }
        catch(err){
            if(err.status == 401)
                navigate("/login");
            console.error(err);
        }
    }

    useEffect(() => {
        if(!userData)
            fetchUser();
    }, []);

    return (
        <>
        <Navbar />
        <Outlet />
        <Footer />
        </>
    )
}

export default Body;