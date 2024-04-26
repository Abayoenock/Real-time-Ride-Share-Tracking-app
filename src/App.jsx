import React, { useCallback, useRef, useState } from "react"
import Map from "./assets/components/Map"
import BusMarker from "./assets/components/BusMarker"
import Directions from "./assets/components/Directions"
import InfoDisplay from "./assets/components/InfoDisplay"
import TopNav from "./assets/components/TopNav"
import BottomNav from "./assets/components/BottomNav"
import Navigation04Icon from "./assets/components/icons/navigation-04-stroke-rounded"

const App = () => {
  const [routeName, setRouteName] = useState("Nyabugogo - Kimironko")

  const [currentLocation, setCurrentLocation] = useState({
    lat: -1.9355377074007851,
    lng: 30.060163829002217,
  })
  const [info, setInfo] = useState({})
  const [waypoints, setWaypoints] = useState([
    {
      location: { lat: -1.9355377074007851, lng: 30.060163829002217 },
      name: "Stop B",
    },
    {
      location: { lat: -1.9358808342336546, lng: 30.08024820994666 },
      name: "Stop C",
    },
    {
      location: { lat: -1.9489196023037583, lng: 30.092607828989397 },
      name: "Stop D",
    },
    {
      location: { lat: -1.9592132952818164, lng: 30.106684061788073 },
      name: "Stop E",
    },
    {
      location: { lat: -1.9487480402200394, lng: 30.126596781356923 },
      name: "Stop F",
    },
  ])
  const [origin, setOrgin] = useState({
    lat: -1.939826787816454,
    lng: 30.0445426438232,
  })
  const [destination, setDestination] = useState({
    lat: -1.9365670876910166,
    lng: 30.13020167024439,
  })
  return (
    <div className=" w-full min-h-screen  relative ">
      <TopNav />

      <InfoDisplay info={info} routeName={routeName} />
      <Map currentLocation={currentLocation} waypoints={waypoints}>
        <BusMarker currentLocation={currentLocation} key={Date.now()} />
        <Directions
          currentLocation={currentLocation}
          waypoints={waypoints}
          origin={origin}
          destination={destination}
          setInfo={setInfo}
        />
      </Map>
      <BottomNav />

      <button
        className=" z-[99999] absolute bottom-[100px] right-4 bg-white  aspect-square p-2 rounded-full "
        onClick={() => {
          setCurrentLocation(() => {
            return { lat: -1.9487480402200394, lng: 30.126596781356923 }
          })
        }}
      >
        <Navigation04Icon width={30} height={30} />
      </button>
    </div>
  )
}

export default App
