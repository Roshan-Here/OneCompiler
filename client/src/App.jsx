import {BrowserRouter,Routes ,Route } from "react-router-dom"
import Header from "./components/Header"
import Testing from "./components/Testing"
import Home from "./pages/Home"
import NotFound from "./components/NotFound"
function App() {

  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={
          <p className='text-xl text-violet-800 border-b-indigo-400'>Welcome to OneCompiler</p>
        }/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/test" element={<Testing/>}/>
        <Route path="/about" element={<Testing/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
