//  import React from 'react'
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
 import Register from './components/Register'
 import Login from './components/Login'
 import HomePage from './components/HomePage'
 import UserPage from './components/UserPage'

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/login' element={<Login/>}/>
                <Route exact path='/homepage' element={<HomePage/>}/>
                <Route exact path='/register' element={<Register/>}/>
                <Route exact path='/userpage' element={<UserPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;