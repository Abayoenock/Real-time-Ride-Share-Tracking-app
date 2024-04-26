import { useState } from "react"
import ArrowDownDoubleIcon from "./icons/arrow-down-double-stroke-rounded"

const InfoDisplay = ({ info, routeName }) => {
  const [moreDisplay, setMoreDisplay] = useState(false)
  const calculateTotalDistanceAndTime = (
    remainingWaypoints,
    distanceRemaining,
    timeRemaining
  ) => {
    let totalDistance = distanceRemaining?.[0]?.value || 0
    let totalTime = timeRemaining?.[0]?.value || 0
    remainingWaypoints = remainingWaypoints?.slice(1)
    distanceRemaining = distanceRemaining?.slice(1)
    timeRemaining = timeRemaining?.slice(1)

    return remainingWaypoints?.map((wayPoint, index) => {
      const distance = distanceRemaining?.[index]?.value || 0
      const time = timeRemaining?.[index]?.value || 0

      totalDistance += distance
      totalTime += time

      return (
        <div
          key={index}
          className=" flex flex-col p-2 border border-dashed border-cyan-700  "
        >
          <div className=" text-lg font-semibold">{wayPoint.name}</div>
          <div className="flex gap-6">
            <div>Distance: {(totalDistance / 1000).toFixed(1)} km</div>
            <div>Time: {(totalTime / 60).toFixed(1)} mins</div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className=" w-full flex flex-col gap-1 bg-white p-4 px-6 pb-8 h-fit transition-all duration-300">
      <div className="w-full relative ">
        <h1 className=" text-gray-600 font-black text-xl">{routeName}</h1>

        <div className="">Next Stop: {info?.nextStop}</div>
        <div className=" flex gap-4 text-lg">
          <span>Distance: {info?.distanceRemaining?.[0]?.text}</span>
          <span>Time: {info?.timeRemaining?.[0]?.text}</span>
        </div>
        <button
          className={` p-1 absolute bottom-1 right-2 flex justify-center items-center transition-all duration-300 origin-center ${
            moreDisplay && " rotate-180 transform -translate-y-3"
          } `}
          onClick={() => {
            setMoreDisplay((prev) => !prev)
          }}
        >
          <ArrowDownDoubleIcon className={`animate-bounce  `} />
        </button>
      </div>
      {moreDisplay && (
        <div
          className={` flex  flex-col gap-2 mt-4 transition-all duration-300  `}
        >
          {calculateTotalDistanceAndTime(
            info?.remainingWaypoints,
            info?.distanceRemaining,
            info?.timeRemaining
          )}
        </div>
      )}

      {/*

      

      Total duration from origin to destination  
      <div className="">Duration:{info?.duration} </div>
      <div className="">Distance :{info?.distance}</div> */}

      {/* <hr />
        total duration and time from current position  to destination 
      <div className="">
        Duration to destination:{info?.totalDurationRemaining}{" "}
      </div>
      <div className="">
        Distance to destination :{info?.totalDistanceRemaining}
      </div> */}
    </div>
  )
}

export default InfoDisplay
