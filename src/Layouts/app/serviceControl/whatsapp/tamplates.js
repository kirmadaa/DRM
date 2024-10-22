import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_TEMPLATE_WHATSAPP_LIST, DELETE_TEMPLATE } from "../../../../Redux/actions/serviceControl";
import EditTemplate from './edit'
import DeleteItem from '../delete'

const Templates = ({ currentPage, data }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GET_TEMPLATE_WHATSAPP_LIST({
            offset: currentPage,
            limit: 10,
        }))
    }, [])


    const handleDelete = async (id)=>{
        let endpoint = `/delete-sms-temp/${id}`
        let res = await dispatch(DELETE_TEMPLATE(endpoint))
        if(res){
            dispatch(GET_TEMPLATE_WHATSAPP_LIST({
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
                                <div className="flex justify-start items-start">
                                    <img alt='template' className="mr-3 w-40 h-40 object-cover rounded-md" src={item?.templateImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdKl5n3lXaWKkI5BWNJD5VrcmHYjd5sksLT8gnK_zfzvjBtiHWcb7c9IZsjGCXqWZRcpE&usqp=CAU'} />
                                    <div className="w-full">
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-gray-600 text-xl"> {item?.templateName}</p>
                                            <div className="flex justify-end space-x-2">
                                                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <DeleteItem item={item} title={item?.templateName} 
                                                    des={item?.message} handleDelete={handleDelete} />
                                                </div>
                                                <EditTemplate currentPage={currentPage} item={item} />
                                            </div>
                                        </div>
                                        <p className="text-gray-500">
                                            {item?.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Templates;