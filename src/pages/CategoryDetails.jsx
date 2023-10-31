import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { axiosInstance } from '../Services/Apicall'
import { Box, Button, Modal, Typography } from '@mui/material'

const CategoryDetails = () => {

    const { _id } = useParams()
    const [catg, setCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const nav=useNavigate()
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    // const baseUrl = 'https://restapinodejs.onrender.com'
    const catapi = async () => {
        setLoading(true)
        const response = await axiosInstance.get(`/api/category/post/${_id}`)
        setCategory(response?.data.data)
        setLoading(false)
    }
    useEffect(() => {
        catapi()
    }, [])

    // let value = <div className='text-center'><h4>No data Found</h4></div>

    return (
        <>
            <h1 className='text-center my-4'>Category Page</h1>
            <div className="container">
                {
                    loading ? (<center><ClipLoader size={'300px'} /></center>) :
                        (
                            <div className="grid">
                                {
                                    // catg.filter(cat=>cat.length===0?console.log('No data found'):cat).map((cgs, idx) => {
                                    catg.length === 0 ? (
                                        <Modal
                                            open={true}
                                            onClose={handleClose}
                                            aria-labelledby="child-modal-title"
                                            aria-describedby="child-modal-description"
                                        >
                                            <Box sx={{ ...style, width: 300, textAlign:'center'}}>
                                                <h2>No data found</h2>
                                                <Button onClick={()=>nav(-1)}>Close</Button>
                                            </Box>
                                        </Modal>
                                    ) : (
                                        catg.length > 0 && catg.map((cgs, idx) => {
                                            return (
                                                <>
                                                    <div className='card my-3' key={idx}>
                                                        <h5>Section {idx + 1} </h5>
                                                        <center><img src={`https://restapinodejs.onrender.com/api/blog/image/${cgs._id}`} alt="" width={1000} /></center>
                                                        <Typography><b>Title: </b>{cgs.title}</Typography>
                                                        <p> <b>Post:</b>
                                                            <p dangerouslySetInnerHTML={{ __html: cgs?.postText }}></p></p>
                                                        {/* <p><b>Posts: </b>{cgs.postText}</p> */}
                                                        <p><b>Posted Date: </b>{cgs.createdAt}</p>
                                                    </div>
                                                </>
                                            )
                                        }))
                                }
                            </div>
                        )}
            </div>
        </>
    )
}

export default CategoryDetails