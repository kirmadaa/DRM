import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import DateTimePicker from "react-datetime-picker";

const EventModal = ({
  modal,
  setModal,
  end,
  setEnd,
  start,
  setStart,
  createCalendarEvent,
  setEventDescription,
  setEventName,
  eventData,
  updateSelectEvent,
  eventName,
  eventDescription,
}) => {
  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setModal(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB]"
                >
                  {!eventData ? "Add event" : "Update event"}
                </Dialog.Title>
                <div className="container min-h-[140px]">
                  <div style={{ width: "400px", margin: "30px auto" }}>
                    <p className="mb-1">Start of your event</p>
                    <DateTimePicker
                      onChange={setStart}
                      value={start}
                      className="mb-3 w-full"
                      isCalendarOpen={false}
                    />
                    <p className="mb-1">End of your event</p>
                    <DateTimePicker
                      onChange={setEnd}
                      value={end}
                      isCalendarOpen={false}
                      className="mb-3 w-full"
                    />
                    <p className="mb-2">Event name</p>
                    <input
                      type="text"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      className="mb-3 px-4 py-3 border border-[#191242] rounded-xl w-full focus:outline-0"
                    />
                    <p className="mb-2">Event description</p>
                    <textarea
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      className="mb-3 px-4 py-3 border border-[#191242] rounded-xl w-full focus:outline-0"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    className=" border-[#191242] border rounded-2xl px-5 py-2 h-[48px] "
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                  {!eventData ? (
                    <button
                      onClick={createCalendarEvent}
                      className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2 h-[48px] text-center "
                    >
                      Create Event
                    </button>
                  ) : (
                    <button
                      onClick={updateSelectEvent}
                      className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2 h-[48px] text-center "
                    >
                      Update Event
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EventModal;
