import React from 'react';

interface MainPageForStudentProps {
    user: any;
}

export default function MainPageForStudent(props: MainPageForStudentProps) {
    return(
        <div>
            <p>{props.user.email}</p>
        </div>
    )
}