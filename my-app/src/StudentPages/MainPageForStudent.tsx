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
    timeSheets: any;
    activeMonth: number;
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
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    const [state, setState] = React.useState<StudentPageState>({isTimeSheetView: true, timeSheets: props.user.timesheets, activeMonth: new Date().getMonth()});

    const handleTSViesOnClick = () => {
        setState({
            ...state,
            isTimeSheetView: true
        });
    }

    const handleCalendarViewOnClick = () => {
        setState({
            ...state,
            isTimeSheetView: false
        });
    }

    const handleTabOnChange = (event: any, newValue: number) => {
        setState({
            ...state,
            isTimeSheetView: newValue === 0 ? true : false,
        })
    }

    const selectActiveMonth = (event: any) => {
        setState({
            ...state,
            activeMonth: months.indexOf(event.target.value),
        });
    }

    return (
        <div>
            <NavBar
                setUserState={props.setUserState}
                isCompany={false}
                dropdownOptions={
                    state.timeSheets.map((sheet: any) => months[new Date(sheet.timeSheetDate).getMonth() - 1])
                }
                activeMonth={months[state.activeMonth]}
                handleDropdownOnChange={selectActiveMonth}
            />
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