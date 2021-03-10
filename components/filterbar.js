// filter bar component
import React from "react";
import useSWR from 'swr';
const filterData = url => fetch(url).then(res => res.json())
function FilterBar() {
    const { data, error } = useSWR('api/filters', filterData)
    const [isOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    return (
        <>
            <div className="w-full ml-2 bg-white p-3">
                <span className="font-bold uppercase">job type</span>
                <ul>
                    {data.job_type.map((each) => {
                        return <li className="mt-2" key={each.key}>{each.key}{' : '}<span className="text-gray-400">{each.doc_count}</span></li>
                    })}
                </ul>
            </div>
            <div className="w-full m-2 bg-white p-3">
                <span className="font-bold uppercase">department</span>
                <ul>
                    {data.department.slice(0, 10).map((each) => {
                        return <li className="mt-2" key={each.key}>{each.key}{' : '}<span className="text-gray-400">{each.doc_count}</span></li>
                    })}
                </ul>
                <button onClick={openModal} className="text-blue-600 focus:border-none my-3">Show more</button>
            </div>
            <div className="w-full m-2 bg-white p-3">
                <span className="font-bold uppercase">work schedule</span>
                <ul>
                    {data.work_schedule.map((each) => {
                        return <li className="mt-2" key={each.key}>{each.key}{' : '}<span className="text-gray-400">{each.doc_count}</span></li>
                    })}
                </ul>
            </div>
            <div className="w-full m-2 bg-white p-3">
                <span className="font-bold uppercase">experience</span>
                <ul>
                    {data.experience.map((each) => {
                        return <li className="mt-2" key={each.key}>{each.key}{' : '}<span className="text-gray-400">{each.doc_count}</span></li>
                    })}
                </ul>
            </div>
            <div>
                
                <div className={`${isOpen ? '' : 'opacity-0 pointer-events-none'} modal fixed w-full h-full top-0 left-0 flex items-center justify-center`}>
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                    <div className="modal-container bg-white w-8/12 rounded shadow-lg z-50 overflow-y-auto">

                        {/* <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50" onClick={closeModal}>
                            <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                            </svg>
                            <span className="text-sm">(Esc)</span>
                        </div> */}

                        <div className="modal-content py-4 text-left px-6">
                            <div className="flex justify-between items-center pb-3 border-b border-solid border-gray-300 rounded-t">
                                <p className="text-xl font-bold">Department</p>
                                <div className="modal-close cursor-pointer z-50" onClick={closeModal}>
                                    <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                    </svg>
                                </div>
                            </div>
                            <ul className="grid grid-cols-4">
                                {data.department.map((each) => {
                                    return <li className="m-1" key={each.key}>{each.key}{' : '}<span className="text-gray-400">{each.doc_count}</span></li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FilterBar