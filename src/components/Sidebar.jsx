import React from 'react'
import {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SignIn from './Login'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


function Sidebar() {

  const [estado, setEstado] = useState({});

  const pasaDato = async () => {
    
    const res = await axios.post(`http://127.0.0.1:5000/ejerobot`)
    // .then(res => {
    //   console.log(res.data);
    // }).catch(error => {
    //   console.log(error);
    // })
    console.log(res.data)
    
    if(res.data.mensaje === "Ejecutado"){
      const act = 1;
      console.log(act)
      setEstado(res.data)
    }
    
  }

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon/>
            </IconButton>
            <Link to="/" style={{ textDecoration: 'none', color:'white' }}>
              <Typography variant="h6" noWrap>
                Robo Pjud
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
          >
              
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>

          <Divider />

          <List>
              
                <ListItem component={Link} to="/" button key={'Cerrar sesion'}>
                    <ListItemIcon><AddBoxIcon/></ListItemIcon>
                    <ListItemText primary='Cerrar sesion' />
                </ListItem>

              <Divider />

        </List>
          
          
        </Drawer>
        {/* <Button onClick={() => pasaDato()} variant="text" color="default">
          <Typography variant="h6" color="initial">Enviar señal</Typography>
        </Button> */}

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          <Switch>
            <Route path="/home">
              {/* <Button onClick={() => pasaDato()} variant="text" color="default">
                <Typography variant="h6" color="initial">Enviar señal</Typography>
              </Button> */}
              {/* <Home/> */}
            </Route>

            <Route path="/" >
              {/* REVISARRRRR <Suspense fallback = {<h1>Cargando...</h1>}>  */}
                <SignIn/>
                
              {/* REVISARRRRR </Suspense> */}
            </Route>
          </Switch>    
          
        </main> 

      </div>

    </Router>
    
  );
}

export default Sidebar;