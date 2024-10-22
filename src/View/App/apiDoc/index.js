import { ApiDocLayout } from "../../../Layouts";
import BreadCrumb from "../../../Components/breadcrumb";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { GET_API_LIST } from '../../../Redux/actions/apiDoc'

const breadcrumblist = [
    { name: 'Dashboard', path: '/crm/dashboard' },
]

const ApiDoc = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GET_API_LIST())
    }, [dispatch])


    return (
        <div className="w-full min-h-screen">
            <div className="py-2 w-full">
                <BreadCrumb
                    mainTitle='API Documentation'
                    active='API Listing'
                    breadcrumblist={breadcrumblist}
                />
            </div>
            <ApiDocLayout />
        </div>
    )
}

export default ApiDoc;