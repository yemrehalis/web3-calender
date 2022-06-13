// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Calend3 {
    uint256 rate;
    address payable owner;

    struct Appointment {
        string title; // title of the meeting
        address attendee; // person you are meeting
        uint256 startTime; // start time of meeting
        uint256 endTime; // end time of the meeting
        uint256 amountPaid; //amount paid for the meeting
    }

    Appointment[] appointments;

    constructor() {
        owner = payable(msg.sender); // contract creator can be paid
    }

    function getRate() public view returns (uint256) {
        return rate;
    }

    function setRate(uint256 _rate) public {
        require(msg.sender == owner, "Only the owner can set the rate");
        rate = _rate;
    }

    function getAppointments() public view returns (Appointment[] memory) {
        return appointments;
    }

    function createAppointment(
        string memory title,
        uint256 startTime,
        uint256 endTime
    ) public payable {
        Appointment memory appointment;
        appointment.title = title;
        appointment.startTime = startTime;
        appointment.endTime = endTime;
        appointment.amountPaid = ((endTime - startTime) / 60) * rate;
        appointment.attendee = msg.sender; // address of person calling contract

        require(msg.value >= appointment.amountPaid, "We require more ether"); //validate the amount of ETH

        (bool success, ) = owner.call{value: msg.value}(""); // Send ETH to the owner

        require(success, "Failed to send Ether");
        appointments.push(appointment);
    }
}
