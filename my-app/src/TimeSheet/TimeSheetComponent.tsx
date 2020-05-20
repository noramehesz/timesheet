import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TimeSheetRow from "./TimeSheetRow";
import { TimeSheet, Day } from '../App';
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import {Add} from "@material-ui/icons";

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
    }
});

interface TimeSheetComponentState {
    rows: any;
    editing: number;
}

export default function TimeSheetComponent() {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    const testData: TimeSheet = {
        timeSheetDate: new Date("2020-05-01"),
        days: [
            {dateOfDay: "2020-5-1", arrive: "08:00", leave: "17:00", workingHours: '8'},
            {dateOfDay: "2020-5-2", arrive: "08:00", leave: "17:00", workingHours: '8'},
            {dateOfDay: "2020-5-3", arrive: "08:00", leave: "17:00", workingHours: '8'},
            {dateOfDay: "2020-5-4", arrive: "08:00", leave: "17:00", workingHours: '8'},
        ]
    };
    const [state, setState] = React.useState<TimeSheetComponentState>({rows: testData, editing: -1,});
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

    const handleDeleteOnCLick = () => {

    }

    const handleSaveOnCLick = (editing?: number) => {
        if (editing != null) {
            setState({
                ...state,
                editing: editing
            })
        } else {
            setState({
                ...state,
            });
        }
    }

    const addNewRowButtonOnClick = () => {
        const extendedData = Object.assign({}, state);
        extendedData.rows.days.push({dateOfDay: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`, arrive: "00:00", leave: "00:00", workingHours: "0"});
        extendedData.editing = extendedData.rows.days.length - 1;
        console.log(extendedData.editing);
        setState(extendedData);
    }

    return (
        <div className={classes.timetable}>
            <Typography variant="h5" color="inherit" noWrap className={classes.tableContainer}>
               {months[testData.timeSheetDate.getMonth()]}
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
                            state.rows.days.map((day: Day, idx: number) =>
                                <TimeSheetRow editing={idx === state.editing ? true : false} day={day}
                                              editFunction={() => {
                                                  handleEditOnCLick(idx)
                                              }} deleteFunction={handleDeleteOnCLick} saveFunction={handleSaveOnCLick}/>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}