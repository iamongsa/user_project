import './App.css'
import Homeuser from './page/homeuser'
import { Routes , Route } from 'react-router-dom'
import Contact from './page/contact'

function App() {
  

  return (
    <>
      <div className="App">
      <Routes>
        <Route path='/' element={<Homeuser/>} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
    </>
  )
}

export default App
