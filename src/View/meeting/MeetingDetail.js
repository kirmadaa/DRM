// import { React, useEffect, useState } from "react";
// import { connect } from "react-redux";
// import Menu from "../../Components/Common/Menu";
// import "../../scss/Components/Lead.scss";
// import Dropdown from "react-bootstrap/Dropdown";
// import { Link } from "react-router-dom";
// import TabelComponent from "../../Components/LeadTable";
// import { updateMeeting, getMeetingById } from "../../Redux/meetingSlice";
// import { Eye } from "react-feather";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";

// export const MeetingDetail = (props) => {
//     const data = useSelector((s) => s.meeting.meetingDetail);
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { meetingDetailAction, updateMeetingAction, lead } = props;
//     const [editable, setEditable] = useState(true);
//     useEffect(() => {
//         meetingDetailAction(id);
//     }, []);
//     const SignupSchema = Yup.object().shape({

//     });
//     return (
//         <>
//             <Menu />
//             <Formik
//                 initialValues={{
//                     _id: data._id,
//                     MeetingTitle: data.MeetingTitle,
//                     Location: data.Location,
//                     Allday: data.Allday,
//                     From: data.From,
//                     To: data.To,
//                     RelatedTo: data.RelatedTo,
//                     Reminder: data.Reminder,
//                     Description: data.Description,
//                 }}
//                 enableReinitialize
//                 onSubmit={(values, { setSubmitting }) => {
//                     setSubmitting(false);
//                     updateMeetingAction({ ...values }).then((res) => {
//                         if (res.payload.status === 200) {
//                             navigate("/Meeting");
//                         }
//                     });
//                 }}
//             >

//                 {({ isSubmitting }) => (
//                     <Form>
//                         <div className="content  bd-b homembl">
//                             <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
//                                 <div className="d-sm-flex align-items-center justify-content-between">
//                                     <div>
//                                         <nav aria-label="breadcrumb">
//                                             <ol className="breadcrumb breadcrumb-style1 mg-b-10">
//                                                 <li className="breadcrumb-item">
//                                                     <a href="/home">Dashboard</a>
//                                                 </li>
//                                                 <li
//                                                     className="breadcrumb-item active"
//                                                     aria-current="page"
//                                                 >
//                                                     Meeting
//                                                 </li>
//                                             </ol>
//                                         </nav>
//                                         <div style={{ display: "flex" }}>
//                                             <h4 className="mg-b-5">Meeting  </h4>
//                                         </div>
//                                     </div>
//                                     <div className="d-none d-md-block">
//                                         {!editable ? (
//                                             <>
//                                                 <Link
//                                                     to="/Meeting"
//                                                     className="btn btn-sm pd-x-15 btn-white btn-uppercase"
//                                                 >
//                                                     <i data-feather="mail" className="wd-10 "></i>Back
//                                                 </Link>
//                                                 <button
//                                                     className="btn btn-sm pd-x-15 btn-primary btn-uppercase mg-l-5"
//                                                     type="submit"
//                                                     disabled={isSubmitting}
//                                                 >
//                                                     <i
//                                                         data-feather="file"
//                                                         className="wd-10 "
//                                                         type="submit"
//                                                     ></i>
//                                                     Save
//                                                 </button>
//                                             </>
//                                         ) : (
//                                             <button
//                                                 className="btn btn-sm pd-x-15 btn-primary btn-uppercase mg-l-5"
//                                                 onClick={() => {
//                                                     setEditable(!editable);
//                                                 }}
//                                             >
//                                                 <i data-feather="file" className="wd-10 "></i>Edit
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="content  content-auth editprofile">
//                             <div className="container">
//                                 <fieldset className="form-fieldset">
//                                     <legend>Contact Information</legend>
//                                     <div className="media align-items-stretch  ht-100p">

//                                         <div className="sign-wrapper mg-lg-r-50 mg-xl-r-60 w-50">
//                                             <div className="pd-t-20 wd-100p">
//                                                 <div className="form-group row">
//                                                     <label htmlFor="firstName" className="col-sm-3 col-form-label">Meeting Title</label>
//                                                     <div className="col-sm-9">
//                                                         <Field name="MeetingTitle" type="text" className="form-control" placeholder="Enter Meeting Title"
//                                                             disabled={editable}
//                                                         />

//                                                     </div>
//                                                 </div>

//                                                 <div className="form-group row">
//                                                     <label htmlFor="firstName" className="col-sm-3 col-form-label">Location</label>
//                                                     <div className="col-sm-9">
//                                                         <Field type="text" className="form-control" placeholder="Enter your Location" name="Location"
//                                                             disabled={editable}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="form-group row">
//                                                     <label htmlFor="firstName" className="col-sm-3 col-form-label">All Day</label>
//                                                     <div className="col-sm-9">
//                                                         <Field name="Allday" type="text" className="form-control" placeholder="Enter Allday"
//                                                             disabled={editable}
//                                                         />

//                                                     </div>
//                                                 </div>

//                                                 <div className="form-group row">
//                                                     <label htmlFor="firstName" className="col-sm-3 col-form-label">From</label>
//                                                     <div className="col-sm-9">
//                                                         <Field type="text" className="form-control" placeholder="Enter your From" name="From"
//                                                             disabled={editable}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="sign-wrapper mg-lg-r-50 mg-xl-r-60 w-50">
//                                             <div className="pd-t-20 wd-100p">

//                                                 <div className="form-group row">
//                                                     <label htmlFor="firstName" className="col-sm-3 col-form-label">To</label>
//                                                     <div className="col-sm-9">
//                                                         <Field type="datetime-local" className="form-control" placeholder="Enter your To"
//                                                             name="To"
//                                                             disabled={editable}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className="form-group row">
//                                                     <label htmlFor="firstName" className="col-sm-3 col-form-label">Related To</label>
//                                                     <div className="col-sm-9">
//                                                         <Field type="text" className="form-control" placeholder="Enter your Related To"
//                                                             name="RelatedTo"
//                                                             disabled={editable}
//                                                         />

//                                                     </div>
//                                                 </div>
//                                                 <div className="form-group row">
//                                                     <label htmlFor="firstName" className="col-sm-3 col-form-label">Reminder</label>
//                                                     <div className="col-sm-9">
//                                                         <Field type="text" className="form-control" placeholder="Enter your Reminder"
//                                                             name="Reminder"
//                                                             disabled={editable}
//                                                         />

//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>

//                                     </div>
//                                 </fieldset>
//                             </div>
//                         </div>

//                         <div className="content  content-auth editprofile">
//                             <div className="container">
//                                 <fieldset className="form-fieldset">
//                                     <legend>Description Information</legend>
//                                     <div className="form-group row">
//                                         <label htmlFor="firstName" className="col-sm-2 col-form-label">
//                                             Description
//                                         </label>
//                                         <div className="col-sm-10">
//                                             <Field
//                                                 type="text"
//                                                 className="form-control"
//                                                 placeholder="Enter Description"
//                                                 name="Description"
//                                                 disabled={editable}
//                                             />
//                                         </div>
//                                     </div>
//                                 </fieldset>
//                             </div>
//                         </div>
//                     </Form>
//                 )}
//             </Formik>
//         </>
//     );
// };

// <div className="form-group">
//     <h3></h3>
// </div>;

// const mapStateToProps = (state) => ({
//     meeting: state.meeting,
//     data: state.meeting.meetingDetail,
//     pagination: state.meeting.pagination,
// });

// const mapDispatchToProps = {
//     meetingDetailAction: (data) => getMeetingById(data),
//     updateMeetingAction: (data) => updateMeeting(data),
// };
// export default connect(mapStateToProps, mapDispatchToProps)(MeetingDetail);
import React from "react";

import { useParams } from "react-router-dom";
import FormEditor from "../../Components/Common/EditForm/FormEditor";
import DetailsPageHeader from "../../Components/detailsPageHeader";
import { useSelector } from "react-redux";

function MeetingDetail() {
  const { id } = useParams();
  const sections = useSelector((state) => state.user.form);
  return (
    <>
      <DetailsPageHeader sectionData={sections} />
      <div className="my-3 min-h-screen">
        <div>
          <FormEditor formType="Meeting" id={id} />;
        </div>
      </div>
    </>
  );
}

export default MeetingDetail;
