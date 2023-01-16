import React, { useState } from "react";
import { motion } from "framer-motion";
import { BackwardIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-date-picker";
import { DateRange, Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format, parseISO, parse } from "date-fns";
import { atom, useRecoilState } from "recoil";
import axios from "axios";
import { Convert } from "./VideoDefinition";
import { globalSelectedKeyAtom } from "./Dashboard";

interface Props {
  dataVisualization: () => void;
}

export const channelIdState = atom({
  key: "channelIdState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export const selectedDateState = atom({
  key: "selectedDateState", // unique ID (with respect to other atoms/selectors)
  default: new Date(), // default value (aka initial value)
});

function InputSelectionComponent({ dataVisualization }: Props) {
  const [channelId, setChannelId] = useRecoilState(channelIdState);
  const [internalChannelId, setInternalChannelId] = useState("");

  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [isChannelIdSelected, setIsChannelIdSelected] = useState(false);
  const [handleSearchEnabled, setHandleSearchEnabled] = useState(false);
  const [userHandle, setUserHandle] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [globalSelectedKey, setGlobalSelectedKey] = useRecoilState(
    globalSelectedKeyAtom
  );

  function channelIdSelectionHandler(selectState: Boolean) {
    if (selectState === true) {
      setIsChannelIdSelected(true);
      return;
    }

    setIsChannelIdSelected(false);
  }

  const dateChangeHandler = (date: Date) => {
    setSelectedDate(date);
  };

  const getChannelIdFromHandle = () => {
    return axios
      .get("https://yt.lemnoslife.com/channels?handle=" + userHandle)
      .then((res) => {
        console.log(res);
        if (res.data.items[0].id != null) {
          console.log(res.data.items[0].id);
          setChannelId(res.data.items[0].id);
          return true;
        }

        return false;
      });
  };

  const validateChannelId = () => {
    return axios
      .get(
        "https://www.googleapis.com/youtube/v3/search?channelId=" +
          channelId +
          "&publishedAfter=2022-04-01T00:00:00Z&maxResults=48&pageToken=&part=snippet&order=date&key=" +
          globalSelectedKey
      )
      .then((response) => {
        const welcome = Convert.toWelcome(JSON.stringify(response.data));
        if (welcome.items.length > 1) {
          return true;
        }
        return false;
      })
      .catch(() => {
        return false;
      });
  };

  const channelHandler = async () => {
    setChannelId(internalChannelId);
    let response = false;

    if (userHandle.length > 1 && channelId.length < 1) {
      response = await getChannelIdFromHandle();
    }
    response = await validateChannelId();

    if (response) {
      channelIdSelectionHandler(true);
    } else {
      setValidationError(true);
    }
  };

  return (
    <div className="flex flex-row justify-evenly p-5 items-center  ">
      {isChannelIdSelected === false && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-[500px] h-[500px] rounded-3xl border-2 shadow-xl flex items-center justify-evenly flex-col bg-white overflow-hidden"
        >
          <div className="tracking-widest text-lg text-center underline underline-offset-8  ">
            {globalSelectedKey}
          </div>
          <div
            className={`${
              !handleSearchEnabled ? "flex" : "hidden"
            } flex flex-col  space-y-4`}
          >
            <div
              onClick={() => setHandleSearchEnabled(true)}
              className="text-gray-400  text-sm hover:cursor-pointer tracking-widest   flex-row 
            justify-center items-center space-x-2 flex hover:text-gray-700"
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
              <span>search using handle</span>
            </div>
            <input
              placeholder="Enter Channel Id "
              className=" outline-none rounded-full p-5 bg-transparent border-b text-center text-gray-500 w-96  transition-all  duration-300"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserHandle("");
                setInternalChannelId(e.target.value);
              }}
            />
          </div>

          <div
            className={`${
              handleSearchEnabled ? "flex" : "hidden"
            }   flex-col  space-y-4 `}
          >
            <div
              onClick={() => setHandleSearchEnabled(false)}
              className="text-gray-400 text-sm hover:cursor-pointer tracking-widest   flex-row 
               justify-center items-center space-x-2 flex hover:text-gray-700"
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
              <span>search using channel id</span>
            </div>
            <input
              placeholder="Enter User Handle"
              className=" outline-none rounded-full p-5 bg-transparent border-b text-center text-gray-500 w-96  transition-all  duration-300"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserHandle(e.target.value);
                setChannelId("");
                setInternalChannelId("");
              }}
            />
          </div>

          <button
            className="border hover:bg-gray-400 rounded-full w-48 h-14 transition-all duration-200 p-2 text-lg tracking-wide font-semibold shadow-sm"
            onClick={channelHandler}
          >
            Continue
          </button>

          <span
            className={`${
              validationError ? "block" : "hidden"
            } text-sm tracking-widest text-red-500`}
          >
            * channel ID or Handle or Key entered is invalid
          </span>
        </motion.div>
      )}
      {isChannelIdSelected === true && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-[400px] h-[500px] rounded-3xl border-2 shadow-xl flex items-center justify-evenly flex-col bg-white"
        >
          <div className="text-gray-500">Publish Date</div>

          <Calendar date={selectedDate} onChange={dateChangeHandler} />
          <div className="flex flex-col items-center justify-between space-y-9">
            <button
              className="border hover:bg-gray-400 rounded-full w-48 h-14 transition-all duration-200 p-2 text-lg tracking-wide font-semibold shadow-sm"
              onClick={dataVisualization}
            >
              Continue
            </button>
            <BackwardIcon
              className="w-12 h-12 bg-white border rounded-full p-2 hover:bg-gray-400"
              onClick={() => channelIdSelectionHandler(false)}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default InputSelectionComponent;
