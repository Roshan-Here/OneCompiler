import {BrowserRouter,Routes ,Route } from "react-router-dom"
import Header from "./components/Header"
import Testing from "./components/Testing"
import Home from "./pages/Home"
import NotFound from "./components/NotFound"
import Compile from "./pages/Compile"
import CommingSoon from "./pages/CommingSoon"
import Pasteit from "./pages/Pasteit"
import Blog from "./pages/Blog"
import Challenges from "./pages/Challenges"
import Login from './pages/Login';

import SingleChallenge from "./pages/SingleChallenge"
import Problems from "./pages/Problems"
import Profile from "./pages/Profile"
import NewLogin from "./pages/NewLogin"
import Register from "./pages/Register"


function App() {

  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/wow" element={
          <p className='text-xl text-violet-800 border-b-indigo-400'>Welcome to OneCompiler</p>
        }/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/compiler" element={<Compile/>}/>
        <Route path="/test" element={<Testing/>}/>
        <Route path="/" element={<Testing/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/challenges" element={<Challenges/>}/>
        <Route path="/pasteit" element={<Pasteit/>}/>
        {/* <Route path="/login" element={<Login/>}/> */}
        <Route path="/login" element={<NewLogin/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/hei" element={<CommingSoon/>}/>
        <Route path="/problem/:Qslug" element={<SingleChallenge/>}/>
        <Route path='/problems' element={<Problems/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/profile/:username' element={<Profile/>}></Route>
        <Route path="/pasteit/:pastelink" element={<Pasteit/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
