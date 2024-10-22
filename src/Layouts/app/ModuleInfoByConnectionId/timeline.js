

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import { GET_FORM_BY_TITLE } from '../../../Redux/actions/comman';
import { SET_LOADER } from '../../../Redux/actions/user';
import PageLoader from '../../../Components/pageLoader';

const TimelineComponent = () => {
  const timelineInfo = useSelector(state => state?.commanvar?.timelineInfo)
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const [newModule, setNewModule] = useState(false);
  const loading = useSelector((state) => state.user.loading);

  const asyncGetTasks = async () => {
    SET_LOADER(true)
    await dispatch(GET_FORM_BY_TITLE("Tasks")).then((res) => {
      console.log("GET_FORM_BY_TITLEGET_FORM_BY_TITLE==>1-", res);

      // console.log("GET_FORM_BY_TITLEGET_FORM_BY_TITLE==>12-", timelineInfo);
      const data = res.data?.data ? false : true;
      setNewModule(data);
      setTasks(res.data?.data)
      SET_LOADER(false)

    }).then((err) => {
      SET_LOADER(false)

    });

  };

  useEffect(() => {

    asyncGetTasks();


  }, [timelineInfo]);
  // useEffect(() => {
  //   alert("hello")
  // }, [])
  if (loading) {
    return <PageLoader title="Loading" />;
  }
  return (
    <div className="bg-white min-h-screen rounded-lg p-2 pl-20">

      <>
        {/* component */}
        <ol className='m-12'>
          {tasks && tasks?.sections?.map((timeline, index) => {
            return (
              <li key={timeline?._id} className={timelineInfo?.length === index + 1 ? 'border-l-2 border-green-500' : "border-l-2 border-gray-400"}>
                <div className="md:flex flex-start">
                  <div className='flex items-end'>
                    <div className='-ml-24 h-12 flex justify-start items-center gap-3'>
                      <p>
                        {moment(tasks?.updatedTime ? tasks?.updatedTime : tasks?.createdTime).format('hh:mm A')}
                      </p>
                      <div className="-ml-1 -mb-4 border bg-white shadow w-8 h-8 flex items-center justify-center rounded-full ">
                        {timelineInfo?.length === index + 1 ? <span className='text-green-500'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                          </svg>
                        </span> : '🎯'}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 block px-2 py-3  mt-6 rounded-lg shadow-md bg-gray-100 max-w-md ml-6">
                    <div className="w-full flex justify-between mb-4">
                      <p
                        className="font-medium text-primary hover:text-primary focus:text-purple-800 duration-300 transition ease-in-out text-sm"
                      >
                        Due date
                      </p>
                      <p
                        className="font-medium text-primary hover:text-primary focus:text-purple-800 duration-300 transition ease-in-out text-sm"
                      >
                        {moment(tasks?.updatedTime ? tasks?.updatedTime : tasks?.createdTime ? tasks?.createdTime : timeline.createdAt).format('ll')}
                      </p>
                    </div>
                    <p className="text-gray-700 mb-6">
                      {timeline?.data?.msg ? timeline?.data?.msg : timeline.formTitle}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}

        </ol>
      </>

    </div>
  );
}

export default TimelineComponent;
