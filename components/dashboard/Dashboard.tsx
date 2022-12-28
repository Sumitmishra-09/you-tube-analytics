import axios from "axios";
import { stringify } from "querystring";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Convert, Welcome } from "./VideoDefinition";
import { DateRange } from "react-date-range";
import InputSelectionComponent from "./InputSelectionComponent";
import ChannelVisualization from "./ChannelVisualization";

function Dashboard() {
  const [enableDataVisualization, setEnableDataVisualization] = useState(false);

  function handleDataSubmission() {
    setEnableDataVisualization(true);
  }

  return (
    <div className="w-[80%] mt-11 ">
      {enableDataVisualization === false ? (
        <InputSelectionComponent dataVisualization={handleDataSubmission} />
      ) : (
        <ChannelVisualization />
      )}
    </div>
  );
}

export default Dashboard;
