import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CONNECT_WITH_FACEBOOK,
  GET_FACEBOOK_PLATFORM,
  GET_GOOGLE_PLATFORM,
  CONNECT_WITH_GOOGLE,
} from "../../Redux/actions/socialAccounts";
import { useDispatch } from "react-redux";

const GoogleAccounts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ShowLoader, setShowLoader] = useState(true);
  const [GoogleConnection, setGoogleConnection] = useState(false);
  const [FacebookConnection, setFacebookConnection] = useState(false);
  const [FacebookData, setFacebookData] = useState({
    auth_url: "",
    client_Secret: "",
    client_id: "",
    name: "",
    organizationId: "",
    redirect_uri: "",
    request_url: "",
    _id: "",
  });
  const [GoogleData, setGoogleData] = useState({
    auth_url: "",
    client_Secret: "",
    client_id: "",
    name: "",
    organizationId: "",
    redirect_uri: "",
    request_url: "",
    _id: "",
  });
  useEffect(() => {
    var UserData = localStorage.getItem("userData");
    if (UserData) {
      var ParseData = JSON.parse(UserData);
      const facebook_token = ParseData?.facebook?.facebook_token;
      if (facebook_token) {
        setFacebookConnection(true);
      }
    }
    async function GetFacebookKey() {
      const response = await dispatch(GET_FACEBOOK_PLATFORM());
      if (response?.status == "200") {
        const resp_data = response?.data?.data;
        setFacebookData({
          auth_url: resp_data?.auth_url,
          client_Secret: resp_data?.client_Secret,
          client_id: resp_data?.client_id,
          name: resp_data?.name,
          organizationId: resp_data?.organizationId,
          redirect_uri: resp_data?.redirect_uri,
          request_url: resp_data?.request_url,
          _id: resp_data?._id,
        });
        setShowLoader(false);
      }
    }
    GetFacebookKey();
    async function GetGoogleKey() {
      const response = await dispatch(GET_GOOGLE_PLATFORM());
      if (response?.status == "200") {
        const resp_data = response?.data?.data;
        setGoogleData({
          auth_url: resp_data?.auth_url,
          client_Secret: resp_data?.client_Secret,
          client_id: resp_data?.client_id,
          name: resp_data?.name,
          organizationId: resp_data?.organizationId,
          redirect_uri: resp_data?.redirect_uri,
          request_url: resp_data?.request_url,
          _id: resp_data?._id,
        });
        setShowLoader(false);
      }
    }
    GetGoogleKey();
    const search = window.location.href; // to get url

    if (search) {
      const splitcode = search.split("code=");

      if (splitcode[1]) {
        const getcode = splitcode[1].split("&");

        if (
          getcode[1] == "scope=https://www.googleapis.com/auth/spreadsheets"
        ) {
          PostGoogleCode(getcode[0]);
          async function PostGoogleCode(code) {
            var payload = {
              code: code,
            };
            const resp = await dispatch(CONNECT_WITH_GOOGLE(payload));
            if (resp?.status == 200) {
              setGoogleConnection(true);
            }
          }
        } else {
          PostFacebookCode(getcode[0]);
          async function PostFacebookCode(code) {
            var payload = {
              code: code,
            };
            const res = await dispatch(CONNECT_WITH_FACEBOOK(payload));
            if (res.status == 200) {
              setFacebookConnection(true);
            }
          }
        }
      }
    }
  }, []);

  return (
    <div className="main-Google">
      {ShowLoader == true ? (
        <div className="loader"></div>
      ) : (
        <>
          {" "}
          <div className="googleaccount_main">
            <img
              src={"../facebook.png"}
              style={{ width: "120px" }}
              onClick={() => navigate("/crm/facebook_adds")}
            />

            <button
              className="facebook_button"
              onClick={() => {
                window.open(FacebookData?.auth_url, "_self");
              }}
            >
              {FacebookConnection == true ? "Connected" : "Connect"}
            </button>

            <div style={{ marginLeft: "40px" }}>
              {FacebookConnection == true ? (
                <>
                  <input type="checkbox" checked />
                  <div>
                    <u>
                      <a
                        style={{
                          position: "absolute",
                          marginBottom: "1px",
                          marginLeft: "-140px",
                          marginTop: "18px",
                          color: "blue",
                        }}
                        href={FacebookData?.auth_url}
                      >
                        {" "}
                        Reauthorize
                      </a>
                    </u>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="googleaccount_main">
            <img
              src={"../google-logo.jpg"}
              style={{ width: "120px" }}
              onClick={() => navigate("/crm/google_adds")}
            />

            <button
              className="google_button"
              onClick={() => {
                window.open(GoogleData?.auth_url, "_self");
              }}
            >
              {GoogleConnection == true ? "" : "Connect"}
            </button>
            <div style={{ marginLeft: "40px" }}>
              {GoogleConnection == true ? (
                <input type="checkbox" checked />
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GoogleAccounts;
