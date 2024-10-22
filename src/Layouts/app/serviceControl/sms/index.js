
import { Switch } from "@headlessui/react";
import AddTemplate from './add'
import Templates from "./tamplates";
import { ADD_SMS_TEMPLATE, GET_TEMPLATE_SMS_LIST } from "../../../../Redux/actions/serviceControl";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import {
    ChevronLeft,
    ChevronRight,
} from "react-feather";
import { useState } from "react";
import { useSelector } from "react-redux";
import SearchInput from '../inputSearch'

const Email = ({ service, handleClick, loading }) => {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const smsTemplates = useSelector(state => state?.ServiceControlReducer?.smsTemplates)
    const [searchTerm, setSearchTerm] = useState('')

    const saveTemplate = async (payload) => {
        let res = await dispatch(ADD_SMS_TEMPLATE(payload))
        if (res) {
            dispatch(GET_TEMPLATE_SMS_LIST({ limit: 10, offset: currentPage }))
        }
    }

    const handlePagination = (page) => {
        setCurrentPage(page.selected + 1);
    };


    const CustomPagination = () => {
        const count = Number(Math.ceil(smsTemplates?.data?.pagination?.total / 10));

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


    return (
        <div>
            <div className="flex justify-start space-x-3 items-center max-w-md ">
                <p className='text-xl font-[300]'>SMS Service</p>
                {loading ? <span className=" animate-spin h-7 w-7 border-dashed border-primary"></span> : <Switch
                    checked={service?.sms_service}
                    onChange={(e) => handleClick(e, 'sms_service')}
                    className={`${service?.sms_service ? 'bg-primary' : 'bg-gray-300'} relative inline-flex  h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
                    <span
                        aria-hidden={true}
                        className={`${service?.sms_service ? 'translate-x-9' : 'translate-x-0'} pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>}
            </div>

            {service?.sms_service && <div className="my-3">
                <div className="flex justify-between items-center">
                    <SearchInput
                        payload={
                            {
                                limit: 10, offset: currentPage, search: [
                                    {
                                        field: "SmsTitle",
                                        data: searchTerm?.trim(),
                                        filter: "START_WITH"
                                    }
                                ]
                            }
                        }
                        SEARCH_API_CALL={GET_TEMPLATE_SMS_LIST}
                        placeholder='Search for Template'
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                    <div className="flex space-x-2 justify-end items-center">
                        <AddTemplate saveTemplate={saveTemplate} />
                        <CustomPagination />
                    </div>
                </div>
                <Templates data={smsTemplates?.data?.SmsData} currentPage={currentPage} />
            </div>}
        </div>
    )
}

export default Email;