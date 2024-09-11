import {createContext, useState} from 'react'

export const rangeContext = createContext(null);

export const RangeProvider = (props) => {

  // All the data which has to be rendered will be stored in the calculatedData
  const [calculatedData, setcalculatedData] = useState({});

  // It is for the custom range
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");

  // It is for the tab's UI
  const [selectedTab, setSelectedTab ] = useState("");
  const [activeTab, setActiveTab] = useState('Day');

  return (
    <rangeContext.Provider value={{calculatedData, setcalculatedData, startDate, setstartDate, endDate, setendDate, selectedTab, setSelectedTab,activeTab, setActiveTab}}>
      {props.children}
    </rangeContext.Provider>
  );
};