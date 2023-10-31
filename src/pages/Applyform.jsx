import React, { useState } from 'react'
import { axiosInstance } from '../Services/Apicall'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Container, Typography, FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useAuth } from '../Auth/Authtext';

const initialValues = {
    name: '',
    email: '',
    phone: '',
    address: "",
    city: "",
    qualification: "",
    programing_knowledge: "",
    experiance: ''
}
const Applyform = () => {

    // const [user, setUser] = useState(initialValues)
    // const [error, setError] = useState({})
    // const navigate = useNavigate()
    const { _id } = useParams()

    // const validation = () => {
    //     let error = {}

    //     if (!user.name) {
    //         error.name = "Name is Required"
    //     }

    //     if (!user.email) {
    //         error.email = "Email is Required"
    //     } else if (
    //         !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)
    //     ) {
    //         error.email = "Enter a valid Email"
    //     }

    //     if (!user.phone) {
    //         error.phone = "Phone is Required"
    //     }

    //     if (!user.address) {
    //         error.address = "Address is Required"
    //     }

    //     if (!user.city) {
    //         error.city = "City is Required"
    //     }

    //     if (!user.qualification) {
    //         error.qualification = "qualification is Required"
    //     }

    //     if (!user.programing_knowledge) {
    //         error.programing_knowledge = "programing_knowledge name is Required"
    //     }

    //     if (!user.experiance) {
    //         error.experiance = "Experience is Required"
    //     }        

    //     return error
    // }

    // let name, value
    // const postUserData = e => {
    //     name = e.target.name
    //     value = e.target.value

    //     setUser({ ...user, [name]: value })

    //     if (name === "name") {
    //         if (value.length === 0) {
    //             setError({ ...error, name: "@Name is Required" })
    //             setUser({ ...user, name: "" })
    //         } else {
    //             setError({ ...error, name: "" })
    //             setUser({ ...user, name: value })
    //         }
    //     }

    //     if (name === "email") {
    //         if (value.length === 0) {
    //             setError({ ...error, email: "@Email is Required" })
    //             setUser({ ...user, email: "" })
    //         } else {
    //             setError({ ...error, email: "" })
    //             setUser({ ...user, email: value })
    //         }
    //     }

    //     if (name === "phone") {
    //         if (value.length === 0) {
    //             setError({ ...error, phone: "@Phone is Required" })
    //             setUser({ ...user, phone: "" })
    //         } else {
    //             setError({ ...error, phone: "" })
    //             setUser({ ...user, phone: value })
    //         }
    //     }

    //     if (name === "address") {
    //         if (value.length === 0) {
    //             setError({ ...error, address: "@Address Line One is required" })
    //             setUser({ ...user, address: "" })
    //         } else {
    //             setError({ ...error, address: "" })
    //             setUser({ ...user, address: value })
    //         }
    //     }

    //     if (name === "city") {
    //         if (value.length === 0) {
    //             setError({ ...error, city: "@City is Required" })
    //             setUser({ ...user, city: "" })
    //         } else {
    //             setError({ ...error, city: "" })
    //             setUser({ ...user, city: value })
    //         }
    //     }

    //     if (name === "qualification") {
    //         if (value.length === 0) {
    //             setError({ ...error, qualification: "@Qualification is Required" })
    //             setUser({ ...user, qualification: "" })
    //         } else {
    //             setError({ ...error, qualification: "" })
    //             setUser({ ...user, qualification: value })
    //         }
    //     }

    //     if (name === "programing_knowledge") {
    //         if (value.length === 0) {
    //             setError({ ...error, programing_knowledge: "@Programing_knowledge is Required" })
    //             setUser({ ...user, programing_knowledge: "" })
    //         } else {
    //             setError({ ...error, programing_knowledge: "" })
    //             setUser({ ...user, programing_knowledge: value })
    //         }
    //     }

    //     if (name === "experiance") {
    //         if (value.length === 0) {
    //             setError({ ...error, experiance: "@Experience is Required" })
    //             setUser({ ...user, experiance: "" })
    //         } else {
    //             setError({ ...error, experiance: "" })
    //             setUser({ ...user, experiance: value })
    //         }
    //     }

    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     let ErrorList = validation()
    //     setError(validation())

    //     if (Object.keys(ErrorList).length === 0) {
    //         const resp = await axiosInstance.post(`/api/course/apply/${_id}`, user)
    //         toast.success(resp.data.message)
    //         navigate('/show')
    //         console.log('det', resp);

    //     }
    //     else {
    //         toast.error('Something went wrong')
    //         console.log('err');
    //     }
    // }

    // c= https://restapinodejs.onrender.com/api/course/apply/649ada0ceac9521c7ef29407
    // return (
    //     <Container>
    //         <Typography variant='h4' sx={{ marginTop: '40px', fontWeight: 'bolder', textAlign: 'center' }}>Apply Course</Typography>
    //         <Box
    //             component='form'
    //             sx={{
    //                 '& .MuiTextField-root': { m: 1 }, width: '105ch', textAlign: 'center', boxShadow: '0px 0px 30px'
    //             }}
    //             onSubmit={handleSubmit}
    //         >
    //             <TextField label="Name" id="fullWidth" name='name' placeholder='Enter your name' value={user.name}
    //                 onChange={e => postUserData(e)}
    //             />
    //             <TextField fullWidth label="Email" id="fullWidth2" name='email' placeholder='Enter your email' value={user.email}
    //                 onChange={e => postUserData(e)}
    //             />
    //             <TextField fullWidth label="Phone" id="fullWidth3" name='phone' placeholder='Enter your phone number' value={user.phone}
    //                 onChange={e => postUserData(e)}
    //             />
    //             <TextField fullWidth label="Address" id="fullWidth4" name='address' placeholder='Enter your address' value={user.address}
    //                 onChange={e => postUserData(e)}
    //             />
    //             <TextField fullWidth label="City" id="fullWidth5" name='city' placeholder='Enter city' value={user.city}
    //                 onChange={e => postUserData(e)}
    //             />
    //             <TextField fullWidth label="Qualifaction" id="fullWidth6" name='qualifaction' placeholder='Enter Qualifaction' value={user.qualifaction}
    //                 onChange={e => postUserData(e)}
    //             />
    //             <TextField fullWidth label="Programing_knowledge" id="fullWidth7" name='programing_knowledge' placeholder='Enter programing_knowledge' value={user.programing_knowledge}
    //                 onChange={e => postUserData(e)}
    //             />
    //             <TextField fullWidth label="Experience" id="fullWidth8" name='experiance' placeholder='Enter experiance' value={user.experiance}
    //                 onChange={e => postUserData(e)}
    //             />
    //             <Button variant='contained' type="submit" sx={{m:2}}>Submit</Button>
    //         </Box>
    //     </Container>
    // )

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [qualification, setQualification] = useState('')
    const [programing_knowledge, setPrograming_knowledge] = useState('')
    const [experiance, setExperiance] = useState('')
    const nav = useNavigate()

    const [auth]=useAuth()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const respone = await axiosInstance.post(`/api/course/apply/${_id}`, {
                name,
                email,
                address,
                phone,
                city,
                qualification,
                programing_knowledge,
                experiance,
            })
            if (respone) {
                toast.success(respone.data.message)
                // nav('/login')
            }
            else
                toast.error(respone.data.message)
        } catch (error) {
            toast.error('Something is wrong')
            console.log('error', error);
        }
    }
    return (
        <>
            <Container>
                <Typography variant='h2' sx={{ mt: 4, mb: 2, textAlign: 'center', fontWeight: 'bolder' }}>Apply Form</Typography>
                <Box
                    component='form'
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                        m:2,
                        textAlign: 'center'
                    }}
                    onSubmit={handleSubmit} 
                >
                    <FormControl fullWidth required sx={{ boxShadow: '0px 0px 30px #888888' }}>
                        <TextField label="Name" id="fullWidth1" placeholder='Enter your name' name='name' value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <TextField label="Email" id="fullWidth2" type='email' placeholder='Enter your email' value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField label="Phone" id="fullWidth3" placeholder='Enter your phone number' value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                        <TextField label="Address" id="fullWidth4" placeholder='Enter your address' value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                        <TextField label="City" id="fullWidth5" type='text' placeholder='Enter City' value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <TextField label="Qualification" id="fullWidth6" placeholder='Qualification' value={qualification}
                            onChange={e => setQualification(e.target.value)}
                        />
                        <TextField label="Programing_knowledge" id="fullWidth7" placeholder='Prg Knowledge' value={programing_knowledge}
                            onChange={e => setPrograming_knowledge(e.target.value)}
                        />
                        <TextField label="Experiance" id="fullWidth8" placeholder='Enter Experiance' value={experiance}
                            onChange={e => setExperiance(e.target.value)}
                        />

                        <Button type="submit" variant='contained' sx={{m:2}} >Submit</Button>
                    </FormControl>
                </Box>
            </Container>
        </>
    )
}

export default Applyform