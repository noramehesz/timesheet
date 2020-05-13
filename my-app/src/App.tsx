import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './UserManagement/SignIn';
import MainPageForStudent from  './StudentPages/MainPageForStudent';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SignUp from './UserManagement/SignUp';
import axios from "axios";

export enum UserType {
    student = 'student',
    studentClub = 'studentClub',
    company = 'company',
}

export type TimeSheet = {
    owner: {type: User, required: true},
    job: String,
    timeSheetDate: {day: Day, time: Time},
    days: [],
};

type Time = {
    hour: number,
    minute: number,
}

type Day =  {
    dayOfMoth: number,
    arrive: Time,
    leave: Time,
    workingHours: number,
}

export type User = {
    id: string,
    email: string;
    name: string;
    username: string;
    school: string;
    timeSheets: TimeSheet[];
    students: User[];
    companies: string[];
    employees: User[];
    role: UserType;
}

function App() {
    const [user, setUser] = React.useState(null);

    return (
        <div>
            <Router>
                <Switch>
                    <Route path={"/signIn"}>
                        <SignIn setUser={setUser}/>
                    </Route>
                    <Route path={"/signUp"}>
                        <SignUp setUser={setUser}/>
                    </Route>
                    { user != null &&
                        <Route path={"/studentPage"}>
                            <MainPageForStudent user={user} setUserState={setUser}/>
                        </Route>
                    }
                    <Route path={"/"}>
                        <SignIn setUser={setUser}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
