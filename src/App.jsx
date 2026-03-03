import { useState } from 'react'
import Navbar from "./Navbar.jsx"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Body from "./Body.jsx"

function App() {

  return (
    <>
      <BrowserRouter basename = "/">
      <Routes>
        <Route path = "/"  element = {<Body />}>
        <Route path = "/login" element = {<div>Login Page</div>} />
        <Route path = "/test" element = {<div>Test page</div>} />
        </Route>
        </Routes>
        </BrowserRouter>
    
      <h1 className = "text-3xl font-bold underline">Hello world</h1>
     
    </>
  )
}

export default App;