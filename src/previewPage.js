import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function PreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { unitData, ballotData, voteData, staffData } = location.state;
  
  const handleEditClick = () => {
    // Navigate back to the form page for editing
    navigate('/form-page-route');  

  const handleSubmit = async () => {
    // Retrieve the actual form data accordingly
    const formData = {
        unitData,
        ballotData,
        voteData,
        staffData
    };

    const endpointUrl = "https://your-api-endpoint.com/submit"; 

    try {
        const response = await fetch(endpointUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Any other headers like authentication headers
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log('Data stored successfully:', responseData);
        // Handle successful submission: maybe navigate to a success page or show a success message

    } catch (error) {
        console.error('Error submitting data:', error);
        // Handle the error: maybe show an error message to the user
    };
  };

  return (
      <Box m={5}>
        <Typography variant="h4" gutterBottom>
          Preview Page
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Unit Details
        </Typography>
        <Box>Unit Name: {unitData.unitName}</Box>
        <Box>Unit ID: {unitData.unitID}</Box>

        <Typography variant="h6" gutterBottom>
          Ballot Details
        </Typography>
        {Object.keys(ballotData).map(key => (
          <div key={key}>
            {key}: Word - {ballotData[key].word}, Figure - {ballotData[key].figure}
          </div>
        ))}

        <Typography variant="h6" gutterBottom>
          Vote Details
        </Typography>
        {voteData.map(vote => (
          <div key={vote.key}>
            {vote.key}: Votes (Fig) - {vote.votesFig}, Votes (Words) - {vote.votesWords}
          </div>
        ))}

        <Typography variant="h6" gutterBottom>
          Staff Details
        </Typography>
          <Box>Staff Name: {staffData.staffName}</Box>
          <Box>Staff ID: {staffData.staffID}</Box>
          <Box>Role: {staffData.role}</Box>
        <Box mt={2} marginBottom={3}>
            <Button variant="contained" color="secondary" onClick={handleEditClick}>
                Edit
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginLeft: '10px' }}>
                Submit
            </Button>
        </Box>
      </Box>
    );
  }
}

export default PreviewPage;
