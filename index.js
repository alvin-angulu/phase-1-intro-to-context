// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');

    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    };

    employeeRecord.timeInEvents.push(timeInEvent);

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');

    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    };

    employeeRecord.timeOutEvents.push(timeOutEvent);

    return employeeRecord;
}


function hoursWorkedOnDate(employeeRecord, specificDate) {
    let hoursWorked = 0;

    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === specificDate);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === specificDate);

    if (timeInEvent && timeOutEvent) {
        // Convert hours from HHMM format to hours
        const startTime = timeInEvent.hour;
        const endTime = timeOutEvent.hour;

        hoursWorked = (endTime - startTime) / 100;
    }

    return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payOwed = hoursWorked * employeeRecord.payPerHour;
    return payOwed;
}

function allWagesFor(employeeRecord) {
    let totalWages = 0;

    
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);

    for (let date of datesWorked) {
        totalWages += wagesEarnedOnDate(employeeRecord, date);
    }

    return totalWages;
}


function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;

    for (let employeeRecord of employeeRecords) {
        totalPayroll += allWagesFor(employeeRecord);
    }

    return totalPayroll;
}

