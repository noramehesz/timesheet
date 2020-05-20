import * as React from 'react';
import CalendarDayView from "./CalendarDayView";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles ({
    parentDiv: {
        display: 'flex',
        justifyContent: 'center',
        width: '650'
    },
    children: {
        width: '900px',
        paddingTop: '20px'
    }
});


const getCurrentWeek = () => {
    const currentDay = new Date();
    const first: number = currentDay.getDate() - currentDay.getDay() + 1;
    const last = first + 6;

    const monday = new Date(currentDay.setDate(first));
    let week = [];
    for (let i: number = 0; i < 7; i++) {
        const actual = new Date(currentDay.setDate(+first + i));
        week.push(actual);
    }
    return week;
}

export default function CalendarView() {
    const classes = useStyles();
    const currWeek = getCurrentWeek();

    return(
      <div className={classes.parentDiv}>
          <div className={classes.children}>
              <CalendarDayView/>
          </div>
      </div>
    );
}