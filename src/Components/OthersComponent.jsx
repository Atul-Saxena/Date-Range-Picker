// This component renders the statistics for a given time range.
// The time range can be selected by clicking on the corresponding button.
// The available time ranges are: "This Year", "Last Year", "Lifetime" and a custom range that can be selected by the user.
// When a time range is selected, the component will calculate the statistics for that range and store them in the rangeContext.
// The statistics are calculated by going through all the data points and summing up the values for each data point that falls within the selected time range.
// The average speed and the score are then calculated by dividing the sum of the values by the number of data points within the range.

import { useContext } from 'react'
import { Link } from 'react-router-dom';
import DummyData from '../DummyData/DummyData.json'
import { rangeContext } from '../Context/Range'

const Data = DummyData;


const OthersComponent = () => {
  const range = useContext(rangeContext);


  // This function will set the selected tab to "This Year" and calculate the statistics for the current year.

  const thisYearFun = () => {
    range.setSelectedTab("This Year");
    const currentYear = new Date(Data[0].startDate).getFullYear();

    let calculatedDataObject = {
      distance: 0,
      duration: 0,
      averageSpeed: 0,
      topSpeed: 0,
      score: 0
    }

    let iteration = 0;//Variable for calculating number of days for calculating average speed and average score
    Data.map((item) => {
      if (new Date(item.startDate).getFullYear() === currentYear) {
        calculatedDataObject.distance += item.distance;
        calculatedDataObject.duration += item.duration;
        calculatedDataObject.averageSpeed += item.averageSpeed;
        if (calculatedDataObject.topSpeed < item.topSpeed) {
          calculatedDataObject.topSpeed = item.topSpeed
        }
        if (item.score != undefined) {
          calculatedDataObject.score += item.score;
        }
        iteration++;
      }
    });

    calculatedDataObject.averageSpeed = calculatedDataObject.averageSpeed / iteration;
    calculatedDataObject.score = calculatedDataObject.score / iteration;
    range.setcalculatedData(calculatedDataObject);

  }


  // This function will set the selected tab to "Last Year" and calculate the statistics for the last year.

  const lastYearFun = () => {
    range.setSelectedTab("Last Year");
    const previousYear = new Date(Data[0].startDate).getFullYear() - 1;

    let calculatedDataObject = {
      distance: 0,
      duration: 0,
      averageSpeed: 0,
      topSpeed: 0,
      score: 0
    }
    // in the provided dummydata the last year data is not present so it will give default values

    let iteration = 0;//Variable for calculating number of days for calculating average speed and average score
    Data.map((item) => {
      if (new Date(item.startDate).getFullYear() === previousYear) {
        calculatedDataObject.distance += item.distance;
        calculatedDataObject.duration += item.duration;
        calculatedDataObject.averageSpeed += item.averageSpeed;
        if (calculatedDataObject.topSpeed < item.topSpeed) {
          calculatedDataObject.topSpeed = item.topSpeed
        }
        if (item.score != undefined) {
          calculatedDataObject.score += item.score;
        }
        iteration++;
      }
    });

    calculatedDataObject.averageSpeed = calculatedDataObject.averageSpeed / iteration;
    calculatedDataObject.score = calculatedDataObject.score / iteration;
    range.setcalculatedData(calculatedDataObject);
  }


  // This function will set the selected tab to "Lifetime" and calculate the statistics for the lifetime or entire data.

  const LifetimeFun = () => {
    range.setSelectedTab("Lifetime");

    let calculatedDataObject = {
      distance: 0,
      duration: 0,
      averageSpeed: 0,
      topSpeed: 0,
      score: 0
    }

    let iteration = 0;//Variable for calculating number of days for calculating average speed and average score

    Data.map((item) => {
      calculatedDataObject.distance += item.distance;
      calculatedDataObject.duration += item.duration;
      calculatedDataObject.averageSpeed += item.averageSpeed;
      if (calculatedDataObject.topSpeed < item.topSpeed) {
        calculatedDataObject.topSpeed = item.topSpeed
      }
      if (item.score != undefined) {
        calculatedDataObject.score += item.score;
      }
      iteration++;
    });

    calculatedDataObject.averageSpeed = calculatedDataObject.averageSpeed / iteration;
    calculatedDataObject.score = calculatedDataObject.score / iteration;
    range.setcalculatedData(calculatedDataObject);
  }



  // This function will set the selected tab to "Custom" and calculate the statistics for the custom range.
  // The custom range is selected by the user and can be any range of dates.

  const Custom = () => {
    range.setSelectedTab("Custom");

    const start = Date.parse(range.startDate);
    const end = Date.parse(range.endDate);

    let calculatedDataObject = {
      distance: 0,
      duration: 0,
      averageSpeed: 0,
      topSpeed: 0,
      score: 0
    }

    let iteration = 0;//Variable for calculating number of days for calculating average speed and average score
    Data.map((item) => {
      if (item.startDate >= start && item.startDate <= end) {
        calculatedDataObject.distance += item.distance;
        calculatedDataObject.duration += item.duration;
        calculatedDataObject.averageSpeed += item.averageSpeed;
        if (calculatedDataObject.topSpeed < item.topSpeed) {
          calculatedDataObject.topSpeed = item.topSpeed
        }
        if (item.score != undefined) {
          calculatedDataObject.score += item.score;
        }
        iteration++;
      }

    });

    calculatedDataObject.averageSpeed = calculatedDataObject.averageSpeed / iteration;
    calculatedDataObject.score = calculatedDataObject.score / iteration;
    range.setcalculatedData(calculatedDataObject);
    console.log(range.calculatedData);
  }

  return (
    <div className="bg-white p-6 rounded-md w-full">
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <div className="min-w-full leading-normal">
            <div className='flex flex-col'>

              <button onClick={thisYearFun} className={range.selectedTab === 'This Year' ? 'bg-blue-500 text-white' : 'bg-white'}>
                <div className={range.selectedTab === 'This Year' ? 'border-b border-blue-500' : 'border-b'}>
                  <div className="px-5 py-5">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <h2 className={range.selectedTab === 'This Year' ? "text-white-900 font-bold" : "text-gray-900 font-bold"}>
                          This Year
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <button onClick={lastYearFun} className={range.selectedTab === 'Last Year' ? 'bg-blue-500 text-white' : 'bg-white'}>
                <div className={range.selectedTab === 'Last Year' ? 'border-b border-blue-500' : 'border-b'}>
                  <div className="px-5 py-5">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <h2 className={range.selectedTab === 'Last Year' ? "text-white-900 font-bold" : "text-gray-900 font-bold"}>
                          Previous Year
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <button onClick={LifetimeFun} className={range.selectedTab === 'Lifetime' ? 'bg-blue-500 text-white' : 'bg-white'}>
                <div className={range.selectedTab === 'Lifetime' ? 'border-b border-blue-500' : 'border-b'}>
                  <div className="px-5 py-5">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <h2 className={range.selectedTab === 'Lifetime' ? "text-white-900 font-bold" : "text-gray-900 font-bold"}>
                          Lifetime
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <div className="bg-white border-b">
                <div className="px-5 py-5">
                  <h2 className="text-gray-900 mb-5 font-bold">
                    Custom
                  </h2>
                  <div className="flex items-center">
                    <div className="ml-3 flex flex-col">
                      <label className="mb-2" htmlFor="startDate">Start Date</label>
                      <input className="rounded-md bg-white px-3 py-2 text-sm text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" type="date" id="startDate" name="startDate" onChange={(e) => range.setstartDate(e.target.value)} />
                    </div>
                    <div className="ml-3 flex flex-col">
                      <label className="mb-2" htmlFor="endDate">End Date</label>
                      <input className="rounded-md bg-white px-3 py-2 text-sm text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" type="date" id="endDate" name="endDate" onChange={(e) => range.setendDate(e.target.value)} />
                    </div>
                  </div>
                  <Link to={"/"}>
                    <button onClick={Custom} className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Save</button>
                  </Link>
                </div>
              </div>
              <Link to={'/'} className="flex justify-center text-blue-500 my-10 hover:text-blue-700 font-bold">
                <button className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Show Stats</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default OthersComponent
