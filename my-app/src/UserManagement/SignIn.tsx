import React, {useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import {ApproveStatus, UserType} from "../App";

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
    setUser: any;
}

interface SignInState {
    password: string;
    username: string;
    isWrong: boolean;
    userRole: UserType | null;
}

export default function SignIn(props: SignInProps) {
    const classes = useStyles();
    const history = useHistory();
    const [toLogin, setToLogin] = React.useState({password: "", username: ''});
    const [isWrongData, setIsWrongData] = React.useState({isWrong: false});
    const [userFromServer, setUserFromServer] = React.useState<SignInState>({userRole: null, isWrong: false, password: "", username: ''});

    useEffect(() => {
        setUserFromServer({
            ...userFromServer,
            userRole: null,
        })
    }, []);

    const handleSignInOnClick = async (event: any) => {
        event.preventDefault();
        let user: any;
        await axios.post(`http://localhost:3001/user/login`, toLogin).then(res => {
                user = res.data;
                console.warn(user);
                let userRole = res.data.role === "student" ? UserType.student : UserType.company;
                props.setUser({
                    user: {
                        username: user.username,
                        email: user.email,
                        role: userRole,
                        id: user._id,
                        name: user.name,
                        school: user.school,
                        students: user.students,
                        timesheets: user.timesheets?.length < 1 ? [{timeSheetDate: "2020-05-01", days: [], approveStatus: ApproveStatus.none}] : user.timesheets,
                        companies: user.companies,
                        employees: user.employees,
                    }
                });
                setUserFromServer({
                    ...userFromServer,
                    userRole: userRole,
                });
                document.cookie = `userId=${user._id}`;
                const navigateTo = userRole === UserType.student ? "/studentPage" : "companyPage";
                history.push(navigateTo);
            }).catch(error => {
                setIsWrongData({isWrong: true});
                console.error(error);
        });
    }

    const handlePasswordOnChange = (event: any) => {
        setIsWrongData({isWrong: false});
        let user = Object.assign({}, toLogin);
        user.password = event.target.value;
        setToLogin(user);
    }

    const handleUsernameOnChange = (event: any) => {
        setIsWrongData({isWrong: false});
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
                    {isWrongData.isWrong && <Typography component="h1" variant="h6" align={"center"}>
                        Can't log in
                    </Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        <Link to={userFromServer.userRole === UserType.student ? "/studentPage" : "/companyPage"} style={{color: "white", textDecoration: 'none'}} onClick={handleSignInOnClick}>
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
            </div>
        </Container>
    );
}