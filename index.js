//has a function called createEmployeeRecord
const createEmployeeRecord = function (arr) {
  return {
    firstName: arr[0], // populates a firstName field from the 0th element
    familyName: arr[1], // populates a familyName field from the 1th element
    title: arr[2], // populates a title field from the 2th element
    payPerHour: arr[3], // populates a payPerHour field from the 3th element
    timeInEvents: [], // initializes a field, timeInEvents, to hold an empty Array
    timeOutEvents: [], // initializes a field, timeOutEvents, to hold an empty Array
  };
};

// has a function called createEmployeeRecords creates two records  correctly assigns the first names  creates more than 2 records
const createEmployeeRecords = function (employeeRowData) {
  return employeeRowData.map(function (arr) {
    return createEmployeeRecord(arr);
  });
};

// has a function called createTimeInEvent
const createTimeInEvent = function (employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn", // creates the correct type
    hour: parseInt(hour, 10), // extracts the correct hour
    date, // extracts the correct date
  });

  return employee;
};

// has a function called createTimeOutEvent
const createTimeOutEvent = function (employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut", // creates the correct type
    hour: parseInt(hour, 10), // extracts the correct hour
    date, // extracts the correct date
  });

  return employee;
};
// hoursWorkedOnDate calculates the hours worked when given an employee record and a date  calculates that the employee worked 2 hours
const hoursWorkedOnDate = function (employee, date) {
  const allPunchIns = employee.timeInEvents;
  const allPunchOuts = employee.timeOutEvents;
  const datePunchIn = allPunchIns.filter((punch) => punch.date === date);
  const punchIn = datePunchIn[0].hour;
  const datePunchOut = allPunchOuts.filter((punch) => punch.date === date);
  const punchOut = datePunchOut[0].hour;
  return (punchOut - punchIn) / 100;
}
// wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour calculates that the employee earned 54 dollars
const wagesEarnedOnDate = function(employee, date) {
    const hours = hoursWorkedOnDate(employee,date);
    const rate = employee.payPerHour;
    return rate * hours;
}

const allWagesFor = function(employee) {
    const outs = employee.timeOutEvents;
    const pays = outs.map( out => wagesEarnedOnDate(employee,out.date) );
    const reducer = (acc, cur) => acc + cur;
    return pays.reduce(reducer);
} 

const calculatePayroll = function(employee) {
    return employee.reduce( (acc, cur) => acc + allWagesFor(cur), 0);
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }