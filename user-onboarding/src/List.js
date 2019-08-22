import React from 'react';
import './App.css';
import { Card } from 'semantic-ui-react';

export default function ListMod({ users }) {
    return (
        users.map(element => { return (
            <Card
                className="card"
                header={element.name}
                meta={`${element.email}\n${element.password}`}
                description={`Terms of service: ${element.terms}`}

            />
        )})
    )
}