import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ClipLoader, ClockLoader } from 'react-spinners'
import { axiosInstance } from '../Services/Apicall'
import { Skeleton, Typography } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const BlogPage = () => {
    const [blogs, setBlog] = useState([])
    const [catg, setCategory] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)

    const getBlogDetails = async () => {
        setLoading(true)
        const res = await axiosInstance.get(`/api/allBlog`)
        setBlog(res.data.data)
        console.log(res);
        setLoading(false)
    }

    // const baseUrl2 = 'https://restapinodejs.onrender.com/api'
    const categoryDetails = async () => {
        setIsLoading(true)
        const response = await axiosInstance.get(`/api/showallcategory`)
        // console.log('cat', response?.data.data);
        setCategory(response?.data.data)
        setIsLoading(false)
    }

    const imageUrl = 'https://restapinodejs.onrender.com/api/blog/image'
    useEffect(() => {
        getBlogDetails();
        categoryDetails();
    }, [])

    const Search = styled('div')(({ theme }) => ({
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

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
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
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        {/* <h1 className='text-center'>Blogs</h1> */}
                        {
                            loading ? (
                                //     <Stack spacing={1}>
                                //     <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                                //     <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                                //     <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                //     <Skeleton variant="rectangular" width={1000} height={400} />
                                //   </Stack>
                                <center>
                                    {/* <ClipLoader size={'300px'} color='green' cssOverride={{ marginTop: '10px' }} /> */}
                                    <Skeleton variant="rectangular" sx={{mt:2}} width={800} height={400} />
                                    <Skeleton variant="text" sx={{mt:2}} width={500} />
                                    <Skeleton variant="text" sx={{ fontSize: '4rem' }} />
                                </center>) : null
                        }
                        {
                            blogs?.slice(0, loadmore).map((blog, idx) => {
                                return (
                                    <>
                                        <div className='my-3' key={idx}>
                                            <div className="text-center border border-secondary" >
                                                <img src={`${imageUrl}/${blog._id}`} alt="" height="400" width="auto" />
                                                <hr />
                                                <h5>Title: {blog.title}</h5>
                                                <p>Post: {blog?.postText.slice(0, 275)}&nbsp;<Link to={`/blogdetails/${blog._id}`}>Read More</Link></p>
                                                {/* <Link to={`/blogdetails/${element._id}`}><button className='btn btn-primary' >Read More {idx + 1}</button></Link> */}
                                                {/* <Link to={`https://restapinodejs.onrender.com/api/category/post/blo${items.id}`}><button className='btn btn-primary' onClick={()=>navigate(`https://.onrender.com/api/category/post/${items.id}`)}>Read More {idx + 1}</button></Link> */}
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="col-md-4 my-4">
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search Here"
                            // inputProps={{  }}
                            />
                        </Search>
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
                                                <li className='list-group-item'><button className='btn' onClick={() => navigate(`/catdetails/${items._id}`)}>{items.category}</button></li>
                                            </ul>
                                        </Typography>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {
                loadmore < blogs.length && <center><button className='btn btn-success my-3' onClick={handleBlogs}>Load More</button></center>
            }
        </>
    )
}

export default BlogPage