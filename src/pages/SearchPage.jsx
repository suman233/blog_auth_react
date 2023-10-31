import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Card, CardContent, CardMedia, Container, Grid, List, ListItem, Paper, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { axiosInstance } from '../Services/Apicall';

const SearchPage = () => {

  const { encodedResults } = useParams()
  console.log('en', encodedResults);

  const searchItem = decodeURIComponent(encodedResults);
  const [blog, setBlog] = useState([]);
  const [cat, setCat] = useState([])
  const [load, setLoading] = useState(true)
  const [isload, setisLoading] = useState(true)


  const nav = useNavigate()

  const getBlogDetails = async () => {
    const res = await axiosInstance.get(`/api/allBlog`)
    setBlog(res.data.data)
    console.log(res);
    setLoading(false)
  }
  const categoryDetails = async () => {
    const response = await axiosInstance.get(`/api/showallcategory`)
    console.log('cat', response?.data.data);
    setCat(response?.data.data)
    setisLoading(false)
  }

  // console.log(user);
  const dataPerRow = 3;
  const [loadMore, setloadMore] = useState(dataPerRow);
  const handleMore = () => {
    setloadMore(loadMore + dataPerRow);
  }

  const imgUrl = "https://restapinodejs.onrender.com";

  useEffect(() => {
    getBlogDetails();
    categoryDetails();
  }, []);

  // Search Results
  const result = blog.filter((blogs) => {
    const searchItemLower = searchItem.toLowerCase();
    const titleLower = blogs.title.toLowerCase();
    const categoryLower = blogs.category.toLowerCase();
    const text = blogs.postText.replace(/<[^>]*>/g, "");
    const textLower = text.toLowerCase();

    return (
      titleLower.includes(searchItemLower) ||
      categoryLower.includes(searchItemLower) ||
      textLower.includes(searchItemLower)
    );
  });

  return (
    <>
      <Container maxWidth='xl'>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={8} mt={4}>
            {/* <center><h1 style={{ color: 'blue' }}>Blogs</h1></center> */}
            {
              load ? (
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" width={'100%'} height={400} />
                  <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                </Stack>
              ) : (

                result?.map((item, idx) => {
                  return (
                    <>
                      <Card sx={{ mb: 4 }}>
                        <CardMedia
                          image={`${imgUrl}/api/blog/image/${item._id}`}
                          sx={{ width: '100%', height: 500 }}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6">{item.title}</Typography>
                          <Typography>{item?.postText.slice(0, 400)}
                            <Link to={`/blogdetails/${item._id}`}>Read More</Link>
                          </Typography>
                        </CardContent>

                      </Card>
                      {/* <div key={idx}>
                      <h1>{item.title}</h1>
                      <hr />
                      <img src={`${img}/api/blog/image/${item._id}`} alt="" height={500} width={900} style={{ borderRadius: "7%" }} />

                      <hr />
                      <p dangerouslySetInnerHTML={{ __html: item?.postText.slice(0, 400) }}></p>
                    </div>

                    <Button variant="contained" onClick={() => nav(`/blogdetails/${item._id}`)}>Blog Details</Button> */}

                    </>
                  )
                }))}
            {
              loadMore < result.length && <Button variant="contained" onClick={handleMore}>Load More</Button>
            }
          </Grid>

          <Grid item xs={4} mt={4}>
            <Paper elevation={3} className='paper' sx={{ textAlign: 'center' }}>
              <TextField
                name="search"
                type="text"
                placeholder='Search here'
                value={encodedResults}
                // onChange={(e) => setSearchItem(e.target.value)}
                margin="0"
              />

              <h1 style={{ margin: '4px' }}>Category</h1>
              <List sx={{ textAlign: 'center' }} >

                {
                  !isload ? (
                    cat.map((item, idx) => {
                      return (
                        <>
                          <center><ListItem>
                            {/* <Typography sx={{ textAlign: 'center' }}> */}
                            <Link to={`/catdetails/${item._id}`}><Button>{item.category}</Button></Link>
                            {/* </Typography> */}
                          </ListItem></center>
                        </>
                      )
                    })

                  ) : (

                    <>
                      <Skeleton variant="text" sx={{ fontSize: '3rem' }} animation='wave' />
                      <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                      <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                      <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                      <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                      <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                    </>
                  )
                }
              </List>

            </Paper>
          </Grid>

        </Grid>
      </Container>
    </>
  )
}

export default SearchPage