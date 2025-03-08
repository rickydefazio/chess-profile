import { DateTime } from 'luxon';

export default function withinTimeFrame(timestamp: number, hours: number = 1) {
  // Convert the Unix timestamp to a Luxon DateTime object
  const dateTime = DateTime.fromSeconds(timestamp);

  // Get the current time
  const currentTime = DateTime.local();

  // Calculate the difference between the current time and the timestamp
  const timeDifference = currentTime.diff(dateTime, 'hours');

  // Check if the timestamp is within the specified timeframe (default: 1 hour)
  return timeDifference.hours <= hours;
}
