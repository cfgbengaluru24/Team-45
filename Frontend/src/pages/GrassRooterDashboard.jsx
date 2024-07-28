import { Container, Box, TableContainer, Table, TableBody, TableHead, TableCell, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const GrassRooterDashboard = () => {
    const [cont, setCont] = useState([{ name: "abcd", location: "xyz", purpose: true, status: true }]);
    const [selectedFiles, setSelectedFiles] = useState({});

    const statusfunc = (id, status) => {
        if (status) {
            axios.post(`http://localhost:5000/`, { status: 1 })
                .then((res) => {
                    console.log(res);
                    setCont(prev => prev.map(data => data.id === id ? { ...data, status: status } : data))
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            axios.post(`http://localhost:5000/`, { status: 0 })
                .then((res) => {
                    setCont(prev => prev.filter(data => data.id !== id))
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    const handleFileChange = (event, id) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(prev => ({
            ...prev,
            [id]: prev[id] ? [...files,...prev[id]] : files
        }));
        console.log(selectedFiles);
    };

    const handleUpload = (id) => {
        const files = selectedFiles[id];
        if (!files) return;

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        axios.post('http://localhost:8000/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log('Upload successful:', response.data);
                setSelectedFiles(prev => prev.filter(data => data.id !== id));
                setCont(prev => prev.map(data => data.id === id ? { ...data, status: true } : data));
            })
            .catch(error => {
                console.error('Upload error:', error);
                
            });
    };

    return (
        <Container>
            <h1>GrassRooter Dashboard</h1><br />
            <Box sx={{ width: '100%' }}>
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table sx={{ width: '100%' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ textAlign: "center" }}>School Name</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Location</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Purpose</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Stage</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Documents</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                cont.map((data, i) => (
                                    <TableRow key={i}>
                                        <TableCell style={{ textAlign: "center" }}>{data.name}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>{data.location}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>{data.purpose ? "Registration" : "Infrastructure"}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>{data.status ? <Typography style={{ color: 'green' }}>Accepted</Typography> : (<div><button onClick={() => statusfunc(data.id, true)}><CheckIcon style={{ color: "green" }} /></button>  <button onClick={() => statusfunc(data.id, true)}><ClearIcon style={{ color: "red" }} /></button></div>)}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>
                                            <input type="file" multiple onChange={(event) => handleFileChange(event, i)} />
                                            {Array.isArray(selectedFiles[i]) && selectedFiles[i].length > 0 && (
                                                <ul style={{ listStyleType: "none", padding: 0 }}>
                                                    {selectedFiles[i].map((file, index) => (
                                                        <li key={index}>{file.name}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </TableCell>
                                        <TableCell style={{ textAlign: "center" }}>
                                            <button onClick={() => handleUpload(i)}>Submit</button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}

export default GrassRooterDashboard;
