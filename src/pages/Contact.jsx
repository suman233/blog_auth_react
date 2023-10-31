import React, { useState } from 'react'
import { axiosInstance } from '../Services/Apicall'
import Layout from '../component/Common/Layout'
import { Box, Button, Container, FormControl, TextField } from '@mui/material'
import { toast } from 'react-toastify'

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const submitForm = async (e) => {
    e.preventDefault()
    // const name=document.getElementById('name').value;
    // https://restapinodejs.onrender.com/api/contact/create
    try {
      const resp = await axiosInstance.post(`/api/contact/create`, {
        name,
        email,
        phone,
        message,
      })
      if (resp) {
        toast.success(resp.data.message)
        // setLoading(false)
        // nav('/home')
        console.log('cont', resp);
      }
      else {
        toast.error(resp.data.message)
        // setLoading(false)
        console.log('err', resp);
      }
    } catch (error) {
      toast.error('Something went wrong')
      // setLoading(false)
      console.log(error);
    }
  }

  return (
    <>
      <Layout title={'Contact Page'}>
        <Container maxWidth='xl'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.00589220451!2d88.44250977484027!3d22.65356892999877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89faa59df6903%3A0xdb1444043648b83!2sNetaji%20Subhash%20Chandra%20Bose%20International%20Airport!5e0!3m2!1sen!2sin!4v1698573723687!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </Container>
        <Container>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 1 },
              m: 2,
              textAlign: 'center'
            }}
            onSubmit={submitForm}
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
              <TextField multiline rows={4} label="Message" id="multiline-sms" type='text' placeholder='Enter your query' value={message}
                onChange={e => setMessage(e.target.value)} />
              <Button type="submit" variant='contained' sx={{ m: 2 }} >Submit</Button>
            </FormControl>
          </Box>
        </Container>
      </Layout>
    </>
  )
}

export default Contact