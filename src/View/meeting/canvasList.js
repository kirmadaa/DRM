import React from "react";
import { useSelector } from "react-redux";
import MeetingSubHeader from "./MeetingSubHeader";
import ListingCanvasViewLayout from '../../Components/canvasview/meeting'

function CanvasLeadList() {
    const form = useSelector((state) => state.user.form);

    return (
        <>
            <MeetingSubHeader form={form?.sections} moduleName="Meeting" />
            <ListingCanvasViewLayout key="Meeting" moduleName="Meeting" filterSHow={true} />
        </>
    );
}

export default CanvasLeadList;
