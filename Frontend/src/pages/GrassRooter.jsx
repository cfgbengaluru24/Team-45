import { Box } from '@mui/material';
import SideNavGrassRooter from './SideNavGrassRooter';
import GrassRooterDashboard from './GrassRooterDashboard';

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <SideNavGrassRooter />
            <Box
                sx={{
                    flex: 1,
                    padding: 2,
                    overflow: 'auto'
                }}
            >
                <GrassRooterDashboard />
            </Box>
        </Box>
    );
}

export default Layout;
