import React from "react"
import Menu01Icon from "./icons/menu-01-stroke-rounded"

const TopNav = () => {
  return (
    <div className=" flex h-[60px] justify-between  items-center px-6 bg-gradient-to-r from-cyan-400  to-green-500">
      <Menu01Icon width={30} height={30} />
      <h1 className=" text-gray-700 font-extrabold text-2xl">Startup</h1>
    </div>
  )
}

export default TopNav
