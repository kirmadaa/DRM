import { useEffect, useState } from "react";
import Folders from "./folder";
import SubHeader from "./subheader";
import TableReport from "./table";
import { useDispatch } from "react-redux";
import { GET_LIST_OF_FOLDERS, GET_LIST_OF_REPORTS } from "../../../Redux/actions/reports";
import { useSelector } from "react-redux";

const ReportsLayout = () => {
    const dispatch = useDispatch()
    const reportState = useSelector(state => state?.reports)
    const { listOfFolders, listOfReports } = reportState
    const [moduleName, setModuleName] = useState('')
    const [selectedType, setSelectedType] = useState({
        folderName: "All Reports",
    })

    useEffect(() => {
        dispatch(GET_LIST_OF_FOLDERS())
    }, [dispatch])

    useEffect(() => {
        let endPoint = ''
        if (selectedType?._id) {
            endPoint = `/folder?folderId=${selectedType?._id}`
        } else {
            endPoint = '/all'
        }
        dispatch(GET_LIST_OF_REPORTS(endPoint))
    }, [selectedType, dispatch])

    return (
        <div className="w-full overflow-hidden">
            <div className="mt-2 flex gap-3 h-screen justify-start items-center">
                <div className="pl-1 bg-white rounded-xl h-full w-[270px] min-w-[270px] ">
                    <Folders
                        valueandhooks={{
                            listOfFolders,
                            setSelectedType,
                            selectedType
                        }} />
                </div>
                <div className="w-[calc(100%-300px)] h-screen">
                    <SubHeader hooks={{
                        selectedType, setSelectedType,
                        moduleName, setModuleName
                    }} />
                    <TableReport data={listOfReports} />
                </div>
            </div>
        </div>
    )
}

export default ReportsLayout;