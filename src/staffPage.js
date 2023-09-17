// src/App.js

import React from 'react';
import './App.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const userData = [
  { id: 1010, firstName: 'Uche', lastName: 'Okonkwo' },
  { id: 1011, firstName: 'Tolu', lastName: 'Ajayi' },
  { id: 1012, firstName: 'Zainab', lastName: 'Yakubu' },
  { id: 1013, firstName: 'Tolu', lastName: 'Oyebanjo' },
  { id: 1014, firstName: 'Amara', lastName: 'Ifeanyi' },
  { id: 1015, firstName: 'Emeka', lastName: 'Obi' },
];


function StaffPage() {
  const handleUpdateRole = (userId) => {
    console.log("Update Role for user with ID:", userId);
    // Add logic to update the role
  };

  const handleAssignUnit = (userId) => {
    console.log("Assign Unit to user with ID:", userId);
    // Add logic to assign unit
  };

  return (
    <div style={{ padding: '40px' }}>
        <Typography variant="h4" gutterBottom>
            Admin Page
        </Typography>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userData.map((user) => (
                        <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>
                            <Button
                                size="small"
                                variant="contained"
                                style={{ backgroundColor: "#008080", color: "white" }}  // Teal color
                                startIcon={<EditIcon />}
                                onClick={() => handleUpdateRole(user.id)}
                            >
                                Update Role
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
    </div>
  );
}

export default StaffPage;
