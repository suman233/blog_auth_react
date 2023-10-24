import React, { useEffect, useState } from 'react'
import { useAuth } from '../Auth/Authtext'
import Layout from '../component/Common/Layout'
import { axiosInstance } from '../Services/Apicall'
import Carousel from 'react-material-ui-carousel'
import { Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Container, Grid, Skeleton, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Home = () => {
    // const url='https://restapinodejs.onrender.com/api/banner'
    const [images, setImages] = useState([])
    const [load, setload] = useState(true)
    const theme=useTheme()
    const largeScreen = useMediaQuery(theme.breakpoints.up('md'));

    const getBannerImages = async () => {
        const resp = await axiosInstance.get(`/api/banner`)
        setImages(resp.data.bannerdata)
        console.log('b', resp.data.bannerdata);
        setload(false)
    }

    const [services, setService] = useState([])
    // https://restapinodejs.onrender.com/api/service
    const serviceDetails = async () => {
        const res = await axiosInstance.get(`/api/service`)
        setService(res.data.data)
        console.log('s', res.data.data);
    }

    const [testimonial, setTestimonial] = useState([])
    const testimonialdata = async () => {
        const resp = await axiosInstance.get(`/api/testimonial`)
        setTestimonial(resp.data.testimonials)
        console.log('tet', resp.data);
    }

    const bannerUrl = `https://restapinodejs.onrender.com/api/banner`
    const testImg = 'https://restapinodejs.onrender.com/api/testimonials/photo'

    useEffect(() => {
        getBannerImages();
        serviceDetails();
        testimonialdata();
    }, [])
    const [auth] = useAuth()

    const style = {
        position: 'absolute',
        top: '59%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        borderTop: '4px solid green',
        bgcolor: 'rgba(192,192,192,0.4)',
        borderBottom: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <>
            <Layout title={'Home Page'}>
                {/* <div>Home</div> */}
                {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
                {
                    load ? (

                        <center>
                            {/* <ClipLoader size={'300px'} color='green' cssOverride={{ marginTop: '10px' }} /> */}
                            <Skeleton variant="rectangular" sx={{fontSize: '35rem'}} />
                            {/* <Skeleton variant="text" sx={{ mt: 2 }} width={500} /> */}
                            {/* <Skeleton variant="text" sx={{ fontSize: '4rem' }} /> */}
                        </center>) :
                        (
                            <>
                                <Carousel>
                                    {images?.map((item, index) => (
                                        <>
                                            <div>
                                                <img key={index} src={`${bannerUrl}/photo/${item._id}`} alt='' height={680} width='2100px' />
                                                {/* <p style={{ textAlign: 'center', position:'absolute', color: 'white', top:'50%', left: '45%'}}>{item.title}</p> */}
                                                <Box sx={{ ...style,  textAlign: 'center' }}>
                                                    <h2>{item.title}</h2>
                                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit quia similique
                                                        omnis ut perferendis reiciendis eum tempora quasi corporis eveniet! Earum optio quisquam ea praesentium, eius voluptatum animi
                                                        totam mollitia voluptatem aspernatur magni blanditiis maxime laborum repellendus
                                                        amet saepe eos tempora provident.</p>
                                                    <Button variant='contained' color='primary' sx={{color:'black', bgcolor:'whitesmoke'}}>Read More</Button>
                                                </Box>
                                            </div>
                                        </>
                                    ))}
                                </Carousel>
                                <Container>
                                    <Typography variant='h2' sx={{ textAlign: 'center', m: 5, fontWeight: 'bold' }}>Services</Typography>
                                    <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} direction={largeScreen?"row":"column"}>
                                        {services.map((service, index) => {
                                            return (
                                                <>
                                                    <Grid item xs={4} sx={{flexDirection: {xs: 'column', md: 'row'}}}>
                                                        <Card sx={{ maxWidth: 345, mb: 2, textAlign: 'center' }} key={index}>
                                                            <CardActionArea sx={{ color: 'blue' }}>
                                                                <CardMedia
                                                                    sx={{ height: 240, m: 2 }}
                                                                    // image={`${courseImgUrl}/${service._id}`}
                                                                    // image='https://cdn-icons-png.flaticon.com/512/8653/8653200.png'
                                                                    image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWpRaJCfQqdNa8NNuaUvxIPuNfsNzJJCiCEbora8wUQsSNOjV_OeSrdEFAEZiqdeX7NJ0&usqp=CAU'
                                                                    title="services"
                                                                />
                                                            </CardActionArea>
                                                            <CardContent>
                                                                <Typography
                                                                    variant="h5"
                                                                    color="black"
                                                                >
                                                                    {service.name}
                                                                </Typography>
                                                                <Typography
                                                                    gutterBottom
                                                                    variant="body"
                                                                    component="div"
                                                                >
                                                                    {service.details.slice(0, 20)}
                                                                </Typography>

                                                            </CardContent>

                                                        </Card>
                                                    </Grid >
                                                </>
                                            );
                                        })}
                                    </Grid>
                                    <Typography variant='h2' sx={{ textAlign: 'center', m: 5, fontWeight: 'bold' }}>Testimonial</Typography>
                                    <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        {testimonial.map((feedback, index) => {
                                            return (
                                                <>
                                                    <Grid item xs={6}>
                                                        <Card sx={{ maxWidth: 605, mb: 2, textAlign: 'center' }} key={index}>
                                                            <CardActionArea sx={{ color: 'gray' }}>
                                                                <CardMedia
                                                                    sx={{ height: 340, m: 2 }}
                                                                    image={`${testImg}/${feedback._id}`}
                                                                    title="feedback"
                                                                />
                                                            </CardActionArea>
                                                            <CardContent>
                                                                <Typography
                                                                    variant="h5"
                                                                    color="black"
                                                                >
                                                                    {feedback.name}
                                                                </Typography>
                                                                <Typography
                                                                    gutterBottom
                                                                    variant="body"
                                                                    component="div"
                                                                >
                                                                    {feedback.position}
                                                                </Typography>
                                                                <Typography
                                                                    gutterBottom
                                                                    variant="body"
                                                                    component="div"
                                                                >
                                                                    {feedback.talk.slice(0, 30)}
                                                                </Typography>
                                                            </CardContent>

                                                        </Card>
                                                    </Grid >
                                                </>
                                            );
                                        })}
                                    </Grid>
                                </Container>
                            </>
                        )}
            </Layout>
        </>

    )
}

export default Home