import React, { useEffect, useState } from "react";
import SetupSidebar from "../../../Layouts/app/setupSidebar";
import { useDispatch } from "react-redux";
import {
  DATA_BACKUP_DOWNLOAD,
  DATA_BACKUP_LIST,
} from "../../../Redux/actions/dataBackup";
import moment from "moment";
import { DownloadIcon } from "../../../assets/svgIcons";
import useAccessibleRole from "../../../hooks/useAccessibleRole";

const DataBackup = () => {
  const dispatch = useDispatch();
  const [dataList, setDataList] = useState([]);

  const { read } = useAccessibleRole("dataBackup");

  const fetchBackuList = () => {
    dispatch(DATA_BACKUP_LIST("get-download-data?offset=1&limit=5")).then(
      (res) => {
        if (res) {
          setDataList(res?.backupData);
        }
      }
    );
  };
  const handleDataBackup = () => {
    dispatch(DATA_BACKUP_DOWNLOAD("download-data")).then((res) => {
      if (res) {
        fetchBackuList();
      }
    });
  };

  useEffect(() => {
    fetchBackuList();
  }, []);

  return (
    <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
      <SetupSidebar />
      <div className="rounded-2xl bg-[white] w-full p-6">
        <h2 className="font-semibold">Data Backup</h2>
        <p className="text-xs mt-1">
          Download a complete copy of CRM data by purchasing a backup from{" "}
          <a href="/" className="text-[#009AFE]">
            here.
          </a>
        </p>
        <button
          onClick={(e) => handleDataBackup()}
          disabled={!read}
          className="max-w-20 bg-primary rounded-2xl text-white py-2 px-10"
        >
          Download Now
        </button>
        <h2 className="mt-6 mb-2 text-primary text-base font-semibold">
          Data Backup List
        </h2>
        <div className="border-[1.5px] border-[#E6E6EB] rounded-2xl">
          <table className="table table-dashboard mg-b-0 w-full rounded-2xl overflow-hidden">
            <thead className="text-sm text-gray-900 font-medium bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3 text-left font-medium">
                  Created By
                </th>
                <th scope="col" className="px-6 py-3 text-end font-medium">
                  Download
                </th>
              </tr>
            </thead>
            <tbody>
              {(dataList || []).map((item, index) => (
                <tr
                  key={index}
                  // onClick={() => handleClicks(_id, item)}
                  className="bg-white border-b border-[#929296] cursor-pointer"
                >
                  <th
                    scope="row"
                    className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left"
                  >
                    {moment(item?.createdAt).format("DD/MM/YYYY")}
                  </th>
                  <th
                    scope="row"
                    className="px-5 py-4 font-medium text-[#929296] text-sm whitespace-nowrap text-end"
                  >
                    <a href={item?.dataLink} target="_blank">
                      <button
                        type="button"
                        className="inline-flex  items-center rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
                        data-te-toggle="tooltip"
                        data-te-placement="bottom"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        title="Download List"
                      >
                        <span>
                          <DownloadIcon />
                        </span>
                        <span>Download</span>
                      </button>
                    </a>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataBackup;
