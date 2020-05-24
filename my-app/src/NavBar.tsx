import Toolbar from "@material-ui/core/Toolbar";
import ListAlt from "@material-ui/icons/ListAlt";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import { Info } from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import {Drawer} from "@material-ui/core";
import {resolveNaptr} from "dns";


const useStyles = makeStyles(theme => ({
    usersData: {
        display: 'flex',
        flexDirection: 'row',
        "& *": {
            display: 'inline-block',
        }
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        marginRight: theme.spacing(2),
        marginTop: '4px',
        color: 'rgba(0, 0, 0, 0.8)',
        textShadow: '2px',
        shadowBlur: '4'
    },
    logOutButton: {
        marginRight: '20px',
        textDecoration: 'none',
        color: 'black',
        marginTop: '14px',
        marginLeft: '20px',
    },
    appName: {
        color: 'black'
    },
    infoButton: {
    },
    buttonsDiv: {
        display: 'flex',
        flexDirection: 'row',

    },
    companyInfo: {
        width: 250,
    },
    aboutLabel: {
        margin: '10px'
    }
}));

interface NavBarProps {
    setUserState: any;
    isCompany?: boolean;
}

interface NavBarState {
    sidebarIsOpen: boolean;
}

export default function NavBar(props: NavBarProps) {
    const classes = useStyles();
    const [navBarState, setNavBarState] = React.useState<NavBarState>({sidebarIsOpen: false});

    const handleLogOutOnClick = () => {
        props.setUserState({user: null});
        document.cookie = "userId=";
    };

    const toggleDrawer = (isOpen: boolean) =>  {
        console.log("iconbuttononclick");
        setNavBarState({
            sidebarIsOpen: isOpen,
        })
    };

    const getInfoContent = () => {
        if (props.isCompany) {
            return (
                <div className={classes.companyInfo}>
                    <div>
                        <Typography variant="h5" color="inherit" noWrap className={classes.aboutLabel}>
                            About
                        </Typography>
                        
                    </div>
                </div>
            )
        }
    }

    return (
        <AppBar position="relative" style={{display: "flex", backgroundColor: 'white'}} elevation={2}>
            <Toolbar className={classes.toolbar}>
                <div className={classes.usersData}>
                    <ListAlt className={classes.icon}/>
                    <Typography variant="h5" color="inherit" noWrap className={classes.appName}>
                        RightOnTime
                    </Typography>
                </div>
                <div className={classes.buttonsDiv}>
                    <React.Fragment key={'right'}>
                        <IconButton className={classes.infoButton} onClick={() => {toggleDrawer(true)}}>
                            <Info/>
                        </IconButton>
                        <Drawer anchor={'right'} open={navBarState.sidebarIsOpen} onClose={() => {toggleDrawer(false)}}>
                            {getInfoContent()}
                        </Drawer>
                    </React.Fragment>
                    <Link to={"/signIn"} onClick={handleLogOutOnClick} className={classes.logOutButton}>
                        Log out
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    )
}

