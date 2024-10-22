import { toast } from 'react-toastify'
import { Check, Copy } from "react-feather"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Fragment } from 'react'

const ToastSuccess = () => (
    <Fragment>
        <div className='toastify-header pb-0'>
            <h6 className='toast-title'>Copied !</h6>
        </div>
    </Fragment>
)

const CopyValue = ({ value }) => {

    const onCopy = () => {
        toast.success(<ToastSuccess />, {
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false
        })
    }

    return (
        <CopyToClipboard onCopy={onCopy} text={value}>
            <Copy className="cursor-pointer" size={16} />
        </CopyToClipboard>
    )
}

export default CopyValue