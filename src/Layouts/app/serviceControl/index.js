import { useDispatch } from "react-redux";
import { GET_COMPANY_DATA_BY_ID } from '../../../Redux/actions/company'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WhatsApp from './whatsapp'
import Email from './email'
import Sms from './sms'
import { useSelector } from "react-redux";
import { SERVICE_CONTROL_ACTIVE_INACTIVE } from '../../../Redux/actions/serviceControl'

const ServiceControlLayout = () => {
    const dispatch = useDispatch()
    const serviceControl = useSelector(state => state?.companyReducer?.Company?.data)
    const { servicename } = useParams()
    const [service, setService] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(GET_COMPANY_DATA_BY_ID())
    }, [dispatch])

    useEffect(() => {
        setService({
            sms_service: serviceControl?.sms_service || false,
            email_service: serviceControl?.email_service || false,
            whatsapp_service: serviceControl?.whatsapp_service || false,
        })
    }, [serviceControl])


    const handleClick = async (value, name) => {
        setLoading(true)
        await dispatch(SERVICE_CONTROL_ACTIVE_INACTIVE({ ...service, [name]: value }))
        await dispatch(GET_COMPANY_DATA_BY_ID())
        setLoading(false)
    }


    return (
        <div className="container mt-4 min-h-screen p-3">
            {serviceControl !== undefined && <>
                {servicename === 'whatsapp' && <WhatsApp loading={loading} handleClick={handleClick} service={serviceControl} />}
                {servicename === 'email' && <Email loading={loading} handleClick={handleClick} service={serviceControl} />}
                {servicename === 'sms' && <Sms loading={loading} handleClick={handleClick} service={serviceControl} />}
            </>}
        </div>
    )
}

export default ServiceControlLayout;