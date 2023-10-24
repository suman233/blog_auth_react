import { Box, CardMedia, Container, Divider, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from '../Auth/Authtext'

const Profile = () => {
    const [auth] = useAuth()
    return (
        <Container>
            <Box sx={{ textAlign: 'center', mt: 16 }}>
                <Grid container>
                    <Grid item xs={6}>
                        <Paper>
                            <Typography variant='h2' sx={{ p: 2, fontWeight: 'bolder' }}>
                                Profile Page
                            </Typography>
                            <Divider sx={{ m: 2 }} />
                            <Typography><b>Name: </b>{auth.user.name}</Typography>
                            <Divider sx={{ m: 2 }} />

                            <Typography><b>Email Address: </b>{auth.user.email} </Typography>
                            <Divider sx={{ m: 2 }} />
                            <Typography><b>Phone: </b>{auth.user.mobile}</Typography>

                            <Divider sx={{ m: 1 }} />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            <CardMedia sx={{ textAlign: 'center' }}>
                                <img src="/images/suman.jpg" alt="" height={'400px'} />
                            </CardMedia>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container >
    )
}

export default Profile