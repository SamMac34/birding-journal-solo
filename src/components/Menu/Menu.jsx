import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    <MenuIcon sx={{ fontSize: 40 }} className='menu-icon'></MenuIcon>
                </Typography>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose} component={Link} to="/home">Home</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/search">Search Birds</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/about">About</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/logout">Logout</MenuItem>
            </Menu>
        </div>
    );
}