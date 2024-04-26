import React, { useCallback, useState, useMemo, useRef } from "react"
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "70vh",
  border: 0,
  outLine: 0,
}

function Map({ currentLocation, children }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_GOOGLE_API_KEY, // Put your Google Maps API key here
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback((map) => setMap(map), [])

  const onUnmount = useCallback(() => setMap(null), [])

  const memoizedMap = useMemo(
    () => (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(event) => {
          console.log(
            "Clicked coordinates:",
            event.latLng.lat(),
            event.latLng.lng()
          )
        }}
        options={{
          mapTypeControl: false,
          zoomControl: false,
          streetViewControl: false,
          rotateControl: true,
          fullscreenControl: false,
          minZoom: 12,
        }}
      >
        {children}
      </GoogleMap>
    ),
    [currentLocation]
  )

  return isLoaded ? <div className=" w-full h-full">{memoizedMap}</div> : <></>
}

export default Map
