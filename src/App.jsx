import {BrowserRouter as Router,Route,Routes  } from 'react-router-dom'
import Stats from './pages/Stats'
import Range from './pages/Range'
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Stats/>}/>
          <Route path='/range' element={<Range/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
