const StatsMaterial = ({title, num, time, unit}) => {
    return (
        <div className="max-w-sm mx-auto my-10">
            <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                <div className="flex items-center space-x-4">
                    <div>
                        <div className="text-gray-600 text-sm">{title}</div>
                        <div className="text-gray-900 text-2xl font-semibold">
                            {num?num:time} {unit}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatsMaterial
