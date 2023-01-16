import { motion } from "framer-motion";
import React from "react";

interface Props {
  parameterName: String;
  value: number;
  borderColor: String;
}

function SummaryCard({ parameterName, value, borderColor }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.1 }}
      className={`w-60 h-28 md:w-60  xl:w-72  rounded-lg border bg-white ${borderColor} border-b-4 flex-shrink-0 m-1 mb-28 `}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="p-2 font-thin text-gray-400 text-sm">
          {parameterName}
        </div>
        <div className="font-bold text-xl  ">
          {value?.toLocaleString("en-IN")}
        </div>
      </div>
    </motion.div>
  );
}

export default SummaryCard;
