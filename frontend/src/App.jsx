import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom'
import Create from './components/Create'
import Read from './components/Read'
import Update from './components/Update'

function App() { 
  const [count, setCount] = useState(0)
  return (
    <>
    <Navbar/>
    <Routes>
    <Route exact path='/' element={<Create/>}/>
    <Route exact path='/all' element={<Read/>}/>
    <Route exact path='/update/:id' element={<Update/>}/>
    </Routes>
    </>
  )
}

export default App
