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
import { TimeSheet } from '../App';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        margin: 'auto',
    },
    tableContainer: {
        marginLeft: 50,
        width: 900
    }
});

interface TimeSheetComponentState {
    rows: any;
    editing: number;
}

export default function TimeSheetComponent() {
    const testData: TimeSheet = {
        timeSheetDate: new Date("2020-05-01"),
        days: [
            {dayOfMoth: 1, arrive: "8:00", leave: "17:00", workingHours: '8'},
            {dayOfMoth: 2, arrive: "8:00", leave: "17:00", workingHours: '8'},
            {dayOfMoth: 3, arrive: "8:00", leave: "17:00", workingHours: '8'},
            {dayOfMoth: 4, arrive: "8:00", leave: "17:00", workingHours: '8'},
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

    const handleSaveOnCLick = () => {
        setState({
            ...state,
            editing: -1,
        });
    }

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{width: "40%"}}>Date</TableCell>
                        <TableCell style={{width: "15%"}}>Arrive</TableCell>
                        <TableCell style={{width: "15%"}}>Leave</TableCell>
                        <TableCell style={{width: "15%"}}>Hours</TableCell>
                        <TableCell style={{width: "15%"}}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        state.rows.days.map((day: any, idx: number) =>
                        <TimeSheetRow editing={idx === state.editing ? true : false} day={day} editFunction={() => {handleEditOnCLick(idx)}} deleteFunction={handleDeleteOnCLick} saveFunction={handleSaveOnCLick}/>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}