import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useData } from '../context';

function SignIn() {
    const navigate = useNavigate();
    const { handleUser, handleSnackBar } = useData()
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            handleSnackBar({
                open: true,
                severity: "error",
                message: "Please fill all the fields!"
            })
            return
        }

        fetch("/sign-in", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    handleSnackBar({
                        open: true,
                        severity: "error",
                        message: data.message
                    })
                } else {
                    handleSnackBar({
                        open: true,
                        severity: "success",
                        message: data.message
                    })
                    handleUser(data.data)
                    localStorage.setItem('user', JSON.stringify(data.data));
                    navigate('/dashboard')
                }
            })
            .catch(err => {
                handleSnackBar({
                    open: true,
                    severity: "error",
                    message: "Something went wrong!"
                })
                console.log(err)
            })
    }
    return (
        <div className='auth-container'>
            <div className='auth-form'>
                <h2 className='auth-name'>Sign IN</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email :</label>
                    <input type="email" className='input-tag' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Password :</label>
                    <input type="password" className='input-tag' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type='submit' value="Sign In" className='submit-button' />
                </form>
                <p className='redirect-link'>Don't have an account! <Link to="/sign-up">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default SignIn