import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../../Components/breadcrumb";
import { GET_TIMELINE_BY_CONNECTION_ID } from "../../../../Redux/actions/comman";
import { useDispatch } from "react-redux";
import { NoteDetailLayout } from "../../../../Layouts";
import DetailsPageHeader from "../../../../Components/detailsPageHeader";
import FormEditor from "../../../../Components/Common/EditForm/FormEditor";
import { useSelector } from "react-redux";

const breadcrumblist = [
    { name: "Dashboard", path: "/crm/dashboard" },
    { name: "Note", path: "/crm/notes" },
];

function NoteDetails() {
    const { id } = useParams();
    const dispatch = useDispatch()

    const sections = useSelector((state) => state.user.form);

    useEffect(() => {
        dispatch(GET_TIMELINE_BY_CONNECTION_ID(id))
    }, [])

    return (
        <>
            {/* <div className="my-3 min-h-screen container mx-auto "> */}
            {/* <BreadCrumb
            mainTitle="Edit Note"
            active={id}
            breadcrumblist={breadcrumblist}
        /> */}
            {/* <div>
            <NoteDetailLayout formType="Note" id={id} />
        </div> */}
            <DetailsPageHeader sectionData={sections} />
            <div className="my-3 min-h-screen">
                <div>
                    <FormEditor formType="Note" id={id} />{" "}
                </div>
            </div>
            {/* </div> */}
        </>
    )
}

export default NoteDetails;
