import React, { useState } from 'react';
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import Rooms from './Room/RoomPage';
import Users from './User/UsersPage';
import Reservations from './Reservation/ReservationPage';

const DashboardPage = () => {
    const [selectedComponent, setSelectedComponent] = useState('Home');

    const renderComponent = () => {
        switch(selectedComponent) {
            case 'Users':
                return <Users />;
            case 'Rooms':
                return <Rooms  />;
            case 'Reservations':
                return <Reservations />;
            default:
                return (
                    <div>
                    <h1>Welcome to the Dashboard</h1>
                    <p>This is a simple and beautiful Dashboard page.</p>
                    {/* Add more presentation text here */}
                </div>
                );
        }
    };

    return (
        <div className="dashboard" style={{ display: 'flex' }}>
            <Card style={{ width: '250px', height: '100vh', overflowY: 'auto', marginRight: '1rem' }}>
                <CardBody>
                    <Typography color="gray" variant="h6">Hotel Configurations</Typography>
                    <div style={{ marginBottom: '1rem' }}>
                        <Button color="lightBlue" ripple="light" style={{ width: '100%', backgroundColor: 'grey' }} onClick={() => setSelectedComponent('Users')}>Users</Button>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <Button color="lightBlue" ripple="light" style={{ width: '100%', backgroundColor: 'grey' }} onClick={() => setSelectedComponent('Rooms')}>Rooms</Button>
                    </div>
                </CardBody>

                <CardBody>
                    <Typography color="gray" variant="h6">Navigation</Typography>
                    <div style={{ marginBottom: '1rem' }}>
                        <Button color="lightBlue" ripple="light" style={{ width: '100%', backgroundColor: 'grey' }} onClick={() => setSelectedComponent('Home')}>Home</Button>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <Button color="lightBlue" ripple="light" style={{ width: '100%', backgroundColor: 'grey' }} onClick={() => setSelectedComponent('Reservations')}>Reservations</Button>
                    </div>
                </CardBody>
            </Card>

            <div className="dashboard-content" style={{ width: 'calc(100% - 250px)', marginLeft: '1rem' }}>
                {renderComponent()}
            </div>
        </div>
    );
};

export default DashboardPage;