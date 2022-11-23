/**
 * Calculate the center/average of multiple geoLocation coordinates.
 * Expects an array of objects with latitude and longitude properties.
 *
 * Referenced from @url https://gist.github.com/tlhunter/0ea604b77775b3e7d7d25ea0f70a23eb
 */
const averageGeolocation = (coords) => {
  if (coords.length === 1) return coords[0];

  let x = 0.0;
  let y = 0.0;
  let z = 0.0;

  for (let coord of coords) {
    let latitude = (coord.latitude * Math.PI) / 180;
    let longitude = (coord.longitude * Math.PI) / 180;

    x += Math.cos(latitude) * Math.cos(longitude);
    y += Math.cos(latitude) * Math.sin(longitude);
    z += Math.sin(latitude);
  }

  let total = coords.length;

  x = x / total;
  y = y / total;
  z = z / total;

  let centralLongitude = Math.atan2(y, x);
  let centralSquareRoot = Math.sqrt(x * x + y * y);
  let centralLatitude = Math.atan2(z, centralSquareRoot);

  return {
    lat: (centralLatitude * 180) / Math.PI,
    lng: (centralLongitude * 180) / Math.PI,
  };
};

export default averageGeolocation;
