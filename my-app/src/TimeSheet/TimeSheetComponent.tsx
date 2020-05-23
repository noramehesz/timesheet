import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TimeSheetRow from "./TimeSheetRow";
import {ApproveStatus, Day, TimeSheet} from '../App';
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import {Add, Done} from "@material-ui/icons";
import axios from "axios";
import Button from '@material-ui/core/Button';
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles({
    timetable: {
        alignContent: 'center',
        display: 'inline-block',
        marginTop: '20px',
    },
    table: {
        minWidth: 650,
        margin: 'auto',
        alignItems: 'center'
    },
    tableContainer: {
        margin: '10px',
        width: 900,
        align: 'center'
    },
    requestButton: {
        marginLeft: '724px'
    },
    cancelButton: {
        marginLeft: '730px'
    },
    approvedButton: {
        backgroundColor: '#88D8404A',
        textDecorationColor: 'white',
        marginLeft: '764px'
    }
});

interface TimeSheetComponentState {
    rows: any;
    editing: number;
    approveStatus: ApproveStatus;
}

interface TimeSheetProps {
    user: any;
    setUser: any;
}

export default function TimeSheetComponent(props: TimeSheetProps) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    const testData: TimeSheet = {
        timeSheetDate: new Date("2020-05-01"),
        days: [
            {dateOfDay: "2020-05-18", arrive: "10:00", leave: "19:00", workingHours: '8'},
            {dateOfDay: "2020-05-19", arrive: "08:00", leave: "17:00", workingHours: '7'},
            {dateOfDay: "2020-05-20", arrive: "09:00", leave: "14:00", workingHours: '5'},
            {dateOfDay: "2020-05-21", arrive: "08:00", leave: "20:00", workingHours: '6'},
        ]
    };
    const [state, setState] = React.useState<TimeSheetComponentState>({rows: [], editing: -1, approveStatus: props.user.timesheets[0].approveStatus ?? ApproveStatus.none});
    const classes = useStyles();

    const handleEditOnCLick = (idx: number) => {
        if (state.editing !== -1) {
            return;
        } else {
            let changeState = Object.assign({}, state);
            changeState.editing = idx;
            setState(changeState);
        }
    }

    const handleDeleteOnCLick = (idx: number) => {
        const removedDays = props.user.timesheets[0].days.filter((dayy: any, idxOfDay: number) => idxOfDay !== idx );
        console.log(removedDays);
        const newSheet = props.user.timesheets;
        newSheet[0].days = removedDays;
        props.setUser({
            user: {
                ...props.user,
                timesheets: newSheet,
            }
        });
    }

    const handleSaveOnCLick = (editing?: number) => {
        if (editing != null) {
            setState({
                ...state,
                editing: editing
            });
            const sortedSheets = props.user.timesheets;
            sortedSheets.forEach((sheet: TimeSheet) => {
                sheet.days.sort((a: any, b: any) => {
                    const aDate: any = new Date(a.dateOfDay);
                    const bDate: any = new Date(b.dateOfDay);
                    return aDate - bDate;
                });
                sheet.approveStatus = sheet.approveStatus == null ? ApproveStatus.none : sheet.approveStatus;
                const putSheet = {
                    ...sheet,
                    owner: props.user.id,
                }
                axios.put(`http://localhost:3001/timeSheet`, putSheet);
            });
            props.setUser({
                user: {
                    ...props.user,
                    timesheets: sortedSheets,
                }
            });
            axios.put(`http://localhost:3001/user`, props.user).then(res => {
                console.log(res);
            });
            console.log(sortedSheets);
        } else {
            setState({
                ...state,
            });
        }
    }

    const addNewRowButtonOnClick = () => {
        const compState = Object.assign({}, state);
        const extendedData = props.user.timesheets;
        extendedData[0].days.push({dateOfDay: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`, arrive: "00:00", leave: "00:00", workingHours: "0"});
        compState.editing = extendedData[0].days.length - 1;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        extendedData[0].days.sort((a: any, b: any) => {
            const aDate: any = new Date(a.dateOfDay);
            const bDate: any = new Date(b.dateOfDay);
            return aDate - bDate;
        }),
        console.log(extendedData.editing);
        setState(compState);
        props.setUser({
            user: {
                ...props.user,
                timesheets: extendedData
            }
        });
    }

    const handleRequestButtonOnClick = () => {
        const changedTimeSheet = props.user.timesheets;
        changedTimeSheet[0].approveStatus = ApproveStatus.requested;
        setState({
            ...state,
            approveStatus: ApproveStatus.requested,
        });
        props.setUser({
            ...props.user,
            timesheets: changedTimeSheet,
        });
        axios.put(`http://localhost:3001/user`, props.user);
        console.log(props.user);
    }

    const handleCancelButtonOnClick = () => {
        setState({
            ...state,
            approveStatus: ApproveStatus.none,
        });
        const changedTimeSheet = props.user.timesheets;
        changedTimeSheet[0].approveStatus = ApproveStatus.none;
        props.setUser({
            ...props.user,
            timesheets: changedTimeSheet,
        });
        axios.put(`http://localhost:3001/user`, props.user);
        console.log(props.user);
    }

    return (
        <div className={classes.timetable}>
            <Typography variant="h5" color="inherit" noWrap className={classes.tableContainer}>
               {months[props.user.timesheets[0].timeSheetDate]}
            </Typography>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{width: "40%"}}>Date</TableCell>
                            <TableCell style={{width: "15%"}}>Arrive</TableCell>
                            <TableCell style={{width: "15%"}}>Leave</TableCell>
                            <TableCell style={{width: "15%"}}>Hours</TableCell>
                            <TableCell style={{width: "15%"}} align="center">
                                <IconButton onClick={addNewRowButtonOnClick}>
                                    <Add/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.user?.timesheets[0]?.days.map((day: Day, idx: number) =>
                                <TimeSheetRow editing={idx === state.editing ? true : false} day={day}
                                              editFunction={() => {
                                                  handleEditOnCLick(idx)
                                              }} deleteFunction={() => handleDeleteOnCLick(idx)} saveFunction={handleSaveOnCLick}/>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                {state.approveStatus === ApproveStatus.none &&
                (<Button color={"primary"}
                         variant="contained"
                         className={classes.requestButton}
                         onClick={handleRequestButtonOnClick}
                            >
                    Request approval
                </Button>)
                }
                {state.approveStatus === ApproveStatus.requested &&
                <div>
                    <Button color={"secondary"}
                            variant={"contained"}
                            className={classes.cancelButton}
                            onClick={handleCancelButtonOnClick}>
                        Cancel request
                    </Button>
                </div>
                }
                {state.approveStatus === ApproveStatus.approved &&
                <div>
                    <Fab variant="extended"
                         size="medium"
                         aria-label="Add"
                         className={classes.approvedButton}
                         disabled={true}>
                        <Done></Done>
                        Approved
                    </Fab>
                </div>
                }
            </div>
        </div>
    );
}