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
  
export default function GlobalAppBar() {  
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
                        <Toolbar >
                            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} edge="start" color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton> 
                            <Typography variant="h4" >
                                                
                                                <a href="/home" style={{color: 'white', textDecoration: 'none' }} >YOURSHIRT</a>    |  
                                                 <a href="/sales/status" style={{color: 'white', textDecoration: 'none' }} > Verkauf & Versand</a>
                                        </Typography>

                            <ButtonGroup style={{position: 'absolute', right: 20}}size="small" color="primary" aria-label="outlined primary button group">
                            
                            <Button component={Link} to="/sales/newcustomer" color="inherit">Neuer Kunde</Button>
                            <Button  component={Link} to="/sales/neworder" color="inherit">Neue Bestellung</Button>
                            <Button component={Link} to="/sales/allcustomer" color="inherit">Kundenkartei</Button>
                            <Button  component={Link} to="/sales/customerrequest" color="inherit">Kundenanfrage</Button>
                            <Button  component={Link} to="/sales/status" color="inherit">Status</Button>
                            <Button  component={Link} to="/sales/booking" color="inherit">Auslagern & Prüfen</Button>
                            <Button  component={Link} to="/sales/sending" color="inherit">Versandlabel</Button>
                            <Button  component={Link} to="/sales/retoure" color="inherit">Retoure</Button>
                            <Button  component={Link} to="/sales/kpiboard" color="inherit">KPI Board</Button>
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