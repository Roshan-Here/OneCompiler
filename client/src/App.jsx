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
        <Route path="/" element={<Compile/>}/>
        <Route path="/test" element={<Testing/>}/>
        <Route path="/about" element={<Testing/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/challenges" element={<Challenges/>}/>
        <Route path="/pasteit" element={<Pasteit/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/hei" element={<CommingSoon/>}/>
        <Route path="/uff" element={<SingleChallenge/>}/>
        <Route path="/pasteit/:pastelink" element={<Pasteit/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
