//This component renders a date range picker that allows the user to select a specific date range to view the statistics for.
//The component uses the useContext hook to get the range state from the RangeContext.
//The component renders 3 buttons, one for today, one for yesterday and one for the day before yesterday.
//When a button is clicked, it calls the setcalculatedData function and passes the selected date range to it.
//The component also renders a link to the stats page.

import { useContext } from "react";
import { Link } from "react-router-dom";
import DummyData from "../DummyData/DummyData.json";
import { rangeContext } from "../Context/Range";


//This component will display the stats of the user for the current month, last month and last 30 days

const MonthComponent = () => {
  const range = useContext(rangeContext);
  const Data = DummyData;
  //Data will get sorted in descending on the basis of start date unix time stamp
  Data.sort((a, b) => b.startDate - a.startDate); 


//This function will set the selected tab to "This Month" and calculate the stats for the current month

  const thisMonthFun = () => {
    range.setSelectedTab("This Month");
    const currentMonth = new Date(Data[0].startDate).getMonth();

    let calculatedDataObject = {
      distance: 0,
      duration: 0,
      averageSpeed: 0,
      topSpeed: 0,
      score: 0,
    };

    let iteration = 0; //Variable for calculating number of days for calculating average speed and average score
    Data.map((item) => {
      if (new Date(item.startDate).getMonth() === currentMonth) {
        calculatedDataObject.distance += item.distance;
        calculatedDataObject.duration += item.duration;
        calculatedDataObject.averageSpeed += item.averageSpeed;
        if (calculatedDataObject.topSpeed < item.topSpeed) {
          calculatedDataObject.topSpeed = item.topSpeed;
        }
        calculatedDataObject.score = item.score===undefined ? calculatedDataObject.score : calculatedDataObject.score + item.score;
        iteration++;
      }
    });

    calculatedDataObject.averageSpeed = calculatedDataObject.averageSpeed / iteration;
    calculatedDataObject.score = calculatedDataObject.score / iteration;
    range.setcalculatedData(calculatedDataObject);
    console.log(range.calculatedData.score);
  };


//This function will set the selected tab to "Last Month" and calculate the stats for the last month

  const lastMonthFun = () => {
    range.setSelectedTab("Last Month");
    // Calculating the previous month number
    const previousMonth = new Date(Data[0].startDate).getMonth() - 1;
    let calculatedDataObject = {
      distance: 0,
      duration: 0,
      averageSpeed: 0,
      topSpeed: 0,
      score: 0,
    };

    let iteration = 0;//Variable for calculating number of days for calculating average speed and average score
    Data.map((item) => {
      if (new Date(item.startDate).getMonth() === previousMonth) {
        calculatedDataObject.distance += item.distance;
        calculatedDataObject.duration += item.duration;
        calculatedDataObject.averageSpeed += item.averageSpeed;
        if (calculatedDataObject.topSpeed < item.topSpeed) {
          calculatedDataObject.topSpeed = item.topSpeed;
        }
        calculatedDataObject.score = item.score===undefined ? calculatedDataObject.score : calculatedDataObject.score + item.score;
        iteration++;
        console.log(item.distance)
      }
    });

    calculatedDataObject.averageSpeed = calculatedDataObject.averageSpeed / iteration;
    calculatedDataObject.score = calculatedDataObject.score / iteration;
    range.setcalculatedData(calculatedDataObject);
  };

   //This function will set the selected tab to "Last 30 Days" and calculate the stats for the last 30 days
  const last30Fun = () => {
    range.setSelectedTab("Last 30 Days");
    const last30data = Data.slice(0, 30); //this will get the last 30 days in jumbled data as well because Data is sorted in line 12
    let calculatedDataObject = {
      distance: 0,
      duration: 0,
      averageSpeed: 0,
      topSpeed: 0,
      score: 0,
    };

    let iteration = 0;//Variable for calculating number of days for calculating average speed and average score
    last30data.map((item) => {
      calculatedDataObject.distance += item.distance;
      calculatedDataObject.duration += item.duration;
      calculatedDataObject.averageSpeed += item.averageSpeed;
      if (calculatedDataObject.topSpeed < item.topSpeed) {
        calculatedDataObject.topSpeed = item.topSpeed;
      }
      calculatedDataObject.score = item.score===undefined ? calculatedDataObject.score : calculatedDataObject.score + item.score;
      iteration++;
    });

    calculatedDataObject.averageSpeed = calculatedDataObject.averageSpeed / iteration;
    calculatedDataObject.score = calculatedDataObject.score / iteration;
    range.setcalculatedData(calculatedDataObject);
  };

  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <div className="min-w-full leading-normal">
            <div className="flex flex-col">
              <button
                onClick={thisMonthFun}
                className={
                  range.selectedTab === "This Month"
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }
              >
                <div
                  className={
                    range.selectedTab === "This Month"
                      ? "border-b border-blue-500"
                      : "border-b"
                  }
                >
                  <div className="px-5 py-5">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <h2
                          className={
                            range.selectedTab === "This Month"
                              ? "text-white-900 font-bold"
                              : "text-gray-900 font-bold"
                          }
                        >
                          This Month
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={lastMonthFun}
                className={
                  range.selectedTab === "Last Month"
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }
              >
                <div
                  className={
                    range.selectedTab === "Last Month"
                      ? "border-b border-blue-500"
                      : "border-b"
                  }
                >
                  <div className="px-5 py-5">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <h2
                          className={
                            range.selectedTab === "Last Month"
                              ? "text-white-900 font-bold"
                              : "text-gray-900 font-bold"
                          }
                        >
                          Last Month
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={last30Fun}
                className={
                  range.selectedTab === "Last 30 Days"
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }
              >
                <div
                  className={
                    range.selectedTab === "Last 30 Days"
                      ? "border-b border-blue-500"
                      : "border-b"
                  }
                >
                  <div className="px-5 py-5">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <h2
                          className={
                            range.selectedTab === "Last 30 Days"
                              ? "text-white-900 font-bold"
                              : "text-gray-900 font-bold"
                          }
                        >
                          Last 30 days
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <Link
                to={"/"}
                className="flex justify-center text-blue-500 my-10 hover:text-blue-700 font-bold"
              >
                <button className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                  Show Stats
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthComponent;

