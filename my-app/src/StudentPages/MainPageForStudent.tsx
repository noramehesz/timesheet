import React from 'react';
import NavBar from "../NavBar";
import TimeSheet from '../TimeSheet/TimeSheetComponent';
import CalendarView from "../TimeSheet/CalendarView";
import {makeStyles} from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';

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
    },
    tabRoot: {
        flexGrow: 1,
        marginLeft: '40px',
        marginRight: '40px'
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

    const handleTabOnChange = (event: any, newValue: number) => {
        setState({
            isTimeSheetView: newValue === 0 ? true : false,
        })
    }

    return (
        <div>
            <NavBar setUserState={props.setUserState}/>
            <div>
                <Paper className={classes.tabRoot}>
                    <Tabs
                        value={state.isTimeSheetView === true ? 0 : 1}
                        onChange={handleTabOnChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        variant={'fullWidth'}
                    >
                        <Tab label={"Time Sheet view"}/>
                        <Tab label={"Calendar view"}/>
                    </Tabs>
                </Paper>
            </div>
            <div style={{textAlign: "center"}}>
                {state.isTimeSheetView && (
                    <TimeSheet user={props.user} setUser={props.setUserState}></TimeSheet>
                )}
                {!state.isTimeSheetView && <CalendarView timesheet={props.user.timesheets[0]}/> }
            </div>
        </div>
    )
}