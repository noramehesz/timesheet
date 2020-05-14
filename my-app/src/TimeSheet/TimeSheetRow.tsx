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

interface RowProps {
    editing: boolean,
    day: any;
    editFunction: () => void;
    saveFunction: () => void;
    deleteFunction: () => void;
}

export default function TimeSheetRow(props: RowProps) {

    const handleDateChange = () => {

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
                            value={"2020"}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    : "2020-05-12"}
            </TableCell>
            <TableCell >
                {props.editing ?
                    <TextField
                        id="time"
                        type="time"
                        label={" "}
                        defaultValue="08:00"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 3000,
                        }}
                    /> : props.day.arrive
                }
            </TableCell>
            <TableCell >
                {
                    props.editing ?
                        <TextField
                            id="time"
                            type="time"
                            label={" "}
                            defaultValue="16:00"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 3000,
                            }}
                        /> : props.day.leave
                }
            </TableCell>
            <TableCell>
                {props.editing ? <TextField
                    type="number"
                    label=' '
                    style={{width: '75px'}}
                >
                </TextField> : props.day.workingHours
                }
            </TableCell>
            <TableCell align={props.editing ? "center" : "right"}>{
                props.editing ?
                    <IconButton
                        onClick={props.saveFunction}
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