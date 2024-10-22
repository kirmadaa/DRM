import moment from "moment";
import 'moment-timezone';


// Function to convert Excel serial date to a readable date
const excelSerialToDate = (serial) => {
    // Excel serial date starts from 1899-12-30
    var excelStartDate = new Date(1899, 11, 30);
    var convertedDate = new Date(excelStartDate.getTime() + serial * 86400000);
    return moment(convertedDate).format("DD/MM/YYYY HH:mm");
};

const formatsToCheck = [
    // 24-hour time formats without seconds
    "DD/MM/YY HH:mm",
    "DD-MM-YYYY hh:mm:ss A",
    "MM-DD-YYYY hh:mm:ss A",
    "YYYY-MM-DD hh:mm:ss A",
    "YYYY-DD-MM hh:mm:ss A",
    "DD/MM/YYYY hh:mm:ss A",
    "MM/DD/YYYY hh:mm:ss A",
    "YYYY/MM/DD hh:mm:ss A",
    "YYYY/DD/MM hh:mm:ss A",
    "DD-MM-YY hh:mm:ss A",
    "MM-DD-YY hh:mm:ss A",
    "YY-MM-DD hh:mm:ss A",
    "YY-DD-MM hh:mm:ss A",
    "DD/MM/YY hh:mm:ss A",
    "MM/DD/YY hh:mm:ss A",
    "YY/MM/DD hh:mm:ss A",
    "YY/DD/MM hh:mm:ss A",

    // 12-hour time formats without seconds
    "DD-MM-YYYY hh:mm A",
    "MM-DD-YYYY hh:mm A",
    "YYYY-MM-DD hh:mm A",
    "YYYY-DD-MM hh:mm A",
    "DD/MM/YYYY hh:mm A",
    "MM/DD/YYYY hh:mm A",
    "YYYY/MM/DD hh:mm A",
    "YYYY/DD/MM hh:mm A",
    "DD-MM-YY hh:mm A",
    "MM-DD-YY hh:mm A",
    "YY-MM-DD hh:mm A",
    "YY-DD-MM hh:mm A",
    "DD/MM/YY hh:mm A",
    "MM/DD/YY hh:mm A",
    "YY/MM/DD hh:mm A",
    "YY/DD/MM hh:mm A",

    // 24-hour time formats with seconds
    "DD-MM-YYYY HH:mm:ss",
    "MM-DD-YYYY HH:mm:ss",
    "YYYY-MM-DD HH:mm:ss",
    "YYYY-DD-MM HH:mm:ss",
    "DD/MM/YYYY HH:mm:ss",
    "MM/DD/YYYY HH:mm:ss",
    "YYYY/MM/DD HH:mm:ss",
    "YYYY/DD/MM HH:mm:ss",
    "DD-MM-YY HH:mm:ss",
    "MM-DD-YY HH:mm:ss",
    "YY-MM-DD HH:mm:ss",
    "YY-DD-MM HH:mm:ss",
    "DD/MM/YY HH:mm:ss",
    "MM/DD/YY HH:mm:ss",
    "YY/MM/DD HH:mm:ss",
    "YY/DD/MM HH:mm:ss",

    // 24-hour time formats without seconds
    "DD-MM-YYYY HH:mm",
    "MM-DD-YYYY HH:mm",
    "YYYY-MM-DD HH:mm",
    "YYYY-DD-MM HH:mm",
    "DD/MM/YYYY HH:mm",
    "MM/DD/YYYY HH:mm",
    "YYYY/MM/DD HH:mm",
    "YYYY/DD/MM HH:mm",
    "DD-MM-YY HH:mm",
    "MM-DD-YY HH:mm",
    "YY-MM-DD HH:mm",
    "YY-DD-MM HH:mm",
    "DD/MM/YY HH:mm",
    "MM/DD/YY HH:mm",
    "YY/MM/DD HH:mm",
    "YY/DD/MM HH:mm",

    // Date formats without time
    "DD-MM-YYYY",
    "MM-DD-YYYY",
    "YYYY-MM-DD",
    "YYYY-DD-MM",
    "DD/MM/YYYY",
    "MM/DD/YYYY",
    "YYYY/MM/DD",
    "YYYY/DD/MM",
    "DD-MM-YY",
    "MM-DD-YY",
    "YY-MM-DD",
    "YY-DD-MM",
    "DD/MM/YY",
    "MM/DD/YY",
    "YY/MM/DD",
    "YY/DD/MM"
];

const convertToSystemTimeZone = (dateStr, isTime) => {
    let detectedFormat = null;

    // Check each format
    for (const format of formatsToCheck) {
        if (moment(dateStr, format, true).isValid()) {
            detectedFormat = format;
            break;
        }
    }
    const systemTimeZone = moment.tz.guess();
    const utcTimeZone = 'UTC';
    // If format is detected, convert and return; otherwise, return original date string
    if (detectedFormat) {
        // Get the current system or server timezone

        console.log("Detected format:", detectedFormat, systemTimeZone, utcTimeZone);
        // Convert to system timezone and format to "YYYY-MM-DD HH:mm:ss.SSSZ"
        if (isTime)
            return moment.tz(dateStr, detectedFormat, utcTimeZone).format("YYYY-MM-DDTHH:mm:ss");
        else
            return moment.tz(dateStr, detectedFormat, utcTimeZone).format("YYYY-MM-DD");
    } else {
        if (dateStr > 0) {
            let d = excelSerialToDate(dateStr);
            console.log("Invalid date:", d);
            let updateDate = "";
            if (isTime) {
                updateDate = moment.tz(d, 'DD/MM/YYYY HH:mm:ss', utcTimeZone).format("YYYY-MM-DDTHH:mm:ss");
            } else {
                updateDate = moment.tz(d, 'DD/MM/YYYY HH:mm:ss', utcTimeZone).format("YYYY-MM-DD");
            }

            if (updateDate !== "Invalid date") {
                return updateDate;
            } else {
                return dateStr;
            }
        } else {
            return dateStr; // Return original date string if format not detected
        }
    }
};

export default convertToSystemTimeZone;