import React from 'react';
import NavBar from "../NavBar";
import Typography from '@material-ui/core/Typography';
import TimeSheet from '../TimeSheet/TimeSheetComponent';

interface MainPageForStudentProps {
    user: any;
    setUserState: any;
}

export default function MainPageForStudent(props: MainPageForStudentProps) {
    return(
        <div>
            <NavBar setUserState={props.setUserState}/>
            <Typography style={{marginLeft: '60px', marginTop: '20px'}} variant='h6'>May</Typography>
            <TimeSheet></TimeSheet>
        </div>
    )
}