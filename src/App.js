import './App.css'
import React from 'react'
import HeaderBar from './components/HeaderBar.tsx'
import Home from './components/Home.tsx'
import { Route, Routes } from 'react-router-dom'
import CreateSpellList from './components/CreateSpellList.tsx'
import SpellListDetails from './components/SpellListDetails.tsx'
import EditSpells from './components/EditSpells.tsx'
import ModifySpellList from './components/ModifySpellList.tsx'

function App() {
  return (
    <>
      <HeaderBar />
        <Routes>
          <Route path="/*" element={<Home />}/>
          <Route path="/listDetails/:id" element={<SpellListDetails />}/>
          <Route path="/createList" element={<CreateSpellList />}/>
          <Route path="/editList/:id" element={<EditSpells />}/>
          <Route path="/modifyList/:id" element={<ModifySpellList />}/>
        </Routes>
    </>
  )
}

export default App
