import React, { useCallback, useState } from "react";
import FilterBar from "./filterbar";
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import sortJobsDataByProperty from '../helper/sorting';


function MainPage({ allJobs }) {
  // Rendering main data
  const [data, setData] = useState(allJobs);
  const [search, setSearch] = useState('');

  let totalJob = 0;

  const searchEndpoint = (search) => `/api/search?search=${search}`

  if (data.jobs) {
    data.jobs.forEach((job) => {
      totalJob += job.items.length;
      for (let i = 0; i < job.items.length; i++) {
        var msDiff = new Date().getTime() - new Date(job.items[i].created).getTime();    //Future date - current date
        var totalDays = Math.floor(msDiff / (1000 * 60 * 60 * 24));
        totalDays = parseInt(totalDays);
        if (totalDays < 30) {
          const value = totalDays / 7;
          job.items[i].createdOn = value === 1 ? Math.round(value) + ' week ago' : Math.round(value) + ' weeks ago';
        }
        else if (totalDays === 30) {
          job.items[i].createdOn = '1 month ago';
        }
        else {
          totalDays = totalDays / 30;
          job.items[i].createdOn = Math.round(totalDays) + ' months ago';
        }
      }
    });
  }
  
  // event to toggle detail info about the Job 

  const toggleJobDetails = (e) => {
    const job_id = e.target.id.replace("job_list", "job_desc");
    const detail = document.getElementById(job_id);
    if (detail.attributes[1].value === "block") {
      detail.setAttribute('class', 'hidden');
    } else {
      detail.setAttribute('class', 'block');
    }
  }

  const jobitem = (e) => {
    const job_id = e.target.id.replace("jobposting_", "jobdetail_");
    const detail = document.getElementById(job_id);
    if (detail.attributes[1].value === "block") {
      detail.setAttribute('class', 'hidden');
    } else {
      detail.setAttribute('class', 'block');
    }
  }


  // search method
  const smartSearch = useCallback((e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    searchData(searchValue);
  })

  const searchData = (searchValue) => {
    if (searchValue.length) {
      debugger
      fetch(searchEndpoint(searchValue))
        .then(res => res.json())
        .then(res => {
          setData(res);
        })
    } else {
      setData(allJobs);
    }
  }

  // sorting functionality

  const [location, setLocation] = useState(0);
  const [role, setRole] = useState(0);
  const [department, setDepartment] = useState(0);
  const [education, setEducation] = useState(0);
  const [experience, setExperience] = useState(0);

  const sortEvent = (e) => {
    let filterBy = e.target.getAttribute('name');
    let sortResult;
    debugger
    switch (filterBy) {
      case 'location': {
        if (location === 2) {
          setLocation(0); break;
        }
        setLocation(location + 1);
        if (location == 0) {
          sortResult = sortJobsDataByProperty(data.jobs, 'items.city');
        } else if (location == 1) {
          sortResult = sortJobsDataByProperty(data.jobs, 'items.city', -1);
        }
        const tempData = { jobs: sortResult };
        setData(tempData);
        break;
      }
      case 'role': {
        if (role === 2) {
          setRole(0); break;
        } else {
          setRole(role + 1);
          if (role == 0) {
            sortResult = sortJobsDataByProperty(data.jobs, 'items.job_title');
          } else if (role == 1) {
            sortResult = sortJobsDataByProperty(data.jobs, 'items.job_title', -1);
          }
          const tempData = { jobs: sortResult };
          setData(tempData);
          break;
        }
      }
      case 'department': {
        if (department === 2) {
          setDepartment(0); break;
        } else {
          setDepartment(department + 1);
          if (department == 0) {
            sortResult = data.jobs.map((item) => {
              let temp = {};
              temp = { "total_jobs_in_hospital": item["total_jobs_in_hospital"], "name": item['name'], "job_title": item['job_title'] };
              temp["items"] = sortJobsDataByProperty(item.items, 'department');
              return temp;
            });
          } else if (department == 1) {
            sortResult = data.jobs.map((item) => {
              let temp = {};
              temp = { "total_jobs_in_hospital": item["total_jobs_in_hospital"], "name": item['name'], "job_title": item['job_title'] };
              temp["items"] = sortJobsDataByProperty(item.items, 'department', -1);
              return temp;
            });
          }
          const tempData = { jobs: sortResult };
          setData(tempData);
          break;
        }
      }
      case 'education': {
        if (education === 2) {
          setEducation(0); break;
        } else {
          setEducation(education + 1);
          if (education == 1) {
            sortResult = sortJobsDataByProperty(data.jobs, 'name');
          } else {
            sortResult = sortJobsDataByProperty(data.jobs, 'name', -1);
          }
          const tempData = { jobs: sortResult };
          setData(tempData);
          break;
        }
      }
      case 'experience': {
        if (experience === 2) {
          setExperience(0); break;
        } else {
          setExperience(experience + 1);
          if (experience == 1) {
            sortResult = sortJobsDataByProperty(data.jobs, 'items.experience');
          } else {
            sortResult = sortJobsDataByProperty(data.jobs, 'items.experience', -1);
          }
          const tempData = { jobs: sortResult };
          setData(tempData);
          break;
        }
      }
    }
    if (!location && !role && !department && !education && !experience) {
      searchData(search);
    }
  }
  return (
    <div>
      <div className="m-5 mb-3">
        <div className="relative text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </span>
          <input type="search" name="smartSearch" onChange={smartSearch} className="text-sm h-10 text-lg w-full text-black bg-white rounded-md pl-10 focus:outline-none focus:bg-white" placeholder="Search for any job, title, keywords or company" autoComplete="off" />
        </div>
      </div>
      <div className="flex flex-auto rounded-md">
        <div className="hidden lg:block w-2/12 m-2 rounded-sm">
          <FilterBar />
        </div>
        <div className="w-full lg:w-10/12 bg-white m-2 p-2 float-right">
          <div className="grid grid-cols-1 lg:grid-cols-3 mt-5">
            <div className="">
              <span className="float-left text-md lg:text-lg"><span className="font-bold">{totalJob}</span> job postings</span>
            </div>
            <div className="col-span-2 justify-end hidden lg:block">
              <ul className="flex float-right">
              <li className="text-gray-400 text-lg">Sort by : </li>
                <li className="ml-3 font-normal text-lg" onClick={sortEvent} name="location">Location<FaArrowDown className={location === 1 ? 'arrow' : 'hidden'} /><FaArrowUp className={location === 2 ? 'arrow' : 'hidden'} /></li>
                <li className="ml-3 font-normal text-lg" onClick={sortEvent} name="role">Role<FaArrowUp className={role === 2 ? 'arrow' : 'hidden'} /><FaArrowDown className={role === 1 ? 'arrow' : 'hidden'} /></li>
                <li className="ml-3 font-normal text-lg" onClick={sortEvent} name="department">Department<FaArrowDown className={department === 1 ? 'arrow' : 'hidden'} /><FaArrowUp className={department === 2 ? 'arrow' : 'hidden'} /></li>
                <li className="ml-3 font-normal text-lg" onClick={sortEvent} name="education">Education<FaArrowDown className={education === 1 ? 'arrow' : 'hidden'} /><FaArrowUp className={education === 2 ? 'arrow' : 'hidden'} /></li>
                <li className="ml-3 font-normal text-lg" onClick={sortEvent} name="experience">Experience<FaArrowDown className={experience === 1 ? 'arrow' : 'hidden'} /><FaArrowUp className={experience === 2 ? 'arrow' : 'hidden'} /></li>
              </ul>
            </div>
          </div>
          <div className="m-2">
            <ul className="text-sm lg:ml-3">
              {data.jobs.map((each, key) => {
                return (
                  <div key={key} className="">
                    <li id={'jobposting_' + key} className="m-4 h-10 my-auto mx-auto mt-2 justify-center" onClick={jobitem}>
                      <span id={'jobposting_' + key} className="w-10 bg-gray-400 rounded-md uppercase pt-1 pb-1 text-center float-left text-lg text-white mr-4 lg:mr-5">
                        {each.name.slice(0, 2)}
                      </span>
                      <div id={'jobposting_' + key} className="md:text-base sm:text-sm justify-center" >{Object.keys(each.items).length} jobs for
                                      {' ' + each.name}</div>
                    </li>
                    <div id={"jobdetail_" + key} className="hidden mt-5">
                      {each.items.map((jobitem, index) => (

                        <div key={index} className="ml-5 justify-between border-t py-4">
                          <div id={"job_list" + key + "_" + index} onClick={toggleJobDetails}>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-1">
                              <div className="col-span-2">
                                <p className="font-semibold" id={"job_list" + key + "_" + index}>{jobitem.job_title}</p>
                                <span className="text-sm" id={"job_list" + key + "_" + index}>{jobitem.job_type} | </span>
                                <span className="text-sm" id={"job_list" + key + "_" + index}>
                                  ${jobitem.salary_range[0]} - ${jobitem.salary_range[1]} an
                                          hour |{" "}
                                </span>
                                <span className="text-sm" id={"job_list" + key + "_" + index}  >{jobitem.city}</span>
                              </div>
                              <div className="text-left lg:text-right">
                                <p> {jobitem.createdOn}</p>
                              </div>
                            </div>
                          </div>
                          <div id={"job_desc" + key + "_" + index} className="flex pt-5 hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 my-5">
                              <div className="col-span-6">
                                <div className="block lg:flex mb-3">
                                  <p className="font-semibold w-12/12 lg:w-4/12">Department:</p>
                                  <p className="w-12/12 lg:w-8/12 lg:pr-20">{jobitem?.department.reduce((dept, value) => dept + ", " + value)}</p>
                                </div>
                                <div className="block lg:flex mb-3">
                                  <p className="font-semibold w-12/12 lg:w-4/12">Hours / shifts:</p>
                                  <p className="w-12/12 lg:w-8/12 lg:pr-20">
                                    {jobitem?.hours[0]} hours / {jobitem?.work_schedule}
                                  </p>
                                </div>
                                <div className="block lg:flex">
                                  <p className="font-semibold w-12/12 lg:w-4/12">Summary:</p>
                                  <p className="w-12/12 lg:w-8/12 lg:pr-20" >{jobitem?.description}</p>
                                </div>
                              </div>
                              <div className="text-left lg:text-right space-x-3 lg:space-y-3 2xl:ml-20" align="center">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                                  Job details
                              </button>
                                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded my-5">
                                  Save Job
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MainPage = React.memo(MainPage);
