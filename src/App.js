import './App.css'
import React from 'react'
import HeaderBar from './components/HeaderBar.tsx'
import Home from './components/Home.tsx'
import { Route, Routes } from 'react-router-dom'
import CreateSpellList from './components/CreateSpellList.tsx'
import SpellListDetails from './components/SpellListDetails.tsx'
import EditSpellList from './components/EditSpellList.tsx'

function App() {
  return (
    <>
      <HeaderBar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/listDetails" element={<SpellListDetails />}/>
          <Route path="/createList" element={<CreateSpellList />}/>
          <Route path="/editList" element={<EditSpellList />}/>
        </Routes>
    </>
  )
}

export default App
