import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { axiosInstance, deleteUser, getUser } from '../Services/Apicall';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Showapplied = () => {

    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const { _id}=useParams()

    const getDetails = async () => {
        setLoading(true)
        const respone = await axiosInstance.get(`/api/course/apply`)
        setUser(respone.data.data)
        setLoading(false)
    }
    useEffect(() => {
        getDetails()
    }, [])


    return (
        <Container>
            <>
                <Typography variant='h2' sx={{ margin: '60px', textAlign: 'center' }}>All details </Typography>
                <Box component='form' sx={{ mb: 2, textAlign: 'center' }}>
                    <TextField sx={{ width: 200 }} id="fullWidth3" placeholder='Search Here' value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <Button type="submit" variant='contained' sx={{ m: 2 }}>Submit</Button>
                </Box>
                {loading ? <center><ClipLoader size={300} /></center> : (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>ID</StyledTableCell>
                                    <StyledTableCell align="right">Name</StyledTableCell>
                                    <StyledTableCell align="right">Email&nbsp;</StyledTableCell>
                                    <StyledTableCell align="right">Phone&nbsp;</StyledTableCell>
                                    <StyledTableCell align="right">Address&nbsp;</StyledTableCell>
                                    <StyledTableCell align="right">City&nbsp;</StyledTableCell>
                                    <StyledTableCell align="right">Qualification&nbsp;</StyledTableCell>
                                    <StyledTableCell align="right">Action&nbsp;</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {user.filter(item => item).map((item, index) => (
                                    <StyledTableRow key={index} >
                                        <StyledTableCell component="th" scope="row">
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{item.name}</StyledTableCell>
                                        <StyledTableCell align="right">{item.email}</StyledTableCell>
                                        <StyledTableCell align="right">{item.phone}</StyledTableCell>
                                        <StyledTableCell align="right">{item.address}</StyledTableCell>
                                        <StyledTableCell align="right">{item.city}</StyledTableCell>
                                        <StyledTableCell align="right">{item.qualification}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Link to={`/edit/${item._id}`}><Button >Edit</Button></Link>
                                            <Button>Delete</Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </>

        </Container>
    )
}

export default Showapplied