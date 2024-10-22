import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { addDays, removeDays } from "../../../../utility/serviceMethod";
import {
  GET_USER_PROFILE,
  UPDATE_USER_GOOGLE_CALANDER_TOKEN,
} from "../../../../Redux/actions/user";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CalendarView from "./list";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventModal from "./eventModal";

export const DealMeeting = () => {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState("");
  const [accessTokenExpiredAt, setAccessTokenExpiredAt] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventData, setEventData] = useState();
  const [event, setEvent] = useState([]);
  const [modal, setModal] = useState(false);

  const gapi = window.gapi;

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  const SCOPES = "https://www.googleapis.com/auth/calendar";

  const defaultState = accessToken ? "home" : "login";
  const [page, setPage] = useState(defaultState);

  async function setGapiValue(access_token, expires_in) {
    await gapi?.client?.setToken({
      access_token,
      expires_in,
    });
  }

  let gapiInited = false;
  let gisInited = false;
  let tokenClient;

  useEffect(() => {
    gapiLoaded();
    dispatch(GET_USER_PROFILE()).then(async (res) => {
      if (!res?.data?.data?.[0].calender) {
        return;
      } else if (res?.data?.data?.[0].calender?.access_token) {
        setAccessToken(res?.data?.data?.[0].calender?.access_token);
        setAccessTokenExpiredAt(res?.data?.data?.[0]?.calender.expires_in);
        setGapiValue(
          res?.data?.data?.[0].calender?.access_token,
          res?.data?.data?.[0]?.calender.expires_in
        );
        setPage("home");
      }
    });
  }, [dispatch]);

  async function gapiLoaded() {
    try {
      gapi.load("client", initializeGapiClient);
      // initializeGapiClient()
    } catch (error) {
      console.error("Error in gapiLoaded", error);
    }
  }

  async function initializeGapiClient() {
    try {
      await gapi.client
        .init({
          apiKey: API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        })
        .then(() => {
          gapi.client
            .load(DISCOVERY_DOC)
            .then(async () => {
              // tokenClient = await loadClientAuth2(gapi, CLIENT_ID, SCOPES);
              gisInited = true;
            })
            .catch((error) => {
              console.log("Error loading Google API client:", error);
            });
        });

      gapiInited = true;
      if (accessToken && accessTokenExpiredAt) {
        setGapiValue(accessToken, accessTokenExpiredAt);
        listUpcomingEvents();
      }
    } catch (error) {
      console.error("Error while initiating", error);
    }
  }

  async function gisLoaded(fun) {
    try {
      tokenClient = await window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        prompt: "consent",
        callback: fun, // defined at request time in await/promise scope.
      });
      return tokenClient;
    } catch (error) {
      console.error("Error gisLoaded", error);
    }
  }

  async function handleAuthClick() {
    try {
      if (!(accessToken && accessTokenExpiredAt)) {
        function callback(response, error) {
          if (!error) {
            const { access_token, expires_in } = response;
            setAccessToken(access_token);
            setAccessTokenExpiredAt(expires_in);
            const calender = { access_token, expires_in };
            dispatch(UPDATE_USER_GOOGLE_CALANDER_TOKEN({ calender }));
            setPage("home");
          }
        }
        tokenClient = await gisLoaded(callback);
        tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        tokenClient.requestAccessToken({
          prompt: "",
        });
      }
    } catch (e) {
      console.log("Catch, handleAuthClick", e);
    }
  }

  function handleGoogleSignoutClick() {
    try {
      if (gapi) {
        const token = gapi.client.getToken();
        if (token !== null) {
          window.google.accounts.id.disableAutoSelect();
          window.google.accounts.oauth2.revoke(token.access_token, () => {});
          window.gapi.client.setToken(null);
          dispatch(
            UPDATE_USER_GOOGLE_CALANDER_TOKEN({
              calender: {
                access_token: "",
                expires_in: "",
              },
            })
          ).then(() => {
            window.location.reload();
          });
        }
      } else {
        console.error("Error: this.gapi not loaded");
        dispatch(
          UPDATE_USER_GOOGLE_CALANDER_TOKEN({
            calender: {
              access_token: "",
              expires_in: "",
            },
          })
        ).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Error handleSignoutClick", error);
    }
  }

  async function listUpcomingEvents() {
    setPage("list");
    try {
      const request = {
        calendarId: "primary",
        timeMin: removeDays(new Date(), 50).toISOString(),
        timeMax: addDays(new Date(), 10).toISOString(),
        showDeleted: true,
        singleEvents: true,
        maxResults: 1000,
        orderBy: "updated",
      };
      const response = await gapi.client.calendar.events.list(request);
      const events = response.result.items;
      setEvent(events);
    } catch (err) {
      toast.error(
        "Token Expired or revoked, Please signout first and signin again"
      );
    }
  }

  async function createCalendarEvent() {
    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    const request = gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
      sendUpdates: "all",
    });
    request.execute(
      (event) => {
        if (event.status === "confirmed") {
          toast.success("Event created successfully");
          listUpcomingEvents();
          setModal(false);
        } else {
          toast.error(
            "Token Expired or revoked, Please signout first and signin again"
          );
        }
      },
      (error) => {
        toast.error(
          "Token Expired or revoked, Please signout first and signin again"
        );
        console.error("Error creating calendar event:", error);
      }
    );
  }

  function handleSelectSlot(date) {
    setEventData();
    setStart(date?.slots?.[0]);
    setEnd(date?.slots?.[date?.slots?.length - 1]);

    setModal(true);
  }
  function handleSelectEvent(date) {
    setEventData(date);
    setStart(date?.start?.dateTime);
    setEnd(date?.end?.dateTime);
    setEventName(date?.summary);
    setEventDescription(date?.description);
    setModal(true);

    // setStart(date?.slots?.[0]);
    // setEnd(date?.slots?.[date?.slots?.length - 1]);
    // setModal(true);
  }
  function updateSelectEvent() {
    let payload = { ...eventData };

    payload.summary = eventName;
    payload.description = eventDescription;
    payload.start.dateTime = start;
    payload.end.dateTime = end;

    const request = gapi.client.calendar.events.update({
      calendarId: "primary",
      resource: payload,
      eventId: payload?.id,
      sendUpdates: "all",
    });
    request.execute(
      (event) => {
        if (event.status === "confirmed") {
          toast.success("Event created successfully");
          listUpcomingEvents();
          setModal(false);
        } else {
          toast.error(
            "Token Expired or revoked, Please signout first and signin again"
          );
        }
      },
      (error) => {
        toast.error(
          "Token Expired or revoked, Please signout first and signin again"
        );
        console.error("Error creating calendar event:", error);
      }
    );

    // setStart(date?.slots?.[0]);
    // setEnd(date?.slots?.[date?.slots?.length - 1]);
    // setModal(true);
  }

  return (
    <div>
      <div className="text-right mt-4">
        {page === "login" && (
          <button
            className="bg-primary text-white me-2 px-2 py-2 w-[100px] rounded-lg"
            type="submit"
            onClick={handleAuthClick}
          >
            SignIn
          </button>
        )}
        {(page === "home" || page === "list") && (
          <button
            className="bg-primary text-white me-2 px-2 py-2 w-[100px] rounded-lg"
            // onClick={() => setPage("home")}
            onClick={() => setModal(true)}
          >
            Add Event
          </button>
        )}
        {(page === "home" || page === "list") && (
          <button
            className="bg-primary text-white me-2 px-2 py-2 w-[100px] rounded-lg"
            onClick={listUpcomingEvents}
          >
            List Event
          </button>
        )}
        {(page === "home" || page === "list") && (
          <button
            className="bg-primary text-white px-2 py-2 w-[100px] rounded-lg"
            onClick={handleGoogleSignoutClick}
          >
            Sign Out
          </button>
        )}
      </div>
      {page === "list" && (
        <div className="m-3">
          {/* <table>
            <thead>
              <tr>
                <th>Event name</th>
                <th>Event Start time</th>
              </tr>
            </thead>
            <tbody>
              {event.map((e, index) => (
                <tr key={index}>
                  <td>{e.summary}</td>
                  <td>{e.start.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
          <CalendarView
            eventList={event}
            handleSelectSlot={handleSelectSlot}
            handleSelectEvent={handleSelectEvent}
          />
        </div>
      )}
      {/* {page === "home" && (
        <div style={{ width: "400px", margin: "30px auto" }}>
          <p className="mb-1">Start of your event</p>
          <DateTimePicker
            onChange={setStart}
            value={start}
            className="mb-3 w-full"
          />
          <p className="mb-1">End of your event</p>
          <DateTimePicker
            onChange={setEnd}
            value={end}
            className="mb-3 w-full"
          />
          <p className="mb-2">Event name</p>
          <input
            type="text"
            onChange={(e) => setEventName(e.target.value)}
            className="mb-3 px-4 py-3 border border-[#142d6c] rounded-xl w-full focus:outline-0"
          />
          <p className="mb-2">Event description</p>
          <input
            type="text"
            onChange={(e) => setEventDescription(e.target.value)}
            className="mb-3 px-4 py-3 border border-[#142d6c] rounded-xl w-full focus:outline-0"
          />
          <hr />
          <button
            onClick={createCalendarEvent}
            className="bg-primary text-white px-2 py-2 mb-5 w-[150px] rounded-lg"
          >
            Create Event
          </button>
        </div>

      )} */}
      <div className="flex justify-center items-center w-full h-96 ">
        <div className="col-8 text-center font-[400] text-xl">
          <h1>
            You can manage your calendars from this page once you have
            integrated your Google Calendars(G-Suite). Please contact AltRr
            admin
          </h1>
        </div>
      </div>
      <EventModal
        modal={modal}
        setModal={setModal}
        end={end}
        setEnd={setEnd}
        start={start}
        setStart={setStart}
        createCalendarEvent={createCalendarEvent}
        setEventDescription={setEventDescription}
        eventDescription={eventDescription}
        setEventName={setEventName}
        eventName={eventName}
        eventData={eventData}
        updateSelectEvent={updateSelectEvent}
      />
    </div>
  );
};
