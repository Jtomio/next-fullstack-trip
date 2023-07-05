import React from 'react'
import { FaHotel } from 'react-icons/fa'
import { TbBuildingCottage } from 'react-icons/tb'
import { MdOutlineCottage } from 'react-icons/md'
import { GiCampingTent } from 'react-icons/gi'

export default function QuickSearch() {
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[2px] bg-grayLighter"></div>
        <h2 className="font-medium text-grayPrimary whitespace-nowrap px-5">
          Tente pesquisar por
        </h2>
        <div className="w-full h-[2px] bg-grayLighter"></div>
      </div>

      <div className="flex justify-between p-5">
        <div className="flex flex-col items-center gap-1">
          <FaHotel size={30} />
          <p className="text-sm text-grayPrimary">Hotel</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <TbBuildingCottage size={30} />
          <p className="text-sm text-grayPrimary">Fazenda</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <MdOutlineCottage size={30} />
          <p className="text-sm text-grayPrimary">Chalé</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <GiCampingTent size={30} />
          <p className="text-sm text-grayPrimary">Camping</p>
        </div>
      </div>
    </div>
  )
}
