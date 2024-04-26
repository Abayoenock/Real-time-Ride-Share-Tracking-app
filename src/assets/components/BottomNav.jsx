import React from "react"
import Menu01Icon from "./icons/menu-01-stroke-rounded"
import FavouriteIcon from "./icons/favourite-stroke-rounded"
import AlertCircleIcon from "./icons/alert-circle-stroke-rounded"
import Notification03Icon from "./icons/notification-03-stroke-rounded"

const BottomNav = () => {
  return (
    <div className=" fixed px-8 w-full bottom-0 left-0 flex h-[80px] justify-between  items-center bg-gradient-to-r from-cyan-700  to-green-500">
      <FavouriteIcon />
      <AlertCircleIcon />
      <Notification03Icon />
    </div>
  )
}

export default BottomNav
