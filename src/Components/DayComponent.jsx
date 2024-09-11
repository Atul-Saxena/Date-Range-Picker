// This component renders a date range picker that allows the user to select a specific date range to view the statistics for.
// The component uses the useContext hook to get the range state from the RangeContext.
// The component renders 3 buttons, one for today, one for yesterday and one for the day before yesterday.
// When a button is clicked, it calls the setcalculatedData function and passes the selected date range to it.
// The component also renders a link to the stats page.

import { useContext } from 'react'
import { Link } from 'react-router-dom';
import DummyData from '../DummyData/DummyData.json'
import { rangeContext } from '../Context/Range'

const Data = DummyData;
Data.sort((a, b) => b.startDate - a.startDate);

const DateRangePicker = () => {

  const range = useContext(rangeContext);
  /**
   * This function sets the calculated data to the selected date range and sets the selected tab to "Today"
   */
  const todayDayfun = ()=>{
    range.setcalculatedData(Data[0]); 
    range.setSelectedTab("Today");
  }

  /**
   * This function sets the calculated Yesterday data to the selected date range and sets the selected tab to "Yesterday"
   */
  const Yesterdayfun = ()=>{
    range.setcalculatedData(Data[1]);
    range.setSelectedTab("Yesterday");
  }

  /**
   * This function sets the calculated data to the selected Before Yesterday date range and sets the selected tab to "Before Yesterday"
   */
  const beforeYesterdayfun = ()=>{
    range.setcalculatedData(Data[2]);
    range.setSelectedTab("Before Yesterday");
  }
  return (

    <div className="bg-white p-8 rounded-md w-full">
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <div className="min-w-full leading-normal">
            <div className='flex flex-col'>

              <button onClick={todayDayfun} className={range.selectedTab === 'Today' ? 'bg-blue-500 text-white' : 'bg-white'}>
                <div className={range.selectedTab === 'Today' ? 'border-b border-blue-500' : 'border-b'}>
                  <div className="px-5 py-5">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <h2 className={range.selectedTab === 'Today' ?"text-white-900 font-bold":"text-gray-900 font-bold"}>
                          Today
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <button onClick={Yesterdayfun} className={range.selectedTab === 'Yesterday' ? 'bg-blue-500 text-white' : 'bg-gray-100'}>
                <div className={range.selectedTab === 'Yesterday' ? 'border-b border-blue-500' : 'border-b'}>
                  <div className="px-5 py-5">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <h2 className={range.selectedTab === 'Yesterday' ?"text-white-900 font-bold":"text-gray-900 font-bold"}>
                          Yesterday
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <button onClick={beforeYesterdayfun} className={range.selectedTab === 'Before Yesterday' ? 'bg-blue-500 text-white' : 'bg-white'}>
                <div className={range.selectedTab === 'Before Yesterday' ? 'border-b border-blue-500' : 'border-b'}>
                  <div className="px-5 py-5">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <h2 className={range.selectedTab === 'Before Yesterday' ?"text-white-900 font-bold":"text-gray-900 font-bold"}>
                          Day before yesterday
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
  );
};

export default DateRangePicker;

