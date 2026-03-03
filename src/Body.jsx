import Navbar from "./Navbar.jsx"
import {Outlet} from "react-router-dom"
import Footer from "./Footer.jsx"

const Body = () => {
    return (
        <>
        <Navbar />
        <Outlet />
        <Footer />
        </>
    )
}

export default Body;