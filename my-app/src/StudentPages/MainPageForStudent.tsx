import React from 'react';
import NavBar from "../NavBar";

interface MainPageForStudentProps {
    user: any;
    setUserState: any;
}

export default function MainPageForStudent(props: MainPageForStudentProps) {
    return(
        <div>
            <NavBar setUserState={props.setUserState}/>
            <p>{props.user.email}</p>
        </div>
    )
}