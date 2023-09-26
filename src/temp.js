import React, { useState } from 'react'; 
import {Grid, Button, Typography, TextField, Box}  from '@mui/material';
import './App.css';
import ResultTable from './table';

const saveResult = async (body = {}, admin) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const myRequest = new Request(`https://9656mgkl5a.execute-api.eu-west-2.amazonaws.com/dev/create/document/Results`, {
    body: JSON.stringify(body),
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  });
  return await fetch(myRequest);
} 

function ResultForm() {
  const [partyName, setPartyName] = useState('');
  const [voteCount, setVoteCount] = useState('');
  const [pollingCentre, setPollingCentre] = useState('');
  const [officerId, setOfficerID] = useState('');
  const [electionId, setElectionID] = useState('');
  const [electionDate, setElectionDate] = useState('');
  const [ward, setWard] = useState('');
  const [lga, setLGA] = useState('');
  const [state, setState] = useState('');
  const [federal, setFederal] = useState('');

  
  const [isPreview, setIsPreview] = useState(false);
  const [isTableView, setIsTableView] = useState(false);
  const [results, setResults] = useState({});
  
  const handlePreviewClick = () => {
    setIsPreview(true);
  }

  const handleBackClick = () => {
    setIsPreview(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!partyName) return;
    if (!voteCount) return;
    if (!pollingCentre) return;
    if (!officerId) return;
    if (!electionId) return;
    if (!electionDate) return;
    alert('You are about to submit these resuts');
    // const {partyName, numberOfVotes, pollingLocation, officialId}
    const body = {partyName, voteCount, pollingCentre, officerId, electionDate, electionId};
    saveResult(body, 'udeze.cc@gmail.com')
    .then(async res => {
      const response = await res.json();
      alert(`Form submition is successfully with the following response: ${JSON.stringify(response)}`);
      setResults(response);
      setIsTableView(true);
    })
    .catch(error => console.error(error));
  }

  if (isPreview && !isTableView) {
    return (
  <>
    <Box className="box">
      <Box className='resultform-header'>
        <Typography variant="h4" gutterBottom className='result-header-typo'>
          Unit Result Preview Form
        </Typography>
      </Box>

      <Box className='box'>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="result-input">Election ID</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
           {electionId}
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="result-input">Polling Centre</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
           {pollingCentre}
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="result-input">Party Name</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
           {partyName}
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="result-input">Vote Count</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
           {voteCount}
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="result-input">Officer ID</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
           {officerId}
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="result-input">Election Date</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
           {electionDate}
          </Grid>
        </Grid>

        <Grid>
          <Button className="view-result-button" variant="contained" style={previewButton} onClick={handleBackClick}>
            Back
          </Button>

          <Button className="view-result-button" variant="contained" style={previewButton} onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>

      </Box>

    </Box>
  </>
    );
  } else if (!isTableView) {
  return (
    <Box className='box'>
      <Box className='resultform-header'>
        <Typography variant="h4" gutterBottom className='result-header-typo'>
          Unit Result Submission Form
        </Typography>
      </Box>

        <Grid container spacing={2} >
            <Grid item xs={12} md={6}>
              <Typography variant="h5" className="result-input">Election ID :</Typography>
            </Grid>
            <Grid>
              <TextField id="ElectionID" fullWidth label="ElectionID" className="result-input" variant="outlined" value={electionId} onChange={e => setElectionID(e.target.value)} />
          </Grid>
        </Grid>

        <Grid container spacing={1} >
          <Grid item spacing={1} xs={12} md={6}>
            <Typography variant="h5" className="result-input"> Polling Centre :</Typography>
          </Grid>
          <Grid>
            <TextField TextField id="pollingCentre" fullWidth className="result-input" label="Polling Centre" variant="outlined" value={pollingCentre} onChange={e => setPollingCentre(e.target.value)} />
          </Grid>
        </Grid>

        <Grid container spacing={1} >
          <Grid item spacing={1} xs={12} md={6}>
            <Typography variant="h5" className="result-input">Party Name :</Typography>
          </Grid>
          <Grid>
            <TextField id="partyName" fullWidth className="result-input" label="Party Name" variant="outlined" value={partyName} onChange={e => setPartyName(e.target.value)}/>
          </Grid>
        </Grid>

        <Grid container spacing={1} >
          <Grid item spacing={1} xs={12} md={6}>
            <Typography variant="h5" className="result-input">Vote Count :</Typography>
          </Grid>
          <Grid>
            <TextField id="voteCount" fullWidth className="result-input" label="Vote Count" variant="outlined" value={voteCount} onChange={e => setVoteCount(e.target.value)}/>
          </Grid>
        </Grid>

        <Grid container spacing={1} >
          <Grid item spacing={1}xs={12} md={6}>
            <Typography variant="h5" className="result-input">OfficerID :</Typography>
          </Grid>
          <Grid>
            <TextField id="OfficerID" fullWidth className="result-input" label="OfficerID" variant="outlined" value={officerId} onChange={e => setOfficerID(e.target.value)}/>
          </Grid>
        </Grid>

        <Grid container spacing={1} >
          <Grid item spacing={2} xs={12} md={6}>
            <Typography variant="h5" className="result-input">Election Date :</Typography>
          </Grid>
          <Grid>
            <TextField id="ElectionDate" type="datetime-local" fullWidth className="result-input" variant="outlined" value={electionDate} onChange={e => setElectionDate(e.target.value)}/>
          </Grid>
        </Grid>

        <Button style={previewButton} onClick={handlePreviewClick}>
          Preview
        </Button>
    </Box>
  );
} else if (isTableView) {
  return (
    <ResultTable results = {results}/>
  )
}

}

export default ResultForm;

const previewButton = {
  backgroundColor: "transparent",
  color: "green",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid green",
  margin: "1.0em",
}