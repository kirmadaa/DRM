import React, { useEffect, useState } from "react";
// import FeatherIcon from "feather-icons-react";
// import down_arrow from "../../Auth/images/down_arrow.png";
import "moment/locale/zh-cn";
// import {
//   CONNECT_WITH_FACEBOOK,
//   GET_FACEBOOK_PLATFORM,
//   GET_GOOGLE_PLATFORM,
//   CONNECT_WITH_GOOGLE,
//   CONNECT_WITH_FACEBOOK_CAMPAIGNS,
//   CONNECT_WITH_FACEBOOK_ADSETS,
//   CONNECT_WITH_FACEBOOK_ADS,
//   GETADSET_BYCAMPAIGNS,
//   GETADDS_BYADSET,
// } from "../../Redux/actions/socialAccounts";
// import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import moment from "moment";

const FacebookLeads = () => {
  const param = useParams();
  const location = useLocation();
  // const [ShowCampaigns, setShowCampaigns] = useState(true);
  // const [isActive, setisActive] = useState(true);
  // const [isActive2, setisActive2] = useState(false);
  // const [isActive3, setisActive3] = useState(false);
  // const [ShowAdds, setShowAdds] = useState(false);
  // const [ShowAdSets, setShowAdSets] = useState(false);
  // const [ShowOtherSection, setShowOtherSection] = useState(false);
  // const [ShowOrderDetail, setShowOrderDetail] = useState(false);

  // const [authData, setAuthData] = useState();
  // const [formData, setformData] = useState({
  //   g_sheet_id: "",
  //   sheet: "",
  //   client_id: "",
  //   secret_key: "",
  // });
  // const [CampaignsData, setCampaignsData] = useState([]);
  // const [AdSetsData, setAdSetsData] = useState([]);
  // const [AddsData, setAddsData] = useState([]);
  // const [AddsDataOld, setAddsDataOld] = useState([]);
  // const [AccountID, setAccountID] = useState([]);
  const [ShowLoader, setShowLoader] = useState(true);
  // const [FacebookToken, setFacebookToken] = useState();
  // const [SelectedCampaignName, setSelectedCampaignName] = useState();
  // const [SelectedAddSetName, setSelectedAddSetName] = useState();
  // const [Render, setRender] = useState(0);
  const [LeadsData, setLeadsData] = useState([]);
  const add_id = param.id;
  useEffect(() => {
    var UserData = localStorage.getItem("userData");
    if (UserData) {
      var ParseData = JSON.parse(UserData);
      //   const accnt_id = ParseData?.facebook?.account_id;
      const facebook_token = ParseData?.facebook?.facebook_token;
      var url =
        "https://graph.facebook.com/v17.0/" +
        add_id +
        "/leads?access_token=" +
        facebook_token;
      GetLeads(url);
    }
    async function GetLeads(url) {
      let response = await fetch(url);
      let resp_data = await response.json();
      // console.log(resp_data);
      if (resp_data) {
        const data = resp_data?.data;
        setLeadsData(data);
      }
      setTimeout(() => {
        setShowLoader(false);
      }, 200);
    }
  }, []);
  var CSVFile;
  const tableToCSV = () => {
    // Variable to store the final csv data
    var csv_data = [];

    // Get each row data
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
      // Get each column data
      var cols = rows[i].querySelectorAll("td,th");

      // Stores each csv row data
      var csvrow = [];
      for (var j = 0; j < cols.length; j++) {
        // Get the text data of each cell
        // of a row and push it to csvrow
        csvrow.push(cols[j].innerHTML);
      }

      // Combine each column value with comma
      csv_data.push(csvrow.join(","));
    }

    // Combine each row data with new line character
    csv_data = csv_data.join("\n");

    // Call this function to download csv file
    downloadCSVFile(csv_data);
  };

  const downloadCSVFile = (csv_data) => {
    // Create CSV file object and feed
    // our csv_data into it
    CSVFile = new Blob([csv_data], {
      type: "text/csv",
    });

    // Create to temporary link to initiate
    // download process
    var temp_link = document.createElement("a");

    // Download csv file
    temp_link.download = add_id;
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to
    // trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
  };

  return (
    <>
      {ShowLoader ? (
        <div className="loader"></div>
      ) : (
        <>
          <div className="container facebook_leadform">
            <div>
              <b style={{ fontSize: "20px" }}>Add Name: </b> {location.state}
            </div>
            {LeadsData.length > 0 ? (
              <button onClick={() => tableToCSV()}>
                <img
                  src="/csv.png"
                  alt="download icon"
                  style={{ height: "40px", marginRight: "45px" }}
                />
              </button>
            ) : (
              ""
            )}
          </div>

          <div className="container">
            <div className="w-full">
              <div className=" tab_view">
                {LeadsData.length > 0 ? (
                  <table id="customers">
                    <tr>
                      {/* <th>
                  <input type="checkbox" id="" name="" value="" />
                </th> */}
                      {/* <th>Off/On</th> */}

                      <th className="dio_dd">Full Name</th>
                      <th>Phone Number</th>
                      <th>Email</th>
                      <th>State</th>
                      <th>Created Date</th>
                    </tr>
                    {LeadsData?.map((item, i) => (
                      <tr>
                        {/* <td>
                    <input type="checkbox" id="" name="" value="" />
                  </td> */}
                        {/* <td>
                    <label className="switch">
                      <input type="checkbox" checked />
                      <span className="slider round"></span>
                    </label>
                  </td> */}

                        <td> {item?.field_data?.[0]?.values?.[0]}</td>
                        <td>{item?.field_data?.[1]?.values?.[0]}</td>
                        <td>{item?.field_data?.[2]?.values?.[0]}</td>
                        <td>{item?.field_data?.[3]?.values?.[0]}</td>
                        <td>
                          {item?.created_time
                            ? moment(item?.created_time).format("DD-MM-YYYY")
                            : ""}
                        </td>

                        <td></td>
                      </tr>
                    ))}
                  </table>
                ) : (
                  <hi className="nodata_facebook_leads">No Data</hi>
                )}
              </div>
            </div>
          </div>
          {/* )} */}
        </>
      )}
    </>
  );
};

export default FacebookLeads;
