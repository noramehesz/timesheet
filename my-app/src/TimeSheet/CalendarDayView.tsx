import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    AppointmentModel,
    ViewState,
    SchedulerDateTime,
    BaseView,
    VerticalView,

} from '@devexpress/dx-react-scheduler';
import {
    Scheduler, DayView, Appointments, Resources,  WeekView, DateNavigator, Toolbar
} from '@devexpress/dx-react-scheduler-material-ui';
import {TimeSheet} from "../App";

const appointments: Array<AppointmentModel> = [{
    startDate: '2018-10-31T10:00',
    endDate: '2018-10-31T11:15',
    title: 'Meeting',
    type: 'private',
}, {
    startDate: '2018-10-31T07:30',
    endDate: '2018-10-31T09:00',
    title: 'Go to a gym',
    type: 'work',
}];
const resources = [{
    fieldName: 'type',
    title: 'Type',
    instances: [
        { id: 'private', text: 'Private', color: '#EC407A' },
        { id: 'work', text: 'Work', color: '#7E57C2' },
    ],
}];

export default function CalendarDayView() {
    const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
    const testData: TimeSheet = {
        timeSheetDate: new Date("2020-05-01"),
        days: [
            {dateOfDay: "2020-05-18", arrive: "10:00", leave: "19:00", workingHours: '8'},
            {dateOfDay: "2020-05-19", arrive: "08:00", leave: "17:00", workingHours: '8'},
            {dateOfDay: "2020-05-20", arrive: "09:00", leave: "14:00", workingHours: '8'},
            {dateOfDay: "2020-05-21", arrive: "08:00", leave: "20:00", workingHours: '8'},
        ]
    };

    const testAppointments: Array<AppointmentModel> = [];
    testData.days.forEach(day => {
        const data = {
            startDate: `${day.dateOfDay}T${day.arrive}`,
            endDate: `${day.dateOfDay}T${day.leave}`,
            title: 'Work',
            type: 'private',
        }
        testAppointments.push(data);
    })


    return (
        <Paper>
            <Scheduler
                data={testAppointments}

            >
                <ViewState
                    currentDate={currentDate}
                    onCurrentDateChange={setCurrentDate}
                />
                <WeekView
                    startDayHour={7}
                    endDayHour={21}
                    cellDuration={60}
                />
                <Toolbar/>
                <DateNavigator/>
                <Appointments />
                <Resources
                    data={resources}
                />
            </Scheduler>
        </Paper>
    );
};
