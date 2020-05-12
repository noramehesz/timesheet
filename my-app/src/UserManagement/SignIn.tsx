import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface SignInProps {
    user: any;
}

export default function SignIn(props: SignInProps) {
    const classes = useStyles();
    const [toLogin, setToLogin] = React.useState({password: "", username: ''});

    const handleSignInOnClick = async (event: any) => {
        await axios.post(`http://localhost:3001/user/login`, toLogin).then(loggedInUser => {
                if (loggedInUser.data == null) {
                    return;
                } else {
                    let user = loggedInUser.data;
                    props.user({
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        id: user.id,
                        name: user.name,
                        school: user.school,
                        students: user.students,
                        timeSheets: user.timesheets,
                        companies: user.companies,
                        employees: user.employees,
                    });
                }
            });
    }

    const handlePasswordOnChange = (event: any) => {
        let user = Object.assign({}, toLogin);
        user.password = event.target.value;
        setToLogin(user);
    }

    const handleUsernameOnChange = (event: any) => {
        let user = Object.assign({}, toLogin);
        user.username = event.target.value;
        setToLogin(user);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={handleUsernameOnChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handlePasswordOnChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSignInOnClick}
                    >
                        <Link to={"/studentPage"} style={{color: "white"}}>
                        Sign In
                        </Link>
                    </Button>
                    <Grid container>
                        <Link to={"/signUp"}>
                            <Grid item>
                                {"Don't have an account? Sign Up"}
                            </Grid>
                        </Link>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}