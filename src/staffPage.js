// src/App.js

import React, { useState } from 'react';
import './App.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const apiKey = '6YJ1IDez4I3hpEsdqCAWI8fzF6CbtCINx3fRTxEf';
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("x-api-key", apiKey);

const getUsers = async () => {
  const myHeaders = new Headers();
  const myRequest = new Request(`https://9656mgkl5a.execute-api.eu-west-2.amazonaws.com/dev/accounts`, {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  });
  const response = await fetch(myRequest);
  return response.json();
} 

function DataTable(props) {
    const [access, setAccess] = useState(false)
    const handleUpdateRole = (userId) => {
        console.log("Update Role for user with ID:", userId);
        // Add logic to update the role
    }
    
    const handleAssignUnit = (userId) => {
        console.log("Assign Unit to user with ID:", userId);
        // Add logic to assign unit
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Registered</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.users.map((user) => (
                        <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.created_at}</TableCell>
                        <TableCell>
                            <Button
                                size="small"
                                variant="contained"
                                style={{ backgroundColor: "#008080", color: "white" }}  // Teal color
                                startIcon={<EditIcon />}
                                onClick={() => handleUpdateRole(user.id)}
                            >
                                {access ? 'Revoke Access' : 'Grant Access' }
                            </Button>
                            &nbsp;&nbsp;
                            <Button
                                size="small"
                                variant="contained"
                                style={{ backgroundColor: "#00857A", color: "white" }}  // Variation of teal for differentiation
                                startIcon={<GroupAddIcon />}
                                onClick={() => handleAssignUnit(user.id)}
                            >
                                Assign Unit
                            </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


function StaffPage() {
    const [users, setUsers] = useState([]);
    if (users.length < 1) {
        getUsers().then(res => setUsers(res));
    }
  return (
    <div style={{ padding: '40px' }}>
        <Typography variant="h4" gutterBottom>
            Admin Page
        </Typography>
        <DataTable users={users}/>
    </div>
  );
}

export default StaffPage;
