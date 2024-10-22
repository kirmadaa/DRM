// import { React, useState } from "react";
// import Menu from "../../Components/Common/Menu";
// import "../../scss/Components/Lead.scss";
// import { Link, Navigate } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { getCallById, updateCall } from "../../Redux/callSlice";
// import { useParams } from "react-router-dom";
// import { useEffect } from "react";
// import { connect } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// export const CallDetails = (props) => {
//   const { id } = useParams();
//   const [editable, setEditable] = useState(true);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { getcallDetailAction, updateCallAction, call } = props;
//   const data = useSelector((state) => state.call.callDetail);
//   useEffect(() => {
//     dispatch(getCallById(id));
//   }, []);
//   const SignupSchema = Yup.object().shape({
//   });

//   return (
//     <>
//       <Menu />
//       <Formik
//         initialValues={{
//           _id: data?._id,
//           CallTo: data?.CallTo,
//           RelatedTo: data?.RelatedTo,
//           CallType: data?.CallType,
//           OutgoingCallStatus: data?.OutgoingCallStatus,
//           CallStartTime: data?.CallStartTime,
//           Subject: data?.Subject,
//           CallPurpose: data?.CallPurpose,
//           CallAgenda: data?.CallAgenda,
//         }}
//         enableReinitialize
//         validationSchema={SignupSchema}
//         onSubmit={(values, { setSubmitting }) => {
//           setSubmitting(false);
//           dispatch(updateCall({ ...values })).then((res) => {
//             if (res.payload.status === 200) {
//               navigate("/Call");
//             }
//           });
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <div className="content  bd-b homembl">
//               <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
//                 <div className="d-sm-flex align-items-center justify-content-between">
//                   <div>
//                     <nav aria-label="breadcrumb">
//                       <ol className="breadcrumb breadcrumb-style1 mg-b-10">
//                         <li className="breadcrumb-item">
//                           <a href="/home">Dashboard</a>
//                         </li>
//                         <li
//                           className="breadcrumb-item active"
//                           aria-current="page"
//                         >
//                           {" "}
//                           Call
//                         </li>
//                       </ol>
//                     </nav>
//                     <div style={{ display: "flex" }}>
//                       <h4 className="mg-b-5"> Call </h4>
//                     </div>
//                   </div>
//                   <div className="d-none d-md-block">
//                     {!editable ? (
//                       <>
//                         <Link
//                           to="/Call"
//                           className="btn btn-sm pd-x-15 btn-white btn-uppercase"
//                         >
//                           <i data-feather="mail" className="wd-10 "></i>Back
//                         </Link>
//                         <button
//                           className="btn btn-sm pd-x-15 btn-primary btn-uppercase mg-l-5"
//                           type="submit"
//                           disabled={isSubmitting}
//                         >
//                           <i
//                             data-feather="file"
//                             className="wd-10 "
//                             type="submit"
//                           ></i>
//                           Save
//                         </button>
//                       </>
//                     ) : call?.ui.callLoading ? (
//                       <button
//                         className="btn btn-sm pd-x-15 btn-primary btn-uppercase mg-l-5"
//                         type="button"
//                         disabled
//                       >
//                         <span
//                           className="spinner-border spinner-border-sm"
//                           role="status"
//                           aria-hidden={true}
//                         ></span>
//                         <span className="sr-only">Loading...</span>
//                       </button>
//                     ) : (
//                       <button
//                         className="btn btn-sm pd-x-15 btn-primary btn-uppercase mg-l-5"
//                         onClick={() => {
//                           setEditable(!editable);
//                         }}
//                       >
//                         <i data-feather="file" className="wd-10 "></i>Edit
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="content  content-auth editprofile">
//               <div className="container">
//                 <fieldset className="form-fieldset">
//                   <legend>Contact Information</legend>
//                   <div className="media align-items-stretch  ht-100p">
//                     <div className="sign-wrapper mg-lg-r-50 mg-xl-r-60 w-50">
//                       <div className="pd-t-20 wd-100p">

//                         <div className="form-group row">
//                           <label
//                             htmlFor="firstName"
//                             className="col-sm-3 col-form-label"
//                           >
//                             Call To
//                           </label>
//                           <div className="col-sm-9">
//                             <Field
//                               name="CallTo"
//                               type="text"
//                               className="form-control"
//                               placeholder="Enter Call To"
//                               disabled={editable}
//                             />
//                           </div>
//                         </div>
//                         <div className="form-group row">
//                           <label
//                             htmlFor="Related To"
//                             className="col-sm-3 col-form-label"
//                           >
//                             Related To
//                           </label>
//                           <div className="col-sm-9">
//                             <Field
//                               type="text"
//                               className="form-control"
//                               placeholder="Enter your Related To"
//                               name="RelatedTo"
//                               disabled={editable}
//                             />
//                           </div>
//                         </div>
//                         <div className="form-group row">
//                           <label
//                             htmlFor="firstName"
//                             className="col-sm-3 col-form-label"
//                           >
//                             Call Type
//                           </label>
//                           <div className="col-sm-9">
//                             <Field
//                               type="text"
//                               className="form-control"
//                               placeholder="Enter your Call Type"
//                               name="CallType"
//                               disabled={editable}
//                             />
//                           </div>
//                         </div>
//                         <div className="form-group row">
//                           <label
//                             htmlFor="firstName"
//                             className="col-sm-3 col-form-label"
//                           >
//                             Outgoing Call Status
//                           </label>
//                           <div className="col-sm-9">
//                             <Field
//                               type="text"
//                               className="form-control"
//                               placeholder="Enter Outgoing Call Status"
//                               name="OutgoingCallStatus"
//                               disabled={editable}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="sign-wrapper mg-lg-r-50 mg-xl-r-60 w-50">
//                       <div className="pd-t-20 wd-100p">

//                         <div className="form-group row">
//                           <label
//                             htmlFor="firstName"
//                             className="col-sm-3 col-form-label"
//                           >
//                             Call Start Time
//                           </label>
//                           <div className="col-sm-9">
//                             <Field
//                               name="CallStartTime"
//                               type="text"
//                               className="form-control"
//                               placeholder="Enter Call Start Time"
//                               disabled={editable}
//                             />
//                           </div>
//                         </div>

//                         <div className="form-group row">
//                           <label
//                             htmlFor="firstName"
//                             className="col-sm-3 col-form-label"
//                           >
//                             Subject
//                           </label>
//                           <div className="col-sm-9">
//                             <Field
//                               type="text"
//                               className="form-control"
//                               placeholder="Enter your Subject"
//                               name="Subject"
//                               disabled={editable}
//                             />
//                           </div>
//                         </div>

//                         <div className="form-group row">
//                           <label
//                             htmlFor="firstName"
//                             className="col-sm-3 col-form-label"
//                           >
//                             Call Purpose
//                           </label>
//                           <div className="col-sm-9">
//                             <Field
//                               type="text"
//                               className="form-control"
//                               placeholder="Enter Call Purpose"
//                               name="CallPurpose"
//                               disabled={editable}
//                             />
//                           </div>
//                         </div>
//                         <div className="form-group row">
//                           <label
//                             htmlFor="firstName"
//                             className="col-sm-3 col-form-label"
//                           >
//                             Call Agenda
//                           </label>
//                           <div className="col-sm-9">
//                             <Field
//                               type="text"
//                               className="form-control"
//                               placeholder="Enter Call Agenda"
//                               name="CallAgenda"
//                               disabled={editable}
//                             />
//                           </div>
//                         </div>

//                       </div>
//                     </div>
//                   </div>
//                 </fieldset>
//               </div>
//             </div>

//           </Form>
//         )}
//       </Formik>
//     </>
//   );
// };

// const mapStateToProps = (state) => ({
//   //data: state.call.callDetail,
//   call: state.call,

// });

// const mapDispatchToProps = {
//   getcallDetailAction: (data) => getCallById(data),
//   updateCallAction: (data) => updateCall(data),
// };
// export default connect(mapStateToProps, mapDispatchToProps)(CallDetails);
import React from "react";

import { useParams } from "react-router-dom";
import FormEditor from "../../Components/Common/EditForm/FormEditor";
import DetailsPageHeader from "../../Components/detailsPageHeader";
import { useSelector } from "react-redux";

function CallDetails() {
  const { id } = useParams();
  const sections = useSelector((state) => state.user.form);

  return (
    <>
      <DetailsPageHeader sectionData={sections} />
      <div className="my-3 min-h-screen">
        <div>
          <FormEditor formType="Calls" id={id} />;
        </div>
      </div>
    </>
  );
}

export { CallDetails };
