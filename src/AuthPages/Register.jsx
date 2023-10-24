import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../component/Common/Layout'
import { toast } from 'react-toastify'
import { axiosInstance } from '../Services/Apicall'

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")

    const nav = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const resp = await axiosInstance.post(`/api/register`, {
                name,
                email,
                mobile,
                password,
            })
            if (resp && resp.data.success) {
                toast.success(resp.data && resp.data.message)
                console.log('dt', resp);
                nav('/')
            }
            else {
                toast.error(resp.data.message)
                console.log('err', resp);
            }
        } catch (error) {
            toast.error('Something went wrong')
            console.log(error);
        }

    }
    return (
        <>
            <Layout title={'Register'}>
                <div className="container">
                    <h1>Register page</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" name='name' class="form-control" id="exampleFormControlInput1" placeholder="enter name here"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div class="mb-3">
                            <input type="email" name='email' class="form-control" id="exampleFormControlInput2" placeholder="enter email here"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div class="mb-3">
                            <input type="number" name='mobile' class="form-control" id="exampleFormControlInput3" placeholder="enter phone here"
                                value={mobile}
                                onChange={e => setMobile(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input type="password" name='password' class="form-control" id="exampleFormControlInput4" placeholder="enter password here"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='text-center'>
                        <button className='btn btn-primary my-3' type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </Layout>
        </>
    )
}

export default Register