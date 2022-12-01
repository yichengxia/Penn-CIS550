import React, { useState, useEffect } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import RestaurantCard from "./RestaurantCard";
import { averageGeolocation } from "utils";
import { DEFAULT_COORDS } from "constants/constants";

const GoogleMap = ({ google, restaurantItems }) => {
  const [centerCoords, setCenterCoords] = useState(DEFAULT_COORDS);

  const [activeMarker, setActiveMarker] = useState({});
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState({});

  const onMarkerClick = (props, marker, e) => {
    setSelectedRestaurant(props);
    setActiveMarker(marker);
    setShowInfoWindow(true);
  };

  const onMapClick = () => {
    if (showInfoWindow) {
      setActiveMarker(null);
      setShowInfoWindow(false);
    }
  };

  /**
   * Set initialCenter to average coordinates.
   * Set to default coordinates if there is no restaurant data.
   */
  useEffect(() => {
    if (restaurantItems && restaurantItems.length > 0) {
      const coords = restaurantItems.map((item) => {
        const { longitude, latitude } = item;
        return { longitude, latitude };
      });
      setCenterCoords(averageGeolocation(coords));
    }
  }, [restaurantItems]);

  return (
    <Map
      google={google}
      zoom={10}
      mapTypeControl={false}
      initialCenter={centerCoords}
      center={centerCoords}
      onClick={onMapClick}
    >
      {restaurantItems.map((item) => (
        <Marker
          key={item.restaurantId}
          item={item}
          position={{
            lat: item.latitude,
            lng: item.longitude,
          }}
          onClick={onMarkerClick}
        />
      ))}

      <InfoWindow marker={activeMarker} visible={showInfoWindow}>
        <RestaurantCard {...selectedRestaurant.item} />
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
})(GoogleMap);
