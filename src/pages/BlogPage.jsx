import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../component/Common/Layout'
import { ClipLoader, ClockLoader } from 'react-spinners'
import { axiosInstance } from '../Services/Apicall'
import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, Skeleton, TextField, Typography } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const BlogPage = () => {
    const [blogs, setBlog] = useState([])
    const [catg, setCategory] = useState([])
    const [recent, setRecent] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [searchvalue, setSearchValue] = useState("")
    console.log(searchvalue);

    const getBlogDetails = async () => {
        setLoading(true)
        const res = await axiosInstance.get(`/api/allBlog`)
        setBlog(res.data.data)
        // setSearchValue(res.data.data)
        console.log(res);
        setLoading(false)
    }
    // const data = blogs.title.toLowerCase()
    // console.log('suman', data.filter((f)=>f.includes("Javascript")));

    const filtered = blogs.filter((blog) => {
        const titleData = blog.title.toLowerCase()
        return (
            titleData.includes("Javascript")
        )
    })
    console.log('sumanData', filtered)

    const filteredBlogs = (e) => {
        setSearchValue(blogs.filter(f => f.title.toLowerCase().includes(e.target.value)))
        console.log(blogs.filter((f) => f.title.toLowerCase().includes(e.target.value)));
    }

    // const baseUrl2 = 'https://restapinodejs.onrender.com/api'
    const categoryDetails = async () => {
        setIsLoading(true)
        const response = await axiosInstance.get(`/api/showallcategory`)
        console.log('cat', response?.data.data);
        setCategory(response?.data.data)
        setIsLoading(false)
    }
    // https://restapinodejs.onrender.com/api/letest-post
    const recentPosts = async () => {
        const resp = await axiosInstance.get(`/api/letest-post`)
        setRecent(resp.data.data)
        console.log('r', resp.data);
    }

    // const [like, setLike]=useState([])
    // const getLikes=async()=>{
    //     const resp=await axiosInstance.put(`/api/blog/like/`)
    //     setLike(resp.data)
    //     console.log('l',resp.data);
    //   }

    const imageUrl = 'https://restapinodejs.onrender.com/api/blog/image'
    useEffect(() => {
        getBlogDetails();
        categoryDetails();
        recentPosts();
        // getLikes();
    }, [])


    let Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,

        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    let SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    let StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    //   const [topic,setTopic]=useState('')
    const fetchData = (e) => {
        const query = e.target.value;
        fetch(`https://jsonplaceholder.typicode.com/users?q=${query}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setBlog(data);
            });
    };

    const navigate = useNavigate()
    const blogperrow = 3
    const [loadmore, setLoadmore] = useState(blogperrow)
    const handleBlogs = () => {
        setLoadmore(loadmore + blogperrow)
    }

    const handleSearch = () => {
        const encodedResults = encodeURIComponent(searchvalue);
        navigate(`/search/${encodedResults}`);
        setSearchValue("");
    };
    return (
        <>
            <Layout title={'All Blogs'}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 my-4">
                            {/* <h1 className='text-center'>Blogs</h1> */}
                            {
                                loading ? (
                                    //     <Stack spacing={1}>
                                    // <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                                    //     <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                                    //     <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                    //     <Skeleton variant="rectangular" width={1000} height={400} />
                                    //   </Stack>
                                    <center>
                                        {/* <ClipLoader size={'300px'} color='green' cssOverride={{ marginTop: '10px' }} /> */}
                                        <Skeleton variant="rectangular" sx={{ mt: 2 }} width={'100%'} height={400} />
                                        <Skeleton variant="text" sx={{ mt: 2 }} width={'60%'} />
                                        <Skeleton variant="text" sx={{ fontSize: '4rem' }} />
                                    </center>) : null
                            }
                            {

                                // .filter((item) => {
                                //     return searchvalue.toLowerCase() === "" ? item : item.title.toLowerCase().includes(searchvalue)
                                // })
                                blogs.slice(0, loadmore).map((blog, idx) => {
                                    return (
                                        <>
                                            <Card sx={{ mb: 4 }}>
                                                <Typography
                                                sx={{ ml: 2 }}><b>Name:</b> Suman &nbsp; <b> Date:</b> <time dateTime="2020-01-01">{(new Date(blog.createdAt)).toLocaleDateString()}</time> &nbsp; 
                                                </Typography>
                                                <CardMedia
                                                    image={`${imageUrl}/${blog._id}`}
                                                    sx={{ width: '100%', height: 500 }}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h6">{blog.title}</Typography>
                                                    <Typography>{blog?.postText.slice(0, 400)}
                                                        <Link to={`/blogdetails/${blog._id}`}>Read More</Link>
                                                    </Typography>
                                                </CardContent>

                                            </Card>
                                            {/* <div className="my-3 border border-secondary" key={idx}>
                                                <p style={{ marginLeft: 5 }}>Name: Suman &nbsp; Date: <time dateTime="2020-01-01">{(new Date(blog.createdAt)).toLocaleDateString()}</time> &nbsp; </p>
                                                <div className='text-center'>
                                                    <img src={`${imageUrl}/${blog._id}`} alt="" height="400" width="auto" />
                                                    <hr />
                                                    <h5>Title: {blog.title}</h5>
                                                    <p>Post: {blog?.postText.slice(0, 275)}&nbsp;<Link to={`/blogdetails/${blog._id}`}>Read More</Link></p>
                                                    {/* <Link to={`/blogdetails/${element._id}`}><button className='btn btn-primary' >Read More {idx + 1}</button></Link> 
                                                    <Link to={`https://restapinodejs.onrender.com/api/category/post/blo${items.id}`}><button className='btn btn-primary' onClick={()=>navigate(`https://.onrender.com/api/category/post/${items.id}`)}>Read More {idx + 1}</button></Link>
                                                </div>
                                            </div> */}
                                        </>
                                    )
                                })
                            }
                            {
                                loadmore < blogs.length && <center><button className='btn btn-success my-3' onClick={handleBlogs}>Load More</button></center>
                            }
                        </div>
                        <div className="col-md-4 my-4">
                            <center>
                                <TextField
                                    name="search"
                                    type="text"
                                    placeholder="Search here"
                                    value={searchvalue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    margin="0"
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch();
                                        }
                                    }}
                                />
                                {/* <TextField placeholder='Search here' type='text' onChange={filteredBlogs}>
                                </TextField> */}
                            </center>
                            {/* <Search onChange={(e)=> setSearchValue(e.target.value)}>
                                <SearchIconWrapper onChange={(e)=> setSearchValue(e.target.value)}>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <StyledInputBase onChange={(e)=> setSearchValue(e.target.value)}
                                    placeholder="Search here"
                                // inputProps={{  }}
                                />
                            </Search> */}
                            <h3 className='text-center my-3'>Category Side</h3>
                            {isloading ? (<div className="container">
                                <center><ClockLoader size={'300px'} /></center>
                            </div>) : null}
                            {
                                catg?.map((items, index) => {
                                    return (
                                        <>
                                            <Typography sx={{ textAlign: 'center' }}>
                                                <ul className='list-group'>
                                                    {/* <li><a href={`https://restapinodejs.onrender.com/api/category/post/${items._id}`}>{items.category}</a></li> */}
                                                    <li className='list-group-item'><button className='btn' onClick={() => navigate(`/catdetails/${items._id}`)}>{items.category} {items.length}</button></li>
                                                </ul>
                                            </Typography>
                                        </>
                                    )
                                })
                            }
                            <Typography variant='h5' textAlign="center" sx={{ my: 2, fontWeight: 'bolder' }}>Recent Posts</Typography>
                            <Grid container spacing={0} direction={{ xs: "column", md: "row" }}
                                justifyContent={{ xs: "center", md: "flex-end" }}>
                                {
                                    recent?.map((element, idx) => {
                                        return (
                                            <>
                                                <Grid item xs={4}>
                                                    <CardMedia
                                                        sx={{ height: 60, m: 3 }}
                                                        image={`${imageUrl}/${element._id}`}
                                                        title=""
                                                    />

                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Card>
                                                        <CardActionArea sx={{ color: 'green' }}>
                                                            <CardContent sx={{ my: 2 }}>
                                                                <Typography
                                                                    variant="h5"
                                                                    color="black"
                                                                >
                                                                    {element.title}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                    </Card>
                                                </Grid>
                                            </>
                                        )
                                    })
                                }
                            </Grid >
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default BlogPage