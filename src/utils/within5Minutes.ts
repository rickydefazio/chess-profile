import { DateTime } from 'luxon';

export default function within5Minutes(timestamp: number) {
  // Convert the Unix timestamp to a Luxon DateTime object
  const dateTime = DateTime.fromSeconds(timestamp);

  // Get the current time
  const currentTime = DateTime.local();

  // Calculate the difference between the current time and the timestamp
  const timeDifference = currentTime.diff(dateTime, 'minutes');

  // Check if the timestamp is within the last 5 minutes
  return timeDifference.minutes <= 5;
}
