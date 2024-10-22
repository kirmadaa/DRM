import ToastContent from "../Components/toastContent";
import { Slide, toast } from "react-toastify";

const AlertError = (text) => {
    return toast.error(
        <ToastContent
            type={"light-danger"}
            //  icon={<AlertCircle size={12} />}
            title={"Fail :("}
            text={
                <span className="fw-light">
                    {typeof text === "object"
                        ? "Something is wrong Please  try on more time "
                        : text}{" "}
                </span>
            }
        />,
        { transition: Slide, hideProgressBar: true, autoClose: 4000 }
    );
};

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
}

const CheckObjectValidation = (data, notRequired) => {
    let getTitle = (value) => {
        if (value) {
            let titleis = value
                ?.replace(/([A-Z])/g, " $1")
                ?.replace(/^./, function (str) {
                    return str.toUpperCase();
                });
            return titleis.replace(/_/g, "");
        }
        return ""
    };
    for (const keyname in data) {
        if (keyname === 'email') {
            if (!validateEmail(data[keyname])) {
                AlertError('Email format is not valid !')
                return { isvalid: false, keyname }
            }
        } else if (!notRequired.includes(keyname) && (data[keyname] === undefined || data[keyname] === null || data[keyname].length === 0 || data[keyname] === '\r\n' || data[keyname] === '\n' || data[keyname] === '')) {
            AlertError(getTitle(keyname), `${getTitle(keyname)} is required !`)
            return { isvalid: false, keyname }
        }
    }
    return { isvalid: true, keyname: '' }
}

const CheckListObjectValidation = (data, notRequired) => {
    for (let index = 0; index < data.length; index++) {
        const obj = data[index];
        let res = CheckObjectValidation(obj, notRequired)
        if (res?.isvalid === false) {
            return { ...res, rowNo: index + 1 }
        } else {
            return { ...res, rowNo: index + 1 }
        }

    }
}


const CheckDragAndDropFormObjectValidation = (data, notRequired) => {
    let getTitle = (value) => {
        if (value) {
            let titleis = value
                ?.replace(/([A-Z])/g, " $1")
                ?.replace(/^./, function (str) {
                    return str.toUpperCase();
                });
            return titleis.replace(/_/g, "");
        }
        return ""
    };
    for (const keyname in data) {
        if ((data[keyname] === undefined || data[keyname] === null || data[keyname].length === 0 || data[keyname] === '\r\n' || data[keyname] === '\n' || data[keyname] === '')) {
            AlertError(getTitle(keyname), `${getTitle(keyname)} is required !`)
            return { isvalid: false, ...data }
        }
    }
    return { isvalid: true, keyname: '' }
}


const CheckDragAndDropFormListValidation = (data, notRequired) => {
    // { console.log("data====>6336--", data, notRequired) }
    const error = {}
    let errorExist = 0
    for (let index = 0; index < data.length; index++) {
        const obj = data[index];
        const inputs = obj.inputs
        for (let i = 0; i < inputs.length; i++) {
            let res = CheckDragAndDropFormObjectValidation(inputs[i], notRequired)
            if (res?.isvalid === false) {
                error[res.id] = true
                errorExist++
            } else {
                error[res.id] = false
            }
        }
    }
    if (errorExist > 0) {
        return { isValid: false, error }
    }
    return { isValid: true }
}

export {
    CheckObjectValidation,
    CheckListObjectValidation,
    CheckDragAndDropFormListValidation
}
