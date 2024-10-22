import { memo, useEffect, useState } from "react";
import { Bell, Calendar } from "react-feather";
import { useDispatch } from "react-redux";
import { GET_REMINDER_DATA } from '../../Redux/actions/reminder'
import moment from "moment";


// Define a function to check and remind about tasks
function checkAndRemindTasks(tasks) {
    const now = new Date();
    const reminderTime = new Date(now.getTime() + 1440 * 60 * 1000); // 1440 minutes in milliseconds
    let reminders = []
    for (let task of tasks) {
        const taskStartTime = new Date(task?.DueDate);
        if (taskStartTime > now && taskStartTime <= reminderTime) {
            reminders.push(task)
        }
    }
    return reminders
}

const TaskDueReminder = () => {
    const [task, settasks] = useState(false)
    const dispatch = useDispatch()
    const [data, setData] = useState([])

    const getData = async () => {
        let payload = {
            offset: 1,
            limit: 100,
            buttonType: "All",
            profile: "Administrator"
        }
        let res = await dispatch(GET_REMINDER_DATA('/search-tasks', payload))
        if (res?.data?.taskData?.length > 0) {
            let reminders = await checkAndRemindTasks(res?.data?.taskData);
            if (reminders?.length > 0) {
                settasks(true)
            }
            setData(reminders)
        }


    }

    useEffect(() => {
        getData()
    }, [])

    return (data?.length > 0 ?
        <div style={{ zIndex: 1000 }} className=" fixed bottom-10 right-3 ">
            {task ? <div className="w-[300px] min-h-[400px] bg-white shadow-lg border rounded-lg">
                <div className=" rounded-t-lg p-2 text-white bg-primary flex justify-between items-center">
                    <h1 className="text-sm">Upcomming Tasks</h1>
                    <button onClick={() => settasks(false)} s className="border inline-flex justify-center items-center w-8 h-8 rounded-full p-1">
                        x
                    </button>
                </div>
                <div>
                    {
                        data?.map((task, i) => {
                            return (
                                <div key={i + task?.From} className="p-2 flex justify-start items-center space-x-2">
                                    <div className="w-10 h-10 rounded-full p-2 bg-red-100 flex justify-center items-center ">
                                        <Calendar className="text-red-500" size={15} />
                                    </div>
                                    <div>
                                        <p className="text-primary">{task?.Subject || '(N/A)'}</p>
                                        <p className="text-xs">{moment(new Date(task?.DueDate)).format('MMM Do YYYY, h:mm:ss a')}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div> : <button onClick={() => settasks(true)} className="rounded-full flex justify-center items-center w-12 h-12 bg-primary text-white ">
                <Bell />
            </button>}
        </div> : <></>
    )
}

export default memo(TaskDueReminder);