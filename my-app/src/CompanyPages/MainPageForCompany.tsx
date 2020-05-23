import React, {useEffect} from 'react';
import NavBar from "../NavBar";
import axios from "axios";
import Button from '@material-ui/core/Button';
import {UserType} from "../App";
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles({
    requests: {
        margin: '40px',
    },
    requestLabel: {
        margin: '15px',
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    menuBar:{

    },
    approveTab: {

    }
})

interface CompanyPageProps {
    user: any;
    setUserState: any;
}

interface CompanyState {
    students: Array<any> | null;
}

export default function CompanyPage(props: CompanyPageProps) {
    const classes = useStyle();
    const [companyState, setCompanyState] = React.useState<CompanyState>({students: null});

    useEffect(() => {
            props.user.students?.forEach((student: any) => {
                    axios.get(`http://localhost:3001/user/${props.user.students[0]}`).then(res => {
                    let user = res.data;
                    let userRole = res.data.role === "student" ? UserType.student : UserType.company;
                    let student = {
                        username: user.username,
                        email: user.email,
                        role: userRole,
                        id: user._id,
                        name: user.name,
                        school: user.school,
                        students: user.students,
                        timesheets: user.timesheets?.length < 1 ? [{timeSheetDate: new Date(2020, 5, 1), days: []}] : user.timesheets,
                        companies: user.companies,
                        employees: user.employees,
                    }
                    let data = companyState.students ?? [];
                    data.push(student);
                    setCompanyState({
                        students: data,
                    });
                })
            })
        }
    )

    const getStudent = async () => {
        await axios.get(`http://localhost:3001/user/${props.user.students[0]}`).then(res => {
            let user = res.data;
            let userRole = res.data.role === "student" ? UserType.student : UserType.company;
            let student = {
                username: user.username,
                email: user.email,
                role: userRole,
                id: user._id,
                name: user.name,
                school: user.school,
                students: user.students,
                timesheets: user.timesheets?.length < 1 ? [{timeSheetDate: new Date(2020, 5, 1), days: []}] : user.timesheets,
                companies: user.companies,
                employees: user.employees,
            }
            let data = [];
            data.push(student);
            setCompanyState({
                students: data,
            });
        })
    }

    return (
        <div>
            <NavBar setUserState={props.setUserState}/>
            <div>

            </div>
            <div >
                <Paper className={classes.requests}>
                    <Typography className={classes.requestLabel}>
                        Approval requests
                    </Typography>
                    <div>

                    </div>
                </Paper>
            </div>
        </div>
    )
}