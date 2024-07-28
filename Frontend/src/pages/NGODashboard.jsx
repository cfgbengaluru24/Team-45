import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import SideBarAdmin from './SideBarAdmin'; // Adjust the import path as needed

// Sample data
const samplePendingRequests = [
    {
        sno: 1,
        name: 'ABC Public School',
        location: 'Kurukshetra',
        pictures: ['/path/to/image1.jpg', '/path/to/image2.jpg'],
        documents: ['/path/to/document1.pdf', '/path/to/document2.pdf'],
    },
    {
        sno: 2,
        name: 'XYZ Public School',
        location: 'Faridabad',
        pictures: ['/path/to/image3.jpg', '/path/to/image4.jpg'],
        documents: ['/path/to/document3.pdf', '/path/to/document4.pdf'],
    },
];

// Pending Requests Table Component
const PendingRequestsTable = ({ onApprove, onReject }) => {
    const [pendingRequests, setPendingRequests] = useState(samplePendingRequests);
    // useEffect(()=>{
    //     axios.get('http://localhost:5000/api/schools/pendingRequests')
    //     .then((response)=>{
    //         setPendingRequests(response.data)
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })
    // },[])
    return (
        <Box>
            <Typography variant="h6" mb={2}>Pending Requests</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Pictures</TableCell>
                            <TableCell>Documents</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingRequests.map(request => (
                            <TableRow key={request.sno}>
                                <TableCell>{request.sno}</TableCell>
                                <TableCell>{request.name}</TableCell>
                                <TableCell>{request.location}</TableCell>
                                <TableCell>
                                    {request.pictures.map((pic, index) => (
                                        <img key={index} src="https://th.bing.com/th/id/OIP.p1_3yqRT1y34Pfxd6kVOtQHaFj?rs=1&pid=ImgDetMain"  alt={`School ${request.sno}`} style={{ width: 50, height: 50, marginRight: 5 }} />
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {request.documents.map((doc, index) => (
                                        <a key={index} href={doc} target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: '#1976d2', textDecoration: 'none' }}>Document {index + 1}</a>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => onApprove(request.sno)} color="success" sx={{ mr: 1 }}>
                                        <CheckIcon />
                                    </IconButton>
                                    <IconButton onClick={() => onReject(request.sno)} color="error">
                                        <ClearIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

// Approved Requests Table Component
const ApprovedRequestsTable = ({ approvedRequests }) => {
    return (
        <Box>
            <Typography variant="h6" mb={2}>Approved Requests</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>Request/Registration ID</TableCell>
                            <TableCell>ID of Grassworker/Donor Assigned</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {approvedRequests.map(request => (
                            <TableRow key={request.sno}>
                                <TableCell>{request.sno}</TableCell>
                                <TableCell>{request.registrationId}</TableCell>
                                <TableCell>{request.assignedId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

// NGODashboard Component
const NGODashboard = () => {
    const [pendingRequests, setPendingRequests] = useState(samplePendingRequests);
    const [approvedRequests, setApprovedRequests] = useState([]);

    const handleApprove = (sno) => {
        const request = pendingRequests.find(req => req.sno === sno);
        if (request) {
            // Simulate generating IDs
            const approvedRequest = {
                ...request,
                registrationId: `REG${sno}`,
                assignedId: `ASSIGNED${sno}`,
            };
            setApprovedRequests([...approvedRequests, approvedRequest]);
            setPendingRequests(pendingRequests.filter(req => req.sno !== sno));
            // Uncomment below for actual API calls
            // axios.post('/api/schools/approve', { sno })
            //     .then(response => {
            //         setApprovedRequests([...approvedRequests, approvedRequest]);
            //         setPendingRequests(pendingRequests.filter(req => req.sno !== sno));
            //     })
            //     .catch(error => console.error('Error approving request:', error));
        }
    };

    const handleReject = (sno) => {
        setPendingRequests(pendingRequests.filter(req => req.sno !== sno));
        // Uncomment below for actual API calls
        // axios.post('/api/schools/reject', { sno })
        //     .then(response => {
        //         setPendingRequests(pendingRequests.filter(req => req.sno !== sno));
        //     })
        //     .catch(error => console.error('Error rejecting request:', error));
    };

    return (
        <Box display="flex">
            <SideBarAdmin />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', p: 2 }}>
                <Box sx={{ width: '50%', p: 1 }}>
                    <PendingRequestsTable onApprove={handleApprove} onReject={handleReject} />
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ width: '50%', p: 1 }}>
                    <ApprovedRequestsTable approvedRequests={approvedRequests} />
                </Box>
            </Box>
        </Box>
    );
};

export default NGODashboard;







