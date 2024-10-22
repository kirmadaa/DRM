
import { Fragment } from 'react'

const ToastContent = ({ title, text, icon, type }) => {
    return(
        <Fragment>
        <div className='toastify-header'>
            <div className='title-wrapper'>
                <h6 className='toast-title font-weight-bold'>{title}</h6>
            </div>
        </div>
        <div className='toastify-body'>
            <span>{text}</span>
        </div>
    </Fragment>
       )
}
export default ToastContent