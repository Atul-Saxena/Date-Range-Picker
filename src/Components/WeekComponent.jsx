// This component is responsible for rendering the buttons for selecting the time range for the statistics.
// The component uses the useContext hook to get the range state from the RangeContext.
// The component renders 3 buttons, one for current week, one for previous week and one for the last 7 days.
// When a button is clicked, it calls the setcalculatedData function and passes the selected date range to it.
// The component also renders a link to the stats page.

import { useContext } from 'react'
import { Link } from 'react-router-dom';
import DummyData from '../DummyData/DummyData.json'
import { rangeContext } from '../Context/Range'

const WeekComponent = () => {

  const range = useContext(rangeContext);
  const Data = DummyData;
  //Data will get sorted in descending on the basis of start date unix time stamp
  Data.sort((a, b) => b.startDate - a.startDate);

  // This function will get the data for the current week and calculate the statistics for it.
  // The function will then call the setcalculatedData function and pass the calculated data to it.

  const thisWeekFun = () => {
    range.setSelectedTab("This Week");
    const currentWeek = new Date(Data[0].startDate).getDay();
    const currentMonth = new Date(Data[0].startDate).getMonth();

    let calculatedDataObject = {
      distance: 0,
      duration: 0,
      averageSpeed: 0,
      topSpeed: 0,
      score: 0
    }

    // Filtering the data for the current week
    const thisWeekData = Data.filter((item) => new Date(item.startDate).getDay() === currentWeek && new Date(item.startDate).getMonth() === currentMonth);

    let iteration = 0;//Variable for calculating number of days for calculating average speed and average score

    thisWeekData.map((item) => {
      calculatedDataObject.distance += item.distance;
      calculatedDataObject.duration += item.duration;
      calculatedDataObject.averageSpeed += item.averageSpeed;
      if (calculatedDataObject.topSpeed < item.topSpeed) {
        calculatedDataObject.topSpeed = item.topSpeed
      }
      calculatedDataObject.score += item.score;
      iteration++;
    })

    calculatedDataObject.averageSpeed = calculatedDataObject.averageSpeed / iteration;
    calculatedDataObject.score = calculatedDataObject.score / iteration;
    range.setcalculatedData(calculatedDataObject);
  }


  // This function will get the data for the last week and calculate the statistics for it.
  // The function will then call the setcalculatedData function and pass the calculated data to it.

  const lastWeekFun = () => {
    range.setSelectedTab("Last Week");
    const currentWeek = new Date(Data[0].startDate).getDay();

    let calculatedDataObject = {
      distance: 0,
      duration: 0,
      averageSpeed: 0,
      topSpeed: 0,
      score: 0
    }

    const lastWeekData = Data.slice(currentWeek, 7);

    let iteration = 0;//Variable for calculating number of days for calculating average speed and average score

    lastWeekData.map((item) => {
      calculatedDataObject.distance += item.distance;
      calculatedDataObject.duration += item.duration;
      calculatedDataObject.averageSpeed += item.averageSpeed;
      if (calculatedDataObject.topSpeed < item.topSpeed) {
        calculatedDataObject.topSpeed = item.topSpeed
      }
      calculatedDataObject.score += item.score;
      iteration++;
    })

    calculatedDataObject.averageSpeed = calculatedDataObject.averageSpeed / iteration;
    calculatedDataObject.score = calculatedDataObject.score / iteration;
    range.setcalculatedData(calculatedDataObject);
  }


  // This function will get the data for the last 7 days and calculate the statistics for it.
  // The function will then call the setcalculatedData function and pass the calculated data to it.

  const last7Fun = () => {
    range.setSelectedTab("Last 7 Days");

    let calculatedDataObject = {
      distance: 0,
      duration: 0,
      averageSpeed: 0,
      topSpeed: 0,
      score: 0
    }

    const previousWeekData = Data.slice(0, 7);

    let iteration = 0;//Variable for calculating number of days for calculating average speed and average score

    previousWeekData.map((item) => {
      calculatedDataObject.distance += item.distance;
      calculatedDataObject.duration += item.duration;
      calculatedDataObject.averageSpeed += item.averageSpeed;
      if (calculatedDataObject.topSpeed < item.topSpeed) {
        calculatedDataObject.topSpeed = item.topSpeed
      }
      calculatedDataObject.score += item.score;
      iteration++;
    })

    calculatedDataObject.averageSpeed = calculatedDataObject.averageSpeed / iteration;
    calculatedDataObject.score = calculatedDataObject.score / iteration;
    range.setcalculatedData(calculatedDataObject);
  }


  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <div className="min-w-full leading-normal">
            <div className='flex flex-col'>

              <button onClick={thisWeekFun} className={range.selectedTab === 'This Week' ? 'bg-blue-500 text-white' : 'bg-white'}>
                <div className={range.selectedTab === 'This Week' ? 'border-b border-blue-500' : 'border-b'}>
                  <div className="px-5 py-5">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <h2 className={range.selectedTab === 'This Week' ? "text-white-900 font-bold" : "text-gray-900 font-bold"}>
                          This Week
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <button onClick={lastWeekFun} className={range.selectedTab === 'Last Week' ? 'bg-blue-500 text-white' : 'bg-white'}>
                <div className={range.selectedTab === 'Last Week' ? 'border-b border-blue-500' : 'border-b'}>
                  <div className="px-5 py-5">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <h2 className={range.selectedTab === 'Last Week' ? "text-white-900 font-bold" : "text-gray-900 font-bold"}>
                          Last Week
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <button onClick={last7Fun} className={range.selectedTab === 'Last 7 Days' ? 'bg-blue-500 text-white' : 'bg-white'}>
                <div className={range.selectedTab === 'Last 7 Days' ? 'border-b border-blue-500' : 'border-b'}>
                  <div className="px-5 py-5">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <h2 className={range.selectedTab === 'Last 7 Days' ? "text-white-900 font-bold" : "text-gray-900 font-bold"}>
                          Last 7 days
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

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

export default WeekComponent
