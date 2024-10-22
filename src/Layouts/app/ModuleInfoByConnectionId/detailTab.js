import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { GET_DETAIL, UPDATE, GET_FORM } from "../../../Redux/actions/user";
import { list } from "../../../Components/module";
import Overview from "./overview";
import Convert from "./convert";
import FormEditor from "../../../Components/Common/EditForm/FormEditor";

function OpportunitiesDetail(props) {
  const { formType, id } = props;
  const api = list[formType] || {};
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.user.form.sections);
  const [values, setValues] = useState({});
  const [yupSchema, setYupSchema] = useState(null); // Add yupSchema state
  const [editable, setEditable] = useState(true);
  const detail = useSelector((state) => state.user.detail);

  const generateYupSchema = (sections) => {
    let schema = {};
    let fields = {};

    for (const section of sections) {
      for (const fieldName in section.inputs) {
        const input = section.inputs[fieldName];
        const { required, placeholder, value } = input;

        if (required === true) {
          schema[value] = yup
            .string()
            .trim()
            .required(`Please enter a value for ${placeholder}`);
        }
        fields[value] = "";
      }
    }
    setValues(values);

    return yup.object().shape(schema);
  };

  const onSubmit = (values) => {
    values.id = id;
    dispatch(UPDATE(api.updateApi, { ...values }));
  };

  useEffect(() => {
    dispatch(GET_FORM(api.formApi));
  }, []);

  useEffect(() => {
    setValues(detail);
  }, [detail]);

  useEffect(() => {
    dispatch(GET_DETAIL(api.detailApi, id));
  }, [dispatch]);

  useEffect(() => {
    if (sections) {
      if (Object.keys(sections)?.length > 0) {
        const schema = generateYupSchema(sections);
        setYupSchema(schema);
      }
    }
  }, [sections]);

  return (
    <div>
      {yupSchema && (
        <Formik
          initialValues={values}
          validationSchema={yupSchema}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            onSubmit(values);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="my-3">
                {/* <div className="flex justify-end items-center">
                  {!editable ? (
                    <div className="flex justify-start gap-2">
                      <Link
                        to={"/" + formType}
                        className="px-2 bg-primary py-1.5 rounded text-white"
                      >
                        <div className="w-[40px]">Back</div>
                      </Link>
                      <button
                        className="bg-primary text-white px-2 py-2 w-[70px] rounded-lg"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className=" space-x-2 flex justify-start items-center ">
                      {formType === "Leads" && (
                        <Convert id={id} sections={sections} />
                      )}
                      <button
                        className="bg-primary text-white px-2 py-2 w-[70px] rounded-lg"
                        onClick={() => {
                          setEditable(!editable);
                        }}
                        type="button"
                      >
                        Edit { }
                      </button>
                    </div>
                  )}
                </div> */}
                <FormEditor
                  detailPageIs={formType}
                  formType={formType}
                  id={id}
                  OverviewCheck={false}
                />
              </div>
              <Overview formType={formType} editable={editable} sections={sections} />
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default OpportunitiesDetail;
