import React, { useState } from "react";
import { motion } from "framer-motion";
import { BackwardIcon } from "@heroicons/react/24/solid";
import DatePicker from "react-date-picker";
import { DateRange, Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format, parseISO, parse } from "date-fns";
import { atom, useRecoilState } from "recoil";

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
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [isChannelIdSelected, setIsChannelIdSelected] = useState(false);

  function channelIdSelectionHandler(selectState: Boolean) {
    if (selectState === true) {
      setIsChannelIdSelected(true);
      return;
    }

    setIsChannelIdSelected(false);
  }

  const dateChangeHandler = (date: Date) => {
    setSelectedDate(date);
    console.log(selectedDate);
    console.log(channelId);
  };

  return (
    <div className="flex flex-row justify-evenly p-5 items-center ">
      {isChannelIdSelected === false && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-[400px] h-[500px] rounded-3xl border-2 shadow-xl flex items-center justify-evenly flex-col"
        >
          <input
            placeholder="Channel Id "
            className=" outline-none rounded-full p-2 bg-transparent hover:border-b text-center text-gray-500 w-96 hover:drop-shadow-2xl transition-all  duration-300"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setChannelId(e.target.value)
            }
          />
          <button
            className="border hover:bg-gray-400 rounded-full w-48 h-14 transition-all duration-200 p-2 text-lg tracking-wide font-semibold shadow-sm"
            onClick={() => channelIdSelectionHandler(true)}
          >
            Continue
          </button>
        </motion.div>
      )}
      {isChannelIdSelected === true && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-[400px] h-[500px] rounded-3xl border-2 shadow-xl flex items-center justify-evenly flex-col"
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
