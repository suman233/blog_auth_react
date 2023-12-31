import { Button, Container, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import CircularProgress from '@mui/material/CircularProgress';
import { FormControl, TextField, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { axiosInstance } from '../Services/Apicall'
import { useAuth } from '../Auth/Authtext';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const BlogDetails = () => {
  const { _id } = useParams()
  const [auth] = useAuth()
  const [api1, setApi] = useState([])
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState([])
  const [skeletonLoad, setSkeletonLoad] = useState(true)
  const nav = useNavigate()

  const blogapi = async () => {
    setLoading(true)
    // const blogUrl = `https://restapinodejs.onrender.com`
    const response = await axiosInstance.get(`/api/blogDetails/${_id}`)
    // console.log('details', response?.data.data);
    setApi(response?.data.data)
    setLoading(false)
  }

  // const commentsUrl = `https://restapinodejs.onrender.com/api/comment`
  const getComments = async () => {
    try {
      const result = await axiosInstance.get(`/api/comment/${_id}`)
      // setComments(result.data)
      setComments(result?.data?.post?.comment?.comments)
      // console.log("z", result.data.post.comment.comments);
      setSkeletonLoad(false)
    } catch (error) {
      console.log('Error', error);
    }
  }
  const [like, setLike] = useState(true)
  const [islikeClicked, setIsLikeClicked] = useState(localStorage.getItem(`liked_${_id}`) === 'true');

  const handleLike = async () => {
    try {
      if (!islikeClicked) {
        const response = await axiosInstance.put(`/api/blog/like/${_id}`)
        setLike(response?.data.likes)
        toast.success(response.data.message)
        blogapi()
        setIsLikeClicked(true)
        localStorage.setItem(`liked_${_id}`, 'true');
      } else {
        toast.warn("Already Liked")
      }

    } catch (error) {
      toast.error("something went wrong")
    }

  }
  // const [loadlike, setLoadLike] = useState(true)
  const getLikes = async () => {
    try {
      const resp = await axiosInstance.put(`/api/blog/like/${_id}`)
      if (resp) {
        setLike(false)
        toast.success('You liked this blog')
        setLoading(false)
        // setLoadLike(false)
        console.log('l', resp.data.likes);
      }
      else {
        setLike(!like)
      }
    } catch (error) {
      toast.error('Try again')
    }
  }

  const rev_arr = comments.reverse()
  // console.log('arr', comments);
  // console.log('rev', rev_arr);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [load, setLoad] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault()
    const response = await axiosInstance.post(`/api/blog/${_id}/comment/create`, {
      name,
      email,
      comment,
    })
    if (response) {
      toast.success(response.data && response.data.message)
      // console.log(response.data.comment);
      getComments();
      setName('')
      setEmail('')
      setComment('')
      // nav(`/blogdetails/${_id}`)
    }

    else {
      toast.error("something went wrong")
    }
  }

  useEffect(() => {
    blogapi();
    getComments();
    // getLikes();
    // commentData();
  }, [])

  const commentsperrow = 3
  const [loadmore, setLoadMore] = useState(commentsperrow)
  const handleMore = () => {
    setLoadMore(loadmore + commentsperrow)
  }
  return (
    <>
      <Container>
        <h1 className='text-center'>Blog Details Page</h1>
        {loading ? (<center><ClipLoader color='green' size={'300px'} cssOverride={{ marginTop: '100px' }} /></center>) :
          (
            <div className='container'>
              <div className='border border-secondary my-3'>
                <h5>Title: {api1?.title}</h5>
                <hr />
                <center><img src={`https://restapinodejs.onrender.com/api/blog/image/${api1._id}`} alt="" width={1000} /></center>
                <p> <b>Post: </b>
                  <p dangerouslySetInnerHTML={{ __html: api1?.postText }}></p></p>
                <div >
                  <p style={{ fontSize: 24 }}> <b>Name: </b>Suman &nbsp; <b>Date:</b> <time dateTime="2020-01-01">{(new Date(api1.createdAt)).toLocaleDateString()}</time> &nbsp; <b>Comments:</b> {comments.length} &nbsp; Like:
                    <Button onClick={() => handleLike()} disabled={islikeClicked}><ThumbUpIcon color='blue' /> &nbsp; ({api1.likes})</Button>
                    {/* { like ?
                      <Button onClick={() => handleLike()} disabled={islikeClicked}><ThumbUpIcon color='blue' /> &nbsp; ({api1.likes})</Button>
                      : (
                        <>
                          <Button >
                            <ThumbUpIcon sx={{color: 'grey'}}/>&nbsp;(
                              {api1.likes})
                              
                          </Button>
                        </>
                      )
                  } */}
                  </p>
                </div>
                {/* <div className='text-center'>
                  <button className='btn btn-success' onClick={() => nav(`/blog`)}>Go to Blogs</button>
                </div> */}
              </div>
            </div>
          )}
      </Container >
      <Container>
        <Typography variant='h4'>Comments ({comments.length})</Typography>
        {!skeletonLoad ? (
          comments?.length > 0 && comments.sort((a, b) => {
            // if(a.createdAt<b.createdAt){return 1;}else{return null;}
            let dateA = new Date(a.createdAt), dateB = new Date(b.createdAt);
            return dateB - dateA;
          }).slice(0, loadmore).map((item, index) => {
            return (
              <>
                <h3>{item.name}</h3>
                <time dateTime="2020-01-01">{(new Date(item.createdAt)).toLocaleDateString()}</time>
                <Typography color="text.secondary">{item.comment}</Typography>
              </>
            )
          })

        ) : (

          <>
            <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
          </>
        )}
        {
          loadmore < comments.length && (<Button variant='outlined' color='error' sx={{ mt: 2 }} onClick={handleMore}>More Comments</Button>)
        }
        <Typography sx={{ mt: 2, mb: 2, p: 2, boxShadow: '0px 0px 30px' }} >
          <Typography variant='h5' sx={{ mb: 1 }}>Write Comment</Typography>
          <form onSubmit={handleSubmit}>

            <FormControl fullWidth required>
              <TextField placeholder="Write your name here" type='text' label='Name' name='name' value={name} sx={{ mb: 3 }} onChange={e => setName(e.target.value)}
              // InputProps={{
              //   readOnly: true,
              // }}
              />
              <TextField placeholder="Write your email here" label='Email' type='email' name='email' value={email} sx={{ mb: 3 }} onChange={e => setEmail(e.target.value)}
              // InputProps={{
              //   readOnly: true,
              // }}
              />
              <TextField fullWidth placeholder="Write your comment here" label='Comment' type='text' name='comment' value={comment} sx={{ mb: 2 }} onChange={(e) => setComment(e.target.value)} />
            </FormControl>
            <Typography>
              <Button sx={{ mb: 1 }} type="submit" variant='contained'>
                {
                  load ?
                    <CircularProgress /> : "Post Comment"
                }
              </Button>
            </Typography>
          </form>
        </Typography>
        {/* <Button onClick={() => nav(`/createcomment/${api1._id}`)} type="submit" variant='outlined' > Write Comment </Button> */}
      </Container>
    </>
  )
}

export default BlogDetails