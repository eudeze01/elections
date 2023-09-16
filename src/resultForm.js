import React, { useState } from 'react';
import { TextField, Grid, Box, Typography, Button, Accordion, 
  AccordionSummary, AccordionDetails} from '@mui/material';
import { Menu as MenuIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';


const enteredOtp = ""; 
const endpointUrl = "";
const setOtpModalOpen = (status) => {};

const unitDetail = { key: 'unitName', unitLabel: 'Unit Detail', nameLabel: 'Unit Name', idLabel: 'Unit ID' };

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
    // Go back to the form
    setIsPreview(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

   
  }

  // const handleOtpSubmit = async () => {

  //       if (isValid) {
  //           setOtpModalOpen(false);

  //           const formData = {
  //               unitData,
  //               ballotData,
  //               voteData,
  //               staffData
  //               // ... any other form fields ...
  //           };
            
  //           const response = await fetch(endpointUrl, {
  //               method: "POST",
  //               headers: {
  //                   "Content-Type": "application/json",
  //               },
  //               body: JSON.stringify(formData),
  //           });
  
  //           if (!response.ok) {
  //               throw new Error('Network response was not ok');
  //           }
  
  //           const responseData = await response.json();
  //           console.log('Data stored successfully:', responseData);
  //           // Reset data after successful submission
  //           setUnitData(unitData);
  //           setBallotData(ballotData);
  //           setVoteData(voteData);
  //           setStaffData(staffData);
  //       } else {
  //           alert("Invalid OTP. Please try again.");
  //       }
  //   } catch (error) {
  //     console.error("Error verifying OTP", error);
  //   }
  // }


  const [unitData, setUnitData] = useState({
    unitName: '',
    unitID: ''
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
    electionDate: null
  });

  const handleStaffInputChange = (field, value) => {
    setStaffData(prevData => ({ ...prevData, [field]: value }));
  };

  function handleInputChange(dataType, key, subKey, value) {
    if (dataType === "unitData") {
      setUnitData(prevState => ({
        ...prevState,
        [key]: value
      }));
    } else if (dataType === "ballotData") {
      setBallotData(prev => ({
        ...prev,
        [key]: { ...prev[key], [subKey]: value }
      }));
    } else if (dataType === "voteData") {
      setVoteData(prev => {
        const newData = [...prev];
        const itemIndex = newData.findIndex(item => item.key === key);
        if (itemIndex !== -1) {
          newData[itemIndex][subKey] = value;
        }
        return newData;
      });
    }
  }
  
  function UnitComponent({ unitLabel, nameLabel, idLabel, nameData, idData, onChangeName, onChangeId }) {
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4} md={3}>
          <Typography variant="h6" sx={{ margin: 2, fontWeight: 'bold' }}>{unitLabel}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
          <TextField fullWidth variant="outlined" label={nameLabel} value={nameData} onChange={e => onChangeName(e.target.value)} sx={{ marginBottom: 2 }} />
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
            <TextField fullWidth variant="outlined" label={idLabel} value={idData} onChange={e => onChangeId(e.target.value)} sx={{ marginBottom: 2 }} />
        </Grid>
      </Grid>
    );
}

  function BallotComponent({ description, wordLabel, figureLabel, wordData, figureData, onWordChange, onFigureChange }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'row' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>{description}</Typography> 
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <TextField
              fullWidth
              variant="outlined"
              label={wordLabel}
              value={wordData}
              onChange={e => onWordChange(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <TextField
              fullWidth
              variant="outlined"
              label={figureLabel}
              value={figureData}
              onChange={e => onFigureChange(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          </Grid>
      </Box>
    );
  }

  function VoteComponent({ partyName, partyID, votesFig, votesWords, onInputChange }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'row', marginBottom: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>{partyName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={1}>
            <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>{partyID}</Typography>         
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField fullWidth variant="outlined" label="Votes in Fig" value={votesFig} onChange={e => onInputChange('votesFig', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <TextField fullWidth variant="outlined" label="Votes in Words" value={votesWords} onChange={e => onInputChange('votesWords', e.target.value)} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (isPreview) {
    return (
      <>
        {/* Display your data, implement this based on your needs */}
        <Box>{JSON.stringify(unitData)}</Box>
        <Box>{JSON.stringify(ballotData)}</Box>
        <Box>{JSON.stringify(voteData)}</Box>
        <Box>{JSON.stringify(staffData)}</Box>

        <Button variant="contained" color="secondary" onClick={handleBackClick}>
          Back
        </Button>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </>
    );
  } else {

  return (
    <>
      <Box sx={{ m: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Unit Result Submission Form
        </Typography>
      </Box>

      <Box sx={{ m: 2 }}>
        <UnitComponent
          unitLabel={unitDetail.unitLabel} 
          nameLabel={unitDetail.nameLabel}
          idLabel={unitDetail.idLabel}
          nameData={unitData.unitName}
          idData={unitData.unitID}
          onChangeName={value => handleInputChange("unitData", "unitName", null, value)}
          onChangeId={value => handleInputChange("unitData", "unitID", null, value)}
        />
      </Box>



        <Accordion sx={{ marginBottom: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Expand Ballot Details</Typography>
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
              onWordChange={(value) => handleInputChange("ballotData", detail.key, "word", value)}
              onFigureChange={(value) => handleInputChange("ballotData", detail.key, "figure", value)}
            />
          ))}
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ marginBottom: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Votes Summary</Typography>
          </AccordionSummary>
          <AccordionDetails>
          {voteDetail.map((detail, index) => (
            <VoteComponent 
              key={detail.key} 
              partyName={detail.partyName}
              partyID={detail.key}
              votesFig={voteData[index].votesFig}
              votesWords={voteData[index].votesWords}
              onInputChange={(field, value) => handleInputChange("voteData", detail.key, field, value)}
            />
          ))}
          </AccordionDetails>
        </Accordion>


        <Box display="flex" flexDirection="column" alignItems="center" mt={3} m={2}>
        <Grid container spacing={1} alignItems="center">
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
                <Box>hereby certify that the information contained in this form is a true and accurate account of votes cast in this polling unit. The election was CONTESTED/NOT CONTESTED.</Box>
            </Grid>
        </Grid>

          <Box>
            <Box m={3} >
                <Button variant="contained" color="primary" onClick={handlePreviewClick}>
                  Preview
                </Button>
            </Box>
        </Box>
      </Box>
    </>
  );
}}


export default ResultForm;