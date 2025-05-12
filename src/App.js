import './App.css'
import React from 'react'
import HeaderBar from './components/HeaderBar.tsx'
import Home from './components/Home.tsx'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <HeaderBar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/listDetails" />
          <Route path="/createList" />
        </Routes>
    </>
  )
}

export default App
