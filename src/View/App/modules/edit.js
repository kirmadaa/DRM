
import React from "react";
import { EditModuleLayout } from "../../../Layouts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GET_MODULE_BY_ID } from "../../../Redux/actions/modules";

const EditModule = () => {
    const { moduleId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GET_MODULE_BY_ID(moduleId))
    }, [])

    return (
        <div>
            <EditModuleLayout />
        </div>
    )
}

export default EditModule;