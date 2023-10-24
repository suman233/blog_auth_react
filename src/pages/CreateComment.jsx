import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Button, FormControl, TextField, Grid, Typography, Container } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { axiosInstance } from '../Services/Apicall';

const CreateComment = () => {

  const { _id } = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')

  const [load, setLoad] = useState(false)
  const nav = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault()
      const response = await axiosInstance.post(`/api/blog/${_id}/comment/create`, {
        name,
        email,
        comment
      })
      if (response) {
        toast.success(response.data && response.data.message)
        console.log(response.data.comment);
        nav(`/blogdetails/${_id}`)
      }
      else {
        toast.error("something went wrong")
      }
    }
    //   const res = await CreateCommentApi(_id, {
    //     name,
    //     email,
    //     comment
    //   })


  return (
    <>
      <Container>
        <Typography variant="h2" component="div">Create Comment</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} >

            {/* <Typography variant='h2' sx={{ textAlign: 'center' }}>Comment</Typography> */}
            <Typography sx={{ mt: 10, textAlign: 'center' }} >

              <form onSubmit={handleSubmit}>
                

                  <FormControl defaultValue="" required>

                    <TextField placeholder="Write your name here" label="name" type='text' value={name} style={{ marginBottom: "20px" }} onChange={(e) => setName(e.target.value)} />

                    <TextField placeholder="Write your email here" label='email' type='email' value={email} style={{ marginBottom: "20px" }} onChange={(e) => setEmail(e.target.value)} />


                    <TextField placeholder="Write your comment here" label='Comment' type='text' value={comment} style={{ marginBottom: "20px" }} onChange={(e) => setComment(e.target.value)} />


                  </FormControl>

                  
                    <Typography>

                      <Button type="submit" variant='contained'>
                        {
                          load ?
                            <CircularProgress /> : "Post Comment"
                        }
                      </Button>
                    </Typography>
                  
                
              </form>
            </Typography>

          </Grid>

          <Grid item xs={2} mt={2}>
            <img src="https://www.poynter.org/wp-content/uploads/2023/02/shutterstock_1503263540.png" height={500} width={700} style={{ borderRadius: "7%" }} alt="comment" />
          </Grid>
        </Grid>
      </Container>
    </>
  )


}

export default CreateComment