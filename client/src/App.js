import React from 'react';
import Login from './components/Login'
import HomePage from './components/HomePage'

class App extends React.Component {
    render() {
        return (
            <div className="app">            
                <Login />        
                {/* <HomePage />         */}
            </div>
        );
    }
}

export default App;