import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../Services/Apicall'
import { ClipLoader } from 'react-spinners'
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const About = () => {

    const [team, setTeam] = useState([])
    const [load, setLoad] = useState(true)
    const theme=useTheme()
    const largeScreen = useMediaQuery(theme.breakpoints.up('md'));


    const getDetails = async () => {
        const result = await axiosInstance.get(`/api/team`)
        setTeam(result.data.TeamMember)
        console.log('t', result.data);
        setLoad(false)
    }
    useEffect(()=>{
        getDetails();
    }, [])
    const teamImg='https://restapinodejs.onrender.com/api/team/photo'
    return (
        <>
            <Container>
                <Typography variant='h2' sx={{ textAlign: 'center', m: 5, fontWeight: 'bold' }}>About Page</Typography>
                {
                    load? <center><ClipLoader size={300}/></center>: null
                }
                <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} direction={{xs: "column", md: "row"}}
                justifyContent={{ xs: 'center', md: 'flex-end' }}
                alignItems={{ xs: 'center', md: 'flex-end' }}          
                >
                    {team.map((item, index) => {
                        return (
                            <>
                                <Grid item xs={3} >
                                    <Card sx={{ maxWidth: 345, mb: 2, textAlign: 'center' }} key={index}>
                                        <CardActionArea sx={{ color: 'blue' }}>
                                            <CardMedia
                                                sx={{ height: 240, m: 3 }}
                                                image={`${teamImg}/${item._id}`}
                                                title="services"
                                            />
                                        </CardActionArea>
                                        <CardContent>
                                            <Typography
                                                variant="h5"
                                                color="black"
                                            >
                                                {item.name}
                                            </Typography>
                                            <Typography
                                                gutterBottom
                                                variant="body"
                                                component="div"
                                            >
                                                {item.possession}
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
    )
}

export default About