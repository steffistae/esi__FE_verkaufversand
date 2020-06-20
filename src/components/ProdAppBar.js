import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from 'react-router-dom'

export default function ProdAppBar() {
        const [anchorEl, open] = React.useState(null);
        const handleClick = event => {
                open(event.currentTarget);
        };

        const handleClose = () => {
                open(null);
        };
        return (
                <>
                        <AppBar position="static">
                                <Toolbar>

                                        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} edge="start" color="inherit" aria-label="menu">
                                                <MenuIcon />
                                        </IconButton>

                                        <Typography variant="h4" >
                                                <a href="/home" style={{ color: 'white', textDecoration: 'none' }} >YOURSHIRT</a>    |
                                                 <a href="/prod/ProdHome" style={{ color: 'white', textDecoration: 'none' }} > Produktion</a>
                                        </Typography>

                                        <ButtonGroup style={{ position: 'absolute', right: 20 }} size="small" color="primary" aria-label="outlined primary button group">
                                                <Button component={Link} to="/prod/OrderManagement" color="inherit">Auftragsmanagement</Button>
                                                <Button component={Link} to="/prod/ProdManagement" color="inherit">Produktionsmanagement</Button>
                                                <Button component={Link} to="/prod/MaterialManagement" color="inherit">Materialmanagement</Button>
                                                <Button component={Link} to="/prod/Dashboard" color="inherit">Kennzahlen</Button>
                                        </ButtonGroup>

                                </Toolbar>
                        </AppBar>
                        <div>

                                <Menu
                                        id="Menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                >
                                        <MenuItem component={Link} to="/home" onClick={handleClose}>HOME</MenuItem>
                                        <MenuItem component={Link} to="/sales/status" onClick={handleClose}>Verkauf & Versand</MenuItem>
                                        <MenuItem component={Link} to="/prod/ProdHome" onClick={handleClose}>Produktion</MenuItem>
                                        <MenuItem onClick={handleClose}>Materialwirtschaft</MenuItem>
                                        <MenuItem component={Link} to="/faq" onClick={handleClose}>Hilfe & FAQ</MenuItem>

                                </Menu>
                        </div>


                </>
        );
}  