import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DateFnsUtils from '@date-io/date-fns';
import Done from "@material-ui/icons/Done";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {TextField, IconButton} from "@material-ui/core";
import {Day} from "../App";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";

interface RowProps {
    editing: boolean,
    day: Day;
    editFunction: () => void;
    saveFunction: (editing?: number) => void;
    deleteFunction: () => void;
}

export default function TimeSheetRow(props: RowProps) {
    const [modifiedState, setModifiedState] = React.useState({day: {dateOfDay: "", arrive: "08:00", leave: "17:00", workingHours: '8'}});

    const handleDateChange = (date: MaterialUiPickersDate | null) => {
        let dateOfDay = `${date?.getFullYear()}-${date?.getMonth() as number + 1}-${date?.getDate()}`;
        props.day.dateOfDay = dateOfDay;
        props.saveFunction();
    }

    const handleArriveOnChange = (event: any) => {
        props.day.arrive = event.target.value;
        props.saveFunction();
    }

    const handleLeaveOnChange = (event: any) => {
        props.day.leave = event.target.value;
        props.saveFunction();
    }

    const handleHoursOnChange = (event: any) => {
        props.day.workingHours = event.target.value;
        props.saveFunction();
    }

    return (
        <TableRow key={1}>
            <TableCell component="th" scope="row">
                {props.editing ?
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker"
                            value={props.day.dateOfDay}
                            onChange={(date: MaterialUiPickersDate) => {handleDateChange(date)}}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    : props.day.dateOfDay}
            </TableCell>
            <TableCell >
                {props.editing ?
                    <TextField
                        id="arrive"
                        type="time"
                        label={" "}
                        defaultValue={props.day.arrive}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 3000,
                        }}
                        onChange={handleArriveOnChange}
                    /> : props.day.arrive
                }
            </TableCell>
            <TableCell >
                {
                    props.editing ?
                        <TextField
                            id="leave"
                            type="time"
                            label={" "}
                            defaultValue={props.day.leave}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 3000,
                            }}
                            onChange={handleLeaveOnChange}
                        /> : props.day.leave
                }
            </TableCell>
            <TableCell>
                {props.editing ? <TextField
                    type="number"
                    label=' '
                    style={{width: '75px'}}
                    value={props.day.workingHours}
                    onChange={handleHoursOnChange}
                >
                </TextField> : props.day.workingHours
                }
            </TableCell>
            <TableCell align={props.editing ? "center" : "right"}>{
                props.editing ?
                    <IconButton
                        onClick={() => {props.saveFunction(-1)}}
                    >
                        <Done/>
                    </IconButton> :
                    <div>
                    <IconButton
                        onClick={props.editFunction}
                    >
                        <Edit/>
                    </IconButton>
                    <IconButton>
                        <Delete/>
                    </IconButton>
                    </div>
            }</TableCell>
        </TableRow>
    )
}