import React, { useState } from "react";
import { atom, useRecoilState } from "recoil";
import { selectionFilterEnabled } from "./ChannelVisualization";
import { MdCancel } from "react-icons/md";
import { VideoType } from "./VideoDefinition";
import { motion } from "framer-motion";

export const selectedFilterStateAtom = atom<FilterProps>({
  key: "selectedFilterStateAtom",
  default: {
    videoType: VideoType.standard,
    sortingParameter: "0",
    order: "0",
    filterApplied: false,
  },
});

export interface FilterProps {
  videoType: VideoType;
  sortingParameter?: string;
  order?: string;
  filterApplied: boolean;
}

function FilterSelection() {
  const [isselectionFilterEnabled, setIsselectionFilterEnabled] =
    useRecoilState(selectionFilterEnabled);

  const [selectedFilterState, setselectedFilterState] =
    useRecoilState<FilterProps>(selectedFilterStateAtom);

  const [filterstateCurrent, setFilterstateCurrent] = useState<FilterProps>({
    videoType: VideoType.standard,
    sortingParameter: "0",
    order: "0",
    filterApplied: false,
  });

  const parameterName = [
    { id: 1, type: "views" },
    { id: 2, type: "publised date" },
    { id: 3, type: "duration" },
  ];
  const order = [
    { id: 1, type: "asc" },
    { id: 2, type: "desc" },
  ];

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className={`${
        isselectionFilterEnabled ? "block" : "hidden"
      } w-[400px] h-[400px] z-50 rounded-2xl absolute left-0 right-0 m-auto top-[30%] bg-[#faf7f7]  `}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="w-full flex justify-end p-2">
          <MdCancel
            onClick={() => {
              setIsselectionFilterEnabled(false);
            }}
            className="hover:cursor-pointer m-2 w-8 h-8 hover:animate-spin"
          />
        </div>

        <div className="flex flex-row justify-center items-center border p-2 m-2 rounded-xl">
          <div
            className={`h-10 w-24 p-2    font-bold text-center hover:cursor-pointer tracking-wider ${
              filterstateCurrent.videoType === VideoType.standard
                ? "bg-blue-700  rounded-2xl text-white"
                : ""
            } transition-all duration-300 `}
            onClick={() =>
              setFilterstateCurrent((prevState: FilterProps) => ({
                ...prevState,
                videoType: VideoType.standard,
              }))
            }
          >
            Videos
          </div>
          <div
            className={`h-10 w-24 p-2    font-bold text-center hover:cursor-pointer tracking-wider ${
              filterstateCurrent.videoType === VideoType.short
                ? "bg-blue-700  rounded-2xl text-white"
                : ""
            } transition-all duration-300 `}
            onClick={() =>
              setFilterstateCurrent((prevState: FilterProps) => ({
                ...prevState,
                videoType: VideoType.short,
              }))
            }
          >
            Shorts
          </div>
          <div
            className={`h-10 w-24 p-2    font-bold text-center hover:cursor-pointer tracking-wider ${
              filterstateCurrent.videoType === VideoType.all
                ? "bg-blue-700  rounded-2xl text-white"
                : ""
            } transition-all duration-300 `}
            onClick={() =>
              setFilterstateCurrent((prevState: FilterProps) => ({
                ...prevState,
                videoType: VideoType.all,
              }))
            }
          >
            All
          </div>
        </div>

        <div className="flex flex-row justify-between items-center  p-2 m-5  h-[50px] w-[80%] space-x-2">
          <select
            value={filterstateCurrent.sortingParameter}
            onChange={(e) =>
              setFilterstateCurrent((prevState: FilterProps) => ({
                ...prevState,
                sortingParameter: e.target.value,
                order: "asc",
              }))
            }
            className="outline-none rounded-lg bg-transparent border-b-2   text-base text-gray-500 p-2 h-10 tracking-widest"
          >
            <option value="0" disabled>
              sort by
            </option>
            {parameterName.map((v) => {
              return (
                <option
                  className=" bg-gray-100 tracking-widest"
                  value={v.type}
                  key={v.id}
                >
                  {v.type}
                </option>
              );
            })}
          </select>

          <select
            value={filterstateCurrent.order}
            onChange={(e) =>
              setFilterstateCurrent((prevState: FilterProps) => ({
                ...prevState,
                order: e.target.value,
              }))
            }
            className="outline-none rounded-lg bg-transparent border-b-2   text-base text-gray-500 p-2 h-10 tracking-widest"
          >
            <option value="0" disabled>
              order
            </option>
            {order.map((v) => {
              return (
                <option
                  className=" bg-gray-100 tracking-widest"
                  value={v.type}
                  key={v.id}
                >
                  {v.type}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex flex-row space-x-3">
          <div
            onClick={() => {
              setselectedFilterState(() => ({
                videoType: filterstateCurrent.videoType,
                sortingParameter: filterstateCurrent.sortingParameter,
                order: filterstateCurrent.order,
                filterApplied: filterstateCurrent.filterApplied,
              }));
              setIsselectionFilterEnabled(false);
            }}
            className="p-5  flex items-center justify-center text-white bg-blue-200 w-32 h-9 group relative overflow-hidden rounded-2xl top-16 hover:cursor-pointer"
          >
            <div className="w-0 h-full absolute  left-0 group-hover:bg-blue-700 group-hover:w-full transition-all duration-300"></div>
            <span className="absolute text-lg tracking-widest font-semibold">
              {" "}
              Apply{" "}
            </span>
          </div>
          <div
            onClick={() =>
              setFilterstateCurrent({
                videoType: VideoType.standard,
                sortingParameter: "0",
                order: "0",
                filterApplied: false,
              })
            }
            className="p-5  flex items-center justify-center text-white bg-red-200 w-32 h-9 group relative overflow-hidden rounded-2xl top-16 hover:cursor-pointer"
          >
            <div className="w-0 h-full absolute  right-0 group-hover:bg-red-700 group-hover:w-full transition-all duration-300"></div>
            <span className="absolute text-lg tracking-widest font-semibold">
              {" "}
              Reset{" "}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default FilterSelection;
