import Toolbar from "@material-ui/core/Toolbar";
import ListAlt from "@material-ui/icons/ListAlt";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import { Info, Accessibility, SupervisedUserCircle, TrendingDown, Autorenew } from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import {
    Drawer,
    Icon,
    List,
    ListItem,
    Divider,
    ListItemText,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@material-ui/core";
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
    Info: {
        width: 250,
    },
    aboutLabel: {
        margin: '10px'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
}));

interface NavBarProps {
    setUserState: any;
    isCompany?: boolean;
    handleDropdownOnChange?: any;
    dropdownOptions?: any;
    activeMonth?: string;
}

interface NavBarState {
    sidebarIsOpen: boolean;
    options?: Array<number>;
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
            ...navBarState,
            sidebarIsOpen: isOpen,
        })
    };

    const getInfoContent = () => {
        if (props.isCompany) {
            return (
                <div className={classes.Info}>
                    <div>
                        <Typography variant="h5" color="inherit" noWrap className={classes.aboutLabel}>
                            {props.isCompany ? "Company" : "Student"}
                        </Typography>
                        <List>
                            <ListItem button>
                                <Accessibility style={{marginRight: '10px'}}/> Roles
                            </ListItem>
                            <ListItem button>
                                <SupervisedUserCircle style={{marginRight: '10px'}}/> Students
                            </ListItem>
                            <ListItem button>
                                <TrendingDown style={{marginRight: '10px'}}/> Statistics
                            </ListItem>
                            <ListItem button>
                                <Autorenew style={{marginRight: '10px'}}/> Sync
                            </ListItem>
                        </List>
                    </div>
                    <Divider />
                </div>
            )
        }
        else if (!props.isCompany) {
            return (
                <div className={classes.Info}>
                    <Typography variant="h5" color="inherit" noWrap className={classes.aboutLabel}>
                        {"Student"}
                    </Typography>
                    <List>
                        <ListItem >
                            <div>
                                <div>
                                    <ListItemText primary={"Job"} secondary={'IT Company Kft.'}/>
                                </div>
                                <div>
                                    <ListItemText primary={'Pay'} secondary={'2100 Ft/h'}/>
                                </div>
                            </div>
                        </ListItem>
                    </List>
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
                {!props.isCompany &&
                    <div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="month">Month</InputLabel>
                            <Select
                                labelId="month"
                                id="select-month-id"
                                value={props.activeMonth as string}
                                defaultValue={props.activeMonth}
                                onChange={props.handleDropdownOnChange}
                                label="Month"
                                native={false}
                            >
                                {props.dropdownOptions.map((option: any) => {
                                    return (
                                        <MenuItem value={option}>
                                            {option}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </div>
                }
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

