import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_TEMPLATE_EMAIL_LIST, DELETE_TEMPLATE } from "../../../../Redux/actions/serviceControl";
import EditTemplate from './edit'
import DeleteItem from '../delete'

const Templates = ({ currentPage, data }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GET_TEMPLATE_EMAIL_LIST({
            offset: currentPage,
            limit: 10,
        }))
    }, [])

    const handleDelete = async (id)=>{
        let endpoint = `/delete-email-temp/${id}`
        let res = await dispatch(DELETE_TEMPLATE(endpoint))
        if(res){
            dispatch(GET_TEMPLATE_EMAIL_LIST({
                offset: currentPage,
                limit: 10,
            }))
        }
    }

    return (
        <div className="bg-white border p-3 min-h-[200px] rounded-lg mt-2 ">
            <div>
                <p className="font-[400] text-lg text-gray-600 ">Templates </p>
            </div>
            <div>
                {
                    data?.map((item) => {
                        return (
                            <div key={item?._id} className="cursor-pointer mt-2 p-2.5 bg-gray-50 rounded-md shadow-lg hover:shadow-xl hover:bg-white">
                                <div className="flex justify-between items-center">
                                    <div className=" w-3/4 ">
                                        <p className="text-gray-600 text-xl"> {item?.emailTitle}</p>
                                    </div>
                                    <div className="flex justify-between space-x-2">
                                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                                            <DeleteItem item={item} 
                                            des={item?.emailDescription}
                                            title={item?.emailTitle} handleDelete={handleDelete} />
                                        </div>
                                        <EditTemplate currentPage={currentPage}
                                         item={item} />
                                    </div>
                                </div>
                                <p className="text-gray-500">
                                    {item?.emailDescription}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Templates;