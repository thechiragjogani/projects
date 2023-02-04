import React from 'react'
import "./App.css"
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import NavBar from './components/NavBar'
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Alert, Snackbar } from '@mui/material';
import { useData } from './context';

function App() {
    document.title = 'Expense Tracker'
    const { snackBar, handleSnackBar } = useData()

    const handleClose = () => {
        handleSnackBar({
            open: false,
            message: ""
        })
    }
    return (
        <Router>
            <div className='main-container'>
                <NavBar ></NavBar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Routes>

                <Snackbar open={snackBar.open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={snackBar.severity} sx={{ width: '100%' }}>
                        {snackBar.message}
                    </Alert>
                </Snackbar>
            </div>
        </Router>
    )
}

export default App
