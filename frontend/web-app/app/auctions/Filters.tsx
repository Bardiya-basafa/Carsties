import {AiOutlineClockCircle, AiOutlineSortAscending} from "react-icons/ai";
import {BsFillStopCircleFill, BsStopwatchFill} from "react-icons/bs";
import {GiFinishLine, GiFlame} from "react-icons/gi";
import {useParamsStore} from "@/hooks/useParamsStore";
import {Button, ButtonGroup} from "flowbite-react";
const pageSizeButtons = [4, 8, 12];

const orderButtons = [
    {
        label: 'Alphabetical',
        icon: AiOutlineSortAscending,
        value: 'make'
    },
    {
        label: 'End date',
        icon: AiOutlineClockCircle,
        value: 'endingSoon'
    },
    {
        label: 'Recently added',
        icon: BsFillStopCircleFill,
        value: 'new'
    },
]

const filterButtons = [
    {
        label: 'Live Auctions',
        icon: GiFlame,
        value: 'live'
    },
    {
        label: 'Ending < 6 hours',
        icon: GiFinishLine,
        value: 'endingSoon'
    },
    {
        label: 'Completed',
        icon: BsStopwatchFill,
        value: 'finished'
    },
]

export default function Filters() {
    const pageSize = useParamsStore(state => state.pageSize);
    const setParams = useParamsStore(state => state.setParams);
    const orderBy = useParamsStore(state => state.orderBy);
    const filterBy = useParamsStore(state => state.filterBy);

    return (
      <div className='flex justify-between items-center mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200'>
    <div className="flex items-center space-x-4">
        <span className='uppercase text-sm font-medium text-gray-700'>Filter by</span>
        <div className="inline-flex rounded-md shadow-sm border border-gray-300 overflow-hidden">
            {filterButtons.map(({ label, icon: Icon, value }) => (
                <button 
                    key={value}
                    onClick={() => setParams({ filterBy: value })}
                    className={`
                        flex items-center px-4 py-2 text-sm font-medium transition-colors duration-200
                        ${filterBy === value 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    `}
                >
                    <Icon className='mr-2 h-4 w-4' />
                    {label}
                </button>
            ))}
        </div>
    </div>

    <div className="flex items-center space-x-4">
        <span className='uppercase text-sm font-medium text-gray-700'>Order by</span>
        <div className="inline-flex rounded-md shadow-sm border border-gray-300 overflow-hidden">
            {orderButtons.map(({ label, icon: Icon, value }) => (
                <button
                    key={value}
                    onClick={() => setParams({ orderBy: value })}
                    className={`
                        flex items-center px-4 py-2 text-sm font-medium transition-colors duration-200
                        ${orderBy === value 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    `}
                >
                    <Icon className='mr-2 h-4 w-4' />
                    {label}
                </button>
            ))}
        </div>
    </div>

    <div className="flex items-center space-x-4">
        <span className='uppercase text-sm font-medium text-gray-700'>Page size</span>
        <div className="inline-flex rounded-md shadow-sm border border-gray-300 overflow-hidden">
            {pageSizeButtons.map((value, i) => (
                <button 
                    key={i}
                    onClick={() => setParams({ pageSize: value })}
                    className={`
                        px-4 py-2 text-sm font-medium transition-colors duration-200
                        ${pageSize === value 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    `}
                >
                    {value}
                </button>
            ))}
        </div>
    </div>
</div>
    )
}