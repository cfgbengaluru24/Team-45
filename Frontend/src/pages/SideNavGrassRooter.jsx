import { Drawer, List, ListItem, ListItemText, Divider, Box, Typography } from '@mui/material';

const SideNavGrassRooter = () => {
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
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
                }}
            >
                <Typography variant="h6" sx={{ my: 2 }}>
                    Grass Rooter
                </Typography>
                <Divider sx={{ width: '80%', backgroundColor: 'white' }} />
                <List>
                    <ListItem>
                        <ListItemText primary="My Profile" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Tasks" />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}

export default SideNavGrassRooter;
