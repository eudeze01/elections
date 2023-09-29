import { Grid, Table, Box, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { BarChart, Bar, LabelList, Legend, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function AllResultsTable(props) {
    if (!props.data || Object.keys(props.data).length === 0) {
        return null; 
    }

    const attributeToLabelMapping = {
        "electionResultKey": "Result ID",
        "electionId": "Election ID",
        "electionPollingCentre": "Polling Unit",
        "electionOfficerId": "Officer ID",
        "electionDate": "Election Date",
        "electionWard": "Ward",
        "electionLga": "LGA",
        "electionState": "State",
        "electionFederal": "Country",
        "electionVotes.voteTotal": "Total Votes",
    };

    const parties = props.data.electionVotes && props.data.electionVotes.votesParties 
    ? props.data.electionVotes.votesParties.map(party => {
        attributeToLabelMapping[`electionVotes.votesParties.${party.name}`] = party.name;
        return `electionVotes.votesParties.${party.name}`;
    })
    : [];

    const totalVotes = props.data.electionVotes?.votesParties?.reduce((sum, party) => sum + parseInt(party.voteCount, 10), 0) || 1; // Ensure it doesn't become 0 to avoid division by zero.
    
    const partyColors = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042'];  // Array of colors for each party
    
    const partyData = props.data.electionVotes?.votesParties?.reduce((acc, party) => {
        acc[party.name] = parseInt(party.voteCount, 10);
        return acc;
    }, {});
    
    
    const rows = [
        "electionResultKey",
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
        <Grid container spacing={1}>
            <Grid item xs={12} md={6} sm={11}>
                <Table>
                    <TableBody>
                        {rows.map(attribute => (
                            <TableRow key={attribute}>
                                <TableCell>{attributeToLabelMapping[attribute] || attribute}</TableCell>
                                <TableCell>
                                    {
                                        attribute.includes('votesParties')
                                        ? parseInt((props.data.electionVotes.votesParties.find(p => p.name === attribute.split('.').pop()) || {}).voteCount || '0', 10) || 'N/A'
                                        : attribute.includes('electionVotes.voteTotal')
                                        ? props.data.electionVotes.votesParties.reduce((sum, party) => sum + parseInt(party.voteCount, 10), 0)
                                        : attribute.includes('.')
                                        ? attribute.split('.').reduce((o, i) => (o || {})[i], props.data)
                                        : props.data[attribute] || 'N/A'   
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>

            <Grid item xs={12} md={4} sm={1}>
                <BarChart
                    width={250}
                    height={600}
                    data={[partyData]} 
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {
                    props.data.electionVotes?.votesParties?.map((party, index) => (
                        <Bar key={party.name} dataKey={party.name} stackId="a" fill={partyColors[index % partyColors.length]}>
                            <LabelList dataKey={party.name} position="insideTop" fill="#ffffff" fontSize={14} fontWeight={900} formatter={(value) => `${((value/totalVotes)*100).toFixed(2)}%`} />
                        </Bar>
                    ))
                }
                </BarChart>
            </Grid>
        </Grid>
    );
}

const BASE_URL = 'https://9656mgkl5a.execute-api.eu-west-2.amazonaws.com/dev/fetch/document';
const pollingCenters = [ 'City Centre', 'Secretariat', 'Waterside', 'Market Square' ];

const getPollingCentres = async () => {
    const response = await fetch(`${BASE_URL}/ElectionResults`);
    const data = await response.json();
    return data._resultList.filter(result => pollingCenters.includes(result.electionPollingCentre));
};

const getWards = async () => {
    const response = await fetch(`${BASE_URL}/Ward`);
    return response.json();
};

const getLGAs = async () => {
    const response = await fetch(`${BASE_URL}/LGA`);
    return response.json();
};

const getStates = async () => {
    const response = await fetch(`${BASE_URL}/State`);
    return response.json();
};


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            data: {},
            activeCategory: '',
        };

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.setActiveCategory = this.setActiveCategory.bind(this);
        this.renderDropdownForCategory = this.renderDropdownForCategory.bind(this);
    }
    
    componentDidMount() {
    getPollingCentres()
    .then(results => {
        this.setState({ results });
    });

    getWards().then(data => {
        this.setState({ availableWards: data });
    });
    
    getLGAs().then(data => {
        this.setState({ availableLGAs: data });
    });
    
    getStates().then(data => {
        this.setState({ availableStates: data });
    });
}

    handleDropdownChange(event) {
        const selectedValue = event.target.value;
        const relatedData = this.state.results.find(result => result[this.state.activeCategory] === selectedValue);
        
        if (relatedData) {
            this.setState({ data: relatedData });
        } else {
            this.setState({ data: {} });
        }
    }

    setActiveCategory(category) {
        this.setState({ activeCategory: category });
    }

    renderDropdownForCategory(category) {
        const options = [...new Set(this.state.results.map(r => r[category]))];

        return (
            <select value={this.state.data[category] || ''} onChange={this.handleDropdownChange}>
                <option value="">Select</option>
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    }

    render() {
        const categories = ['electionOfficerId', 'electionPollingCentre', 'electionState', 'electionLGA', 'electionWard'];

        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {categories.map(category => (
                        <Box key={category}>
                            <input
                                type="radio"
                                id={category}
                                name="category"
                                onClick={() => this.setActiveCategory(category)}
                            />
                            <label htmlFor={category}>
                                {category.replace('election', '').replace(/([A-Z])/g, ' $1')} {/* Makes the field readable. Example: electionOfficerId to Officer Id */}
                            </label>
                            {this.state.activeCategory === category && this.renderDropdownForCategory(category)}
                        </Box>
                    ))}
                </Grid>

                <Grid item xs={12} md={8}>
                    <AllResultsTable data={this.state.data} />
                </Grid>
            </Grid>
            );
        }
    }

export default Home;
