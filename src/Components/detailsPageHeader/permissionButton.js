import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { GET_DATA_SHARING_PERMISSIONS } from '../../Redux/actions/security-control'

const getUserId = () => {
    return JSON.parse(localStorage.getItem("userData"))?.userData

}

const PermissionButton = ({ hooksValue }) => {
    const dispatch = useDispatch()
    const readyToShow = true
    const [modulePermissions, setModulePermissions] = useState({})
    let { write, editable, edit, handleButtons, setEditable, sectionData, detail } = hooksValue

    useEffect(() => {
        if (sectionData?.formTitle) {
            dispatch(GET_DATA_SHARING_PERMISSIONS()).then((res) => {
                let items = res?.data?.data?.find(it => it?.moduleTitle?.toLowerCase() === sectionData?.formTitle?.toLowerCase())
                setModulePermissions(items)
            })
        }

    }, [sectionData?.formTitle])

    const permission = useMemo(() => {
        let id = detail[`${sectionData?.formTitle}OwnerId`]

        if (getUserId()?._id === id || getUserId()?.profile === 'Administrator') {
            return <>
                {write && edit && !editable
                    ? sectionData?.formTitle === "Leads" && (
                        <button
                            className="bg-primary rounded-lg text-white py-2 px-4 min-w-[100px] text-sm font-medium leading-5 "
                            onClick={() => handleButtons("convert-button")}
                            type="button"
                            disabled={!write || !edit}
                        >
                            Convert
                        </button>
                    )
                    : ""}
                {edit ? (
                    editable ? (
                        <button
                            className="bg-primary rounded-lg text-white py-2 px-4 min-w-[100px] text-sm font-medium leading-5 "
                            onClick={() => handleButtons("save-button")}
                            type="button"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            className="bg-primary rounded-lg text-white py-2 px-4 min-w-[100px] text-sm font-medium leading-5 "
                            onClick={() => {
                                handleButtons("edit-button");
                                setEditable(true);
                            }}
                            type="button"
                        >
                            Edit
                        </button>
                    )
                ) : (
                    ""
                )}
            </>
        } if (modulePermissions?.read || modulePermissions === undefined) {
            return <>
                {modulePermissions?.write || getUserId()?.profile === 'Administrator' ? (
                    editable ? (
                        <button
                            className="bg-primary rounded-lg text-white py-2 px-4 min-w-[100px] text-sm font-medium leading-5 "
                            onClick={() => handleButtons("save-button")}
                            type="button"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            className="bg-primary rounded-lg text-white py-2 px-4 min-w-[100px] text-sm font-medium leading-5 "
                            onClick={() => {
                                handleButtons("edit-button");
                                setEditable(true);
                            }}
                            type="button"
                        >
                            Edit
                        </button>
                    )
                ) : (
                    ""
                )}
            </>
        }
    }, [modulePermissions, editable])

    return (
        <>
            {readyToShow && permission}
        </>
    )
}

export default PermissionButton;