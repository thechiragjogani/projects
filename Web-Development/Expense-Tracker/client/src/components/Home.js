import { Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context'

function Home() {
    const { user } = useData()

    return (
        <div className="home-page">
            <div className='home-content'>
                <Typography variant="h5" gutterBottom style={{
                    fontFamily: "sans-serif",
                }}>
                    Personal Expense Tracker
                </Typography>

                {user ?
                    <Link to='dashboard'>
                        <Button variant="contained">Dashboard</Button>
                    </Link>
                    :
                    <>
                        <Link to='sign-in'>
                            <Button variant="outlined">Sign IN</Button>
                        </Link>
                        {" "}
                        <Link to='sign-up'>
                            <Button variant="contained">Sign UP</Button>
                        </Link>
                    </>

                }
            </div>
        </div>
    )
}

export default Home
