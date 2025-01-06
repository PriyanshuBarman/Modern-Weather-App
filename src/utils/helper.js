export const weatherDescription = {
  0: "Unknown",
  1000: "Clear",
  1100: "Mostly Clear",
  1101: "Partly Cloudy",
  1102: "Mostly Cloudy",
  1001: "Cloudy",
  2000: "Fog",
  2100: "Light Fog",
  4000: "Drizzle",
  4001: "Rain",
  4200: "Light Rain",
  4201: "Heavy Rain",
  5000: "Snow",
  5001: "Flurries",
  5100: "Light Snow",
  5101: "Heavy Snow",
  6000: "Freezing Drizzle",
  6001: "Freezing Rain",
  6200: "Light Freezing Rain",
  6201: "Heavy Freezing Rain",
  7000: "Ice Pellets",
  7101: "Heavy Ice Pellets",
  7102: "Light Ice Pellets",
  8000: "Thunderstorm",
};

export const getImageName = (description, isDayTime) => {
  if (
    [
      "Cloudy",
      "Partly Cloudy",
      "Mostly Cloudy",
      "Heavy Rain",
      "Thunderstorm",
    ].includes(description)
  ) {
    return description; // Return the description as the image name
  }
  if (["Light Rain", "Rain"].includes(description)) {
    return "Light Rain";
  }
  if (["Snow", "Flurries", "Light Snow", "Heavy Snow"].includes(description)) {
    return "Snow";
  }
  if (
    ["Ice Pellets", "Light Ice Pellets", "Heavy Ice Pellets"].includes(
      description,
    )
  ) {
    return "IcePellets";
  }
  if (["Drizzle"].includes(description)) {
    return "Light Rain";
  }
  if (["Freezing Drizzle"].includes(description)) {
    return "Freezing";
  }
  if (["Fog", "Light Fog"].includes(description)) {
    return "Fog";
  }
  // Special case based on Day or Night
  if (["Clear","Mostly Clear"].includes(description) ) {
    return isDayTime ? "Clear" : "Star";
  }


  // Default fallback image
  return "scatteredOvercastClouds";
};

export function getUvHealthConcern(value) {
  if (value >= 0 && value <= 2) {
    return "Low";
  } else if (value >= 3 && value <= 5) {
    return "Moderate";
  } else if (value >= 6 && value <= 7) {
    return "High";
  } else if (value >= 8 && value <= 10) {
    return "Very High";
  } else {
    return "";
  }
}
// ==========\Time Provider/============

export function getTime(utcTime, timeZone) {
  if (!utcTime || !timeZone) return;

  try {
    const date = new Date(utcTime);
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch (error) {
    console.error("Error converting time:", error);
    return null;
  }
}

export function getDayName(utcTime, timeZone) {
  if (!utcTime || !timeZone) return;

  try {
    const date = new Date(utcTime);
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "long",
    }).format(date);
  } catch (error) {
    console.error("Error getting day name:", error);
    return null;
  }
}

//=====================================================
function convertTo24HourFormat(time12hr) {
  const [time, period] = time12hr.split(" ");
  let [hours, minutes] = time.split(":");
  if (period === "AM") {
    if (hours === "12") hours = "00";
  } else if (period === "PM") {
    if (hours !== "12") hours = (parseInt(hours) + 12).toString();
  }
  return `${hours}:${minutes}`;
}

export function getDayOrNight(currentTime, sunrise, sunset) {
  if (!currentTime || !sunrise || !sunset) return;

  const sunrise24 = convertTo24HourFormat(sunrise);
  const sunset24 = convertTo24HourFormat(sunset);
  const currentTime24 = convertTo24HourFormat(currentTime);
  
  const isDayTime = currentTime24 >= sunrise24 && currentTime24 <= sunset24;
  return isDayTime;
}