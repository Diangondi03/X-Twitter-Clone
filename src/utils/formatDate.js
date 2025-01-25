export function formatDate(date) {
    const now = new Date();
    const tweetDate = new Date(date);
    const diffInSeconds = Math.floor((now - tweetDate) / 1000);
  
    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInYear = 365 * secondsInDay;
  
    if (diffInSeconds < secondsInMinute) {
      return `${diffInSeconds}s`;
    } else if (diffInSeconds < secondsInHour) {
      const minutes = Math.floor(diffInSeconds / secondsInMinute);
      return `${minutes}m`;
    } else if (diffInSeconds < secondsInDay) {
      const hours = Math.floor(diffInSeconds / secondsInHour);
      return `${hours}h`;
    } else if (diffInSeconds < secondsInYear) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = months[tweetDate.getMonth()];
      const day = tweetDate.getDate();
      return `${month} ${day}`;
    } else {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = months[tweetDate.getMonth()];
      const day = tweetDate.getDate();
      const year = tweetDate.getFullYear();
      return `${month} ${day}, ${year}`;
    }
}