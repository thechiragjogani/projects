import React from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context'
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const { handleUser, handleSnackBar } = useData()
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")

    const handleSubmit  = (e) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
            handleSnackBar({
                open: true,
                severity: "error",
                message: "Please fill all the fields!"
            })
            return
        }

        if (password !== confirmPassword) {
            handleSnackBar({
                open: true,
                severity: "error",
                message: "Both Passwords should be match!"
            })
            return
        }

        fetch("/sign-up", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
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
                <h2 className='auth-name'>Sign UP</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name :</label>
                    <input type="text" className='input-tag' value={name} onChange={(e) => setName(e.target.value)} />
                    <label>Email :</label>
                    <input type="email" className='input-tag' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Password :</label>
                    <input type="password" className='input-tag' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label>Confirm Password :</label>
                    <input type="password" className='input-tag' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <input type='submit' value="Sign Up" className='submit-button' />
                </form>
                <p className='redirect-link'>Already have an account! <Link to="/sign-in">Sign In</Link></p>
            </div>
        </div>
    )
}

export default SignUp
