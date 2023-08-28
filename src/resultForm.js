import React, { useEffect, useState } from 'react';
import { TextField, Grid, Box, AppBar, Toolbar, IconButton, Typography, Button, Accordion, 
  AccordionSummary, AccordionDetails, Checkbox } from '@mui/material';
import { Menu as MenuIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const unitDetails = [
  { key: 'state', title:'State', nameLabel: 'State Name', idLabel: 'State ID' },
  { key: 'lga', title:'Local Government Area', nameLabel: 'LGA Name', idLabel: 'LGA ID' },
  { key: 'ward', title:'Ward', nameLabel: 'Ward Name', idLabel: 'Ward ID' },
  { key: 'pollingUnit', title:'Polling Unit', nameLabel: 'Polling Unit Name', idLabel: 'Polling Unit ID' },
];

const ballotDetailsConfig = [
  { key: 'registeredVoters', title: 'Registered Voters', wordLabel: 'Total Registered Voters in Words', figureLabel: 'Registered Voters (Fig)' },
  { key: 'accreditedVoters', title: 'Accredited Voters', wordLabel: 'Total Accredited Voters in Words', figureLabel: 'Accredited Voters (Fig)' },
  { key: 'issuedBallots', title: 'Issued Ballot Papers', wordLabel: 'Total Issued Ballot Papers in Words', figureLabel: 'Total Issued Ballots (Fig)' },
  { key: 'usedBallots', title: 'Used Ballot Papers', wordLabel: 'Total Used Ballot Papers in Words', figureLabel: ' Total Used Ballots (Fig)' },
  { key: 'unusedBallots', title: 'Unused Ballot Papers', wordLabel: 'Total Unused Ballot Papers in Words', figureLabel: 'Total Unused Ballots (Fig)' },
  { key: 'spoiltBallots', title: 'Spoilt Ballot Papers', wordLabel: 'Total Spoilt Ballot Papers in Words', figureLabel: 'Total Spoilt Ballots (Fig)' },
  { key: 'ballotRangeStart', title: 'Ballot Number (Start)', wordLabel: 'Ballot Serial Number Start in Words', figureLabel: 'Ballot S/N Start (Fig)' },
  { key: 'ballotRangeEnd', title: 'Ballot Number (End)', wordLabel: 'Ballot Serial Number End in Words', figureLabel: 'Ballot S/N End (Fig)' },
  { key: 'rejectedVotes', title: 'Rejected Votes', wordLabel: 'Total Rejected Votes in Words', figureLabel: 'Total Rejected Votes (Fig)' },
  { key: 'validVotes', title: 'Valid Votes', wordLabel: 'Total Valid Votes in Words', figureLabel: 'Total Valid Votes (Fig)' },
];

async function fetchStaffID() {
  const staffResponse = await fetch(`/api/staff/`);
  const staffData = await staffResponse.json();
  return staffData.staffID;  // assuming the API returns an object with staffID as a key
}

async function fetchStaffPollingUnit(staffID) {
  // Fetch the polling unit ID for the given staff ID from the 'posting' endpoint
  const postingResponse = await fetch(`/api/posting/${staffID}`);
  const postingData = await postingResponse.json();

  // If there's no polling unit ID, return null or handle the error appropriately
  if (!postingData.pollingUnitID) {
      return null;
  }

  // Fetch the details of the polling unit from the 'unit' endpoint using the obtained polling unit ID
  const unitResponse = await fetch(`/api/unit/${postingData.pollingUnitID}`);
  const unitData = await unitResponse.json();

  return unitData; // This should have all the details like state, lga, ward, and polling unit
}

function ResultForm() {
  const [unitData, setUnitData] = useState({
    state: { id: '', name: '' },
    lga: { id: '', name: '' },
    ward: { id: '', name: '' },
    pollingUnit: { id: '', name: '' }
  });

  const [ballotData, setBallotData] = useState({
    registeredVoters: { word: '', figure: '' },
    accreditedVoters: { word: '', figure: '' },
    issuedBallots: { word: '', figure: '' },
    usedBallots: { word: '', figure: '' },
    unusedBallots: { word: '', figure: '' },
    spoiltBallots: { word: '', figure: '' },
    ballotRangeStart: { word: '', figure: '' },
    ballotRangeEnd: { word: '', figure: '' },
    rejectedVotes: { word: '', figure: '' },
    validVotes: { word: '', figure: '' },
  });

  const [votesData, setVotesData] = useState([
    { partyName: 'Alliance Party', partyID: 'PB1', votesFig: '', votesWords: '', agentName: '', agentID: '', agentVerified: false },
    { partyName: 'Congress Party', partyID: 'PC1', votesFig: '', votesWords: '', agentName: '', agentID: '', agentVerified: false },
    { partyName: 'Democratic Party', partyID: 'PA1', votesFig: '', votesWords: '', agentName: '', agentID: '', agentVerified: false },
  ]);


  const updateBallotData = (key, field, value) => {
    setBallotData(prevState => ({
      ...prevState,
      [key]: { ...prevState[key], [field]: value }
    }));
  };

  const updateVotesData = (index, field, value) => {
    setVotesData(prevVotesData => {
        const updatedVotesData = [...prevVotesData];
        updatedVotesData[index][field] = value;
        return updatedVotesData;
    });
  };

  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false);

  useEffect(() => {
    fetchStaffID().then(staffID => {
      if (staffID) {
        fetchStaffPollingUnit(staffID).then(data => {
          if (data) {
              setUnitData({
                  state: { id: data.stateID, name: data.stateName },
                  lga: { id: data.lgaID, name: data.lgaName },
                  ward: { id: data.wardID, name: data.wardName },
                  pollingUnit: { id: data.pollingUnitID, name: data.pollingUnitName }
              });
              setIsFieldsDisabled(true);
          }
        });
      }
    });
  }, []);

  function verifyOTP(otp) {
    const VALID_OTP = "123456";  // This is a placeholder, replace with your actual OTP logic.
    return otp === VALID_OTP;
  }

  function handleCheckboxClick(index, event) {
    // Prevent the checkbox from being checked immediately
    event.preventDefault();

    // Prompt the user for the OTP
    const enteredOTP = prompt("Enter the OTP sent to your email");

    if (verifyOTP(enteredOTP)) {
        setVotesData(prevVotesData => {
            const updatedVotesData = [...prevVotesData];
            updatedVotesData[index].agentVerified = true;
            return updatedVotesData;
        });
    } else {
        alert("Invalid OTP. Please try again.");
    }
  }

  function UnitComponent({ entryKey, label, nameLabel, idLabel }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'row' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={3} md={3}>
            <Typography variant="h6" sx={{ margin: 2, fontWeight: 'bold' }}>{label}</Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={6}>
            <TextField 
              fullWidth
              variant="outlined"
              label={nameLabel}
              sx={{ marginBottom: 2 }}
              value={unitData[entryKey].name}
              disabled={isFieldsDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <TextField 
              fullWidth
              variant="outlined"
              label={idLabel}
              sx={{ marginBottom: 2 }}
              value={unitData[entryKey].id}
              disabled={isFieldsDisabled}
              />
          </Grid>
        </Grid>
      </Box>
    );
  }

  function BallotDetailComponent({ detailKey, title, wordLabel, figureLabel }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'row' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ marginRight: 2, marginTop: 2, fontWeight: 'bold' }}>{title}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <TextField
              fullWidth
              variant="outlined"
              label={wordLabel}
              sx={{ marginBottom: 2 }}
              value={ballotData[detailKey].word}
              onChange={(e) => updateBallotData(detailKey, 'word', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              variant="outlined"
              label={figureLabel}
              sx={{ marginBottom: 2 }}
              value={ballotData[detailKey].figure}
              onChange={(e) => updateBallotData(detailKey, 'figure', e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }

  function VotesDetailComponent({ detailKey, title, data, index, updateVotesData }) {
    const { partyID, agentVerified } = data;
    return (
      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'row', marginBottom: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>{title}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={1}>
            <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>{partyID}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField 
              fullWidth
              variant="outlined"
              label="Votes in Fig"
              value={data.votesFig}
              onChange={e => updateVotesData(index, 'votesFig', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3.5}>
            <TextField 
              fullWidth
              variant="outlined"
              label="Votes in Words"
              value={data.votesWords}
              onChange={e => updateVotesData(index, 'votesWords', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField 
              fullWidth
              variant="outlined"
              label="Agent Name"
              value={data.agentName}
              onChange={e => updateVotesData(index, 'agentName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={1}>
            <TextField 
              fullWidth
              variant="outlined"
              label="Agent ID"
              value={data.agentID}
              onChange={e => updateVotesData(index, 'agentID', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={0.5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Checkbox 
              checked={agentVerified}
              onChange={(e) => handleCheckboxClick(index, e)} 
              sx={{ '& svg': { fontSize: '2.5rem' } }}  // adjust '2rem' to desired size
            />
        </Grid>
      </Grid>
    </Box>
  );
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'green' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              E-lections
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ m: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Unit Result Submission Form
        </Typography>
      </Box>

      <Box sx={{ m: 2 }}>
        {unitDetails.map((detail) => (
          <UnitComponent
            key={detail.key}
            entryKey={detail.key}
            label={detail.title}
            nameLabel={detail.nameLabel}
            idLabel={detail.idLabel}
          />
        ))}

        <Accordion sx={{ marginBottom: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Expand Ballot Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {ballotDetailsConfig.map((detail, index) => (
              <BallotDetailComponent 
                key={detail.key}
                detailKey={detail.key}
                title={`${index + 1}. ${detail.title}`}
                wordLabel={detail.wordLabel}
                figureLabel={detail.figureLabel}
              />
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ marginBottom: 2 }}> 
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Votes Summary</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {votesData.map((partyData, index) => (
              <VotesDetailComponent 
              key={partyData.partyID} 
              detailKey={`party${index}`}
              title={partyData.partyName}
              data={partyData}
              index={index}
              updateVotesData={updateVotesData}  
            />
            ))}
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" mt={3} m={2}>
    <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={1}>
            <Box>I</Box>
        </Grid>
        <Grid item xs={12} sm={3}>
            <Box mx={1}>
                <TextField 
                    variant="outlined"
                    name="staffName" 
                    id="staffName" 
                    label="Polling Officer's Name" 
                    required 
                />
            </Box>
        </Grid>
        <Grid item xs={12} sm={1}>
            <Box>with staff ID</Box>
        </Grid>
        <Grid item xs={12} sm={3}>
            <Box mx={1}>
                <TextField 
                    variant="outlined"
                    name="staffID" 
                    id="staffID" 
                    label="Staff ID" 
                    required 
                />
            </Box>
        </Grid>
        <Grid item xs={12} sm={1}>
            <Box>today,</Box>
        </Grid>
        <Grid item xs={12} sm={3}>
            <Box mx={1}>
                <TextField 
                    variant="outlined"
                    type="datetime-local" 
                    name="electionDate" 
                    id="electionDate" 
                    label="Election Date" 
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required 
                />
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Box>hereby certifies that the information contained in this form is a true and accurate account of votes cast in this polling unit. The election was CONTESTED/NOT CONTESTED.</Box>
        </Grid>
    </Grid>

    <Box mt={2} marginBottom={3}>
        <Button variant="contained" color="primary" onClick={handleCheckboxClick}>
            Certify
        </Button>
    </Box>
</Box>
    </>
  );
}

export default ResultForm;