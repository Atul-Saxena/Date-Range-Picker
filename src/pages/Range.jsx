import DayComponent from "../Components/DayComponent";
import WeekComponent from "../Components/WeekComponent";
import MonthComponent from "../Components/MonthComponent";
import OthersComponent from "../Components/OthersComponent";
import { useContext } from "react";
import { rangeContext } from "../Context/Range";

const Range = () => {
  const range = useContext(rangeContext);
  
  const renderContent = () => {
    switch (range.activeTab) {
      case 'Day':
        return <DayComponent />;
      case 'Week':
        return <WeekComponent />;
      case 'Month':
        return <MonthComponent />;
      case 'Others':
        return <OthersComponent />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 max-w-2xl mx-auto md:max-w-3xl lg:max-w-5xl">
      <h1 className="text-center text-3xl font-bold my-10">Select Range</h1>
      <div className="flex flex-wrap justify-center space-x-4 space-y-2 md:space-x-6 md:space-y-0 mb-4 border-b border-gray-200">
        {['Day', 'Week', 'Month', 'Others'].map((tab) => (
          <button
            key={tab}
            onClick={() => range.setActiveTab(tab)}
            className={`py-2 px-4 rounded-t-lg font-medium transition-all duration-300 ${range.activeTab === tab
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
        {renderContent()}
      </div>
    </div>
  );
}


export default Range