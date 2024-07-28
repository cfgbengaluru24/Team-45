import React, { useState } from 'react';
import { Box } from '@mui/material';
import SideNavGrassRooter from './SideNavGrassRooter';
import GrassRooterDashboard from './GrassRooterDashboard';
import GrassRooterProfile from './GrassRooterProfile';

const Layout = () => {
    const [mode, setMode] = useState("Tasks");

    function handleChange(mode) {
        setMode(mode);
        console.log(mode);
    }
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <SideNavGrassRooter func={handleChange}/>
            <Box
                sx={{
                    flex: 1,
                    padding: 2,
                    overflow: 'auto'
                }}
            >
                {mode === "Tasks" && <GrassRooterDashboard />}
                {mode === "Profile" && <GrassRooterProfile />}
            </Box>
        </Box>
    );
}

export default Layout;
