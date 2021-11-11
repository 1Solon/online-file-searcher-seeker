 import React from 'react'
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
 import Login from './components/Login'
 import HomePage from './components/HomePage'

 class App extends React.Component {
    render(){
        return (
            <div className='app'>
                <Router>
                    <Routes>
                        <Route exact path='/login' element={<Login/>}/>
                        <Route exact path='/homepage' element={<HomePage/>}/>
                    </Routes>
                </Router>
            </div>
        );
    }
}
export default App;