import React from 'react'
import '../App.css'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from "../abis/Calend3.json"
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, WeekView, Appointments, AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { Box, Button, Slider } from '@material-ui/core';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';



const contractAddress = "0x0B0E84f4D61E00eba115f74A4305838B58ef2f78";
const contractABI = abi.abi;
const provider = new ethers.providers.Web3Provider(window.ethereum)
const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());





const schedulerData = [
    { startDate: '2022-06-17T09:45', endDate: '2022-06-17T11:00', title: 'Dogecoin Integration' },
    { startDate: '2022-06-17T12:00', endDate: '2022-06-17T13:30', title: 'Podcast appearance' },
];


const handleSliderChange = (event, newValue) => {
    setRate(newValue);

}

const saveRate = async () => {
    const tx = await contract.setRate(ethers.utils.parseEther(rate.toString()));
}

const Admin = () => {
    return <div>
        <Box>
            <h3>Set Your Minutely Rate </h3>
            <Slider defaultValue={parseFloat(rate)}
                step={0.001}
                min={0}
                max={.1}
                valueLabelDisplay='auto'
                onChangeCommitted={handleSliderChange} />
            <br /><br />
        </Box>
    </div>
}


const Calendar = (props) => {

    // admin rate setting functionality
    const [isAdmin, setIsAdmin] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    const [rate, setRate] = useState(false);

    const getData = async () => {
        // get contract owner and set admin if connected account is owner
        const owner = await contract.owner();
        setIsAdmin(owner.toUpperCase() === props.account.toUpperCase());

        const rate = await contract.getRate();
        setRate(ethers.utils.formatEther(rate.toString()));
    }

    const saveAppointment = (data) => {
        console.log('committing changes');
        console.log(data);
    }

    return (
        <div id='calendar'>
            <Scheduler data={schedulerData}>
                <ViewState />
                <EditingState onCommitChanges={saveAppointment} />
                <IntegratedEditing />
                <WeekView startDayHour={9} endDayHour={19} />
                <Appointments />
                <AppointmentForm />
            </Scheduler>
        </div>
    );
}

export default Calendar;