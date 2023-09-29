import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import "./App.css";
import React from 'react';

function AllResultsTable(props) {
    if (!props.data || Object.keys(props.data).length === 0) {
        return null; // or return a placeholder or loading message
    }

    const parties = props.data.electionVotes && props.data.electionVotes.votesParties 
    ? props.data.electionVotes.votesParties.map(party => `electionVotes.votesParties.${party.name}`)
    : [];

    const rows = [
        "electionId",
        "electionPollingCentre",
        "electionOfficerId",
        "electionDate",
        "electionWard",
        "electionLga",
        "electionState",
        "electionFederal",
        "electionVotes.voteTotal",
        ...parties
    ];

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Attribute</TableCell>
                    <TableCell>Value</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(attribute => (
                    <TableRow key={attribute}>
                        <TableCell>{attribute}</TableCell>
                        <TableCell>
                            {
                                attribute.includes('votesParties')
                                ? (props.data.electionVotes.votesParties.find(p => p.name === attribute.split('.').pop()) || {}).voteCount || 'N/A'
                                : attribute.includes('.')
                                ? attribute.split('.').reduce((o, i) => (o || {})[i], props.data)
                                : props.data[attribute] || 'N/A'
                            }
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}


const getResults = async () => {
    const myHeaders = new Headers();
    const myRequest = new Request(`https://9656mgkl5a.execute-api.eu-west-2.amazonaws.com/dev/fetch/document/ElectionResults`, {
        method: "GET",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
    });
    const response = await fetch(myRequest);
    return response.json();
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            selectedOfficerID: '',
            attributes: [],
            data: {}
        };
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    componentDidMount() {
        getResults()
        .then(async res => {
            const results = await res;
            if (results) {
                const attributes = [
                    "Election ID",
                    "Polling Centre",
                    ...Object.keys(results._resultList[0].electionVotes.votesParties || {}),
                    "Vote Count",
                    "Officer ID",
                    "Election Date"
                ];
                this.setState({ results: results._resultList, attributes });
            }
        })
    }

    handleDropdownChange(event) {
        const officerId = event.target.value;
        const relatedData = this.state.results.find(result => result.electionOfficerId === officerId);
        if (relatedData) {
            this.setState({ selectedOfficerID: officerId, data: relatedData });
        }
    }
    
    render() {
        const uniqueOfficers = [...new Set(this.state.results.map(r => r.electionOfficerId))];
        
        return (
            <div>
                <div>
                    <label>
                        Select Officer ID: 
                        <select 
                            value={this.state.selectedOfficerID} 
                            onChange={this.handleDropdownChange} 
                        >
                            <option value="">-- Select an Officer --</option>
                            {uniqueOfficers.map(id => (
                                <option key={id} value={id}>{id}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <AllResultsTable data={this.state.data} />
            </div>
        );
    }
}      

export default Home;
