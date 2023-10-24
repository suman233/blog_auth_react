import React from 'react'
import { useAuth } from '../Auth/Authtext'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Logout = () => {
    const [auth, setAuth] = useAuth()
    const nav=useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('auth')
        setAuth({
            ...auth,
            user: null,
            token: ""
        })
        nav('/login')
    }
    return (
        <>
        <div>Logout</div>
        <Button onClick={handleLogout}>Logout</Button>
        </>
    )
}

export default Logout