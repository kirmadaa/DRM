import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

const CalendarView = ({ eventList, handleSelectSlot, handleSelectEvent }) => {
  console.log("eevvnts in view", eventList);
  const [allEvent, setAllEvent] = useState();

  useEffect(() => {
    const newEvents = eventList?.map((item) => {
      return { ...item, title: item?.summary };
    });
    setAllEvent(newEvents);
  }, [eventList]);
  return (
    <div>
      <Calendar
        localizer={localizer}
        views={["month", "week", "day"]}
        events={allEvent}
        onSelectSlot={handleSelectSlot}
        selectable={true}
        startAccessor={(event) => new Date(event.start.dateTime)}
        endAccessor={(event) => new Date(event.end.dateTime)}
        style={{ height: 500 }}
        onSelectEvent={(event) => handleSelectEvent(event)}
        popup
      />
    </div>
  );
};

export default CalendarView;
