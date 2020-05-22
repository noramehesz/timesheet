import React from 'react';
import NavBar from "../NavBar";

interface CompanyPageProps {
    user: any;
}

export default function CompanyPage(props: CompanyPageProps) {
    return (
        <div>
            <NavBar setUserState={props.user}/>
            Comany's page
        </div>
    )
}