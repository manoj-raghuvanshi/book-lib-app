import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'
import store from './store'
import Routes from "./routes";

const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <Router>
                    <Routes/>
                </Router>
            </div>

        </Provider>
    )
};

export default App
