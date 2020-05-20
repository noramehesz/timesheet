import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { AppointmentModel, ViewState, SchedulerDateTime } from '@devexpress/dx-react-scheduler';
import {
    Scheduler, DayView, Appointments, Resources,
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
    const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>('2018-10-31');
    const testData: TimeSheet = {
        timeSheetDate: new Date("2020-05-01"),
        days: [
            {dateOfDay: "2020-5-1", arrive: "08:00", leave: "17:00", workingHours: '8'},
            {dateOfDay: "2020-5-2", arrive: "08:00", leave: "17:00", workingHours: '8'},
            {dateOfDay: "2020-5-3", arrive: "08:00", leave: "17:00", workingHours: '8'},
            {dateOfDay: "2020-5-4", arrive: "08:00", leave: "17:00", workingHours: '8'},
        ]
    };

    return (
        <Paper>
            <Scheduler
                data={appointments}
            >
                <ViewState
                    currentDate={currentDate}
                    onCurrentDateChange={setCurrentDate}
                />
                <DayView
                    startDayHour={7}
                    endDayHour={12}
                />

                <Appointments />
                <Resources
                    data={resources}
                />
            </Scheduler>
        </Paper>
    );
};
