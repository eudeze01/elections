import { Table, Box, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

function ResultTable(props) {
    const { partyName, voteCount, pollingCentre, officerId, electionId, electionDate } = props.results ? props.results : {};
    return (
        <>
        <Box className="box">
            <Box className='resultform-header'>
            <Typography variant="h4" gutterBottom className='result-header-typo'>
                Unit Result Preview
            </Typography>
            </Box>
    
            <Table>
            <TableHead>
                <TableRow>
                <TableCell>Attribute</TableCell>
                <TableCell>Value</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                <TableCell><Typography variant="h6">Election ID</Typography></TableCell>
                <TableCell>{electionId}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell><Typography variant="h6">Polling Centre</Typography></TableCell>
                <TableCell>{pollingCentre}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell><Typography variant="h6">Party Name</Typography></TableCell>
                <TableCell>{partyName}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell><Typography variant="h6">Vote Count</Typography></TableCell>
                <TableCell>{voteCount}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell><Typography variant="h6">Officer ID</Typography></TableCell>
                <TableCell>{officerId}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell><Typography variant="h6">Election Date</Typography></TableCell>
                <TableCell>{electionDate}</TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </Box>
        </>
    );
    }
          

export default ResultTable;
