import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
import Checkbox from '@material-ui/core/Checkbox';
import {FormGroup} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {User, UserType} from '../App';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface SignUpProps {
    setUser: any;
}

export default function SignUp(props: SignUpProps) {
    const classes = useStyles();
    const [newUser, setNewUser] = React.useState({username: '', email: '', password: '', role: UserType.student});
    let role = Object.assign({}, newUser).role;

    const handleUserNameOnChange = (event: any) => {
        let user = Object.assign({}, newUser);
        user.username = event.target.value;
        setNewUser(user);
    }

    const handleEmailOnChange = (event: any) => {
        let user = Object.assign({}, newUser);
        user.email = event.target.value;
        setNewUser(user);
    }

    const handlePwOnChange = (event: any) => {
        let user = Object.assign({}, newUser);
        user.password = event.target.value;
        setNewUser(user);
    }

    const handleSingUpOnClick = async (event: any) => {
        await axios.post(`http://localhost:3001/user`, newUser).then(res => {
                console.log(res);
                let user = res.data.createdUser;
                props.setUser({
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
        );
    }

    const handleSelectRoleOnChange = (event: any) => {
        let user = Object.assign({}, newUser);
        user.role = event.target.value === "student" ? UserType.student : UserType.company;
        setNewUser(user);
        role = user.role;
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <div>
                    <FormGroup row>
                        <FormControlLabel
                            control={<Checkbox onChange={handleSelectRoleOnChange} name={"Student"} checked={role === UserType.student ? true : false} value={"student"}/>}
                            label={"Student"}
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={handleSelectRoleOnChange} name={"Company"} checked={role === UserType.company ? true : false} value={"company"}/>}
                            label={"Company"}
                        />
                    </FormGroup>
                </div>
                <div className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                onChange={handleUserNameOnChange}
                                autoComplete="username"
                                name="userName"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleEmailOnChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handlePwOnChange}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={handleSingUpOnClick}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        <Link to={"/mainPage"} style={{color: "white"}}>
                            Sign Up
                        </Link>
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to={"/signIn"}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Container>
    );
}