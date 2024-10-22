import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GET_LIST_OF_SMS_OR_WHATS_OR_EMAIL, GET_MODULE_INFO_BY_CONNECTION_ID, SEND_SMS_OR_WHATS_OR_EMAIL } from "../../../Redux/actions/comman";
import ListAndOnClickModal from "./listAndOnClickModal";
import SendEmailApp from "./send";

const getUserId = () => {
    return JSON.parse(localStorage.getItem("userData"))?.userData

}
const EmailApp = ({ id, ownerid, permission }) => {
    const dispatch = useDispatch()
    const [emails, setEmail] = useState([])
    const [options, setOptions] = useState([])
    let [isOpen, setIsOpen] = useState(false)
    let sentEndPoint = 'get-sent-email-by-connection'

    const asyncGetEmailApp = async () => {
        let dataAPi = '/search-get-email-temp'
        let payload = {
            offset: 1,
            limit: 50
        }
        let res = await dispatch(GET_MODULE_INFO_BY_CONNECTION_ID(sentEndPoint, id))
        setEmail(res?.data?.sentEmailData || [])
        let data = await dispatch(GET_LIST_OF_SMS_OR_WHATS_OR_EMAIL(dataAPi, payload))
        setOptions(data?.data?.data?.EmailData || [])
    }

    useEffect(() => {
        asyncGetEmailApp()
    }, [dispatch])

    const handleSend = async (temId) => {
        let payload = { connectionId: id, templateId: temId }
        let res = await dispatch(SEND_SMS_OR_WHATS_OR_EMAIL('/send-email', payload))
        if (res?.status === 200) {
            let res = await dispatch(GET_MODULE_INFO_BY_CONNECTION_ID(sentEndPoint, id))
            setEmail(res?.data?.sentEmailData || [])
            setIsOpen(false)
        }
    }


    const checkPermission = () => {
        if (ownerid === getUserId()?._id || getUserId()?.profile === 'Administrator') {
            return <>
                <div className="pb-2 flex justify-between items-center">
                    <p className="font-medium text-lg">Sent Email Template</p>
                    <SendEmailApp
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        keyname='templateName'
                        handleSend={handleSend}
                        options={options} title='Email' />
                </div>
                <ListAndOnClickModal data={emails} />
            </>
        } else if (permission?.read) {
            return <>
                <div className="pb-2 flex justify-between items-center">
                    <p className="font-medium text-lg">Sent Email Template</p>
                    {permission?.write && <SendEmailApp
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        keyname='templateName'
                        handleSend={handleSend}
                        options={options} title='Email' />}
                </div>
                <ListAndOnClickModal data={emails} />

            </>
        }
    }

    return (

        <div className="w-full my-3">
            {checkPermission()}
        </div>
    )
}

export default EmailApp;