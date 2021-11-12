 import React from 'react'
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
 import Login from './components/Login'
 import HomePage from './components/HomePage'

 function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/login' element={<Login />}/>
                <Route exact path='/homepage' element={<HomePage/>}/>
            </Routes>
        </Router>
    );
}

export default App;