import Toolbar from "@material-ui/core/Toolbar";
import ListAlt from "@material-ui/icons/ListAlt";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";


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
    },
    logOutButton: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'right',
    },
}));

interface NavBarProps {
    setUserState: any;
}

export default function NavBar(props: NavBarProps) {
    const classes = useStyles();

    const handleLogOutOnClick = () => {
        props.setUserState(null);
    };

    return (
        <AppBar position="relative" style={{display: "flex"}}>
            <Toolbar className={classes.toolbar}>
                <div className={classes.usersData}>
                    <ListAlt className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        TimeSheet
                    </Typography>
                </div>
                <Link to={"/signIn"}  >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.logOutButton}
                        onClick={handleLogOutOnClick}
                    >
                        Log out
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

