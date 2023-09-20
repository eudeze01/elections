import { Typography, Button, Grid, FormControl, Input, InputAdornment, InputLabel, FormControlLabel, FormLabel, Radio, RadioGroup, Select, MenuItem } from "@mui/material";
import "./App.css";
import React, { useState, useEffect } from 'react';
import {
    PieChart, Pie, Cell,
    ComposedChart, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, Line, LabelList
} from "recharts";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

const GREEN_PALETTE = ["#08e17b", "#0ebc6a", "#107c41"];

const partyColors = {
    Alliance: GREEN_PALETTE[0],
    Congress: GREEN_PALETTE[1],
    Democratic: GREEN_PALETTE[2]
};


const Box = ({ children, ...props }) => <div {...props}>{children}</div>;

const Card = ({ children }) => (
    <Box style={{ flex: '0 0 calc(50% - 10px)', margin: '5px', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        {children}
    </Box>
);

function HomeDashboard() {

    const [currentState, setCurrentState] = useState(0); // selected index for state
    const [currentLga, setCurrentLga] = useState(0);     // selected index for lga
    const [currentWard, setCurrentWard] = useState(0);   // selected index for ward
    const [currentPollingUnit, setCurrentPollingUnit] = useState(0); // selected index for polling unit
    const [showSearchOptions, setShowSearchOptions] = useState(false);
    const [isSearchFormVisible, setIsSearchFormVisible] = useState(false);

    const [selectedState, setSelectedState] = useState("Abuja");
    const [selectedLGA, setSelectedLGA] = useState("Maitama");
    const [selectedWard, setSelectedWard] = useState("Area3");
    const [selectedPollingUnit, setSelectedPollingUnit] = useState("Secretariat");
    const [lgas, setLgas] = useState([]);
    const [wards, setWards] = useState([]);
    const [pollingUnits, setPollingUnits] = useState([]);

    const toggleSearchOptions = () => {
        setShowSearchOptions(!showSearchOptions);
        setIsSearchFormVisible(prevVisible => !prevVisible);
    };

    const SectionContainer = ({ children }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            {children}
        </div>
        );

    const federalData = {
                labels: ['Alliance', 'Congress', 'Democratic'],
                datasets: [{
                    data: [0.4277, 0.3666, 0.2057],
                    backgroundColor: [partyColors.Alliance, partyColors.Congress, partyColors.Democratic]
                }]
            };

            const stateData = {
                labels: ['Alliance', 'Congress', 'Democratic'],
                datasets: [{
                    data: [0.5128, 0.2564, 0.2308],
                    backgroundColor: [partyColors.Alliance, partyColors.Congress, partyColors.Democratic]
                }]
            };

            const lgaData = {
                labels: ['Alliance', 'Congress', 'Democratic'],
                datasets: [{
                    data: [0.5128, 0.2564, 0.2308],
                    backgroundColor: [partyColors.Alliance, partyColors.Congress, partyColors.Democratic]
                }]
            };

            const wardData = {
                labels: ['Alliance', 'Congress', 'Democratic'],
                datasets: [{
                    data: [0.5128, 0.2564, 0.2308],
                    backgroundColor: [partyColors.Alliance, partyColors.Congress, partyColors.Democratic]
                }]
            };

            const pollingUnitData = {
                labels: ['Alliance', 'Congress', 'Democratic'],
                datasets: [{
                    data: [0.5128, 0.2564, 0.2308],
                    backgroundColor: [partyColors.Alliance, partyColors.Congress, partyColors.Democratic]
                }]
            };

            const RADIAN = Math.PI / 180;
            const renderCustomizedLabel = ({
                cx, cy, midAngle, innerRadius, outerRadius, percent
            }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
                        {`${(percent * 100).toFixed(0)}%`}
                    </text>
                );
            };
            const federal = ['Alliance', 'Congress', 'Democratic' ]
            const state = [ 'Anambra', 'Lagos', 'Abuja' ];
            const lga = ['Nnewi', 'Lekki', 'Maitama' ];
            const ward = ['Zone1', 'Phase2', 'Area3' ];
            const pollingUnit = ['University', 'Hall', 'Secretariat' ];

            const locations = [
                {
                    state: "Anambra",
                    lga: [
                        {
                            name: "Nnewi",
                            ward: [
                                {
                                    name: "Zone1",
                                    pollingUnit: ["University"]
                                }
                            ]
                        }
                    ]
                },
                {
                    state: "Lagos",
                    lga: [
                        {
                            name: "Lekki",
                            ward: [
                                {
                                    name: "Phase2",
                                    pollingUnit: ["Hall"]
                                }
                            ]
                        }
                    ]
                },
                {
                    state: "Abuja",
                    lga: [
                        {
                            name: "Maitama",
                            ward: [
                                {
                                    name: "Area3",
                                    pollingUnit: ["Secretariat"]
                                }
                            ]
                        }
                    ]
                }
            ];

            useEffect(() => {
                const selectedStateData = locations.find(loc => loc.state === selectedState);
                if (selectedStateData) {
                    setLgas(selectedStateData.lga);
                    setSelectedLGA(selectedStateData.lga[0]?.name);
                }
            }, [selectedState]);

            useEffect(() => {
                const selectedLGAData = lgas.find(lga => lga.name === selectedLGA);
                if (selectedLGAData) {
                    setWards(selectedLGAData.ward);
                    setSelectedWard(selectedLGAData.ward[0]?.name);
                }
            }, [selectedLGA, lgas]);

            useEffect(() => {
                const selectedWardData = wards.find(ward => ward.name === selectedWard);
                if (selectedWardData) {
                    setPollingUnits(selectedWardData.pollingUnit);
                    setSelectedPollingUnit(selectedWardData.pollingUnit[0]);
                }
            }, [selectedWard, wards]);

            const [currentUnit, setCurrentUnit] = useState("state"); // to determine which dropdown to display
    const [selectedUnit, setSelectedUnit] = useState('');   // value of the selected dropdown item

    const handleRadioChange = (event) => {
        setCurrentUnit(event.target.value);
        setSelectedUnit('');
    };

    const handleDropdownChange = (event) => {
        setSelectedUnit(event.target.value);

        switch (currentUnit) {
            case 'state':
                setSelectedState(event.target.value);
                break;
            case 'lga':
                setSelectedLGA(event.target.value);
                break;
            case 'ward':
                setSelectedWard(event.target.value);
                break;
            case 'pollingUnit':
                setSelectedPollingUnit(event.target.value);
                break;
            default:
                break;
        }
    };

    const renderDropdownOptions = () => {
        switch (currentUnit) {
            case 'state':
                return locations.map(s => <MenuItem value={s.state} key={s.state}>{s.state}</MenuItem>);
            case 'lga':
                return lgas.map(l => <MenuItem value={l.name} key={l.name}>{l.name}</MenuItem>);
            case 'ward':
                return wards.map(w => <MenuItem value={w.name} key={w.name}>{w.name}</MenuItem>);
            case 'pollingUnit':
                return pollingUnits.map(p => <MenuItem value={p} key={p}>{p}</MenuItem>);
            default:
                return null;
        }
    };

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'justify', padding: '20px' }}>
            <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
                <InputAdornment position="start">
                    <IconButton
                        onClick={toggleSearchOptions}
                        aria-label="Toggle search options"
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            padding: '5px',
                        }}
                    >
                        <SearchIcon style={{ fontSize: '18px' }} />
                    </IconButton>

                    {isSearchFormVisible && (
                        <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
                            <InputAdornment position="start">
                                <button onClick={toggleSearchOptions} aria-label="Toggle search options">
                                    Close
                                </button>
                            </InputAdornment>
                        </FormControl>
                    )}
                </InputAdornment>
            </FormControl>
            {showSearchOptions && (
            <>
                <FormControl component="fieldset" style={{ marginBottom: '20px' }}>
                    <FormLabel component="legend">Select Unit</FormLabel>
                    <RadioGroup row name="unit" value={currentUnit} onChange={handleRadioChange}>
                        <FormControlLabel value="state" control={<Radio />} label="State" />
                        <FormControlLabel value="lga" control={<Radio />} label="LGA" />
                        <FormControlLabel value="ward" control={<Radio />} label="Ward" />
                        <FormControlLabel value="pollingUnit" control={<Radio />} label="Polling Unit" />
                    </RadioGroup>
                </FormControl>

                <FormControl variant="outlined" style={{ marginBottom: '20px', width: '200px' }}>
                    <Select value={selectedUnit} onChange={handleDropdownChange}>
                        {renderDropdownOptions()}
                    </Select>
                </FormControl>
                </>
            )}

            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'Justify', padding: '20px' }}>
                <Box className="party-cards" style={{ display: 'flex', marginBottom: '20px' }}>
                    {federalData.labels.map((party, index) => (
                        <Box key={party} className="party-card" style={{ flex: 1, textAlign: 'center', padding: '10px', margin: '0 10px', backgroundColor: partyColors[party], borderRadius: '5px', color: 'white', position: 'relative' }}>
                            {party}
                            <Typography style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '1.0em', fontWeight: 'bold' }}>
                                {(federalData.datasets[0].data[index] * 100).toFixed(2)}%
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <Typography variant="h6" align="center" fontWeight='bold'>State</Typography>
                        <ComposedChart
                            layout="vertical"
                            width={400}
                            height={200}
                            data={stateData.datasets[0].data.map((value, index) => ({
                                name: stateData.labels[index],
                                votes: value,
                                avg: 0.4
                            }))}
                            margin={{top: 20, right: 20, bottom: 20, left: 20}} >
                            <CartesianGrid stroke="#f5f5f5" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" scale="band" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="votes" barSize={30}>
                                {
                                    stateData.labels.map((entry, index) => (
                                        <Cell key={index} fill={partyColors[entry]} />
                                    ))
                                }
                            </Bar>
                            <Line dataKey="avg" stroke="#ff7300" />
                        </ComposedChart>
                        <SectionContainer title="State">
                            <Typography variant="h6" align="left"  style={{ marginTop: '10px'}}>{selectedState}</Typography>
                            <button >View Result</button>
                        </SectionContainer>
                    </Card>
                </Grid>


                <Grid item xs={12} md={6}>
                    <Card >
                        <Typography variant="h6" align="center" fontWeight='bold'>Local Government Area</Typography>
                        <PieChart width={300} height={200} margin={{left: 50, top: 20 }} >
                            <Pie
                                data={lgaData.datasets[0].data.map((value, index) => ({ name: lgaData.labels[index], value }))}
                                cx={80}
                                cy={80}
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={90}
                                dataKey="value"
                            >
                                {lgaData.labels.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={partyColors[entry]} />
                                    ))}
                            </Pie>
                        </PieChart>
                        <SectionContainer title="Local Government Area">
                            <Typography variant="h6" align="left"  style={{ marginTop: '10px'}}>{selectedLGA}</Typography>
                            <button >View Result</button>
                        </SectionContainer>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                    <Typography variant="h6" align="center" fontWeight='bold'>Ward</Typography>
                        <PieChart width={300} height={200}  margin={{left: 50 }}>
                            <Pie
                                data={wardData.datasets[0].data.map((value, index) => ({ name: wardData.labels[index], value }))}
                                cx={80}
                                cy={100}
                                innerRadius={40}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {wardData.labels.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={partyColors[entry]} />
                                    ))}
                            </Pie>
                        </PieChart>
                        <SectionContainer title="Ward">
                            <Typography variant="h6" align="left"  style={{ marginTop: '10px'}}>{selectedWard}</Typography>
                            <button >View Result</button>
                        </SectionContainer>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                    <Typography variant="h6" align="center" fontWeight='bold'>Polling Unit</Typography>
                        <BarChart width={300} height={200}
                            data={pollingUnitData.datasets[0].data.map((value, index) => ({
                            name: pollingUnitData.labels[index],
                            uv: value }))} >
                            <XAxis dataKey="name" ticks={[0, 25, 50, 75, 100]} />
                            <YAxis />
                            <Legend />
                            <Bar dataKey="uv">
                                {
                                    pollingUnitData.labels.map((entry, index) => (
                                        <Cell key={index} fill={partyColors[entry]} />
                                    ))
                                }
                            </Bar>
                        </BarChart>
                        <SectionContainer title="Polling Unit">
                            <Typography variant="h6" align="left"  style={{ marginTop: '10px'}}>{selectedPollingUnit}</Typography>
                            <button fontWeight='bold'>View Result</button>
                        </SectionContainer>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default HomeDashboard;