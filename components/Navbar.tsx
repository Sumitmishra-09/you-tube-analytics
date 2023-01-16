import React from "react";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Navbar = () => {
  return (
    <header
      className="xl:flex flex-col justify-start items-center  xl:max-w-[310px] h-[100%] border-r-4
     border-gray-200 pt-24 space-y-6 fixed  md:flex hidden"
    >
      <div className="text-gray-500 text-xs">ANALYTICS</div>
      <div className="flex flex-col space-y-9">
        <div className="flex flex-row space-x-2 hover-animation ">
          <Square3Stack3DIcon className="text-black w-7 h-7 " />
          <div className="text-black hidden xl:inline-block">Overview</div>
        </div>

        <div className="flex flex-row space-x-2 hover-animation ">
          <Square3Stack3DIcon className="text-black w-7 h-7" />
          <div className="text-black hidden xl:inline-block">Dashboard</div>
        </div>

        <div className="flex flex-row space-x-2 hover-animation ">
          <Square3Stack3DIcon className="text-black w-7 h-7" />
          <div className="text-black hidden xl:inline-block">Visualization</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
