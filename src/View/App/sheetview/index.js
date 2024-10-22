import { useLocation, useNavigate } from "react-router-dom";
import { SheetViewLayout } from "../../../Layouts";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { list } from "../../../Components/module";
import { GET_ALL_DATA } from "../../../Redux/actions/user";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "feather-icons-react/build/IconComponents";
import { ADD_SHEET_BY_MODULENAME, GET_SHEET_BY_MODULENAME } from '../../../Redux/actions/sheet'
import { GET_ALL_DATA_FILTER_SaleOrder } from "../../../Redux/actions/saleOrder";
import { GET_ALL_DATA_FILTER_PURCHASE } from '../../../Redux/actions/purchaseOrder'
import { GET_ALL_DATA_FILTER_INVOICE } from '../../../Redux/actions/invoices'
import { GET_ALL_DATA_FILTER_QUOTES } from '../../../Redux/actions/quotes'
import useAccessibleRole from "../../../hooks/useAccessibleRole";

const SheetView = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [showRows, setShowRows] = useState(50);
    const [currentPage, setCurrentPage] = useState(1);
    const [modifiedData, setModifiedData] = useState(null)
    const [saving, setSaving] = useState(false)
    const state = useSelector(state => state)
    const [sheetdata, setSheetData] = useState(null)
    const navigate = useNavigate()
    const { sheetReducer, user } = state
    const searchParams = new URLSearchParams(location.search.split('?')[1])
    const moduleName = searchParams.get('moduleName')
    const api = list[moduleName] || {};
    const { sheetByModuleName } = sheetReducer
    const { excelSheet } = useAccessibleRole(moduleName);
  
    useEffect(()=>{
      if(!excelSheet && excelSheet !== undefined){
        navigate('/crm/dashboard')
      }
    },[excelSheet])
  
    const getApiTofetchData = async (page, lmt) => {
        let res = null
        let payload = {
            offset: page,
            limit: lmt
        }
        if (moduleName === 'saleOrder') {
            res = await dispatch(GET_ALL_DATA_FILTER_SaleOrder(payload));
        } else if (moduleName === 'purchaseOrder') {
            res = await dispatch(GET_ALL_DATA_FILTER_PURCHASE(payload))
        } else if (moduleName === 'invoice') {
            res = await dispatch(GET_ALL_DATA_FILTER_INVOICE(payload))
        } else if (moduleName === 'quotes') {
            res = await dispatch(GET_ALL_DATA_FILTER_QUOTES(payload))
        }
        else {
            res = await dispatch(GET_ALL_DATA(page, lmt, api.getApi));
        }
        setSheetData(res)
    }

    const getLeadData = (specificData, data) => {
        if (moduleName === 'saleOrder') {
            return { data: specificData?.orderData, pagination: specificData?.pagination }
        } else if (moduleName === 'purchaseOrder') {
            return { data: specificData?.orderData, pagination: specificData?.pagination }
        } else if (moduleName === 'invoice') {
            return { data: specificData?.orderData, pagination: specificData?.pagination }
        } else if (moduleName === 'quotes') {
            return { data: specificData?.orderData, pagination: specificData?.pagination }
        }
        else {
            return data
        }
    }

    useEffect(() => {
        getApiTofetchData(1, 50)
        dispatch(GET_SHEET_BY_MODULENAME(`${moduleName}-from_${currentPage}-${showRows}`))
    }, [])

    const handlePagination = (page) => {
        getApiTofetchData(page, 50)
        dispatch(GET_SHEET_BY_MODULENAME(`${moduleName}-from_${page.selected + 1}-${showRows}`))
        setCurrentPage(page.selected + 1);
    };

    const handleShowRows = (value) => {
        setShowRows(value);
        getApiTofetchData(currentPage, value)
        dispatch(GET_SHEET_BY_MODULENAME(`${moduleName}-from_${currentPage}-${value}`))
    };

    const CustomPagination = () => {
        const count = Number(Math.ceil(getLeadData(sheetdata, user)?.pagination?.total / showRows));

        return (
            <ReactPaginate
                previousLabel={<ChevronLeft />}
                nextLabel={<ChevronRight />}
                pageCount={count || 1}
                activeClassName="active"
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={(page) => handlePagination(page)}
                containerClassName={
                    "pagination react-paginate text-sm gap-2 flex justify-end my-2"
                }
            />
        );
    };

    const addSheet = async (payloadData) => {
        let payload = {
            moduleTitle: `${moduleName}-from_${currentPage}-${showRows}`,
            payload: payloadData
        }
        await dispatch(ADD_SHEET_BY_MODULENAME(payload))
        setSaving(false)

    }

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (modifiedData !== null) {
                setSaving(true)
                addSheet(modifiedData)
            }
        }, 3000)

        return () => {
            clearTimeout(debounceTimer)
        }
        // eslint-disable-next-line 
    }, [modifiedData])

    useEffect(() => {
        dispatch(GET_SHEET_BY_MODULENAME(`${moduleName}-from_${currentPage}-${showRows}`))
    }, [])

    return (
        <div className="w-full">
           {sheetdata !== null && <>
                <div className="w-full flex justify-between items-center px-3">
                    <h1 className="text-xl font-semibold">{moduleName}.xl</h1>
                    {saving && <div className="px-2 rounded-md py-1 shadow-md text-green-600 bg-white">
                        Saving...
                    </div>}

                    <div className="flex justify-end items-center space-x-2">
                        <div className="border border-[#E4E4E7] rounded-2xl px-3 bg-white">
                            <select
                                className="focus:outline-none pe-2 py-3 text-sm font-medium text-[#18181B]"
                                onChange={(e) => handleShowRows(e.target.value)}
                            >
                                <option className="text-sm font-medium" value="50">
                                    50 Rows
                                </option>
                                <option className="text-sm font-medium" value="100">
                                    100 Rows
                                </option>
                                <option className="text-sm font-medium" value="150">
                                    150 Rows
                                </option>
                                <option className="text-sm font-medium" value="200">
                                    200 Rows
                                </option>
                            </select>
                        </div>
                        {CustomPagination()}
                    </div>
                </div>
                <SheetViewLayout
                    sheetByModuleName={sheetByModuleName}
                    setModifiedData={setModifiedData}
                    showRows={showRows}
                    data={getLeadData(sheetdata, user)?.data} />
            </>}
        </div>
    )
}

export default SheetView;