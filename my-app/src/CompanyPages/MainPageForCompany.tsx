import React, {useEffect} from 'react';
import NavBar from "../NavBar";
import axios from "axios";
import {ApproveStatus, TimeSheet, UserType} from "../App";
import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import {Button, Grid, List, ListItem, ListItemText, Toolbar} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';


const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        requests: {
            margin: '40px',
            marginLeft: '40px',
            marginRight: '40px',
            height: '700px'
        },
        approvals: {
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1px'
        },
        students: {
            width: '30%',
            height: '100%',
            marginRight: '1px'
        },
        pendingrequests: {
            width: '70%',
            height: '100%',
        },
        paper: {
            height: '100%'
        },
        studentRequestsDiv: {
            padding: '10px',
        },
        requestListItem: {
            display: 'flex'
        },
        approveButton: {
            marginRight: '10px'
        },
        descriptionName: {
            width: '40%',
        }
    })
);

interface CompanyPageProps {
    user: any;
    setUserState: any;
}

interface CompanyState {
    students: Array<any> | null;
    activeStudent: string | null;
}

export default function CompanyPage(props: CompanyPageProps) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const classes = useStyle();
    const [companyState, setCompanyState] = React.useState<CompanyState>({students: null, activeStudent: null});

    useEffect(() => {
            props.user.students?.forEach((student: any) => {
                axios.get(`http://localhost:3001/user/${student}`).then(res => {
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
                        timesheets: user.timesheets?.length < 1 ? [{
                            timeSheetDate: new Date(2020, 5, 1),
                            days: [],
                            approveStatus: ApproveStatus.none,
                        }] : user.timesheets,
                        companies: user.companies,
                        employees: user.employees,
                    }
                    let data = companyState.students ?? [];
                    data.push(student);
                    setCompanyState({
                        ...companyState,
                        students: data,
                    });
                })
            })
        }, []
    );

    const handleStudentsListOnCLick = (id: string) => {
        setCompanyState({
            ...companyState,
            activeStudent: id,
        });
    }

    const approveOrReject = (id: string, timesheetIdx: number, isApprove: boolean) => {
        let changedIdx: number = -1;
        const student = companyState.students?.filter((stud, idx) => {changedIdx = idx; return stud.id === id;})[0] ?? {};
        if (student.timesheets !== null && changedIdx > -1) {
            console.log(student);
            student.timesheets[timesheetIdx].approveStatus = isApprove ? ApproveStatus.approved : ApproveStatus.none;
            axios.put(`http://localhost:3001/user`, student);
            let studentsInState = companyState.students ?? [];
            studentsInState[changedIdx] = student;
            setCompanyState({
                ...companyState,
                students: studentsInState,
            });
        }
    }

    const handleApproveTimeSheetOnCLick = (id: string, timesheetIdx: number) => {
        approveOrReject(id, timesheetIdx, true);
    }

    const handleRejectTimeSheetOnCLick = (id: string, timesheetIdx: number) => {
        approveOrReject(id, timesheetIdx, false);
    }

    const getStudentsRequests = (id: string | null) => {
        if (id != null) {
            const student = companyState.students?.filter((student: any) => student.id === id) ?? [];
            let sheets = [];
            if (student.length > 0) {
                sheets = student[0].timesheets;
                console.log(sheets);
            }

            const timeSheetWithRequests = sheets.filter((sheet: TimeSheet) => {
                if (sheet.approveStatus === ApproveStatus.requested) {
                    return true;
                } else {
                    return false;
                }
            });

            const getWorkingHours = (days: any)  => {
                let hours: number = 0;
                for (let i = 0; i < days.length ; i++) {
                    hours += parseInt(days[i].workingHours);
                }
                return hours;
            }

            const showRequests = (requests: any[]) => {
                return (
                    <div>
                        <List>
                            {requests.map((sheet: any, idx ) => {
                                return (
                                <div>
                                    <ListItem className={classes.requestListItem}>
                                        <div className={classes.descriptionName}>
                                            <ListItemText primary={`Time Sheet ${months[new Date(sheet.timeSheetDate).getMonth() - 1]}`}/>
                                                <p>{`Working days: ${sheet.days.length}`}</p>
                                                <p>{`working hours: ${getWorkingHours(sheet.days)}`}</p>
                                        </div>
                                        <Grid container direction={'row'} justify={'flex-end'} alignItems={'center'}>
                                            <Button variant={"contained"}
                                                    color={"primary"}
                                                    size={'small'}
                                                    className={classes.approveButton}
                                                    onClick={() => {handleApproveTimeSheetOnCLick(id, idx)}}>
                                                Approve
                                            </Button>
                                            <Button variant={"contained"}
                                                    color={"secondary"}
                                                    size={'small'}
                                                    onClick={() => {handleRejectTimeSheetOnCLick(id, idx)}}>
                                                Reject
                                            </Button>
                                        </Grid>
                                    </ListItem>
                                    <Divider/>
                                </div>
                                )
                            })}
                        </List>
                    </div>
                )
            }

            const haveRequest = timeSheetWithRequests.length > 0;
            return (
                <div className={classes.studentRequestsDiv}>
                    {!haveRequest &&
                    <Typography>
                        Nothing to show!
                    </Typography>}
                    {haveRequest && showRequests(timeSheetWithRequests)
                    }
                </div>
            );
        }
    }

    return (
        <div>
            <NavBar setUserState={props.setUserState} isCompany={true}/>
            <div className={classes.requests}>
                <div>
                    <Paper>
                        <Toolbar>
                            <Typography variant="h6" noWrap>
                                Approval requests
                            </Typography>
                        </Toolbar>
                    </Paper>
                </div>
                <div className={classes.approvals}>
                    <div className={classes.students}>
                        <Paper className={classes.paper}>
                            <List>
                                {companyState.students?.map((s: any) => {
                                      return (
                                          <div>
                                          <ListItem button onClick={() => {
                                            handleStudentsListOnCLick(s.id)
                                        }}>
                                            <ListItemText primary={s.username}/>
                                        </ListItem>
                                              <Divider />
                                          </div>
                                      );
                                    }
                                )}
                            </List>
                        </Paper>
                    </div>
                    <div className={classes.pendingrequests}>
                        <Paper className={classes.paper}>
                            {getStudentsRequests(companyState.activeStudent)}
                        </Paper>
                    </div>
                </div>
            </div>
        </div>
    )
}