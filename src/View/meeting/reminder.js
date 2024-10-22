import { memo, useEffect, useState } from "react";
import { Bell, Calendar } from "react-feather";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { GET_REMINDER_DATA } from '../../Redux/actions/reminder'
import moment from "moment";


// Define a function to check and remind about meetings
function checkAndRemindMeetings(meetings) {
    const now = new Date();
    const reminderTime = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes in milliseconds
    let reminders = []
    for (let meeting of meetings) {
        const meetingStartTime = new Date(meeting.From);
        if (meetingStartTime > now && meetingStartTime <= reminderTime) {
            reminders.push(meeting)
        }
    }
    return reminders
}

const MeetingReminder = () => {
    const [meeting, setMeetings] = useState(false)
    const dispatch = useDispatch()
    const [data, setData] = useState([])

    const getData = async () => {
        let payload = {
            offset: 1,
            limit: 100,
            buttonType: "All",
            profile: "Administrator"
        }
        let res = await dispatch(GET_REMINDER_DATA('/search-meetings', payload))
        if (res?.data?.meetingData?.length > 0) {
            let reminders = await checkAndRemindMeetings(res?.data?.meetingData);
            if (reminders?.length > 0) {
                setMeetings(true)
            }
            setData(reminders)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (data?.length > 0 ?
        <div style={{ zIndex: 1000 }} className=" fixed bottom-10 right-3 ">
            {meeting ? <div className="w-[300px] min-h-[400px] bg-white shadow-lg border rounded-lg">
                <div className=" rounded-t-lg p-2 text-white bg-primary flex justify-between items-center">
                    <h1 className="text-sm">Meeting Reminder</h1>
                    <button onClick={() => setMeetings(false)} s className="border inline-flex justify-center items-center w-8 h-8 rounded-full p-1">
                        x
                    </button>
                </div>
                <div>
                    {
                        data?.map((meeting, i) => {
                            return (
                                <div key={i + meeting?.From} className="p-2 flex justify-start items-center space-x-2">
                                    <div className="w-10 h-10 rounded-full p-2 bg-red-100 text-red-400 flex justify-center items-center ">
                                        <Calendar size={15} />
                                    </div>
                                    <div>
                                        <p className="text-primary">{meeting?.Subject || '(N/A)'}</p>
                                        <p className="text-xs">{moment(new Date(meeting?.From)).format('MMM Do YYYY, h:mm:ss a')}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div> : <button onClick={() => setMeetings(true)} className="rounded-full flex justify-center items-center w-12 h-12 bg-primary text-white ">
                <Bell />
            </button>}
        </div> : <></>
    )
}

export default memo(MeetingReminder);