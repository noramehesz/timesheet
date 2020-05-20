import React from 'react';
import NavBar from "../NavBar";
import TimeSheet from '../TimeSheet/TimeSheetComponent';
import CalendarView from "../TimeSheet/CalendarView";
import {makeStyles} from "@material-ui/core/styles";

interface MainPageForStudentProps {
    user: any;
    setUserState: any;
}

interface StudentPageState {
    isTimeSheetView: boolean,
}

const useStyle = makeStyles({
    options: {
        width: '50%',
        textAlign: 'center',
        margin: '8px',
        background: 'linear-gradient(180deg, #FFFFFF 3%, #B4B4B43A 95%)',
        height:'25px',
        paddingTop: '5px',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    activeOptions: {
        width: '50%',
        textAlign: 'center',
        margin: '8px',
        height: '25px',
        paddingTop: '5px',
        cursor: 'pointer'
    },
    parentDiv: {
        display: 'flex',
    }
})



export default function MainPageForStudent(props: MainPageForStudentProps) {
    const classes = useStyle();
    const [state, setState] = React.useState<StudentPageState>({isTimeSheetView: true});

    const handleTSViesOnClick = () => {
        setState({
            isTimeSheetView: true
        });
    }

    const handleCalendarViewOnClick = () => {
        setState({
            isTimeSheetView: false
        });
    }

    return (
        <div>
            <NavBar setUserState={props.setUserState}/>
            <div className={classes.parentDiv}>
                <div className={state.isTimeSheetView === true ? classes.activeOptions : classes.options} onClick={handleTSViesOnClick}>
                    Time Sheet view
                </div>
                <div className={state.isTimeSheetView === false ? classes.activeOptions : classes.options} onClick={handleCalendarViewOnClick}>
                    Calendar view
                </div>
            </div>
            <div style={{textAlign: "center"}}>
                {state.isTimeSheetView && <TimeSheet></TimeSheet> }
                {!state.isTimeSheetView && <CalendarView/> }
            </div>
        </div>
    )
}