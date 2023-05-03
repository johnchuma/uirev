import moment from "moment/moment";

export function formatDate(timestamp) {
    // Convert the timestamp to a moment object
    const momentObj = moment(timestamp.toDate());
  
    // Get the difference between the timestamp and the current time in seconds
    const diffInSeconds = moment().diff(momentObj, 'seconds');
  
    // Determine the appropriate time unit to display (e.g. "2 days ago", "3 hours ago", "1 min ago", or "just now")
    let timeUnit, timeValue;
    if (diffInSeconds >= 86400) {
      timeUnit = 'days';
      timeValue = Math.floor(diffInSeconds / 86400);
    } else if (diffInSeconds >= 3600) {
      timeUnit = 'hours';
      timeValue = Math.floor(diffInSeconds / 3600);
    } else if (diffInSeconds >= 60) {
      timeUnit = 'minutes';
      timeValue = Math.floor(diffInSeconds / 60);
    } else {
      timeUnit = 'seconds';
      timeValue = diffInSeconds;
    }
  
    // Format the date in the desired format (e.g. "Apr 30, 20 mins ago")
    const formattedDate = momentObj.format('MMM DD');
    
    // Construct the final string
    let displayStr;
    if (timeValue === 0) {
      displayStr = 'just now';
    } else {
      displayStr = `${timeValue} ${timeUnit} ago`;
    }
    displayStr = `${formattedDate}, ${displayStr}`;
  
    // Return the final display string
    return displayStr;
  }
  