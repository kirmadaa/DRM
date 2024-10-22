import React from "react";
import { ArrowRight } from "react-feather";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { IPANEL_SEARCH } from "../../Redux/actions/ipanel";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_ALL_DATA_FILTER } from "../../Redux/actions/user";
import { list } from "../module";

function RightSidBar() {
  const api = list["Inventory"] || {};
  const detail = useSelector((state) => state.user.detail);
  const data = useSelector((state) => state.user.data)
  const mainSearchResult = useSelector(
    (state) => state?.ipanelState?.mainSearchResult
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFilter = (offset = 1, limit = 100) => {
    if (detail?.City) {
      let payload = {
        offset,
        buttonType: "All",
        search: [{
          field: "City",
          data: detail?.City,
          filter: "IS",
          type: "text",
        }]
      };
      dispatch(GET_ALL_DATA_FILTER(api.getApi, payload));
    }
  };

  useEffect(() => {
    if (detail?.Micromarket) {
      dispatch(IPANEL_SEARCH(0, 10, detail?.Micromarket));
    }
    else if (detail?.Localities) {
      dispatch(IPANEL_SEARCH(0, 10, detail?.Localities));
    }
    else if (detail?.City) {
      dispatch(IPANEL_SEARCH(0, 10, detail?.City));
    }
    getFilter()
  }, [detail]);


  return (
    <>
      <div className="rounded-2xl bg-white h-full p-6 w-[270px] min-w-[270px] mt-3 sticky top-[200px] ">
        <div className="flex justify-between pt-[10px] px-10 pb-2">
          <h4 className=" text-base font-semibold text-gray-950">
            <div> I Panel</div>
          </h4>
          <div className="cursor-pointer ">
            <ArrowRight size={18} />
          </div>
        </div>
        <hr />
        <ul className="list-disc p-4">
          <li className="pt-[10px] px-10 pb-2 text-base font-semibold cursor-pointer hover:text-primary text-[#929296]">
            {mainSearchResult?.list?.length ? (
              <div
                // onClick={() => {
                //   localStorage.removeItem("lastSearchOfIpanel");
                //   navigate(`/crm/ipanel`, {
                //     state: { cityQuery: mainSearchResult },
                //   });
                // }}
              >
                {/* Total {mainSearchResult?.total ?? 0} Results found for {detail?.City} */}
                <div>No Results found</div>
              </div>
            ) : (
              
              <div>No Results found</div>
            )}
          </li>
          <li className="pt-[10px] px-10 pb-2 text-base font-semibold cursor-pointer hover:text-primary text-[#929296]">
            {data && data?.length ? (
              <div 
              // onClick={() => {
              //   localStorage.removeItem("lastSearchOfIpanel");
              //   navigate(`/crm/ipanel`, {
              //     state: { cityQuery: mainSearchResult },
              //   });
              // }}
              >
                {/* Total {data.length ?? 0} Inventory found for {detail?.City} */}
                <div>No Results found</div>
              </div>
            ) : (
              
              <div>No Results found</div>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

export default RightSidBar;
