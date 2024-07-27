import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Divider, List, ListItem, ListItemText, IconButton, Drawer, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

// SideBarAdmin Component with Sidebar Button
const SideBarAdmin = () => {
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    backgroundColor: '#000040',
                    color: 'white',
                    p: 2,
                }}
            >
                <Typography variant="h6" sx={{ my: 2 }}>
                    NGO Admin 
                </Typography>
                <Divider sx={{ width: '80%', backgroundColor: 'white' }} />
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" color="white" mb={2}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>HomePage</Link>
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    );
};

export default SideBarAdmin;