import { Link } from "react-router-dom";


const SendEmailAndTask = ({moduleName, itemId}) => {

    return (
        <div className="space-x-2 w-36 flex justify-start items-center ">
            <Link to={`/crm/modules/auto-responders?module=${moduleName}`} className="inline-flex items-center rounded-lg border-[1.5px] px-4 py-3 whitespace-nowrap text-sm font-medium bg-primary text-white hover:bg-opacity-90">
                Send Email
            </Link>
            <Link 
            to={`/crm/create-tasks?connectionId=${itemId}?prePathname=${window.location.pathname}`}
            className="inline-flex items-center rounded-lg border-[1.5px] px-4 py-3 whitespace-nowrap text-sm font-medium bg-primary text-white hover:bg-opacity-90">
                Create Task
            </Link>
        </div>
    )
}

export default SendEmailAndTask;