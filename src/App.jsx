import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import ArtifactPage from './pages/ArtifactPage'

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/champasack-museum" element={<Home />} />
        <Route path="/champasack-museum/artifact/:id" element={<ArtifactPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
