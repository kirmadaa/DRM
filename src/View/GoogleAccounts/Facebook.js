import React, { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import down_arrow from "../../Auth/images/down_arrow.png";
import "moment/locale/zh-cn";
import {
  CONNECT_WITH_FACEBOOK,
  GET_FACEBOOK_PLATFORM,
  GET_GOOGLE_PLATFORM,
  CONNECT_WITH_GOOGLE,
  CONNECT_WITH_FACEBOOK_CAMPAIGNS,
  CONNECT_WITH_FACEBOOK_ADSETS,
  CONNECT_WITH_FACEBOOK_ADS,
} from "../../Redux/actions/socialAccounts";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const Facebook = () => {
  const dispatch = useDispatch();
  const [ShowCampaigns, setShowCampaigns] = useState(true);
  const [isActive, setisActive] = useState(false);
  const [isActive2, setisActive2] = useState(false);
  const [isActive3, setisActive3] = useState(false);
  const [ShowAdds, setShowAdds] = useState(false);
  const [ShowAdSets, setShowAdSets] = useState(false);
  const [ShowOtherSection, setShowOtherSection] = useState(false);
  const [ShowOrderDetail, setShowOrderDetail] = useState(false);

  const [authData, setAuthData] = useState();
  const [formData, setformData] = useState({
    g_sheet_id: "",
    sheet: "",
    client_id: "",
    secret_key: "",
  });
  const [CampaignsData, setCampaignsData] = useState([]);
  const [AdSetsData, setAdSetsData] = useState([]);
  const [AddsData, setAddsData] = useState([]);
  const [AccountID, setAccountID] = useState([]);
  const [ShowLoader, setShowLoader] = useState(true);
  useEffect(() => {
    var UserData = localStorage.getItem("userData");
    if (UserData) {
      var ParseData = JSON.parse(UserData);
      const accnt_id = ParseData?.facebook?.account_id;
      GetCampaignsData(accnt_id?.[0]?.id);
      setAccountID(accnt_id);
    }

    setisActive(true);
  }, []);

  const GetCampaignsData = (e) => {
    const account_id = e;
    const token =
      "EAADyhh7ydycBO9ZCh3J7GKcmdZANnP6LQ9DoCKqLZAbZC2YJIYA3HLzHnRbszSqMaLjZADwQbeJKi8WZB9eHVwCKgHUpWXmZClZAuUmMzxNYrvZAQeUkhBByv3vZBmZBi5RZA8EkGsZBRwoGQchrVhsEhyy415bYgilMZBZA2T5EgYPJgx5hDut2zeMZA3ZB4eZC8BcL0DDLxCI1kKORvVWXkVO0X4FezoCGzWNrOzIkRIgTgwKuOwK48ESicXs0TIOWnOqZCRjpQDQ1QZDZD";
    //

    var campaing_url =
      "https://graph.facebook.com/v17.0/" +
      account_id +
      "/campaigns?fields=name,account_id,billing_event,budget_remaining,daily_budget,campaign_attribution,effective_status,end_time,optimization_goal,start_time,updated_time,insights{reach,impressions,cpm,unique_clicks,spend}&limit=100&access_token=" +
      token;
    const add_url =
      "https://graph.facebook.com/v17.0/" +
      account_id +
      "/ads?access_token=" +
      token +
      "&fields=name,account_id,effective_status,updated_time,insights{reach,impressions,cpm,unique_clicks,spend}&limit=100";

    var addsets_url =
      "https://graph.facebook.com/v17.0/" +
      account_id +
      "/adsets?fields=name,account_id,billing_event,budget_remaining,daily_budget,campaign_attribution,effective_status,end_time,optimization_goal,start_time,updated_time,insights{reach,impressions,cpm,unique_clicks,spend}&limit=100&access_token=" +
      token;

    async function GetCampaingData(url) {
      let response = await fetch(url);
      let data_all = await response.json();
      const data = data_all?.data ? data_all?.data : [];
      setCampaignsData(data);
      setShowLoader(false);
    }
    GetCampaingData(campaing_url);

    async function GetAddsSetsData(url) {
      let response = await fetch(url);
      let data_all = await response.json();
      const data = data_all?.data ? data_all?.data : [];
      setAdSetsData(data);
      setShowLoader(false);
    }
    GetAddsSetsData(addsets_url);

    async function GetAddData(url) {
      let response = await fetch(url);
      let data_all = await response.json();
      const data = data_all?.data ? data_all?.data : [];
      setAddsData(data);
      setShowLoader(false);
    }
    GetAddData(add_url);
  };

  return (
    <>
      <div className="container">
        <>
          <b> Account ID:</b>
          <select
            name=""
            id=""
            // style={{  border: 'solid 2px',   marginLeft: '10px',     marginTop: '20px',marginBottom: '20px'}}
            className="accountid_select"
            onChange={(e) => {
              GetCampaignsData(e.target.value);
              setShowLoader(true);
            }}
          >
            {AccountID?.map((item, i) => (
              <option key={item?.id} value={item?.id}>
                {item?.account_id}
              </option>
            ))}
          </select>
        </>
        <div className="w-full flex">
          <div className="lg:w-1/3">
            <div
              onClick={() => {
                setShowCampaigns(true);
                setShowAdSets(false);

                setisActive(true);
                setisActive2(false);
                setisActive3(false);

                setShowOrderDetail(false);
                setShowAdds(false);
              }}
              className={isActive == true ? "aciveButton" : "cmp_ghh"}
            >
              <FeatherIcon icon="folder-minus" className="" />
              <h2>Campaigns</h2>
            </div>
          </div>
          <div className="lg:w-1/3">
            <div
              onClick={() => {
                setShowAdSets(true);
                setShowOrderDetail(true);
                setisActive2(true);
                setisActive(false);
                setisActive3(false);

                setShowCampaigns(false);
                setShowAdds(false);
              }}
              className={isActive2 == true ? "aciveButton" : "cmp_ghh"}
            >
              <FeatherIcon icon="folder-minus" className="" />
              <h2>Add sets</h2>
            </div>
          </div>
          <div className="lg:w-1/3">
            <div
              onClick={() => {
                setShowOrderDetail(false);
                setShowAdSets(false);
                setShowAdds(true);
                setisActive3(true);
                setisActive2(false);
                setisActive(false);
                setShowCampaigns(false);
              }}
              className={isActive3 == true ? "aciveButton" : "cmp_ghh"}
            >
              <FeatherIcon icon="folder-minus" className="" />
              <h2>Ads for 1 Ad set</h2>
            </div>
          </div>
        </div>
      </div>
      {ShowLoader == true ? (
        <div className="loader"></div>
      ) : (
        <div className="container">
          <div className="w-full">
            <div className="set_oin">
              <div className="create_fgfg">
                <div className="cmt">
                  <h2>+</h2>
                  <h3>Create</h3>
                </div>
                <div className="cmt_2">
                  <FeatherIcon icon="copy" className="" />
                </div>
                <div className="cmt_2">
                  <FeatherIcon icon="chevron-down" className="" />
                </div>
                <div className="cmt_3">
                  <FeatherIcon icon="edit" className="" />
                  <h2>Edit</h2>
                </div>
                <div className="cmt_2">
                  <FeatherIcon icon="chevron-down" className="" />
                </div>
                <div className="cmt_">
                  <select name="" id="">
                    <option value="">More</option>
                    <option value="">Saab</option>
                    <option value="">Opel</option>
                    <option value="">Audi</option>
                  </select>
                </div>
              </div>
              <div className="create_fgfg">
                <div className="cmt_gh">
                  <h3>View Setup</h3>
                  <label className="switch">
                    <input
                      type="checkbox"
                      onChange={(e) => console.log(e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="cmt_">
                  <select name="" id="">
                    <option value="">Columns:Perormans</option>
                    <option value="">Saab</option>
                    <option value="">Opel</option>
                    <option value="">Audi</option>
                  </select>
                </div>
                <div className="cmt_">
                  <select name="" id="">
                    <option value="">Breakdown</option>
                    <option value="">Saab</option>
                    <option value="">Opel</option>
                    <option value="">Audi</option>
                  </select>
                </div>
                <div className="cmt_">
                  <select name="" id="">
                    <option value="">Reports</option>
                    <option value="">Saab</option>
                    <option value="">Opel</option>
                    <option value="">Audi</option>
                  </select>
                </div>
              </div>
            </div>
            {ShowCampaigns == true ? (
              <div className=" tab_view">
                <table id="customers">
                  <tr>
                    <th>
                      <input type="checkbox" id="" name="" value="" />
                    </th>
                    <th>Off/On</th>
                    <th>Name</th>
                    <th className="dio_dd">
                      CPM
                      <FeatherIcon icon="arrow-up" className="" />
                    </th>
                    <th>Impressions</th>
                    <th>Reach</th>
                    <th>Start Date</th>
                    <th>Stop Date</th>
                    <th>Status</th>
                  </tr>
                  {CampaignsData?.map((item, i) => (
                    <tr>
                      <td>
                        <input type="checkbox" id="" name="" value="" />
                      </td>
                      <td>
                        <label className="switch">
                          <input type="checkbox" checked />
                          <span className="slider round"></span>
                        </label>
                      </td>
                      <td>{item?.name}</td>
                      <td>{item?.insights?.data?.[0]?.cpm}</td>
                      <td>{item?.insights?.data?.[0]?.impressions}</td>
                      <td>{item?.insights?.data?.[0]?.reach}</td>
                      <td>
                        {moment(item?.insights?.data?.[0]?.date_start).format(
                          "YYYY-MM-DD"
                        )}
                      </td>
                      <td>
                        {moment(item?.insights?.data?.[0]?.date_stop).format(
                          "YYYY-MM-DD"
                        )}
                      </td>
                      <td>{item?.effective_status}</td>

                      <td></td>
                    </tr>
                  ))}
                </table>
              </div>
            ) : (
              ""
            )}
            {ShowAdSets == true ? (
              <div className=" tab_view">
                <table id="customers">
                  <tr>
                    <th>
                      <input type="checkbox" id="" name="" value="" />
                    </th>
                    <th>Off/On</th>
                    <th>Name</th>
                    {/* <th className="dio_dd">
                    Dynamic Creative
                    <FeatherIcon icon="arrow-up" className="" />
                  </th> */}
                    <th className="dio_dd">
                      CPM
                      <FeatherIcon icon="arrow-up" className="" />
                    </th>
                    <th>Impressions</th>
                    <th>Reach</th>
                    <th>Campaign Attribution</th>
                    <th>Billing Event</th>
                    <th>Goal</th>
                    <th>Start Time</th>
                    <th>Update Time</th>
                    <th>Status</th>
                    {/* <th>Results</th>
                  <th>Reach</th>  */}
                  </tr>
                  {AdSetsData?.map((item, i) => (
                    <tr>
                      <td>
                        <input type="checkbox" id="" name="" value="" />
                      </td>
                      <td>
                        <label className="switch">
                          <input type="checkbox" checked />
                          <span className="slider round"></span>
                        </label>
                      </td>
                      <td>{item?.name}</td>
                      <td>{item?.insights?.data?.[0]?.cpm}</td>
                      <td>{item?.insights?.data?.[0]?.impressions}</td>
                      <td>{item?.insights?.data?.[0]?.reach}</td>
                      <td>{item?.campaign_attribution}</td>
                      <td>{item?.billing_event}</td>
                      <td>{item?.optimization_goal}</td>
                      <td>
                        {moment(item?.insights?.data?.[0]?.date_start).format(
                          "YYYY-MM-DD"
                        )}
                      </td>
                      <td>
                        {moment(item?.insights?.data?.[0]?.date_stop).format(
                          "YYYY-MM-DD"
                        )}
                      </td>
                      <td>{item?.effective_status}</td>

                      <td></td>
                    </tr>
                  ))}
                </table>
              </div>
            ) : (
              ""
            )}
            {ShowAdds == true ? (
              <div className=" tab_view">
                <table id="customers">
                  <tr>
                    <th>
                      <input type="checkbox" id="" name="" value="" />
                    </th>
                    <th>Off/On</th>
                    <th>Name</th>
                    {/* <th className="dio_dd">
                  Dynamic Creative
                  <FeatherIcon icon="arrow-up" className="" />
                </th> */}
                    <th className="dio_dd">
                      CPM
                      <FeatherIcon icon="arrow-up" className="" />
                    </th>
                    <th>Impressions</th>
                    <th>Reach</th>
                    <th>Account ID</th>
                    <th>Effective Status</th>
                    <th>Start Date</th>
                    <th>Stop Date</th>
                    {/* <th>LifeTime Budget</th>
                <th>Daily Budget</th> */}
                    {/* <th>Results</th>
                <th>Reach</th>  */}
                  </tr>
                  {AddsData?.map((item, i) => (
                    <tr>
                      <td>
                        <input type="checkbox" id="" name="" value="" />
                      </td>
                      <td>
                        <label className="switch">
                          <input type="checkbox" checked />
                          <span className="slider round"></span>
                        </label>
                      </td>
                      <td>{item?.name}</td>
                      <td>{item?.insights?.data?.[0]?.cpm}</td>
                      <td>{item?.insights?.data?.[0]?.impressions}</td>
                      <td>{item?.insights?.data?.[0]?.reach}</td>
                      <td>{item?.account_id}</td>
                      <td>{item?.effective_status}</td>
                      <td>
                        {moment(item?.insights?.data?.[0]?.date_start).format(
                          "YYYY-MM-DD"
                        )}
                      </td>
                      <td>
                        {moment(item?.insights?.data?.[0]?.date_stop).format(
                          "YYYY-MM-DD"
                        )}
                      </td>

                      <td></td>
                    </tr>
                  ))}
                </table>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      {/* <div className="cmp">
        <div className="row">
          <div className="col-4">
            <div
              onClick={() => {
                setShowCampaigns(true);
                setShowOrderDetail(false);
                setShowAdds(false);
              }}
              className="cmp_ghh"
            >
              <FeatherIcon icon="folder-minus" className="" />
              <h2>Campaigns</h2>
            </div>
          </div>
          <div className="col-4">
            <div
              onClick={() => {
                setShowOrderDetail(true);
                setShowCampaigns(false);
                setShowAdds(false);
              }}
              className="cmp_ghh"
            >
              <FeatherIcon icon="folder-minus" className="" />
              <h2>Add sets</h2>
            </div>
          </div>
          <div className="col-4">
            <div
              onClick={() => {
                setShowOrderDetail(false);
                setShowAdds(true);
                setShowCampaigns(false);
              }}
              className="cmp_ghh"
            >
              <FeatherIcon icon="folder-minus" className="" />
              <h2>Ads for 1 Ad set</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 w-full">
            <div className="set_oin">
              <div className="create_fgfg">
                <div className="cmt">
                  <h2>+</h2>
                  <h3>Create</h3>
                </div>
                <div className="cmt_2">
                  <FeatherIcon icon="copy" className="" />
                </div>
                <div className="cmt_2">
                  <FeatherIcon icon="chevron-down" className="" />
                </div>
                <div className="cmt_3">
                  <FeatherIcon icon="edit" className="" />
                  <h2>Edit</h2>
                </div>
                <div className="cmt_2">
                  <FeatherIcon icon="chevron-down" className="" />
                </div>
                <div className="cmt_">
                  <select name="" id="">
                    <option value="">More</option>
                    <option value="">Saab</option>
                    <option value="">Opel</option>
                    <option value="">Audi</option>
                  </select>
                </div>
              </div>
              <div className="create_fgfg">
                <div className="cmt_gh">
                  <h3>View Setup</h3>
                  <label className="switch">
                    <input type="checkbox" checked />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="cmt_">
                  <select name="" id="">
                    <option value="">Columns:Perormans</option>
                    <option value="">Saab</option>
                    <option value="">Opel</option>
                    <option value="">Audi</option>
                  </select>
                </div>
                <div className="cmt_">
                  <select name="" id="">
                    <option value="">Breakdown</option>
                    <option value="">Saab</option>
                    <option value="">Opel</option>
                    <option value="">Audi</option>
                  </select>
                </div>
                <div className="cmt_">
                  <select name="" id="">
                    <option value="">Reports</option>
                    <option value="">Saab</option>
                    <option value="">Opel</option>
                    <option value="">Audi</option>
                  </select>
                </div>
              </div>
            </div>
            {ShowCampaigns == true ? (
              <div className=" tab_view">
                <table id="customers">
                  <tr>
                    <th>
                      <input type="checkbox" id="" name="" value="" />
                    </th>
                    <th>Off/On</th>
                    <th>Campaign</th>
                    <th className="dio_dd">
                      Delivery
                      <FeatherIcon icon="arrow-up" className="" />
                    </th>
                    <th>Bid Strategy</th>
                    <th>Budget</th>
                    <th>Attribution setting</th>
                    <th>Results</th>
                    <th>Reach</th>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" id="" name="" value="" />
                    </td>
                    <td>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>Maria Anders</td>
                    <td>Off</td>
                    <td>12.04.2023</td>
                    <td>22.04.2023</td>
                    <td>Germany</td>
                    <td>₹850</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" id="" name="" value="" />
                    </td>
                    <td>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>Christina Berglund</td>
                    <td>Sweden</td>
                    <td>12.04.2023</td>
                    <td>22.04.2023</td>
                    <td>Germany</td>
                    <td>₹850</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" id="" name="" value="" />
                    </td>
                    <td>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                    <td>12.04.2023</td>
                    <td>22.04.2023</td>
                    <td>Germany</td>
                    <td>₹850</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" id="" name="" value="" />
                    </td>
                    <td>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>Roland Mendel</td>
                    <td>Austria</td>
                    <td>12.04.2023</td>
                    <td>22.04.2023</td>
                    <td>Germany</td>
                    <td>₹850</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" id="" name="" value="" />
                    </td>
                    <td>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>Helen Bennett</td>
                    <td>UK</td>
                    <td>12.04.2023</td>
                    <td>22.04.2023</td>
                    <td>Germany</td>
                    <td>₹850</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" id="" name="" value="" />
                    </td>
                    <td>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>Philip Cramer</td>
                    <td>Germany</td>
                    <td>12.04.2023</td>
                    <td>22.04.2023</td>
                    <td>Germany</td>
                    <td>₹850</td>
                    <td></td>
                  </tr>
                </table>
              </div>
            ) : (
              ""
            )}

            {ShowAdds == true ? (
              <div className=" tab_view">
                <table id="customers">
                  <tr>
                    <th>
                      <input type="checkbox" id="" name="" value="" />
                    </th>
                    <th>Off/On</th>
                    <th>Campaign</th>
                    <th>Delivery</th>
                    <th>Bid Strategy</th>
                    <th>Budget</th>
                    <th>Attribution setting</th>
                    <th>Results</th>
                    <th>Reach</th>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" id="" name="" value="" />
                    </td>
                    <td>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>Maria Anders</td>
                    <td>Off</td>
                    <td>12.04.2023</td>
                    <td>22.04.2023</td>
                    <td>Germany</td>
                    <td>₹850</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" id="" name="" value="" />
                    </td>
                    <td>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>Christina Berglund</td>
                    <td>Sweden</td>
                    <td>12.04.2023</td>
                    <td>22.04.2023</td>
                    <td>Germany</td>
                    <td>₹850</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" id="" name="" value="" />
                    </td>
                    <td>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                    <td>12.04.2023</td>
                    <td>22.04.2023</td>
                    <td>Germany</td>
                    <td>₹850</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" id="" name="" value="" />
                    </td>
                    <td>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>Roland Mendel</td>
                    <td>Austria</td>
                    <td>12.04.2023</td>
                    <td>22.04.2023</td>
                    <td>Germany</td>
                    <td>₹850</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" id="" name="" value="" />
                    </td>
                    <td>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>Helen Bennett</td>
                    <td>UK</td>
                    <td>12.04.2023</td>
                    <td>22.04.2023</td>
                    <td>Germany</td>
                    <td>₹850</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" id="" name="" value="" />
                    </td>
                    <td>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>Philip Cramer</td>
                    <td>Germany</td>
                    <td>12.04.2023</td>
                    <td>22.04.2023</td>
                    <td>Germany</td>
                    <td>₹850</td>
                    <td></td>
                  </tr>
                </table>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Facebook;
