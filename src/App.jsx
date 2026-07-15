import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import DashBoard from './pages/DashBoard'
import KanbanBoard from './pages/KanbanBoard'
import Overview from './pages/Overview'
import ProtectedRoute from './component/ProtectedRoute'


const App = () => {
  return (
    
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/dashboard" element={ <ProtectedRoute> <DashBoard /> </ProtectedRoute> } />
        <Route path="/kanban" element={ <ProtectedRoute> <KanbanBoard /> </ProtectedRoute> } />
        <Route path="/overview" element={ <ProtectedRoute> <Overview /> </ProtectedRoute> } />
    
       
      </Routes>
      </BrowserRouter>
    
  )
}

export default App;
