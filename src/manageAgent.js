import React, { useState } from 'react';
import {
    Card, CardContent, Typography, TextField, Button, Grid, Dialog, DialogActions,
    DialogContent, DialogTitle, IconButton, Box, DialogContentText, Pagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ManageAgent() {
    // States for agents and the new agent form
    const [agents, setAgents] = useState([]);
    const [newAgent, setNewAgent] = useState({
        id: '',
        firstName: '',
        lastName: '',
        roleID: '',
        phoneNumber: '',
        email: '',
        password: ''
    });
    const [filterTerm, setFilterTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;  // Adjust as needed
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [agentToDelete, setAgentToDelete] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [agentToEdit, setAgentToEdit] = useState({});
    
    const addAgent = () => {
        setAgents(prev => [...prev, newAgent]);
        setNewAgent({
            id: '',
            firstName: '',
            lastName: '',
            roleID: '',
            phoneNumber: '',
            email: '',
            password: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAgent(prev => ({ ...prev, [name]: value }));
    };

    const promptDelete = (id) => {
        setAgentToDelete(id);
        setDeleteConfirmationOpen(true);
    };

    const deleteAgent = () => {
        setAgents(prev => prev.filter(agent => agent.id !== agentToDelete));
        setDeleteConfirmationOpen(false);
        setAgentToDelete(null);
    };

    const filteredAgents = agents.filter(agent => 
        agent.firstName.toLowerCase().includes(filterTerm.toLowerCase()) ||
        agent.lastName.toLowerCase().includes(filterTerm.toLowerCase())
    );

    const startEditing = (id) => {
        const agent = agents.find(a => a.id === id);
        setAgentToEdit(agent);
        setIsEditing(true);
    };
    
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setAgentToEdit(prev => ({ ...prev, [name]: value }));
    };
    
    const saveEdit = () => {
        setAgents(prev => prev.map(agent => agent.id === agentToEdit.id ? agentToEdit : agent));
        setIsEditing(false);
        setAgentToEdit({});
    };
    

    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography variant="h5">Manage Agents</Typography>

                    <TextField
                        label="Filter Agents"
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '1rem' }}
                        value={filterTerm}
                        onChange={e => setFilterTerm(e.target.value)}
                    />

                    {isEditing ? (
                        <EditAgentForm agent={agentToEdit} handleInputChange={handleEditInputChange} saveEdit={saveEdit} />
                    ) : (
                        <AddAgentForm {...{ newAgent, handleInputChange, addAgent }} />
                    )}

                    <AgentList agents={filteredAgents} promptDelete={promptDelete} startEditing={startEditing} currentPage={currentPage} itemsPerPage={itemsPerPage} />
                    
                    <Pagination
                        count={Math.ceil(filteredAgents.length / itemsPerPage)}
                        page={currentPage}
                        onChange={(_, page) => setCurrentPage(page)}
                        style={{ marginTop: '1rem' }}
                    />
                </CardContent>
            </Card>

            <DeleteConfirmationModal open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)} onDelete={deleteAgent} />
        </Box>
    );
}

function EditAgentForm({ agent, handleInputChange, saveEdit }) {
    return (
        <>
            {Object.entries(agent).map(([key, value]) => (
                <TextField
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    name={key}
                    type={key === "password" ? "password" : "text"}
                    fullWidth
                    variant="outlined"
                    value={value}
                    onChange={handleInputChange}
                    style={{ marginTop: '1rem' }}
                />
            ))}
            <Button variant="contained" color="primary" onClick={saveEdit} style={{ marginTop: '1rem' }}>
                Save Changes
            </Button>
        </>
    );
}


function AddAgentForm({ newAgent, handleInputChange, addAgent }) {
    return (
        <>
            {Object.entries(newAgent).map(([key, value]) => (
                <TextField
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    name={key}
                    type={key === "password" ? "password" : "text"}
                    fullWidth
                    variant="outlined"
                    value={value}
                    onChange={handleInputChange}
                    style={{ marginTop: '1rem' }}
                />
            ))}
            <Button variant="contained" color="primary" onClick={addAgent} style={{ marginTop: '1rem' }}>
                Add Agent
            </Button>
            <Button variant="contained" color="secondary"  style={{ marginTop: '1rem' }}>
                Update
            </Button>
        </>
    );
}

function AgentList({ agents, promptDelete, startEditing, currentPage, itemsPerPage }) {
    const paginatedAgents = agents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return (
        <Grid container spacing={3}>
            {paginatedAgents.map(agent => (
                <Grid item xs={12} sm={6} key={agent.id}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1">
                            {agent.firstName} {agent.lastName} ({agent.id}) - {agent.email}
                        </Typography>
                        <Box>
                            <IconButton onClick={() => startEditing(agent.id)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => promptDelete(agent.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}

function DeleteConfirmationModal({ open, onClose, onDelete }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this agent?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onDelete} color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ManageAgent;
