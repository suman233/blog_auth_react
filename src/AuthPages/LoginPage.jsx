import React, { useState } from 'react'
import { useAuth } from '../Auth/Authtext'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Typography } from '@mui/material'
import { axiosInstance } from '../Services/Apicall'

const LoginPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()
    const [loading, setLoading] = useState()

    const nav = useNavigate()

    const handleSub = async (e) => {
        e.preventDefault();
        setLoading('logging')
        try {
            const result = await axiosInstance.post(`/api/login`, {
                email,
                password,
            })
            if (result) {
                toast.success(result.data.message)
                setAuth({
                    ...auth,
                    user: result.data.user,
                    token: result.data.token
                })
                localStorage.setItem('auth', JSON.stringify(result.data))
                setLoading(false)
                nav('/home')
                console.log('success', result);
            }
            else {
                toast.error(result.data.message)
                setLoading(false)
                console.log('err', result);
            }
        } catch (error) {
            toast.error('Something went wrong')
            setLoading(false)
            console.log(error);
        }
    }
    return (
        <>
            <div className="container">
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid item xs={6} >
                        <Typography variant='h2' sx={{ textAlign: 'center', mb: 6 }}>Login Page</Typography>
                        <form onSubmit={handleSub}>
                            <div class="mb-3">
                                <input type="email" name='email' class="form-control" id="exampleFormControlInput2" placeholder="enter email here"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input type="password" name='password' class="form-control" id="exampleFormControlInput4" placeholder="enter password here"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className='text-center'>
                                <button className='btn btn-primary my-3' type='submit'>
                                    {loading === "logging" ? (
                                        <>
                                            <CircularProgress sx={{ color: "white", marginRight: 1 }} size={"1rem"} />
                                            Processing ...
                                        </>) : "Login"}
                                </button> <br />
                                ********No account <Link to='/register'>Create One</Link>
                                ********Forgot password <Link to='/forget'>Reset Password</Link>
                            </div>
                        </form>
                    </Grid>
                    <Grid item xs={5} sx={{ textAlign: 'center' }}>
                        <img src="https://img.freepik.com/premium-vector/online-registration-sign-up-with-man-sitting-near-smartphone_268404-95.jpg" alt="" width="500px" height="400px" />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default LoginPage