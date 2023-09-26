import React, { useState } from 'react';
import { TextField, Grid, Box, Typography, Button, Accordion, 
  AccordionSummary, AccordionDetails} from '@mui/material';
import { Menu as MenuIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import "./App.css";


const enteredOtp = ""; 
const endpointUrl = "";
const setOtpModalOpen = (status) => {};

const unitDetail = { key: 'unitName', unitLabel: 'Unit Detail', nameLabel: 'Unit Name', idLabel: 'Unit ID' };
const electionDetail = {key: 'electionName', electionLabel: 'Election', nameLabel: 'Election Name', idLabel: 'Election ID'}
const staffDetail = { key: 'staffName', staffName: '', staffID: '', electionDate:'', staffLabel: 'Presiding Officer' }

const ballotDetail = [
  { key: 'registeredVoters', description: 'Registered Voters', wordLabel: 'Total Registered Voters in Words', figureLabel: 'Registered Voters (Fig)' },
  { key: 'accreditedVoters', description: 'Accredited Voters', wordLabel: 'Total Accredited Voters in Words', figureLabel: 'Accredited Voters (Fig)' },
  { key: 'issuedBallots', description: 'Issued Ballot Papers', wordLabel: 'Total Issued Ballot Papers in Words', figureLabel: 'Total Issued Ballots (Fig)' },
  { key: 'usedBallots', description: 'Used Ballot Papers', wordLabel: 'Total Used Ballot Papers in Words', figureLabel: ' Total Used Ballots (Fig)' },
  { key: 'unusedBallots', description: 'Unused Ballot Papers', wordLabel: 'Total Unused Ballot Papers in Words', figureLabel: 'Total Unused Ballots (Fig)' },
  { key: 'spoiltBallots', description: 'Spoilt Ballot Papers', wordLabel: 'Total Spoilt Ballot Papers in Words', figureLabel: 'Total Spoilt Ballots (Fig)' },
  { key: 'ballotRangeStart', description: 'Ballot Number (Start)', wordLabel: 'Ballot Serial Number Start in Words', figureLabel: 'Ballot S/N Start (Fig)' },
  { key: 'ballotRangeEnd', description: 'Ballot Number (End)', wordLabel: 'Ballot Serial Number End in Words', figureLabel: 'Ballot S/N End (Fig)' },
  { key: 'rejectedVotes', description: 'Rejected Votes', wordLabel: 'Total Rejected Votes in Words', figureLabel: 'Total Rejected Votes (Fig)' },
  { key: 'validVotes', description: 'Valid Votes', wordLabel: 'Total Valid Votes in Words', figureLabel: 'Total Valid Votes (Fig)' },
];
  
const voteDetail = [
  { key: 'PA1', partyName: 'Alliance Party' },
  { key: 'PC1', partyName: 'Congress Party' },
  { key: 'PD1', partyName: 'Democratic Party' }
];

function ResultForm(props) {
  
  const [isPreview, setIsPreview] = useState(false);
  
  const handlePreviewClick = () => {
    setIsPreview(true);
  }

  const handleBackClick = () => {
    setIsPreview(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  }

  const [unitData, setUnitData] = useState({
    unitName: '',
    unitID: ''
  });

  const [electionData, setElectionData] = useState({
    electionName: '',
    electionID: ''
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
  
  const [voteData, setVoteData] = useState([
    { key: 'PA1', votesFig: '', votesWords: '' },
    { key: 'PC1', votesFig: '', votesWords: '' },
    { key: 'PD1', votesFig: '', votesWords: '' }
  ]);

  const [staffData, setStaffData] = useState({
    staffName: '',
    staffID: '',
    electionDate: '',
  });

  const [partyName, setPartyName] = useState('');
  const [numberOfVotes, setNumberOfVotes] = useState('');
  const [pollingLocation, setPollingLocation] = useState('');
  const [officialID, setOfficialID] = useState('');
  const [electionID, setElectionID] = useState('');
  const [electionDate, setElectionDate] = useState('');


  function UnitComponent({ unitLabel, nameLabel, idLabel, nameData, idData }) {
    return (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" className='component-typography'>{unitLabel}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <TextField fullWidth variant="outlined" label={nameLabel} value={nameData} sx={{ marginBottom: 2 }} />
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
              <TextField fullWidth variant="outlined" label={idLabel} value={idData} sx={{marginBottom: 2 }} />
          </Grid>
        </Grid>
    );
  }

  function ElectionComponent({ electionLabel, nameLabel, idLabel, nameData, idData }) {
    return (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" className='component-typography'>{electionLabel}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <TextField fullWidth variant="outlined" label={nameLabel} value={nameData} sx={{ marginBottom: 2 }} />
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <TextField fullWidth variant="outlined" label={idLabel} value={idData} sx={{ marginBottom: 2 }} />
          </Grid>
        </Grid>
    );
  }


  function BallotComponent({ description, wordLabel, figureLabel, wordData, figureData}) {
    return (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" className='component-typography'>{description}</Typography> 
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <TextField
              fullWidth
              variant="outlined"
              label={wordLabel}
              value={wordData}
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <TextField
              fullWidth
              variant="outlined"
              label={figureLabel}
              value={figureData}
              sx={{ marginBottom: 2 }}
            />
          </Grid>
        </Grid>
    );
  }

  function VoteComponent({ partyName, partyID, votesFig, votesWords }) {
    return (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" className='component-typography'>{partyName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={1}>
            <Typography variant="h6" style={voteField}>{partyID}</Typography>         
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField fullWidth variant="outlined" label="Votes in Fig" value={votesFig} />
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <TextField fullWidth variant="outlined" label="Votes in Words" value={votesWords}  />
          </Grid>
        </Grid>
    );
  }

  function StaffComponent({ staffLabel, nameLabel, idLabel, dateLabel, nameData, idData, dateData }) {
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <input name="partyName" type="text" placeholder="partyName" value={partyName} onChange={e => setPartyName(e.target.value)}/>
          {/* <TextField fullWidth variant="outlined" label="Party Name" value={partyName} onChange={(e) => setPartyName(e.target.value )} sx={{ marginBottom: 2 }} /> */}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField fullWidth variant="outlined" label="Number of Votes" onChange={(e) => setNumberOfVotes(prev => ({ ...prev, staffID: e.target.value }))} sx={{ marginBottom: 2 }} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField fullWidth variant="outlined" label="Polliing Location" onChange={(e) => setPollingLocation(prev => ({ ...prev, staffID: e.target.value }))} sx={{ marginBottom: 2 }} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField fullWidth variant="outlined" label="Official ID" onChange={(e) => setOfficialID(prev => ({ ...prev, staffID: e.target.value }))} sx={{ marginBottom: 2 }} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField fullWidth variant="outlined" label="Election ID" onChange={(e) => setElectionID(prev => ({ ...prev, staffID: e.target.value }))} sx={{ marginBottom: 2 }} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography>Election Date</Typography>
          <TextField fullWidth variant="outlined" type="datetime-local" value={dateData} onChange={(e) => setElectionDate(prev => ({ ...prev, electionDate: e.target.value }))} sx={{ marginBottom: 2 }} />
        </Grid>
      </Grid>
    );
  }
  
  
  if (isPreview) {
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
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" className='component-typography'>{unitDetail.nameLabel}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
           {unitData.unitName}
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
           {unitData.unitID}
          </Grid>
        </Grid>
      </Box>

      <Box className='box'>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" className='component-typography'>{electionDetail.nameLabel}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
           {electionData.electionName}
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
          {electionData.electionID}
          </Grid>
        </Grid>
      </Box>

      <Box className='box'>
        <Grid container spacing={1}>
          {ballotDetail.map((detail) => (
            <React.Fragment key={detail.key}>
              <Grid item xs={12} sm={4} md={3}>
                <Typography variant="h6" className='component-typography'>{detail.description}</Typography> 
              </Grid>
              <Grid item xs={12} sm={6} md={7}>
                {ballotData[detail.key].word}
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                {ballotData[detail.key].figure}
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>

      <Box className='box'>
        <Grid container spacing={1}>
          {voteDetail.map((detail, index) => (
            <React.Fragment key={detail.key}>
              <Grid item xs={12} sm={6} md={2}>
                <Typography variant="h6" className='component-typography'>{detail.partyName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={1}>
                <Typography variant="h6" className='component-typography'>{detail.key}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                {voteData[index].votesWords}
              </Grid>
              <Grid item xs={12} sm={6} md={7}>
                {voteData[index].votesFig}
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>

      <Box className='box'>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" className='component-typography'>{staffDetail.staffLabel}</Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
          {staffData.staffName}
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
          {staffData.staffID}
          </Grid>
          <Grid item xs={12} sm={2} md={3}>
          {staffData.electionDate}
          </Grid>
        </Grid>
      </Box>
  
      <Grid>
        <Button variant="contained" style={previewButton} onClick={handleBackClick}>
          Back
        </Button>

        <Button variant="contained" style={previewButton} onClick={handleSubmit}>
        Submit
        </Button>
      </Grid>
    </Box>
  </>
    );
  } else {

  return (
    <>
    <Box className="box">
      <Box className='resultform-header'>
        <Typography variant="h4" gutterBottom className='result-header-typo'>
          Unit Result Submission Form
        </Typography>
      </Box>

      {/* <UnitComponent
        unitLabel={unitDetail.unitLabel} 
        nameLabel={unitDetail.nameLabel}
        idLabel={unitDetail.idLabel}
        nameData={unitData.unitName}
        idData={unitData.unitID}
      /> */}


      {/* <Box className='component-margin'>
        <ElectionComponent
          electionLabel={electionDetail.electionLabel} 
          nameLabel={electionDetail.nameLabel}
          idLabel={electionDetail.idLabel}
          nameData={electionData.electionName}
          idData={electionData.electionID}
        />
      </Box> */}

      {/* <Accordion className='accordion-margin'>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" className='result-header-typo'>Ballot Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {ballotDetail.map(detail => (
          <BallotComponent
            key={detail.key}
            description={detail.description}
            wordLabel={detail.wordLabel}
            figureLabel={detail.figureLabel}
            wordData={ballotData[detail.key].word}
            figureData={ballotData[detail.key].figure}
          />
        ))}
        </AccordionDetails>
      </Accordion> */}

      {/* <Accordion className='accordion-margin'>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" className='result-header-typo'>Votes Summary</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {voteDetail.map((detail, index) => (
          <VoteComponent 
            key={detail.key} 
            partyName={detail.partyName}
            partyID={detail.key}
            votesFig={voteData[index].votesFig}
            votesWords={voteData[index].votesWords}
          />
        ))}
        </AccordionDetails>
      </Accordion> */}

      <Box className='box'>
        <StaffComponent
          staffLabel={staffDetail.staffLabel} 
          nameLabel={staffDetail.staffName}
          idLabel={staffDetail.staffID}
          dateLabel={staffDetail.electionDate}
          nameData={staffData.staffDate}
          idData={staffData.staffID}
          dateData={staffData.electionDate}
        />
      </Box>
      
      <Button style={previewButton} onClick={handlePreviewClick}>
        Preview
      </Button>
    </Box>
  </>
  );
}}


export default ResultForm;

const voteField =  {
  marginBottom: "2.0em",
}

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
  
 