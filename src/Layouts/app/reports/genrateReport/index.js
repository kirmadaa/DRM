import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GENRATE_REPORT_BY_ID } from "../../../../Redux/actions/reports";
import moment from "moment";
import reporticon from './report.webp'

const hideFilterList = ['0', "1", "status", "Status", "LeadSource", "read", "tuch", "TasksOwnerId", "CreatedBy", "deletedAt", "_id", "Lookup",
    "Owner", "LeadsOwnerId", "LeadOwnerId", "DealOwnerId", "ContactOwnerId",
    "AccountOwnerId", "TaskOwnerId", "MeetingOwnerId", "callOwnerId", "Id", "id",
    "connectionId", "taskOwnerId", "connectionId", "ModifiedBy", "SmsOwnerId",
    "WhatsappOwnerId", "templateOwner", "ContactName", "siteVisitOwnerId",
    "meetingHostId", "organizationId", "EmailOwnerId", "noteOwnerId", "listOfTags"];

const getTitle = (value) => {
    let titleis = value
        ?.replace(/([A-Z])/g, " $1")
        ?.replace(/^./, function (str) {
            return str.toUpperCase();
        });
    return titleis.replace(/_/g, " ");
};

export const isValueIsDate = (value, key) => {
    let keynames = ['createdAt', 'updatedAt', 'createdTime', 'updatedTime', "ClosedTime", "DueDate"]
    let valueIs = keynames.includes(key) ? moment(value).format('DD/MM/YYYY') : value;
    if (typeof valueIs !== 'object') {
        return valueIs
    }
}

const GenrateReport = () => {
    const dispatch = useDispatch()
    const { reportId } = useParams()
    const [baseInfo, setBeseInfo] = useState(null)
    const [data, setData] = useState(null)

    const getReport = async () => {
        let res = await dispatch(GENRATE_REPORT_BY_ID(reportId))
        if (res) {
            setData(res)
            setBeseInfo(res[0])
        } else {
            setData(res)
        }
    }

    // console.log(data)
    useEffect(() => {
        getReport()
    }, [reportId])

    return (
        <div className="mt-4 w-full min-h-[80vh] overflow-scroll shadow rounded-md p-2 bg-white">
            <div className="mb-3 flex justify-between items-center">
                <div>
                    <h1>{baseInfo?.name}</h1>
                    <p className="text-gray-700 text-sm">{baseInfo?.description}</p>
                </div>
                {data && <Link to='/crm/reports' className="bg-primary rounded-md px-2 py-1 text-white">
                    Reports
                </Link>}
            </div>
            {data ? <div>
                {
                    data?.map((item, i) => {
                        console.log(item)
                        return (
                            <div className="w-full mb-6" key={item?._id + i}>
                                {item?.reportModules?.map((moduleName, index) => {
                                    let info = item[`linked${moduleName}`]
                                    return (
                                        <div key={moduleName}>
                                            {index > 0 && <div style={{ marginLeft: item?.isMultiSelect  ? (index !== 0 ? 100 : 20) :   (index * 150) }}>
                                                <div className="h-20 w-0.5 bg-blue-200" />
                                                <div className="w-8 h-8 -ml-[14px] -mb-4 rounded-full bg-blue-200" />
                                            </div>}
                                            <div style={{ marginLeft:  item?.isMultiSelect  ?  (index !== 0 ? 70 : 10) : (index * 100) }} className={`min-w-[300px] w-3/4 min-h-[130px] rounded-lg shadow`}>
                                                <div className=" capitalize p-2 font-semibold bg-gray-100 rounded-t-lg ">
                                                    {moduleName}
                                                </div>
                                                <div className="p-3 grid grid-cols-2 gap-1">
                                                    {item[`linked${moduleName}`]?.length === 0 && <p className=" text-left text-lg text-gray-400 font-[400]">No Data Available !</p>}
                                                    {item[`linked${moduleName}`]?.length > 0 ?
                                                        item[`linked${moduleName}`]?.map((item, i) => {
                                                            return (
                                                                <Fragment key={i + item?._id}>
                                                                    {
                                                                        Object.keys(item)?.map(kayname => {
                                                                            return (!hideFilterList.includes(kayname) && <div className="grid gap-2 grid-cols-2">
                                                                                <div className="font-[500] text-sm">{getTitle(kayname)}</div>
                                                                                <div className="text-gray-600">{isValueIsDate(item[kayname], kayname)}</div>
                                                                            </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </Fragment>
                                                            )
                                                        }) : Object.keys(item[`linked${moduleName}`])?.map((kayname, i) => {
                                                            return (
                                                                <Fragment key={i + item?._id}>
                                                                    {(!hideFilterList.includes(kayname) && <div className="grid gap-2 grid-cols-2">
                                                                        <div className="font-[500] text-sm">{getTitle(kayname)}</div>
                                                                        <div className="text-gray-600">{isValueIsDate(info[kayname], kayname)}</div>
                                                                    </div>)}
                                                                </Fragment>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                }
            </div> : <div className="w-full min-h-[400px] flex justify-center text-center">
                <div>
                    <img className="w-[280px] h-[280px]" src={reporticon} alt='report ' />
                    <h1 className="font-[500] mb-5">No Record found for this Report</h1>
                    <center>
                        <Link to='/crm/reports' className="bg-primary rounded-md px-4 py-2 text-white">
                            Reports
                        </Link>
                    </center>
                </div>
            </div>}
        </div>
    )
}

export default GenrateReport;