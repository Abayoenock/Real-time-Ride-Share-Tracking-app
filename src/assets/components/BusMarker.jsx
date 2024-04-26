import { Marker } from "@react-google-maps/api"
import React from "react"

const BusMarker = ({ currentLocation }) => {
  return (
    <>
      {currentLocation && (
        <Marker
          zIndex={9999}
          position={currentLocation}
          icon={{
            path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 5,
            strokeWeight: 2,
            strokeColor: "blue",
            fillColor: "blue",
            fillOpacity: 1,
            rotation: 180,
          }}
        />
      )}
    </>
  )
}

export default BusMarker
