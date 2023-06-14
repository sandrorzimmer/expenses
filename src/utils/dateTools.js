//Returns an array with start date and end date, in ISO format.
//Accepts:
//(year, month, day) --> one day range
//(year, month) --> one month range
//(year) --> one year range
//Start date has time set to 00:00:00.000Z
//End date has time set to 23:59:59.999Z
//If provided data is an invalid date, returns false.
function getRangeDate(year, month, day) {
    let startDate;
    let endDate;

    try {

        //Only year is provided
        if (month === undefined && day === undefined) {
            if (checkDateIsValid(`${year}-01-01`) === false) {
                return false;
            } else {
                startDate = (new Date(parseInt(year), 0, 1)).toISOString();
                endDate = (new Date(parseInt(year), 11, 31)).toISOString();
            }

            //Year and month are provided
        } else if (day === undefined) {
            if (checkDateIsValid(`${year}-${month}-01`) === false) {
                return false;
            } else {
                startDate = (new Date(parseInt(year), parseInt(month) - 1, 1)).toISOString();
                endDate = (new Date(parseInt(year), parseInt(month), 0)).toISOString();
            }

            //Year, month and day are provided
        } else {
            if (checkDateIsValid(`${year}-${month}-${day}`) === false) {
                return false;
            } else {
                startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toISOString();
                endDate = startDate;
            }
        }
    } catch (error) {
        return false;
    }

    const stringStartDate = startDate.slice(0, 11) + '00:00:00.000Z'; // Set time to 00:00:00.000Z
    const stringEndDate = endDate.slice(0, 11) + '23:59:59.999Z'; // Set time to 23:59:59.999Z

    const newStartDate = new Date(stringStartDate);
    const newEndDate = new Date(stringEndDate);

    return [newStartDate, newEndDate];
}

//Check if date is valid
//Input format: ("yyyy-mm-dd")
function checkDateIsValid(date) {
    const [year, month, day] = date.split('-');
    const parsedYear = parseInt(year);
    const parsedMonth = parseInt(month) - 1; // Adjust month to be zero-based
    const parsedDay = parseInt(day);

    const targetDate = new Date(parsedYear, parsedMonth, parsedDay);

    // Check if the parsed components match the original date and fall within the expected ranges
    if (
        parsedYear !== targetDate.getFullYear() ||
        parsedMonth !== targetDate.getMonth() ||
        parsedDay !== targetDate.getDate() ||
        parsedYear < 1900 || parsedYear > 2100 ||
        parsedMonth < 0 || parsedMonth > 11 ||
        parsedDay < 1 || parsedDay > 31
    ) {
        return false;
    }

    return targetDate.toISOString();
}

//Return array with current year and current month (1 - 12)
function getCurrentYearMonth() {
    //Get current date
    const currentDate = new Date();

    //Extract year and month from current date
    const currentMonth = currentDate.getMonth() + 1; //months are zero based (0-11)
    const currentYear = currentDate.getFullYear();

    return [currentYear, currentMonth];
}

export { getRangeDate, getCurrentYearMonth };