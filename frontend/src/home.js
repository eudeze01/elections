import { AppBar, Toolbar, Typography, MenuItem, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Select, Box, Grid, Table, TableBody, TableCell, TableRow } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { ComposedChart, ReferenceLine, Bar, LabelList, Legend, XAxis, YAxis, CartesianGrid } from 'recharts';
import './App.css';
import { BASE_URL } from './constants';
import QRCode from "react-qr-code";

function AllResultsTable(props) {
    if (!props.data || Object.keys(props.data).length === 0) {
        return null; 
    }

    const qrValue = `${BASE_URL}/${props.data.electionResultKey}`;

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
        <Box className='box container-relative'>
            <QRCode className="qrcode-top-right" value={qrValue} size={100} level={"Q"}/>
            <Box className='resultform-header'>
                <Typography variant="h5" align='center' gutterBottom className="result-header-typo">
                    Result Page                
                </Typography>
            </Box> 
                        
            <Grid container>
                <Grid item xs={12} md={8}>
                    <Table >  
                        <TableBody>
                            {rows.map(attribute => (
                                <TableRow key={attribute}>
                                    <TableCell style={{ fontWeight: 'bold' }}>
                                        {attributeToLabelMapping[attribute] || attribute}
                                    </TableCell>
                                        <TableCell style={{ fontWeight: 'bold', }}>
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

                <Grid item xs={12} md={4}>
                    <ComposedChart
                        layout="vertical"
                        width={600}
                        height={400}
                        data={props.data.electionVotes?.votesParties}
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 50,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis type="number" tick={{ fontWeight: 'bold' }} />
                        <YAxis dataKey="name" type="category" tick={{ fontWeight: 'bold' }} />
                        <Legend fontWeight={900}/>
                        <Bar 
                            dataKey="voteCount" 
                            barSize={40} 
                            fill="#107c41"
                            name="Party Votes"
                        >
                            <LabelList dataKey="voteCount" position="insideLeft" fill="#ffffff" fontSize={14} fontWeight={900} formatter={(value) => `${((value/totalVotes)*100).toFixed(2)}%`} />
                        </Bar>
                        <ReferenceLine x={totalVotes*0.25} stroke="red" label={`${(0.25*100).toFixed(2)}% Average`} />
                    </ComposedChart>
                </Grid>
            </Grid>
        </Box>
    );
}

const pollingCenters = [ 'City Centre', 'Secretariat', 'Waterside', 'Market Square', 'Victoria Street'];

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
        showSearchOptions: true,
        availableUnits: [],
        activeCategory: 'electionPollingCentre', // Default category
        selectedUnit: 'Secretariat', // Default unit            
        data: {}
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.setActiveCategory = this.setActiveCategory.bind(this);
    this.renderDropdownForCategory = this.renderDropdownForCategory.bind(this);
    this.toggleSearchOptions = this.toggleSearchOptions.bind(this); // Binding the toggle function
}

    toggleSearchOptions() {
        this.setState(prevState => ({
            showSearchOptions: !prevState.showSearchOptions
        }));
    }

    renderDropdownOptions() {
        if (!this.state.activeCategory) return null;
    
        const uniqueUnits = [...new Set(this.state.results.map(result => result[this.state.activeCategory]))];
        return uniqueUnits.map(unit => <option key={unit} value={unit}>{unit}</option>);
    }
    
    componentDidMount() {
        getPollingCentres()
        .then(results => {
            this.setState({ results }, () => {
                if (!this.state.data || Object.keys(this.state.data).length === 0) {
                    this.fetchDataForUnit(this.state.selectedUnit);
                }
            });
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
    if (!this.state.data || Object.keys(this.state.data).length === 0) {
        this.fetchDataForUnit(this.state.selectedUnit);
    }
}

fetchDataForUnit(unit) {
    const relatedData = this.state.results.find(result => result[this.state.activeCategory] === unit);
    
    if (relatedData) {
        this.setState({ data: relatedData });
    } else {
        this.setState({ data: {} });
    }
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
            <Select value={this.state.data[category] || ''} onChange={this.handleDropdownChange}>
                <MenuItem value="">
                    <em>Select</em>
                </MenuItem>
                {options.map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        );
    }

    render() {
        const categories = ['electionOfficerId', 'electionPollingCentre', 'electionState', 'electionLGA', 'electionWard'];

        return (
            <>
                <AppBar position="static" sx={{ backgroundColor: 'green' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            e-lections
                        </Typography>
                        <SearchIcon 
                            onClick={this.toggleSearchOptions}
                            aria-label="Toggle search options"
                            className="search-icon"
                        />
                        <a className="account-button" href={`/dashboard`}>Account</a>
                    </Toolbar>
                </AppBar>
                <Box>
                {this.state.showSearchOptions && (
                    <Box className="box">
                        <FormControl className="form-control">
                            <FormLabel component="legend">Select Unit</FormLabel>
                            <RadioGroup row name="unit" value={this.state.activeCategory} onChange={(e) => this.setActiveCategory(e.target.value)}>
                                {categories.map(category => (
                                    <FormControlLabel 
                                        key={category}
                                        value={category}
                                        control={<Radio />}
                                        label={category.replace('election', '').replace(/([A-Z])/g, ' $1')}
                                    />
                                ))}
                            </RadioGroup>
    
                            {this.state.activeCategory && (
                                <Box mt={2}>
                                    <FormControl variant="outlined" fullWidth>
                                        {this.renderDropdownForCategory(this.state.activeCategory)}
                                    </FormControl>
                                </Box>
                            )}
                        </FormControl> 
                    </Box>
                )}
                </Box>

                <Grid container>
                    <AllResultsTable data={this.state.data} />
                </Grid>
            </>
        );
    }
}

export default Home;

