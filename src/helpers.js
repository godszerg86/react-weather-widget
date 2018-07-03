export const dayFromTimeStamp = (unix_timestamp) => {
  let a = new Date(unix_timestamp * 1000);
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const dayOfWeek = days[a.getDay()];
  const date = a.toString().substring(4, 24);

  return {
    dayOfWeek,
    date
  };
}

export const skyClassIs = (string) => {
  if (string === 'rain') {
    return 'w-widget-rain';
  }
  if (string === 'clear-day' || string === 'clear-night') {
    return 'w-widget-sun';
  }
  if (string === 'cloudy' || string === 'partly-cloudy-night') {
    return 'w-widget-cloud';
  }
  if (string === 'partly-cloudy-day') {
    return 'w-widget-cloud w-widget-sun';
  }
  if (string === 'wind') {
    return 'w-widget-wind';
  }
}

export const windDirection = (bearing) => {
  const value = Math.floor((bearing / 22.5) + 0.5);
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return directions[(value % 16)];
}

