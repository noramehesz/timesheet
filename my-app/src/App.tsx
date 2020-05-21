import React, {useEffect} from 'react';
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
    owner?: {type: User},
    job?: String,
    timeSheetDate: Date,
    days: Day[],
};

type Time = {
    hour: number,
    minute: number,
}

export type Day =  {
    dateOfDay: string,
    arrive: string,
    leave: string,
    workingHours: string,
}

export type User = {
    id: string,
    email?: string;
    name?: string;
    username?: string;
    school?: string;
    timesheets?: TimeSheet[];
    students?: User[];
    companies?: string[];
    employees?: User[];
    role?: UserType;
}

interface AppState {
    user: User | null;
}

function App() {
    const [state, setState] = React.useState<AppState>({user: null});

    useEffect(() => {
        const userId = getCookie('userId');
        if (userId != null) {
            console.log(userId);
            axios.get(`http://localhost:3001/user/${userId}`).then((res) => {
                let user = res.data;
                setState({
                  user: {
                      username: user.username,
                      email: user.email,
                      role: user.role,
                      id: user._id,
                      name: user.name,
                      school: user.school,
                      students: user.students,
                      timesheets: user.timesheets.length < 1 ? [{timeSheetDate: new Date(2020, 5, 1), days: []}] : user.timesheets,
                      companies: user.companies,
                      employees: user.employees,
                  }
                });
            })
        }
    }, []);

    function getCookie(name: string) {
        function escape(s: string) { return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1'); };
        let match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
        console.log(match);
        return match ? match[1] : null;
    }

    return (
        <div style={{backgroundColor: 'E5E5E5'}}>
            <Router>
                <Switch>
                    <Route path={"/signIn"}>
                        <SignIn setUser={setState}/>
                    </Route>
                    <Route path={"/signUp"}>
                        <SignUp setUser={setState}/>
                    </Route>
                    {state.user != null &&
                        <Route path={"/studentPage"}>
                            <MainPageForStudent user={state.user} setUserState={setState}/>
                        </Route>
                    }
                    <Route path={"/"}>
                        <SignIn setUser={setState}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
