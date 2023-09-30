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
    const myRequest = new Request(`https://9656mgkl5a.execute-api.eu-west-2.amazonaws.com/dev/fetch/document/LGA`, {
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
            selectedPollingCentre: '',
            selectedState: '',
            selectedLGA: '',
            selectedWard: '',
            selectedFederal: '',
            attributes: [],
            data: {}
            
        };
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handlePollingCentreChange = this.handlePollingCentreChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleLGAChange = this.handleLGAChange.bind(this);
        this.handleWardChange = this.handleWardChange.bind(this);
        this.handleFederalChange = this.handleFederalChange.bind(this);
    }
    componentDidMount() {
        getResults()
        .then(async res => {
            const results = await res;
            if (results) {
                this.setState({ results: results._resultList });
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

    handlePollingCentreChange(event) {
        const pollingCentre = event.target.value;
        const relatedData = this.state.results.find(result => result.electionPollingCentre === pollingCentre);
        if (relatedData) {
            this.setState({ selectedPollingCentre: pollingCentre, data: relatedData });
        }
    }

    handleWardChange(event) {
        const selectedWard = event.target.value;
        const relatedData = this.state.results.find(result => result.electionWard === selectedWard);
        if (relatedData) {
            this.setState({ selectedWard, data: relatedData });
        }
    }

    handleLGAChange(event) {
        const selectedLGA = event.target.value;
        const relatedData = this.state.results.find(result => result.electionLGA === selectedLGA);
        if (relatedData) {
            this.setState({ selectedLGA, data: relatedData });
        }
    }

    handleStateChange(event) {
        const selectedState = event.target.value;
        const relatedData = this.state.results.find(result => result.electionState === selectedState);
        if (relatedData) {
            this.setState({ selectedState, data: relatedData });
        }
    }

    handleFederalChange(event) {
        const selectedFederal = event.target.value;
        const relatedData = this.state.results.find(result => result.electionFederal === selectedFederal);
        if (relatedData) {
            this.setState({ selectedFederal, data: relatedData });
        }
    }


    render() {
        const uniqueOfficers = [...new Set(this.state.results.map(r => r.electionOfficerId))];
        const uniquePollingCentres = [...new Set(this.state.results.map(r => r.electionPollingCentre))];
        const uniqueStates = [...new Set(this.state.results.map(r => r.electionState))];
        const uniqueLGAs = [...new Set(this.state.results.map(r => r.electionLGA))];
        const uniqueWards = [...new Set(this.state.results.map(r => r.electionWard))];

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
                <div>
                    <label>
                        Select Polling Centre: 
                        <select 
                            value={this.state.selectedPollingCentre} 
                            onChange={this.handlePollingCentreChange} 
                        >
                            <option value="">-- Select a Polling Centre --</option>
                            {uniquePollingCentres.map(pollingCentre => (
                                <option key={pollingCentre} value={pollingCentre}>{pollingCentre}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Select Ward: 
                        <select 
                            value={this.state.selectedWard} 
                            onChange={this.handleWardChange} 
                        >
                            <option value="">-- Select a Ward --</option>
                            {uniqueWards.map(ward => (
                                <option key={ward} value={ward}>{ward}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Select LGA: 
                        <select 
                            value={this.state.selectedLGA} 
                            onChange={this.handleLGAChange} 
                        >
                            <option value="">-- Select an LGA --</option>
                            {uniqueLGAs.map(lga => (
                                <option key={lga} value={lga}>{lga}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Select State: 
                        <select 
                            value={this.state.selectedState} 
                            onChange={this.handleStateChange} 
                        >
                            <option value="">-- Select a State --</option>
                            {uniqueStates.map(state => (
                                <option key={state} value={state}>{state}</option>
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


// <div>
            //     {/* For Officer */}
            //     <div onClick={() => this.setActiveCategory('officer')}>
            //         <strong>Officer ID</strong>
            //     </div>
            //     {activeCategory === 'officer' && uniqueOfficers.map(officerId => (
            //         <div key={officerId}>
            //             <input type="radio" id={`officer-${officerId}`} value={officerId} onChange={this.handleDropdownChange} />
            //             <label htmlFor={`officer-${officerId}`}>{officerId}</label>
            //         </div>
            //     ))}
    
            //     {/* For Polling Centre*/}
            //     <div onClick={() => this.setActiveCategory('pollingCentre')}>
            //         <strong>Polling Centre</strong>
            //     </div>
            //     {activeCategory === 'pollingCentre' && uniquePollingCentres.map(centre => (
            //         <div key={centre}>
            //             <input type="radio" id={`centre-${centre}`} value={centre} onChange={this.handlePollingCentreChange} />
            //             <label htmlFor={`centre-${centre}`}>{centre}</label>
            //         </div>
            //     ))}
    
            //     {/* For LGA */}
            //     <div onClick={() => this.setActiveCategory('lga')}>
            //         <strong>LGA</strong>
            //     </div>
            //     {activeCategory === 'lga' && uniqueLGAs.map(lga => (
            //         <div key={lga}>
            //             <input type="radio" id={`lga-${lga}`} value={lga} onChange={this.handleLGAChange} />
            //             <label htmlFor={`lga-${lga}`}>{lga}</label>
            //         </div>
            //     ))}
    
            //     {/* For State */}
            //     <div onClick={() => this.setActiveCategory('state')}>
            //         <strong>State</strong>
            //     </div>
            //     {activeCategory === 'state' && uniqueStates.map(state => (
            //         <div key={state}>
            //             <input type="radio" id={`state-${state}`} value={state} onChange={this.handleStateChange} />
            //             <label htmlFor={`state-${state}`}>{state}</label>
            //         </div>
            //     ))}
    
            //     {/* For Ward */}
            //     <div onClick={() => this.setActiveCategory('ward')}>
            //         <strong>Ward</strong>
            //     </div>
            //     {activeCategory === 'ward' && uniqueWards.map(ward => (
            //         <div key={ward}>
            //             <input type="radio" id={`ward-${ward}`} value={ward} onChange={this.handleWardChange} />
            //             <label htmlFor={`ward-${ward}`}>{ward}</label>
            //         </div>
            //     ))}
    
            //     {/* For Election Id */}
            //     <div onClick={() => this.setActiveCategory('electionId')}>
            //         <strong>Election ID</strong>
            //     </div>
            //     {activeCategory === 'electionId' && uniqueElectionIds.map(electionId => (
            //         <div key={electionId}>
            //             <input type="radio" id={`electionId-${electionId}`} value={electionId} /*... other attributes*/ />
            //             <label htmlFor={`electionId-${electionId}`}>{electionId}</label>
            //         </div>
            //     ))} 
    
            //     <AllResultsTable data={this.state.data} />
            // </div>