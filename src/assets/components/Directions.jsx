import React, { useCallback, useEffect, useMemo, useState } from "react"
import { DirectionsService, DirectionsRenderer } from "@react-google-maps/api"

const Directions = ({
  currentLocation,
  waypoints,
  setInfo,
  destination,
  origin,
}) => {
  const [response, setResponse] = useState(null)

  const DistanceAndTime = (start, destination, waypoints) => {
    const directionsService = new window.google.maps.DirectionsService()
    const request = {
      origin: start,
      destination: destination,
      waypoints: waypoints.map((waypoint) => ({
        location: waypoint.location,
      })),
      optimizeWaypoints: true,
      travelMode: "DRIVING",
    }

    directionsService.route(request, (result, status) => {
      let totalDuration = 0
      let totalDistance = 0
      if (status === "OK") {
        const route = result.routes[0]
        // loop trough to calcluate the total distance reminaing from the cureent posistion to the destination
        for (let i = 0; i < route.legs.length; i++) {
          totalDuration += route.legs[i].duration.value
          totalDistance += route.legs[i].distance.value
        }

        // get the distance to all the next stops
        const distanceToNextStops = route.legs.map((leg) => leg.distance)
        const durationToNextStops = route.legs.map((leg) => leg.duration)

        setInfo((prev) => {
          return {
            ...prev,
            totalDistanceRemaining: (totalDistance / 1000).toFixed(1),
            totalDurationRemaining: (totalDuration / 60).toFixed(1),
            distanceRemaining: distanceToNextStops,
            timeRemaining: durationToNextStops,
            remainingWaypoints: waypoints,
          }
        })

        return
      } else {
        console.error("Error fetching directions:", status)

        return
      }
    })
  }

  // Function to calculate distance between two points using Haversine formula
  const calculateDistance = (point1, point2) => {
    const toRadians = (degrees) => {
      return (degrees * Math.PI) / 180
    }
    const earthRadiusKm = 6371 // Radius of the Earth in kilometers
    const lat1 = toRadians(point1.lat)
    const lon1 = toRadians(point1.lng)
    const lat2 = toRadians(point2.lat)
    const lon2 = toRadians(point2.lng)

    const dLat = lat2 - lat1
    const dLon = lon2 - lon1

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const distance = earthRadiusKm * c // Distance in kilometers

    return distance
  }

  const directionsCallback = useCallback(
    (response) => {
      if (response !== null && response.status === "OK") {
        setResponse(response)
        let totalDistance = 0
        let totalDuration = 0
        let minDistance = Number.MAX_VALUE
        const route = response.routes[0]
        let distanceFromCurent = 0
        let minIndex = 0
        for (let i = 0; i < route.legs.length; i++) {
          totalDistance += route.legs[i].distance.value
          totalDuration += route.legs[i].duration.value

          distanceFromCurent = calculateDistance(currentLocation, {
            lat: route.legs[i].start_location.lat(),
            lng: route.legs[i].start_location.lng(),
          })
          if (minDistance > distanceFromCurent) {
            minDistance = distanceFromCurent
            if (minDistance > 0.02 && minDistance < 0.5) {
              minIndex = i - 1
            } else {
              minIndex = i
            }
          }
        }
        //console.log(minDistance)
        const totalDistanceFormatted = (totalDistance / 1000).toFixed(1) + " km"
        const totalDurationMinutes = Math.floor(totalDuration / 60)
        const totalDurationFormatted = totalDurationMinutes + " minutes"

        //console.log(waypoints.slice(minIndex))
        const remainingWaypoints = waypoints.slice(minIndex)
        DistanceAndTime(currentLocation, destination, remainingWaypoints)

        setInfo((prev) => {
          return {
            ...prev,
            distance: totalDistanceFormatted,
            duration: totalDurationFormatted,
            nextStop: remainingWaypoints?.[0]?.name || " No next stop",
          }
        })
      } else {
        console.log("Directions request failed due to " + response?.status)
      }
    },
    [currentLocation, waypoints]
  )

  const directionsOptions = useMemo(
    () => ({
      destination: destination,
      origin: origin,
      travelMode: "DRIVING",
      waypoints: waypoints.map((waypoint) => ({
        location: waypoint.location,
      })),
      optimizeWaypoints: true,
    }),
    [waypoints, currentLocation]
  )

  return (
    <>
      <DirectionsService
        options={directionsOptions}
        callback={directionsCallback}
      />

      {response !== null && <DirectionsRenderer directions={response} />}
    </>
  )
}

export default Directions
