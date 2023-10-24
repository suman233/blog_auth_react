import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../Services/Apicall'
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { BarLoader, MoonLoader, ScaleLoader, SyncLoader } from 'react-spinners'
import { lightGreen } from '@mui/material/colors'

const Courses = () => {
  const [courses, setCourse] = useState([])
  const [loading, setLoading] = useState(true)
  const { _id } = useParams()

  const getCourses = async () => {
    setLoading(true)
    const resp = await axiosInstance.get(`/api/course`)
    setCourse(resp.data.Courses);
    console.log('courses', resp.data.Courses);
    setLoading(false)
  }

  useEffect(() => {
    getCourses();
  }, [])
  const courseImgUrl = `https://restapinodejs.onrender.com/api/course/photo`
  return (
    <>
      <Container>
        <Typography variant='h2' sx={{ mb: 4, fontWeight: 'bolder', textAlign: 'center' }}>List of Courses</Typography>
        {
          loading ? <center><ScaleLoader color='green' size={300} /></center> : null
        }
        <Grid container rowSpacing={8} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {courses.map((course, index) => {
            return (
              <>
                <Grid item xs={4}>
                  <Card sx={{ maxWidth: 345, mb: 5, textAlign: 'center' }} key={index}>
                    <CardHeader
                      title={course.name}
                      sx={{ bgcolor: 'blueviolet' }}
                    />
                    <CardMedia
                      sx={{ height: 240, m: 3 }}
                      image={`${courseImgUrl}/${course._id}`}
                      title=""
                    />
                    <CardContent>
                      <Typography
                        variant="h3"
                        color="green"
                      >
                        Rs.{course.fees}/-
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body"
                        component="div"
                      >
                        {course.requirement}
                      </Typography>

                      <Typography
                        variant="h5"
                        color="black"
                      >
                        Duration: {course.duration}
                      </Typography>
                    </CardContent>
                    <Typography sx={{ textAlign: 'center', bgcolor: 'lightgray' }}>
                      <Button
                        size="medium"
                        color='success'
                        sx={{ p: 1 }}
                        component={Link}
                        to={`/coursedetails/${course._id}`}
                      >
                        Apply Now
                      </Button>
                    </Typography>
                  </Card>
                </Grid >
              </>
            );
          })}
        </Grid>
      </Container >
    </>
  )
}

export default Courses